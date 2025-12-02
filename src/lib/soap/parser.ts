import { parseString } from 'xml2js';
import type { WsdlOperation, WsdlMessage, WsdlPart, WsdlComplexType, WsdlService } from './types';

export async function parseWsdl(wsdlContent: string): Promise<WsdlOperation[]> {
  return new Promise((resolve, reject) => {
    parseString(wsdlContent, { explicitArray: false, mergeAttrs: true }, (err, result) => {
      if (err) {
        reject(new Error(`Failed to parse WSDL: ${err.message}`));
        return;
      }

      try {
        const operations = extractOperations(result, wsdlContent);
        resolve(operations);
      } catch (error) {
        reject(error);
      }
    });
  });
}

function extractOperations(wsdlDoc: any, rawContent: string): WsdlOperation[] {
  const operations: WsdlOperation[] = [];

  const definitions = wsdlDoc['wsdl:definitions'] || wsdlDoc['definitions'] || wsdlDoc;
  if (!definitions) {
    throw new Error('Invalid WSDL: No definitions found');
  }

  // Extract messages for input/output mapping
  const messages = extractMessages(definitions);

  // Handle multiple portTypes
  let portTypes = definitions['wsdl:portType'] || definitions['portType'];
  if (!portTypes) {
    return operations;
  }

  // Ensure array
  if (!Array.isArray(portTypes)) {
    portTypes = [portTypes];
  }

  portTypes.forEach((portType: any) => {
    const ops = portType['wsdl:operation'] || portType['operation'];
    if (!ops) return;

    const operationsArray = Array.isArray(ops) ? ops : [ops];

    operationsArray.forEach((op: any) => {
      const name = op.name || op['$']?.name;
      if (!name) return;

      const documentation = extractDocumentation(op);
      const soapAction = extractSoapAction(rawContent, name);

      // Extract input message
      const inputMsg = op['wsdl:input'] || op['input'];
      const inputMsgName = inputMsg?.message || inputMsg?.['$']?.message;
      const input: WsdlMessage = messages[cleanMessageName(inputMsgName)] || {
        name: inputMsgName || `${name}Request`,
        parts: [],
      };

      // Extract output message
      const outputMsg = op['wsdl:output'] || op['output'];
      const outputMsgName = outputMsg?.message || outputMsg?.['$']?.message;
      const output: WsdlMessage = messages[cleanMessageName(outputMsgName)] || {
        name: outputMsgName || `${name}Response`,
        parts: [],
      };

      // Extract fault message (optional)
      const faultMsg = op['wsdl:fault'] || op['fault'];
      let fault: WsdlMessage | undefined;
      if (faultMsg) {
        const faultMsgName = faultMsg?.message || faultMsg?.['$']?.message;
        fault = messages[cleanMessageName(faultMsgName)] || {
          name: faultMsgName || `${name}Fault`,
          parts: [],
        };
      }

      operations.push({
        name,
        input,
        output,
        fault,
        documentation,
        soapAction,
      });
    });
  });

  return operations;
}

function extractMessages(definitions: any): Record<string, WsdlMessage> {
  const messages: Record<string, WsdlMessage> = {};

  let messageList = definitions['wsdl:message'] || definitions['message'];
  if (!messageList) return messages;

  if (!Array.isArray(messageList)) {
    messageList = [messageList];
  }

  messageList.forEach((msg: any) => {
    const name = msg.name || msg['$']?.name;
    if (!name) return;

    const parts: WsdlPart[] = [];
    let partList = msg['wsdl:part'] || msg['part'];

    if (partList) {
      if (!Array.isArray(partList)) {
        partList = [partList];
      }

      partList.forEach((part: any) => {
        const partName = part.name || part['$']?.name;
        const partType = part.type || part['$']?.type || part.element || part['$']?.element;
        const element = part.element || part['$']?.element;

        if (partName && partType) {
          parts.push({
            name: partName,
            type: cleanTypeName(partType),
            element: element ? cleanTypeName(element) : undefined,
            isArray: detectArrayType(partType),
          });
        }
      });
    }

    messages[cleanMessageName(name)] = {
      name,
      parts,
    };
  });

  return messages;
}

export function extractComplexTypes(wsdlContent: string): WsdlComplexType[] {
  const types: WsdlComplexType[] = [];

  // Parse complex types from schema section
  const schemaMatch = wsdlContent.match(/<xsd:schema[^>]*>([\s\S]*?)<\/xsd:schema>/gi);
  if (!schemaMatch) return types;

  schemaMatch.forEach((schema) => {
    const complexTypeMatches = schema.match(/<xsd:complexType[^>]*name="([^"]+)"[^>]*>([\s\S]*?)<\/xsd:complexType>/gi);
    if (!complexTypeMatches) return;

    complexTypeMatches.forEach((complexType) => {
      const nameMatch = complexType.match(/name="([^"]+)"/);
      if (!nameMatch) return;

      const name = nameMatch[1];
      const properties: Record<string, any> = {};

      // Extract elements from sequence
      const elementMatches = complexType.match(/<xsd:element[^>]*name="([^"]+)"[^>]*type="([^"]+)"[^>]*\/>/gi);
      if (elementMatches) {
        elementMatches.forEach((element) => {
          const elemNameMatch = element.match(/name="([^"]+)"/);
          const elemTypeMatch = element.match(/type="([^"]+)"/);
          const minOccurs = element.match(/minOccurs="([^"]+)"/);
          const maxOccurs = element.match(/maxOccurs="([^"]+)"/);

          if (elemNameMatch && elemTypeMatch) {
            properties[elemNameMatch[1]] = {
              type: mapXsdTypeToJsonType(elemTypeMatch[1]),
              required: minOccurs ? minOccurs[1] !== '0' : true,
              isArray: maxOccurs ? maxOccurs[1] === 'unbounded' : false,
            };
          }
        });
      }

      types.push({
        name,
        properties,
        isArray: false,
      });
    });
  });

  return types;
}

export function extractServiceInfo(wsdlContent: string): WsdlService {
  const serviceNameMatch = wsdlContent.match(/<wsdl:service[^>]*name="([^"]+)"/i) ||
                           wsdlContent.match(/<service[^>]*name="([^"]+)"/i);
  
  const portTypeMatches = wsdlContent.match(/<wsdl:portType[^>]*name="([^"]+)"/gi) ||
                          wsdlContent.match(/<portType[^>]*name="([^"]+)"/gi) || [];
  
  const bindingMatches = wsdlContent.match(/<wsdl:binding[^>]*name="([^"]+)"/gi) ||
                        wsdlContent.match(/<binding[^>]*name="([^"]+)"/gi) || [];

  return {
    name: serviceNameMatch ? serviceNameMatch[1] : 'ConvertedService',
    portTypes: portTypeMatches.map(m => m.match(/name="([^"]+)"/)![1]),
    bindings: bindingMatches.map(m => m.match(/name="([^"]+)"/)![1]),
    endpoints: [],
  };
}

export function extractServiceName(wsdlContent: string): string {
  return extractServiceInfo(wsdlContent).name;
}

function extractDocumentation(op: any): string | undefined {
  const doc = op['wsdl:documentation'] || op['documentation'];
  if (!doc) return undefined;
  return typeof doc === 'string' ? doc.trim() : doc._ || undefined;
}

function extractSoapAction(wsdlContent: string, operationName: string): string | undefined {
  const regex = new RegExp(`<wsdl:operation[^>]*name="${operationName}"[^>]*>\\s*<soap:operation[^>]*soapAction="([^"]+)"`, 'i');
  const match = wsdlContent.match(regex);
  return match ? match[1] : undefined;
}

function cleanMessageName(name: string | undefined): string {
  if (!name) return '';
  return name.replace(/^(tns:|ns\d+:)/, '');
}

function cleanTypeName(type: string): string {
  return type.replace(/^(xsd:|xs:|tns:|ns\d+:)/, '');
}

function detectArrayType(type: string): boolean {
  return type.toLowerCase().includes('array') || type.toLowerCase().includes('list');
}

function mapXsdTypeToJsonType(xsdType: string): string {
  const cleanType = cleanTypeName(xsdType).toLowerCase();
  
  const typeMap: Record<string, string> = {
    'string': 'string',
    'int': 'integer',
    'integer': 'integer',
    'long': 'integer',
    'short': 'integer',
    'decimal': 'number',
    'float': 'number',
    'double': 'number',
    'boolean': 'boolean',
    'bool': 'boolean',
    'date': 'string',
    'datetime': 'string',
    'time': 'string',
  };

  return typeMap[cleanType] || 'object';
}
