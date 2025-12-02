import type { ConversionOptions, ConversionResult, SecurityIssue, ModernizationPlan, CrossChamberSuggestion } from './types';
import { generateReactComponent } from './component-generator';
import { extractJQueryPatterns, analyzeComponentStructure, detectSecurityIssues, generateMigrationComplexity } from './jquery-analyzer';

export * from './types';
export * from './jquery-analyzer';

export async function convertLegacyUI(
  htmlContent: string,
  options: Partial<ConversionOptions> = {}
): Promise<ConversionResult> {
  const fullOptions: ConversionOptions = {
    componentStyle: options.componentStyle ?? 'functional',
    stateManagement: options.stateManagement ?? 'useState',
    typescript: options.typescript ?? true,
    preserveIds: options.preserveIds ?? false,
    targetFramework: options.targetFramework ?? 'react',
    styling: options.styling ?? 'tailwind',
  };

  const warnings: string[] = [];
  const migrationNotes: string[] = [];
  const securityIssues: SecurityIssue[] = [];
  const crossChamberSuggestions: CrossChamberSuggestion[] = [];

  // Analyze jQuery patterns and structure
  const jqueryPatterns = extractJQueryPatterns(htmlContent);
  const structure = analyzeComponentStructure(htmlContent);
  const complexity = generateMigrationComplexity(structure, jqueryPatterns);

  // Detect security issues
  const detectedIssues = detectSecurityIssues(htmlContent);
  detectedIssues.forEach(issue => {
    securityIssues.push({
      severity: issue.severity as SecurityIssue['severity'],
      issue: issue.issue,
      location: issue.location,
      recommendation: getSecurityRecommendation(issue.issue)
    });
  });

  // Generate component
  const componentName = extractComponentName(htmlContent) || 'ConvertedComponent';
  const component = generateReactComponent(htmlContent, componentName, fullOptions);

  // Generate migration notes based on jQuery patterns
  jqueryPatterns.forEach(({ pattern, count }) => {
    migrationNotes.push(
      `${count}x ${pattern.type}: ${pattern.modernEquivalent} (${pattern.complexity} complexity)`
    );
  });

  // Specific warnings
  if (htmlContent.includes('$.ajax') || htmlContent.includes('$.get') || htmlContent.includes('$.post')) {
    warnings.push('AJAX callback hell detected - refactor to async/await with proper error handling');
  }

  if (htmlContent.includes('.hide()') || htmlContent.includes('.show()')) {
    warnings.push('jQuery show/hide - use conditional rendering: {isVisible && <Component />}');
  }

  if (htmlContent.includes('.val()')) {
    warnings.push('jQuery .val() - convert to controlled components with value={state} onChange={setState}');
  }

  if (htmlContent.includes('onclick=') || htmlContent.includes('onsubmit=')) {
    warnings.push('Inline event handlers - security risk and not React-compatible');
  }

  if (htmlContent.includes('var ') && !htmlContent.includes('let ') && !htmlContent.includes('const ')) {
    warnings.push('ES5 var declarations - upgrade to const/let for better scoping');
  }

  // Cross-chamber suggestions
  if (htmlContent.includes('api.') || htmlContent.includes('/api/')) {
    crossChamberSuggestions.push({
      chamber: 'api-necromancer',
      reason: 'Backend API endpoints detected in AJAX calls',
      benefit: 'Generate OpenAPI specs and modern REST endpoints for these legacy API calls'
    });
  }

  if (htmlContent.includes('function ') && htmlContent.match(/function\s+\w+/g)?.length! > 5) {
    crossChamberSuggestions.push({
      chamber: 'reanimator',
      reason: 'Complex JavaScript logic with multiple functions',
      benefit: 'Analyze backend patterns and suggest modern architecture improvements'
    });
  }

  // Generate modernization plan
  const modernizationPlan = generateModernizationPlan(structure, complexity, jqueryPatterns);

  return {
    components: [component],
    migrationNotes,
    warnings,
    securityIssues,
    modernizationPlan,
    crossChamberSuggestions: crossChamberSuggestions.length > 0 ? crossChamberSuggestions : undefined,
  };
}

function extractComponentName(html: string): string | null {
  // Try to extract from title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) {
    return titleMatch[1]
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
  
  // Try to extract from h1
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (h1Match) {
    return h1Match[1]
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
  
  return null;
}

function getSecurityRecommendation(issue: string): string {
  if (issue.includes('token')) {
    return 'Use environment variables and secure token storage (e.g., httpOnly cookies, secure session management)';
  }
  if (issue.includes('XSS')) {
    return 'Use React event handlers (onClick, onSubmit) instead of inline handlers';
  }
  if (issue.includes('HTML injection')) {
    return 'Use React JSX and state management instead of .html() - React escapes content by default';
  }
  if (issue.includes('global variables')) {
    return 'Encapsulate in React component state or use Context API for shared state';
  }
  if (issue.includes('input')) {
    return 'Add input validation using libraries like Zod or Yup, sanitize before processing';
  }
  return 'Follow React security best practices';
}

function generateModernizationPlan(
  structure: any,
  complexity: { level: string; factors: string[] },
  jqueryPatterns: Array<{ pattern: any; count: number }>
): ModernizationPlan {
  const phases: ModernizationPlan['phases'] = [];
  
  // Phase 1: Foundation
  phases.push({
    phase: 1,
    name: 'Component Structure & Styling',
    duration: complexity.level === 'low' ? '1-2 days' : complexity.level === 'medium' ? '3-5 days' : '1-2 weeks',
    objectives: [
      'Convert HTML structure to JSX',
      'Replace Bootstrap classes with Tailwind CSS',
      'Set up component file structure',
      'Replace glyphicons with Lucide React icons'
    ],
    deliverables: [
      'Functional React component with proper JSX',
      'Tailwind-styled UI matching original design',
      'Component props interface defined',
      'Basic component rendering verified'
    ],
    risks: [
      'Complex nested Bootstrap grid may need manual adjustment',
      'Custom CSS styles need migration strategy'
    ]
  });
  
  // Phase 2: State Management
  if (structure.hasState) {
    phases.push({
      phase: 2,
      name: 'State Management Migration',
      duration: complexity.level === 'low' ? '1-2 days' : complexity.level === 'medium' ? '3-4 days' : '1 week',
      objectives: [
        'Convert jQuery variables to React useState',
        'Implement controlled form components',
        'Replace DOM manipulation with state updates',
        'Add proper TypeScript types for state'
      ],
      deliverables: [
        'All state managed via React hooks',
        'Controlled form inputs with validation',
        'No direct DOM manipulation',
        'Type-safe state management'
      ],
      risks: [
        'Complex state interdependencies may require useReducer',
        'Form validation logic needs careful migration'
      ]
    });
  }
  
  // Phase 3: API Integration
  if (structure.hasApiCalls) {
    const ajaxCount = jqueryPatterns.filter(p => p.pattern.type === 'ajax').reduce((sum, p) => sum + p.count, 0);
    
    phases.push({
      phase: phases.length + 1,
      name: 'API Modernization',
      duration: ajaxCount > 5 ? '1-2 weeks' : '3-5 days',
      objectives: [
        'Replace jQuery AJAX with fetch API',
        'Implement proper async/await patterns',
        'Add loading and error states',
        'Create reusable API service layer',
        'Add request/response TypeScript types'
      ],
      deliverables: [
        `${ajaxCount} API calls converted to modern fetch`,
        'Centralized API service module',
        'Loading spinners and error handling',
        'Proper error boundaries',
        'API response type definitions'
      ],
      risks: [
        'Callback hell requires careful refactoring',
        'Error handling may be incomplete in original code',
        'Authentication token management needs secure implementation'
      ]
    });
  }
  
  // Phase 4: Testing & Polish
  phases.push({
    phase: phases.length + 1,
    name: 'Testing & Optimization',
    duration: complexity.level === 'low' ? '1-2 days' : complexity.level === 'medium' ? '3-4 days' : '1 week',
    objectives: [
      'Add component unit tests',
      'Test all user interactions',
      'Verify API integration',
      'Performance optimization',
      'Accessibility audit (WCAG AA)'
    ],
    deliverables: [
      'Component test suite with >80% coverage',
      'All features verified working',
      'Performance benchmarks met',
      'Accessibility compliance verified',
      'Documentation updated'
    ],
    risks: [
      'Edge cases may not be covered in original code',
      'Performance issues with large data sets'
    ]
  });
  
  // Calculate total effort
  const totalWeeks = phases.reduce((sum, phase) => {
    const duration = phase.duration;
    if (duration.includes('week')) {
      const weeks = parseInt(duration.match(/\d+/)?.[0] || '1');
      return sum + weeks;
    }
    return sum + 0.5; // days count as half week
  }, 0);
  
  const estimatedEffort = totalWeeks < 1 ? '1-2 weeks' : 
                         totalWeeks < 3 ? '2-4 weeks' :
                         totalWeeks < 6 ? '1-2 months' : '2-3 months';
  
  const recommendations: string[] = [
    'Start with Phase 1 to establish foundation before tackling complex logic',
    'Use TypeScript for better type safety and developer experience',
    'Implement proper error boundaries to catch runtime errors',
    'Add loading states for all async operations',
    'Use React DevTools to debug component state and props'
  ];
  
  if (complexity.level === 'high') {
    recommendations.push('Consider breaking into smaller sub-components for maintainability');
    recommendations.push('Implement comprehensive testing before deploying to production');
  }
  
  if (structure.hasApiCalls) {
    recommendations.push('Create a centralized API service layer for reusability');
    recommendations.push('Implement request caching to reduce API calls');
  }
  
  return {
    phases,
    estimatedEffort,
    riskLevel: complexity.level as ModernizationPlan['riskLevel'],
    recommendations
  };
}
