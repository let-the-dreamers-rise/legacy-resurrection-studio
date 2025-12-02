import type { LegacyPattern, PatternLocation, RiskLevel, CodeFile, PatternCategory } from './types';

interface DetectionRule {
  pattern: RegExp;
  severity: RiskLevel;
  category: PatternCategory;
  name: string;
  description: string;
  rationale: string;
  recommendation: string;
  modernizationPath: string;
  suggestedTarget?: 'api-necromancer' | 'ghost-ui' | 'platform-refactor';
}

// Enterprise-grade detection rules covering multiple ecosystems
const DETECTION_RULES: DetectionRule[] = [
  // ===== SECURITY CRITICAL =====
  {
    pattern: /mysql_query|mysql_connect|mysql_real_escape_string/gi,
    severity: 'critical',
    category: 'security',
    name: 'Deprecated MySQL Functions (PHP)',
    description: 'Legacy mysql_* functions detected - removed in PHP 7.0',
    rationale: 'These functions are vulnerable to SQL injection and have been deprecated since PHP 5.5',
    recommendation: 'Migrate to PDO or MySQLi with prepared statements immediately',
    modernizationPath: 'Use PDO with parameter binding',
    suggestedTarget: 'platform-refactor',
  },
  {
    pattern: /eval\s*\(|new Function\s*\(/g,
    severity: 'critical',
    category: 'security',
    name: 'Dynamic Code Execution',
    description: 'eval() or Function constructor detected',
    rationale: 'Allows arbitrary code execution and is a major security vulnerability',
    recommendation: 'Refactor to use safe alternatives like JSON.parse or explicit function calls',
    modernizationPath: 'Remove eval() and use structured data parsing',
  },
  {
    pattern: /(password|api[_-]?key|secret|token)\s*=\s*["'][^"']{8,}["']/gi,
    severity: 'critical',
    category: 'security',
    name: 'Hardcoded Secrets',
    description: 'Potential hardcoded credentials or API keys detected',
    rationale: 'Hardcoded secrets in source code are a critical security vulnerability',
    recommendation: 'Move all secrets to environment variables or secure vaults (AWS Secrets Manager, HashiCorp Vault)',
    modernizationPath: 'Use environment variables and secret management',
  },
  {
    pattern: /SELECT\s+\*\s+FROM\s+\w+\s+WHERE\s+.*\+|"SELECT.*"\s*\+\s*\w+/gi,
    severity: 'critical',
    category: 'security',
    name: 'SQL String Concatenation',
    description: 'SQL queries built with string concatenation',
    rationale: 'Highly vulnerable to SQL injection attacks',
    recommendation: 'Use parameterized queries or ORM with parameter binding',
    modernizationPath: 'Implement prepared statements or ORM',
  },

  // ===== API & SERVICE PATTERNS =====
  {
    pattern: /xmlns:soap|<soap:|<wsdl:|<definitions.*wsdl/gi,
    severity: 'high',
    category: 'api-design',
    name: 'SOAP/WSDL Service',
    description: 'SOAP/WSDL service implementation detected',
    rationale: 'SOAP is verbose, complex, and difficult to maintain compared to modern REST APIs',
    recommendation: 'Convert to RESTful API with OpenAPI 3.0 specification',
    modernizationPath: 'Transform to REST using strangler fig pattern',
    suggestedTarget: 'api-necromancer',
  },
  {
    pattern: /<system\.serviceModel>|<basicHttpBinding>|<wsHttpBinding>/gi,
    severity: 'high',
    category: 'api-design',
    name: 'WCF Service (.NET)',
    description: 'Windows Communication Foundation service detected',
    rationale: 'WCF is legacy technology, not supported in .NET Core/5+',
    recommendation: 'Migrate to ASP.NET Core Web API or gRPC',
    modernizationPath: 'Convert to ASP.NET Core REST API',
  },
  {
    pattern: /javax\.ejb\.|@Stateless|@Stateful|@MessageDriven/g,
    severity: 'high',
    category: 'architecture',
    name: 'Enterprise JavaBeans (EJB)',
    description: 'EJB components detected',
    rationale: 'EJBs are heavyweight, complex, and largely replaced by Spring Framework',
    recommendation: 'Migrate to Spring Boot with dependency injection',
    modernizationPath: 'Refactor to Spring Boot microservices',
  },

  // ===== FRONTEND / UI PATTERNS =====
  {
    pattern: /\$\(document\)\.ready|\$\(|jQuery\(/g,
    severity: 'medium',
    category: 'ui-framework',
    name: 'jQuery DOM Manipulation',
    description: 'jQuery library usage detected',
    rationale: 'jQuery is outdated; modern frameworks provide better performance and maintainability',
    recommendation: 'Migrate to React with hooks for declarative UI',
    modernizationPath: 'Convert to React components with useState/useEffect',
    suggestedTarget: 'ghost-ui',
  },
  {
    pattern: /class="[^"]*\b(col-xs|col-sm|col-md|col-lg|panel|panel-|jumbotron|well)/g,
    severity: 'medium',
    category: 'ui-framework',
    name: 'Bootstrap 3.x Classes',
    description: 'Bootstrap 3 CSS framework detected',
    rationale: 'Bootstrap 3 is end-of-life (2019); lacks modern features and accessibility',
    recommendation: 'Migrate to Tailwind CSS for utility-first styling',
    modernizationPath: 'Convert to Tailwind CSS with modern responsive design',
    suggestedTarget: 'ghost-ui',
  },
  {
    pattern: /\.innerHTML\s*=|\.outerHTML\s*=/g,
    severity: 'high',
    category: 'security',
    name: 'Direct innerHTML Manipulation',
    description: 'Direct innerHTML assignment detected',
    rationale: 'XSS vulnerability if user input is involved; bypasses framework security',
    recommendation: 'Use React component rendering or sanitize with DOMPurify',
    modernizationPath: 'Refactor to React JSX or use safe DOM APIs',
  },
  {
    pattern: /document\.getElementById|document\.querySelector|document\.getElementsBy/g,
    severity: 'low',
    category: 'modernization',
    name: 'Direct DOM Manipulation',
    description: 'Direct DOM API usage detected',
    rationale: 'Imperative DOM manipulation is error-prone and hard to maintain',
    recommendation: 'Use React declarative rendering',
    modernizationPath: 'Convert to React component state',
  },

  // ===== BACKEND PATTERNS =====
  {
    pattern: /org\.apache\.struts|com\.opensymphony\.xwork2/g,
    severity: 'critical',
    category: 'architecture',
    name: 'Apache Struts Framework',
    description: 'Apache Struts framework detected',
    rationale: 'Struts has had multiple critical security vulnerabilities (CVE-2017-5638, etc.)',
    recommendation: 'Migrate to Spring Boot or modern Java framework immediately',
    modernizationPath: 'Refactor to Spring Boot with Spring MVC',
  },
  {
    pattern: /System\.Web\.UI\.Page|<%@\s*Page|<asp:|runat="server"/gi,
    severity: 'high',
    category: 'architecture',
    name: 'ASP.NET WebForms',
    description: 'ASP.NET WebForms detected',
    rationale: 'WebForms is legacy technology with poor testability and performance',
    recommendation: 'Migrate to ASP.NET Core MVC or Razor Pages',
    modernizationPath: 'Convert to ASP.NET Core with modern patterns',
  },
  {
    pattern: /new\s+SqlCommand\([^)]*\+|SqlCommand.*CommandText.*\+/g,
    severity: 'critical',
    category: 'security',
    name: 'ADO.NET String Concatenation',
    description: 'SQL commands built with string concatenation in .NET',
    rationale: 'SQL injection vulnerability in ADO.NET code',
    recommendation: 'Use parameterized SqlCommand with Parameters.AddWithValue',
    modernizationPath: 'Implement Entity Framework Core or Dapper with parameters',
  },

  // ===== JAVASCRIPT / NODE.JS PATTERNS =====
  {
    pattern: /\bvar\s+\w+\s*=/g,
    severity: 'low',
    category: 'modernization',
    name: 'var Declarations',
    description: 'Legacy var keyword detected',
    rationale: 'var has function scope and hoisting issues; const/let are block-scoped',
    recommendation: 'Replace with const (default) or let (when reassignment needed)',
    modernizationPath: 'Modernize to ES6+ const/let',
  },
  {
    pattern: /function\s*\([^)]*\)\s*\{[^}]*callback\s*\([^)]*\)\s*;[^}]*\}/g,
    severity: 'medium',
    category: 'modernization',
    name: 'Callback Hell Pattern',
    description: 'Nested callback pattern detected',
    rationale: 'Callback pyramids are hard to read, debug, and maintain',
    recommendation: 'Refactor to async/await or Promises',
    modernizationPath: 'Convert to async/await for better readability',
  },
  {
    pattern: /app\.get\(|app\.post\(|app\.put\(|app\.delete\(/g,
    severity: 'low',
    category: 'architecture',
    name: 'Express.js Monolithic Routes',
    description: 'Express.js route definitions detected',
    rationale: 'Monolithic Express apps can become unmaintainable at scale',
    recommendation: 'Consider microservices architecture or modular route organization',
    modernizationPath: 'Refactor to modular Express routers or NestJS',
  },

  // ===== PYTHON PATTERNS =====
  {
    pattern: /from\s+django\.conf\.urls\s+import\s+url|django\.contrib\.admin/g,
    severity: 'low',
    category: 'architecture',
    name: 'Django Monolithic App',
    description: 'Django framework detected',
    rationale: 'Large Django monoliths can benefit from service decomposition',
    recommendation: 'Consider breaking into smaller services or using Django REST framework',
    modernizationPath: 'Modularize with Django apps or microservices',
  },

  // ===== ARCHITECTURE SMELLS =====
  {
    pattern: /function\s+\w+\s*\([^)]{50,}\)|def\s+\w+\s*\([^)]{50,}\)/g,
    severity: 'medium',
    category: 'architecture',
    name: 'Long Parameter Lists',
    description: 'Functions with excessive parameters detected',
    rationale: 'Long parameter lists indicate poor abstraction and tight coupling',
    recommendation: 'Refactor to use parameter objects or dependency injection',
    modernizationPath: 'Introduce DTOs or configuration objects',
  },
  {
    pattern: /class\s+\w+\s*\{[\s\S]{2000,}\}/g,
    severity: 'high',
    category: 'architecture',
    name: 'God Class',
    description: 'Extremely large class detected (>2000 characters)',
    rationale: 'God classes violate single responsibility principle and are hard to maintain',
    recommendation: 'Decompose into smaller, focused classes',
    modernizationPath: 'Apply SOLID principles and extract responsibilities',
  },
  {
    pattern: /function\s+\w+\s*\([^)]*\)\s*\{[\s\S]{500,}\}/g,
    severity: 'medium',
    category: 'maintainability',
    name: 'God Function',
    description: 'Extremely long function detected (>500 characters)',
    rationale: 'Long functions are hard to test, understand, and maintain',
    recommendation: 'Extract smaller, single-purpose functions',
    modernizationPath: 'Refactor using Extract Method pattern',
  },

  // ===== PERFORMANCE PATTERNS =====
  {
    pattern: /SELECT\s+\*\s+FROM/gi,
    severity: 'low',
    category: 'performance',
    name: 'SELECT * Queries',
    description: 'SELECT * queries detected',
    rationale: 'Selecting all columns wastes bandwidth and memory',
    recommendation: 'Specify only needed columns explicitly',
    modernizationPath: 'Use explicit column lists in queries',
  },
  {
    pattern: /for\s*\([^)]*\)\s*\{[^}]*\bawait\b/g,
    severity: 'medium',
    category: 'performance',
    name: 'Await in Loop',
    description: 'await inside loop detected',
    rationale: 'Sequential awaits in loops cause poor performance',
    recommendation: 'Use Promise.all() for parallel execution',
    modernizationPath: 'Refactor to Promise.all() or Promise.allSettled()',
  },
];

export function detectPatterns(files: CodeFile[]): LegacyPattern[] {
  const patterns: Map<string, LegacyPattern> = new Map();

  files.forEach((file) => {
    const lines = file.content.split('\n');

    DETECTION_RULES.forEach((rule) => {
      const matches = file.content.match(rule.pattern);
      if (matches) {
        const patternId = rule.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const existing = patterns.get(patternId);

        const locations: PatternLocation[] = [];
        lines.forEach((line, index) => {
          if (rule.pattern.test(line)) {
            locations.push({
              file: file.path,
              line: index + 1,
              snippet: line.trim().substring(0, 100),
            });
          }
        });

        if (existing) {
          existing.occurrences += matches.length;
          existing.locations.push(...locations);
        } else {
          patterns.set(patternId, {
            id: patternId,
            name: rule.name,
            severity: rule.severity,
            category: rule.category,
            occurrences: matches.length,
            locations,
            modernizationPath: rule.modernizationPath,
            description: rule.description,
            rationale: rule.rationale,
            recommendation: rule.recommendation,
            suggestedTarget: rule.suggestedTarget,
          });
        }
      }
    });
  });

  return Array.from(patterns.values());
}

export function analyzeComplexity(files: CodeFile[]): {
  avgFunctionLength: number;
  maxFunctionLength: number;
  godFunctions: number;
} {
  let totalFunctions = 0;
  let totalLength = 0;
  let maxLength = 0;
  let godFunctions = 0;

  const functionPattern = /function\s+\w+\s*\([^)]*\)\s*\{[\s\S]*?\}|def\s+\w+\s*\([^)]*\):/g;

  files.forEach((file) => {
    const functions = file.content.match(functionPattern) || [];
    functions.forEach((func) => {
      totalFunctions++;
      const length = func.length;
      totalLength += length;
      maxLength = Math.max(maxLength, length);
      if (length > 500) {
        godFunctions++;
      }
    });
  });

  return {
    avgFunctionLength: totalFunctions > 0 ? Math.round(totalLength / totalFunctions) : 0,
    maxFunctionLength: maxLength,
    godFunctions,
  };
}
