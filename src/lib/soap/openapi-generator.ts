import type { OpenApiSpec, RestEndpoint, ConversionOptions, WsdlComplexType } from './types';

export function generateOpenApiSpec(
  endpoints: RestEndpoint[],
  serviceName: string,
  options: ConversionOptions,
  complexTypes: WsdlComplexType[] = []
): OpenApiSpec {
  const paths: Record<string, Record<string, any>> = {};
  const schemas: Record<string, any> = {};

  // Build paths from endpoints
  endpoints.forEach((endpoint) => {
    if (!paths[endpoint.path]) {
      paths[endpoint.path] = {};
    }

    const operation: any = {
      operationId: endpoint.operationId,
      summary: endpoint.summary,
      description: endpoint.description,
      tags: endpoint.tags || [],
      parameters: endpoint.parameters || [],
      responses: {},
    };

    // Add responses
    Object.entries(endpoint.responses).forEach(([code, response]) => {
      operation.responses[code] = response;
    });

    // Add request body
    if (endpoint.requestBody) {
      operation.requestBody = endpoint.requestBody;
    }

    // Add security
    if (options.authStrategy !== 'none') {
      operation.security = [{ [options.authStrategy]: [] }];
    }

    paths[endpoint.path][endpoint.method.toLowerCase()] = operation;
  });

  // Build schemas from complex types
  complexTypes.forEach((complexType) => {
    schemas[complexType.name] = {
      type: 'object',
      properties: complexType.properties,
      required: Object.entries(complexType.properties)
        .filter(([_, prop]) => prop.required)
        .map(([name]) => name),
      description: complexType.documentation,
    };
  });

  // Extract unique tags
  const tags = Array.from(
    new Set(endpoints.flatMap((e) => e.tags || []))
  ).map((tag) => ({
    name: tag,
    description: `Operations related to ${tag}`,
  }));

  const spec: OpenApiSpec = {
    openapi: '3.0.0',
    info: {
      title: serviceName,
      version: '1.0.0',
      description: `REST API converted from SOAP service. This specification follows OpenAPI 3.0 standards and includes comprehensive request/response schemas, error handling, and example payloads.`,
      contact: {
        name: 'API Support Team',
        email: 'api-support@example.com',
      },
    },
    servers: [
      {
        url: 'https://api.example.com/v1',
        description: 'Production server',
      },
      {
        url: 'https://staging-api.example.com/v1',
        description: 'Staging server',
      },
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    paths,
    tags: tags.length > 0 ? tags : undefined,
  };

  // Add components
  if (Object.keys(schemas).length > 0 || options.authStrategy !== 'none') {
    spec.components = {};

    if (Object.keys(schemas).length > 0) {
      spec.components.schemas = schemas;
    }

    if (options.authStrategy !== 'none') {
      spec.components.securitySchemes = {
        [options.authStrategy]: getSecurityScheme(options.authStrategy),
      };
    }

    // Add common error responses
    spec.components.responses = {
      BadRequest: {
        description: 'Bad request - Invalid input parameters',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string', example: 'INVALID_INPUT' },
                message: { type: 'string', example: 'The provided input is invalid' },
                details: { type: 'array', items: { type: 'string' } },
              },
            },
          },
        },
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string', example: 'NOT_FOUND' },
                message: { type: 'string', example: 'The requested resource was not found' },
              },
            },
          },
        },
      },
      InternalError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string', example: 'INTERNAL_ERROR' },
                message: { type: 'string', example: 'An unexpected error occurred' },
              },
            },
          },
        },
      },
    };
  }

  return spec;
}

function getSecurityScheme(authStrategy: string): any {
  switch (authStrategy) {
    case 'bearer':
      return {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT Bearer token authentication',
      };
    case 'apikey':
      return {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'API key for authentication',
      };
    case 'oauth2':
      return {
        type: 'oauth2',
        description: 'OAuth 2.0 authentication',
        flows: {
          authorizationCode: {
            authorizationUrl: 'https://example.com/oauth/authorize',
            tokenUrl: 'https://example.com/oauth/token',
            scopes: {
              'read': 'Read access to resources',
              'write': 'Write access to resources',
              'admin': 'Administrative access',
            },
          },
        },
      };
    default:
      return {};
  }
}
