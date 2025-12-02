import type { JQueryPattern, ComponentStructure } from './types';

export const JQUERY_PATTERNS: JQueryPattern[] = [
  // AJAX patterns
  {
    pattern: /\$\.ajax\(/g,
    type: 'ajax',
    modernEquivalent: 'fetch API or axios',
    complexity: 'moderate'
  },
  {
    pattern: /\$\.get\(/g,
    type: 'ajax',
    modernEquivalent: 'fetch(url)',
    complexity: 'simple'
  },
  {
    pattern: /\$\.post\(/g,
    type: 'ajax',
    modernEquivalent: 'fetch(url, { method: "POST" })',
    complexity: 'simple'
  },
  
  // DOM manipulation
  {
    pattern: /\$\([^)]+\)\.html\(/g,
    type: 'dom-manipulation',
    modernEquivalent: 'React state + JSX',
    complexity: 'moderate'
  },
  {
    pattern: /\$\([^)]+\)\.append\(/g,
    type: 'dom-manipulation',
    modernEquivalent: 'Array.map() in JSX',
    complexity: 'moderate'
  },
  {
    pattern: /\$\([^)]+\)\.val\(/g,
    type: 'dom-manipulation',
    modernEquivalent: 'Controlled components with useState',
    complexity: 'simple'
  },
  {
    pattern: /\$\([^)]+\)\.text\(/g,
    type: 'dom-manipulation',
    modernEquivalent: 'React state + JSX',
    complexity: 'simple'
  },
  {
    pattern: /\$\([^)]+\)\.show\(/g,
    type: 'dom-manipulation',
    modernEquivalent: 'Conditional rendering',
    complexity: 'simple'
  },
  {
    pattern: /\$\([^)]+\)\.hide\(/g,
    type: 'dom-manipulation',
    modernEquivalent: 'Conditional rendering',
    complexity: 'simple'
  },
  {
    pattern: /\$\([^)]+\)\.addClass\(/g,
    type: 'dom-manipulation',
    modernEquivalent: 'className with state',
    complexity: 'simple'
  },
  {
    pattern: /\$\([^)]+\)\.removeClass\(/g,
    type: 'dom-manipulation',
    modernEquivalent: 'className with state',
    complexity: 'simple'
  },
  
  // Event handlers
  {
    pattern: /\$\([^)]+\)\.click\(/g,
    type: 'event-handler',
    modernEquivalent: 'onClick prop',
    complexity: 'simple'
  },
  {
    pattern: /\$\([^)]+\)\.submit\(/g,
    type: 'event-handler',
    modernEquivalent: 'onSubmit prop',
    complexity: 'simple'
  },
  {
    pattern: /\$\([^)]+\)\.change\(/g,
    type: 'event-handler',
    modernEquivalent: 'onChange prop',
    complexity: 'simple'
  },
  {
    pattern: /\$\([^)]+\)\.on\(/g,
    type: 'event-handler',
    modernEquivalent: 'React event props',
    complexity: 'moderate'
  },
  
  // Animations
  {
    pattern: /\$\([^)]+\)\.fadeIn\(/g,
    type: 'animation',
    modernEquivalent: 'CSS transitions or Framer Motion',
    complexity: 'moderate'
  },
  {
    pattern: /\$\([^)]+\)\.fadeOut\(/g,
    type: 'animation',
    modernEquivalent: 'CSS transitions or Framer Motion',
    complexity: 'moderate'
  },
  {
    pattern: /\$\([^)]+\)\.slideDown\(/g,
    type: 'animation',
    modernEquivalent: 'CSS transitions or Framer Motion',
    complexity: 'moderate'
  },
  {
    pattern: /\$\([^)]+\)\.slideUp\(/g,
    type: 'animation',
    modernEquivalent: 'CSS transitions or Framer Motion',
    complexity: 'moderate'
  },
  
  // Selectors
  {
    pattern: /\$\(document\)\.ready\(/g,
    type: 'selector',
    modernEquivalent: 'useEffect(() => {}, [])',
    complexity: 'simple'
  }
];

export function extractJQueryPatterns(html: string): Array<{ pattern: JQueryPattern; count: number }> {
  const found: Array<{ pattern: JQueryPattern; count: number }> = [];
  
  for (const pattern of JQUERY_PATTERNS) {
    const matches = html.match(pattern.pattern);
    if (matches && matches.length > 0) {
      found.push({
        pattern,
        count: matches.length
      });
    }
  }
  
  return found;
}

export function analyzeComponentStructure(html: string): ComponentStructure {
  const hasState = 
    /var\s+\w+\s*=/.test(html) ||
    /\$\([^)]+\)\.val\(/.test(html) ||
    /\$\([^)]+\)\.text\(/.test(html);
  
  const hasEffects = 
    /\$\(document\)\.ready/.test(html) ||
    /\$\.ajax/.test(html) ||
    /\$\.get/.test(html) ||
    /\$\.post/.test(html);
  
  const hasApiCalls = 
    /\$\.ajax/.test(html) ||
    /\$\.get/.test(html) ||
    /\$\.post/.test(html);
  
  const hasFormHandling = 
    /<form/.test(html) ||
    /\$\([^)]+\)\.submit/.test(html);
  
  const hasRouting = 
    /window\.location/.test(html) ||
    /href=/.test(html);
  
  // Calculate complexity
  let complexityScore = 0;
  if (hasState) complexityScore += 1;
  if (hasEffects) complexityScore += 1;
  if (hasApiCalls) complexityScore += 2;
  if (hasFormHandling) complexityScore += 1;
  
  const ajaxCount = (html.match(/\$\.ajax/g) || []).length;
  if (ajaxCount > 3) complexityScore += 2;
  
  const complexity: ComponentStructure['complexity'] = 
    complexityScore <= 2 ? 'simple' :
    complexityScore <= 5 ? 'moderate' : 'complex';
  
  return {
    hasState,
    hasEffects,
    hasApiCalls,
    hasFormHandling,
    hasRouting,
    complexity
  };
}

export function detectSecurityIssues(html: string): Array<{ severity: string; issue: string; location: string }> {
  const issues: Array<{ severity: string; issue: string; location: string }> = [];
  
  // Hardcoded credentials
  if (/authToken\s*=\s*['"][^'"]+['"]/.test(html)) {
    issues.push({
      severity: 'critical',
      issue: 'Hardcoded authentication token',
      location: 'JavaScript code'
    });
  }
  
  // Inline event handlers (XSS risk)
  if (/onclick=|onsubmit=|onerror=/.test(html)) {
    issues.push({
      severity: 'medium',
      issue: 'Inline event handlers (potential XSS)',
      location: 'HTML attributes'
    });
  }
  
  // Direct innerHTML usage
  if (/\.html\(/.test(html)) {
    issues.push({
      severity: 'medium',
      issue: 'Direct HTML injection via .html()',
      location: 'jQuery code'
    });
  }
  
  // Global variables
  const globalVars = html.match(/var\s+(\w+)\s*=/g);
  if (globalVars && globalVars.length > 2) {
    issues.push({
      severity: 'low',
      issue: `${globalVars.length} global variables detected`,
      location: 'JavaScript code'
    });
  }
  
  // Unvalidated user input
  if (/\.val\(\)/.test(html) && !/\.trim\(\)/.test(html)) {
    issues.push({
      severity: 'medium',
      issue: 'Unvalidated form input',
      location: 'Form handling code'
    });
  }
  
  return issues;
}

export function generateMigrationComplexity(structure: ComponentStructure, jqueryPatterns: Array<{ pattern: JQueryPattern; count: number }>): {
  score: number;
  level: 'low' | 'medium' | 'high';
  factors: string[];
} {
  let score = 0;
  const factors: string[] = [];
  
  // Base complexity
  if (structure.complexity === 'simple') score += 1;
  else if (structure.complexity === 'moderate') score += 3;
  else score += 5;
  
  // jQuery pattern complexity
  const complexPatterns = jqueryPatterns.filter(p => p.pattern.complexity === 'complex');
  const moderatePatterns = jqueryPatterns.filter(p => p.pattern.complexity === 'moderate');
  
  score += complexPatterns.length * 2;
  score += moderatePatterns.length;
  
  if (complexPatterns.length > 0) {
    factors.push(`${complexPatterns.length} complex jQuery patterns`);
  }
  
  // API calls
  if (structure.hasApiCalls) {
    const ajaxPatterns = jqueryPatterns.filter(p => p.pattern.type === 'ajax');
    const totalAjax = ajaxPatterns.reduce((sum, p) => sum + p.count, 0);
    
    if (totalAjax > 5) {
      score += 3;
      factors.push(`${totalAjax} AJAX calls (callback hell risk)`);
    } else if (totalAjax > 0) {
      score += 1;
      factors.push(`${totalAjax} AJAX calls`);
    }
  }
  
  // DOM manipulation
  const domPatterns = jqueryPatterns.filter(p => p.pattern.type === 'dom-manipulation');
  const totalDom = domPatterns.reduce((sum, p) => sum + p.count, 0);
  if (totalDom > 10) {
    score += 2;
    factors.push(`Heavy DOM manipulation (${totalDom} operations)`);
  }
  
  // Determine level
  const level: 'low' | 'medium' | 'high' = 
    score <= 3 ? 'low' :
    score <= 7 ? 'medium' : 'high';
  
  return { score, level, factors };
}
