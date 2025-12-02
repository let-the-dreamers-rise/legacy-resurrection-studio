import type { WsdlOperation, RestEndpoint, OpenApiSchema, RestParameter, OpenApiRequestBody } from './types';

export function transformToRestEndpoints(operations: WsdlOperation[]): RestEndpoint[] {
  return operations.map((op) => {
    const { method, path, parameters } = determineMethodPathAndParams(op.name);
    const resourceName = extractResourceName(op.name);

    return {
      method,
      path,
      operationId: toCamelCase(op.name),
      summary: op.documentation || generateSummary(op.name, method),
      description: op.documentation ? `Converted from SOAP operation: ${op.name}` : undefined,
      parameters,
      requestBody: method !== 'GET' && method !== 'DELETE' ? createRequestBody(op, resourceName) : undefined,
      responses: createResponses(op, resourceName),
      tags: [resourceName],
    };
  });
}

function determineMethodPathAndParams(operationName: string): {
  method: RestEndpoint['method'];
  path: string;
  parameters: RestParameter[];
} {
  const lowerName = operationName.toLowerCase();
  const parameters: RestParameter[] = [];

  // GET patterns - retrieve single resource
  if (lowerName.match(/^get[A-Z]/) && !lowerName.includes('list') && !lowerName.includes('all')) {
    const resource = extractResourceName(operationName);
    parameters.push({
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      description: `${resource} identifier`,
    });
    return {
      method: 'GET',
      path: `/${pluralize(resource)}/{id}`,
      parameters,
    };
  }

  // GET patterns - list/query resources
  if (lowerName.match(/^(list|get|find|search|query)/)) {
    const resource = extractResourceName(operationName);
    
    // Add common query parameters
    parameters.push(
      {
        name: 'limit',
        in: 'query',
        required: false,
        schema: { type: 'integer', format: 'int32' },
        description: 'Maximum number of results to return',
      },
      {
        name: 'offset',
        in: 'query',
        required: false,
        schema: { type: 'integer', format: 'int32' },
        description: 'Number of results to skip',
      }
    );

    return {
      method: 'GET',
      path: `/${pluralize(resource)}`,
      parameters,
    };
  }

  // POST patterns - create new resource
  if (lowerName.match(/^(create|add|insert|register|new)/)) {
    const resource = extractResourceName(operationName);
    return {
      method: 'POST',
      path: `/${pluralize(resource)}`,
      parameters,
    };
  }

  // PUT patterns - full update
  if (lowerName.match(/^(update|modify|edit|replace)/)) {
    const resource = extractResourceName(operationName);
    parameters.push({
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      description: `${resource} identifier`,
    });
    return {
      method: 'PUT',
      path: `/${pluralize(resource)}/{id}`,
      parameters,
    };
  }

  // PATCH patterns - partial update (status, specific field)
  if (lowerName.match(/^(patch|set|change)/) || lowerName.includes('status')) {
    const resource = extractResourceName(operationName);
    const field = extractFieldName(operationName);
    parameters.push({
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      description: `${resource} identifier`,
    });
    return {
      method: 'PATCH',
      path: field ? `/${pluralize(resource)}/{id}/${field}` : `/${pluralize(resource)}/{id}`,
      parameters,
    };
  }

  // DELETE patterns
  if (lowerName.match(/^(delete|remove|close|cancel)/)) {
    const resource = extractResourceName(operationName);
    parameters.push({
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      description: `${resource} identifier`,
    });
    return {
      method: 'DELETE',
      path: `/${pluralize(resource)}/{id}`,
      parameters,
    };
  }

  // Transfer/Move patterns - special POST
  if (lowerName.match(/^(transfer|move|send)/)) {
    const resource = extractResourceName(operationName);
    return {
      method: 'POST',
      path: `/${pluralize(resource)}`,
      parameters,
    };
  }

  // Default fallback
  return {
    method: 'POST',
    path: `/operations/${toKebabCase(operationName)}`,
    parameters,
  };
}

function extractResourceName(operationName: string): string {
  // Remove common prefixes
  let resource = operationName.replace(/^(get|create|add|insert|update|modify|edit|delete|remove|list|find|search|query|transfer|send|close|cancel|register|new|patch|set|change)/i, '');
  
  // Remove common suffixes
  resource = resource.replace(/(request|response|operation|service)$/i, '');
  
  // Handle camelCase to words
  resource = resource.replace(/([A-Z])/g, ' $1').trim();
  
  // Take first significant word
  const words = resource.split(/\s+/).filter(w => w.length > 0);
  resource = words[0] || 'resource';
  
  return toKebabCase(resource);
}

function extractFieldName(operationName: string): string | undefined {
  const lowerName = operationName.toLowerCase();
  
  if (lowerName.includes('status')) return 'status';
  if (lowerName.includes('password')) return 'password';
  if (lowerName.includes('email')) return 'email';
  if (lowerName.includes('name')) return 'name';
  
  return undefined;
}

function pluralize(word: string): string {
  // Simple pluralization rules
  if (word.endsWith('s') || word.endsWith('x') || word.endsWith('ch') || word.endsWith('sh')) {
    return word + 'es';
  }
  if (word.endsWith('y') && !['a', 'e', 'i', 'o', 'u'].includes(word[word.length - 2])) {
    return word.slice(0, -1) + 'ies';
  }
  return word + 's';
}

function generateSummary(operationName: string, method: string): string {
  const resource = extractResourceName(operationName);
  const action = method === 'GET' ? 'Retrieve' :
                 method === 'POST' ? 'Create' :
                 method === 'PUT' ? 'Update' :
                 method === 'PATCH' ? 'Modify' :
                 'Delete';
  
  return `${action} ${resource}`;
}

function createRequestBody(operation: WsdlOperation, _resourceName: string): OpenApiRequestBody {
  const schema: OpenApiSchema = {
    type: 'object',
    properties: {},
    required: [],
  };

  // Build properties from input message parts
  operation.input.parts.forEach((part) => {
    const propName = toCamelCase(part.name);
    schema.properties![propName] = {
      type: mapWsdlTypeToJsonType(part.type),
      description: `${part.name} parameter`,
    };
    
    if (!part.name.toLowerCase().includes('optional')) {
      schema.required!.push(propName);
    }
  });

  // Generate example
  const example: Record<string, any> = {};
  operation.input.parts.forEach((part) => {
    const propName = toCamelCase(part.name);
    example[propName] = generateExampleValue(part.type, part.name);
  });

  return {
    required: true,
    content: {
      'application/json': {
        schema,
        examples: {
          default: {
            summary: 'Example request',
            value: example,
          },
        },
      },
    },
  };
}

function createResponses(operation: WsdlOperation, resourceName: string): Record<string, any> {
  const successSchema: OpenApiSchema = {
    type: 'object',
    properties: {},
  };

  // Build response from output message parts
  operation.output.parts.forEach((part) => {
    const propName = toCamelCase(part.name);
    successSchema.properties![propName] = {
      type: mapWsdlTypeToJsonType(part.type),
      description: `${part.name} value`,
    };
  });

  // Generate example
  const successExample: Record<string, any> = {};
  operation.output.parts.forEach((part) => {
    const propName = toCamelCase(part.name);
    successExample[propName] = generateExampleValue(part.type, part.name);
  });

  const responses: Record<string, any> = {
    '200': {
      description: 'Successful operation',
      content: {
        'application/json': {
          schema: successSchema,
          examples: {
            success: {
              summary: 'Successful response',
              value: successExample,
            },
          },
        },
      },
    },
    '400': {
      description: 'Bad request - Invalid input parameters',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string' },
              message: { type: 'string' },
              details: { type: 'array', items: { type: 'string' } },
            },
          },
        },
      },
    },
    '404': {
      description: `${resourceName} not found`,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    '500': {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
  };

  // Add fault response if defined
  if (operation.fault) {
    responses['422'] = {
      description: 'Business logic error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              faultCode: { type: 'string' },
              faultString: { type: 'string' },
            },
          },
        },
      },
    };
  }

  return responses;
}

function mapWsdlTypeToJsonType(wsdlType: string): string {
  const lowerType = wsdlType.toLowerCase();
  
  if (lowerType.includes('string')) return 'string';
  if (lowerType.includes('int') || lowerType.includes('long') || lowerType.includes('short')) return 'integer';
  if (lowerType.includes('decimal') || lowerType.includes('float') || lowerType.includes('double')) return 'number';
  if (lowerType.includes('bool')) return 'boolean';
  if (lowerType.includes('date') || lowerType.includes('time')) return 'string';
  if (lowerType.includes('array') || lowerType.includes('list')) return 'array';
  
  return 'object';
}

function generateExampleValue(type: string, name: string): any {
  const lowerType = type.toLowerCase();
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('id')) return '123e4567-e89b-12d3-a456-426614174000';
  if (lowerName.includes('email')) return 'user@example.com';
  if (lowerName.includes('name')) return 'John Doe';
  if (lowerName.includes('amount') || lowerName.includes('balance')) return 1000.50;
  if (lowerName.includes('currency')) return 'USD';
  if (lowerName.includes('status')) return 'active';
  if (lowerName.includes('date') || lowerName.includes('time')) return '2025-01-15T10:30:00Z';
  if (lowerName.includes('count') || lowerName.includes('number')) return 42;
  
  if (lowerType.includes('bool')) return true;
  if (lowerType.includes('int') || lowerType.includes('long')) return 123;
  if (lowerType.includes('decimal') || lowerType.includes('float')) return 123.45;
  if (lowerType.includes('array')) return [];
  
  return 'example value';
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
