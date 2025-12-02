import type { ConversionOptions, ConversionResult, MigrationPhase } from './types';
import { parseWsdl, extractServiceName, extractComplexTypes } from './parser';
import { transformToRestEndpoints } from './transformer';
import { generateOpenApiSpec } from './openapi-generator';

export * from './types';

export async function convertSoapToRest(
  wsdlContent: string,
  options: Partial<ConversionOptions> = {}
): Promise<ConversionResult> {
  const warnings: string[] = [];
  const crossChamberSuggestions: string[] = [];

  const fullOptions: ConversionOptions = {
    generateStubs: options.generateStubs ?? false,
    targetFramework: options.targetFramework ?? 'nextjs',
    authStrategy: options.authStrategy ?? 'bearer',
    serviceName: options.serviceName,
    includeExamples: options.includeExamples ?? true,
  };

  try {
    // Parse WSDL
    const operations = await parseWsdl(wsdlContent);

    if (operations.length === 0) {
      warnings.push('No operations found in WSDL document. Verify WSDL structure.');
    }

    if (operations.length > 20) {
      warnings.push(`Large service detected (${operations.length} operations). Consider splitting into multiple microservices.`);
    }

    // Extract service info
    const serviceName = fullOptions.serviceName || extractServiceName(wsdlContent);
    
    // Extract complex types
    const complexTypes = extractComplexTypes(wsdlContent);
    
    if (complexTypes.length > 0) {
      warnings.push(`${complexTypes.length} complex types detected. Review generated schemas for accuracy.`);
    }

    // Transform to REST
    const endpoints = transformToRestEndpoints(operations);
    
    // Generate OpenAPI spec
    const openApiSpec = generateOpenApiSpec(endpoints, serviceName, fullOptions, complexTypes);

    // Generate migration plan
    const migrationPlan = generateMigrationPlan(operations.length, complexTypes.length);

    // Cross-chamber suggestions
    if (wsdlContent.toLowerCase().includes('html') || wsdlContent.toLowerCase().includes('ui')) {
      crossChamberSuggestions.push('UI patterns detected in service. Consider using Ghost UI Converter for frontend modernization.');
    }

    if (operations.some(op => op.name.toLowerCase().includes('legacy') || op.name.toLowerCase().includes('old'))) {
      crossChamberSuggestions.push('Legacy naming detected. Use Legacy Reanimator to analyze backend implementation for additional modernization opportunities.');
    }

    if (complexTypes.length > 10) {
      crossChamberSuggestions.push('Complex data model detected. Consider domain-driven design refactoring for better maintainability.');
    }

    return {
      openApiSpec,
      endpoints,
      complexTypes,
      migrationPlan,
      warnings,
      crossChamberSuggestions,
    };
  } catch (error) {
    throw new Error(`SOAP to REST conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function generateMigrationPlan(operationCount: number, _complexTypeCount: number): MigrationPhase[] {
  const phases: MigrationPhase[] = [];

  // Phase 1: Mirror SOAP via REST Façade
  phases.push({
    phase: 1,
    name: 'Mirror SOAP via REST Façade',
    duration: operationCount > 10 ? '3-4 weeks' : '2-3 weeks',
    activities: [
      'Implement REST API endpoints alongside existing SOAP service',
      'Create façade layer that translates REST calls to SOAP internally',
      'Deploy to staging environment with feature flags',
      'Establish monitoring and observability for both APIs',
    ],
    deliverables: [
      'REST API with 100% feature parity to SOAP',
      'OpenAPI 3.0 specification and documentation',
      'Monitoring dashboard with comparative metrics',
      'Feature flag configuration for gradual rollout',
    ],
    risks: [
      'Performance overhead from translation layer',
      'Potential data mapping inconsistencies',
      'Increased infrastructure costs during parallel operation',
    ],
  });

  // Phase 2: Contract Testing & Validation
  phases.push({
    phase: 2,
    name: 'Contract Testing & Consumer Validation',
    duration: '2-3 weeks',
    activities: [
      'Implement contract tests using OpenAPI specification',
      'Validate REST API behavior matches SOAP semantics',
      'Conduct load testing and performance benchmarking',
      'Engage with internal consumers for early feedback',
    ],
    deliverables: [
      'Comprehensive contract test suite (target: 95%+ coverage)',
      'Performance benchmarks (REST vs SOAP comparison)',
      'Consumer validation reports',
      'Updated API documentation with migration guides',
    ],
    risks: [
      'Semantic differences between SOAP and REST',
      'Performance degradation under load',
      'Consumer integration issues',
    ],
  });

  // Phase 3: Gradual Consumer Migration
  phases.push({
    phase: 3,
    name: 'Gradual Consumer Migration',
    duration: operationCount > 10 ? '8-12 weeks' : '4-6 weeks',
    activities: [
      'Migrate internal consumers to REST API incrementally',
      'Implement traffic shadowing to compare SOAP vs REST',
      'Monitor error rates and performance metrics',
      'Provide migration support and troubleshooting',
    ],
    deliverables: [
      'Consumer migration tracker (target: 95%+ migrated)',
      'Traffic analysis reports',
      'Zero critical incidents during migration',
      'Client SDK libraries for major languages',
    ],
    risks: [
      'Consumer resistance to change',
      'Unexpected edge cases in production',
      'Rollback complexity if issues arise',
    ],
  });

  // Phase 4: SOAP Deprecation & Cleanup
  phases.push({
    phase: 4,
    name: 'SOAP Deprecation & Backend Refactoring',
    duration: '3-4 weeks',
    activities: [
      'Announce SOAP deprecation timeline (6-month notice)',
      'Migrate remaining consumers with dedicated support',
      'Remove SOAP façade layer and refactor backend',
      'Decommission SOAP infrastructure',
    ],
    deliverables: [
      '100% consumer migration completed',
      'SOAP services decommissioned',
      'Refactored backend without translation layer',
      'Infrastructure cost savings report (target: 30-40% reduction)',
    ],
    risks: [
      'Forgotten consumers causing production issues',
      'Legacy documentation still referencing SOAP',
      'Compliance/audit requirements for API changes',
    ],
  });

  return phases;
}
