import type { RiskReport } from '@/lib/analysis';
import type { ConversionResult as SoapConversionResult } from '@/lib/soap';
import type { ConversionResult as UIConversionResult } from '@/lib/ui';

interface MigrationReportData {
  projectName?: string;
  analysisReport?: RiskReport;
  soapConversion?: SoapConversionResult;
  uiConversion?: UIConversionResult;
  timestamp?: Date;
}

export function generateMigrationReport(data: MigrationReportData): string {
  const timestamp = data.timestamp || new Date();
  const projectName = data.projectName || 'Legacy System';

  let report = `# Legacy Resurrection Report: ${projectName}

**Generated:** ${timestamp.toLocaleString()}  
**Tool:** Legacy Resurrection Studio - Ultimate Edition

---

## Executive Summary

This report documents the strategic modernization assessment and conversion artifacts for ${projectName}. The analysis employs a risk-mitigated approach to identify technical debt, propose modernization paths, and generate implementation artifacts.

`;

  // Analysis Section
  if (data.analysisReport) {
    const { overallScore, patternsDetected, recommendations, resurrectionRoutes } = data.analysisReport;
    
    report += `## Risk Assessment

**Overall Modernization Score:** ${overallScore}/100

`;

    if (overallScore >= 70) {
      report += `**Status:** ✅ Low Risk - System is relatively modern with minimal technical debt.\n\n`;
    } else if (overallScore >= 40) {
      report += `**Status:** ⚠️ Medium Risk - Significant modernization opportunities identified.\n\n`;
    } else {
      report += `**Status:** 🔴 High Risk - Critical technical debt requiring immediate attention.\n\n`;
    }

    if (patternsDetected.length > 0) {
      report += `### Detected Legacy Patterns\n\n`;
      patternsDetected.forEach(pattern => {
        const severityEmoji = {
          critical: '🔴',
          high: '🟠',
          medium: '🟡',
          low: '🟢'
        }[pattern.severity] || '⚪';
        
        report += `#### ${severityEmoji} ${pattern.name} (${pattern.severity.toUpperCase()})\n\n`;
        report += `- **Description:** ${pattern.description}\n`;
        report += `- **Occurrences:** ${pattern.occurrences}\n`;
        report += `- **Modernization Path:** ${pattern.modernizationPath}\n\n`;
      });
    }

    if (recommendations.length > 0) {
      report += `### Strategic Recommendations\n\n`;
      recommendations.forEach((rec, idx) => {
        report += `${idx + 1}. ${rec}\n`;
      });
      report += `\n`;
    }

    if (resurrectionRoutes.length > 0) {
      report += `### Suggested Resurrection Chambers\n\n`;
      resurrectionRoutes.forEach(route => {
        report += `- **${route.chamber}:** ${route.reason}\n`;
      });
      report += `\n`;
    }
  }

  // SOAP to REST Section
  if (data.soapConversion) {
    const { openApiSpec, endpoints, warnings } = data.soapConversion;
    
    report += `## API Modernization (SOAP → REST)

### Conversion Summary

Successfully transformed SOAP service to RESTful API with OpenAPI 3.0 specification.

**Endpoints Generated:** ${endpoints.length}

`;

    report += `### REST Endpoints\n\n`;
    endpoints.forEach(endpoint => {
      report += `- \`${endpoint.method} ${endpoint.path}\` - ${endpoint.summary}\n`;
    });
    report += `\n`;

    report += `### OpenAPI Specification

The complete OpenAPI 3.0 specification has been generated and is available for:
- API documentation generation (Swagger UI, Redoc)
- Client SDK generation (OpenAPI Generator)
- API gateway configuration
- Contract testing

**Service:** ${openApiSpec.info.title}  
**Version:** ${openApiSpec.info.version}

`;

    if (warnings.length > 0) {
      report += `### Conversion Warnings\n\n`;
      warnings.forEach(warning => {
        report += `- ⚠️ ${warning}\n`;
      });
      report += `\n`;
    }
  }

  // UI Conversion Section
  if (data.uiConversion) {
    const { components, migrationNotes, warnings } = data.uiConversion;
    
    report += `## UI Modernization (Legacy → React + Tailwind)

### Conversion Summary

Successfully transformed legacy UI components to modern React with Tailwind CSS.

**Components Generated:** ${components.length}

`;

    components.forEach(component => {
      report += `#### ${component.name}\n\n`;
      report += `- **File:** \`${component.filePath}\`\n`;
      report += `- **Dependencies:** ${component.dependencies.join(', ')}\n\n`;
    });

    if (migrationNotes.length > 0) {
      report += `### Migration Notes\n\n`;
      migrationNotes.forEach(note => {
        report += `- 📝 ${note}\n`;
      });
      report += `\n`;
    }

    if (warnings.length > 0) {
      report += `### Conversion Warnings\n\n`;
      warnings.forEach(warning => {
        report += `- ⚠️ ${warning}\n`;
      });
      report += `\n`;
    }
  }

  // Migration Strategy
  report += `## Recommended Migration Strategy

### Approach: Strangler Fig Pattern

This migration follows a risk-mitigated strangler fig approach, enabling incremental delivery while maintaining business continuity.

#### Phase 1: Foundation (Weeks 1-2)
- Deploy new REST API alongside existing SOAP service
- Implement authentication and authorization layer
- Set up monitoring and observability
- Create deployment pipeline

#### Phase 2: Incremental Migration (Weeks 3-8)
- Migrate low-risk endpoints first
- Implement feature flags for gradual rollout
- Monitor performance and error rates
- Gather user feedback

#### Phase 3: Deprecation (Weeks 9-12)
- Migrate remaining high-traffic endpoints
- Communicate deprecation timeline to clients
- Provide migration guides and support
- Decommission legacy services

### Success Metrics

- **Technical KPIs:**
  - Response time < 200ms (p95)
  - Error rate < 0.1%
  - 100% feature parity
  - Zero data loss

- **Business KPIs:**
  - Zero downtime during migration
  - Successful client migration rate > 95%
  - Reduced maintenance costs by 40%

### Risk Mitigation

- Maintain parallel systems during transition
- Implement comprehensive monitoring
- Create rollback procedures
- Conduct thorough testing at each phase

---

## Next Steps

1. **Review and Validate:** Stakeholder review of generated artifacts
2. **Environment Setup:** Prepare development, staging, and production environments
3. **Team Training:** Onboard team on new technologies and patterns
4. **Pilot Implementation:** Begin with low-risk, high-value features
5. **Continuous Improvement:** Iterate based on metrics and feedback

---

*This report was generated by Legacy Resurrection Studio - Ultimate Edition, powered by Kiro AI.*
`;

  return report;
}
