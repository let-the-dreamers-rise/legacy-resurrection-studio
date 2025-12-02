import type { LegacyPattern, RiskLevel, RiskBand, TopFinding, PatternCategory } from './types';

// Aggressive scoring weights - security and architecture issues hit hard
const SEVERITY_WEIGHTS: Record<RiskLevel, number> = {
  critical: 35,
  high: 25,
  medium: 12,
  low: 5,
};

// Category multipliers - security and data issues are weighted heavier
const CATEGORY_MULTIPLIERS: Record<PatternCategory, number> = {
  security: 1.5,
  'data-access': 1.3,
  architecture: 1.2,
  'api-design': 1.1,
  performance: 1.0,
  maintainability: 0.9,
  modernization: 0.8,
  'ui-framework': 0.8,
};

export function calculateRiskScore(patterns: LegacyPattern[]): number {
  let totalPenalty = 0;

  patterns.forEach((pattern) => {
    const baseWeight = SEVERITY_WEIGHTS[pattern.severity];
    const categoryMultiplier = CATEGORY_MULTIPLIERS[pattern.category] || 1.0;
    
    // Apply multiplier and cap individual pattern impact
    const penalty = Math.min(baseWeight * categoryMultiplier, 40);
    totalPenalty += penalty;
  });

  // Start at 100 and subtract penalties, floor at 0
  const score = Math.max(0, Math.round(100 - totalPenalty));
  
  return score;
}

export function determineRiskBand(score: number): RiskBand {
  if (score >= 80) {
    return {
      level: 'low',
      range: '80-100',
      description: 'Low risk - codebase is relatively modern with minimal technical debt',
    };
  } else if (score >= 50) {
    return {
      level: 'medium',
      range: '50-79',
      description: 'Medium risk - significant modernization opportunities identified',
    };
  } else if (score >= 20) {
    return {
      level: 'high',
      range: '20-49',
      description: 'High risk - critical technical debt requiring immediate attention',
    };
  } else {
    return {
      level: 'critical',
      range: '0-19',
      description: 'Critical risk - severe technical debt threatening system stability and security',
    };
  }
}

export function identifyTopFindings(patterns: LegacyPattern[]): TopFinding[] {
  // Sort by severity and impact (occurrences)
  const sortedPatterns = [...patterns].sort((a, b) => {
    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
    if (severityDiff !== 0) return severityDiff;
    return b.occurrences - a.occurrences;
  });

  return sortedPatterns.slice(0, 3).map((pattern) => ({
    pattern: pattern.name,
    severity: pattern.severity,
    impact: generateImpactStatement(pattern),
  }));
}

function generateImpactStatement(pattern: LegacyPattern): string {
  const { severity, category, occurrences } = pattern;

  if (severity === 'critical') {
    if (category === 'security') {
      return `${occurrences} critical security vulnerabilities requiring immediate remediation`;
    }
    return `${occurrences} critical issues threatening system stability`;
  }

  if (severity === 'high') {
    if (category === 'architecture') {
      return `${occurrences} architectural issues impeding scalability and maintainability`;
    }
    if (category === 'api-design') {
      return `${occurrences} legacy API patterns blocking modern integration`;
    }
    return `${occurrences} high-priority issues requiring near-term attention`;
  }

  if (severity === 'medium') {
    return `${occurrences} modernization opportunities to improve code quality`;
  }

  return `${occurrences} minor improvements for long-term maintainability`;
}

export function generateRecommendations(patterns: LegacyPattern[], score: number): string[] {
  const recommendations: string[] = [];

  // Risk-based opening recommendation
  if (score < 20) {
    recommendations.push(
      '🚨 CRITICAL: Immediate executive attention required. This codebase poses significant business risk and requires emergency modernization planning.'
    );
  } else if (score < 50) {
    recommendations.push(
      '⚠️ HIGH PRIORITY: Schedule dedicated modernization sprint within next quarter. Technical debt is impeding velocity and increasing operational risk.'
    );
  } else if (score < 80) {
    recommendations.push(
      '📋 PLANNED WORK: Incorporate modernization tasks into regular sprint planning. Address high-priority items first.'
    );
  } else {
    recommendations.push(
      '✅ GOOD STANDING: Codebase is relatively healthy. Focus on incremental improvements and preventing regression.'
    );
  }

  // Security-specific recommendations
  const securityPatterns = patterns.filter((p) => p.category === 'security');
  if (securityPatterns.length > 0) {
    const criticalSecurity = securityPatterns.filter((p) => p.severity === 'critical');
    if (criticalSecurity.length > 0) {
      recommendations.push(
        `🔒 SECURITY ALERT: ${criticalSecurity.length} critical security vulnerabilities detected. Engage security team for immediate assessment and remediation plan.`
      );
    } else {
      recommendations.push(
        `🔒 Security: ${securityPatterns.length} security-related patterns identified. Schedule security review and implement fixes in priority order.`
      );
    }
  }

  // Architecture recommendations
  const architecturePatterns = patterns.filter((p) => p.category === 'architecture');
  if (architecturePatterns.length > 0) {
    const godClasses = patterns.filter((p) => p.id.includes('god-class') || p.id.includes('god-function'));
    if (godClasses.length > 0) {
      recommendations.push(
        `🏗️ Architecture: ${godClasses.length} god classes/functions detected. Apply SOLID principles and extract responsibilities into focused modules.`
      );
    } else {
      recommendations.push(
        `🏗️ Architecture: ${architecturePatterns.length} architectural improvements identified. Consider refactoring to improve modularity and testability.`
      );
    }
  }

  // Chamber-specific routing recommendations
  const soapPatterns = patterns.filter((p) => p.suggestedTarget === 'api-necromancer');
  if (soapPatterns.length > 0) {
    recommendations.push(
      `⚡ API Modernization: ${soapPatterns[0].occurrences} SOAP/legacy API patterns detected. Use API Necromancer to generate REST endpoints with OpenAPI 3.0 specifications.`
    );
  }

  const uiPatterns = patterns.filter((p) => p.suggestedTarget === 'ghost-ui');
  if (uiPatterns.length > 0) {
    const totalOccurrences = uiPatterns.reduce((sum, p) => sum + p.occurrences, 0);
    recommendations.push(
      `👻 UI Modernization: ${totalOccurrences} legacy UI patterns detected. Use Ghost UI Converter to transform Bootstrap/jQuery into React + Tailwind components.`
    );
  }

  // Data access recommendations
  const dataPatterns = patterns.filter((p) => p.category === 'data-access');
  if (dataPatterns.length > 0) {
    recommendations.push(
      `💾 Data Layer: ${dataPatterns.length} data access issues found. Implement ORM or query builder with parameterized queries to prevent SQL injection.`
    );
  }

  // Performance recommendations
  const perfPatterns = patterns.filter((p) => p.category === 'performance');
  if (perfPatterns.length > 0) {
    recommendations.push(
      `⚡ Performance: ${perfPatterns.length} performance anti-patterns detected. Profile application and address bottlenecks in high-traffic code paths.`
    );
  }

  // Modernization recommendations
  const modernizationPatterns = patterns.filter((p) => p.category === 'modernization');
  if (modernizationPatterns.length > 0 && score >= 50) {
    recommendations.push(
      `🔄 Modernization: ${modernizationPatterns.length} syntax/pattern updates available. Consider automated refactoring tools (ESLint --fix, Rector, etc.) for quick wins.`
    );
  }

  // Strategic guidance based on overall state
  if (patterns.length > 20) {
    recommendations.push(
      `📊 Strategy: High pattern count (${patterns.length}) suggests systematic issues. Recommend strangler fig approach: build new alongside old, migrate incrementally, deprecate legacy.`
    );
  }

  // If nothing found (rare with aggressive detection)
  if (recommendations.length === 1 && score >= 80) {
    recommendations.push(
      '🎯 Continuous Improvement: Maintain code quality through regular reviews, automated testing, and staying current with framework updates.'
    );
  }

  return recommendations;
}

export function generateMigrationPhases(patterns: LegacyPattern[], score: number): Array<{
  phase: number;
  name: string;
  duration: string;
  activities: string[];
  deliverables: string[];
}> {
  const hasCritical = patterns.some((p) => p.severity === 'critical');
  const hasSecurity = patterns.some((p) => p.category === 'security');
  const hasArchitecture = patterns.some((p) => p.category === 'architecture');
  const hasAPI = patterns.some((p) => p.suggestedTarget === 'api-necromancer');
  const hasUI = patterns.some((p) => p.suggestedTarget === 'ghost-ui');

  const phases = [];

  // Phase 1: Stabilization (always needed if score < 80)
  if (score < 80) {
    phases.push({
      phase: 1,
      name: 'Stabilization & Risk Mitigation',
      duration: hasCritical ? '2-3 weeks' : '1-2 weeks',
      activities: [
        hasSecurity ? 'Address critical security vulnerabilities immediately' : 'Establish baseline metrics and monitoring',
        'Implement comprehensive test coverage for critical paths',
        'Set up CI/CD pipeline with automated quality gates',
        'Document current architecture and dependencies',
      ],
      deliverables: [
        'Security vulnerabilities remediated',
        'Test coverage report (target: 60%+ for critical paths)',
        'Architecture documentation',
        'Monitoring dashboard with key metrics',
      ],
    });
  }

  // Phase 2: API Modernization (if SOAP detected)
  if (hasAPI) {
    phases.push({
      phase: phases.length + 1,
      name: 'API Modernization (Strangler Fig)',
      duration: '4-6 weeks',
      activities: [
        'Generate REST API specifications using API Necromancer',
        'Implement REST façade alongside existing SOAP services',
        'Deploy with feature flags for gradual rollout',
        'Migrate internal consumers to REST endpoints',
      ],
      deliverables: [
        'OpenAPI 3.0 specification',
        'REST API implementation with 100% feature parity',
        'API documentation and client SDKs',
        'Migration guide for external consumers',
      ],
    });
  }

  // Phase 3: UI Modernization (if jQuery/Bootstrap detected)
  if (hasUI) {
    phases.push({
      phase: phases.length + 1,
      name: 'UI Modernization',
      duration: '6-8 weeks',
      activities: [
        'Convert legacy UI components using Ghost UI Converter',
        'Implement React component library with Tailwind CSS',
        'Establish design system and accessibility standards',
        'Migrate pages incrementally with A/B testing',
      ],
      deliverables: [
        'React component library',
        'Tailwind CSS design system',
        'WCAG 2.1 AA compliance certification',
        'Performance improvement metrics (target: 40% faster load times)',
      ],
    });
  }

  // Phase 4: Architecture Refactoring (if architectural issues)
  if (hasArchitecture) {
    phases.push({
      phase: phases.length + 1,
      name: 'Architecture Refactoring',
      duration: '8-12 weeks',
      activities: [
        'Decompose god classes into focused modules',
        'Extract business logic from presentation layer',
        'Implement dependency injection and SOLID principles',
        'Establish clear layering (presentation, business, data)',
      ],
      deliverables: [
        'Refactored codebase with improved modularity',
        'Dependency injection container configuration',
        'Updated architecture diagrams',
        'Reduced cyclomatic complexity (target: <10 per function)',
      ],
    });
  }

  // Phase 5: Hardening & Observability (always last)
  phases.push({
    phase: phases.length + 1,
    name: 'Hardening & Observability',
    duration: '2-4 weeks',
    activities: [
      'Implement comprehensive logging and distributed tracing',
      'Set up alerting for critical business metrics',
      'Conduct load testing and performance optimization',
      'Establish runbooks and incident response procedures',
    ],
    deliverables: [
      'Observability stack (logs, metrics, traces)',
      'SLO/SLA definitions and monitoring',
      'Load test results and capacity planning',
      'Production readiness checklist completed',
    ],
  });

  return phases;
}
