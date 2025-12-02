// Enhanced SOAP/WSDL types for enterprise-grade parsing

export interface WsdlComplexType {
  name: string;
  properties: Record<string, WsdlTypeProperty>;
  isArray?: boolean;
  documentation?: string;
}

export interface WsdlTypeProperty {
  type: string;
  required: boolean;
  isArray: boolean;
  format?: string;
  description?: string;
}

export interface WsdlOperation {
  name: string;
  input: WsdlMessage;
  output: WsdlMessage;
  fault?: WsdlMessage;
  documentation?: string;
  soapAction?: string;
}

export interface WsdlMessage {
  name: string;
  parts: WsdlPart[];
}

export interface WsdlPart {
  name: string;
  type: string;
  element?: string;
  isArray?: boolean;
}

export interface WsdlService {
  name: string;
  portTypes: string[];
  bindings: string[];
  endpoints: string[];
}

export interface RestEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  operationId: string;
  summary: string;
  description?: string;
  parameters?: RestParameter[];
  requestBody?: OpenApiRequestBody;
  responses: Record<string, OpenApiResponse>;
  tags?: string[];
}

export interface RestParameter {
  name: string;
  in: 'path' | 'query' | 'header';
  required: boolean;
  schema: OpenApiSchema;
  description?: string;
}

export interface OpenApiRequestBody {
  required: boolean;
  content: Record<string, { schema: OpenApiSchema; examples?: Record<string, any> }>;
}

export interface OpenApiSpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
    contact?: {
      name?: string;
      email?: string;
    };
  };
  servers: Array<{
    url: string;
    description?: string;
  }>;
  paths: Record<string, Record<string, any>>;
  components?: {
    schemas?: Record<string, OpenApiSchema>;
    securitySchemes?: Record<string, any>;
    responses?: Record<string, OpenApiResponse>;
  };
  tags?: Array<{
    name: string;
    description?: string;
  }>;
}

export interface OpenApiSchema {
  type: string;
  properties?: Record<string, any>;
  required?: string[];
  items?: any;
  format?: string;
  description?: string;
  example?: any;
  enum?: any[];
  $ref?: string;
}

export interface OpenApiResponse {
  description: string;
  content?: Record<string, { schema: OpenApiSchema; examples?: Record<string, any> }>;
}

export interface ConversionOptions {
  generateStubs: boolean;
  targetFramework: 'express' | 'nextjs' | 'fastapi';
  authStrategy: 'none' | 'bearer' | 'apikey' | 'oauth2';
  serviceName?: string;
  includeExamples?: boolean;
}

export interface MigrationPhase {
  phase: number;
  name: string;
  duration: string;
  activities: string[];
  deliverables: string[];
  risks: string[];
}

export interface ConversionResult {
  openApiSpec: OpenApiSpec;
  endpoints: RestEndpoint[];
  complexTypes: WsdlComplexType[];
  migrationPlan: MigrationPhase[];
  codeStubs?: string[];
  warnings: string[];
  crossChamberSuggestions: string[];
}
