export interface ConversionOptions {
  componentStyle: 'functional' | 'class';
  stateManagement: 'useState' | 'useReducer' | 'zustand';
  typescript: boolean;
  preserveIds: boolean;
  targetFramework?: 'react' | 'next' | 'remix';
  styling?: 'tailwind' | 'css-modules' | 'styled-components';
}

export interface ReactComponent {
  name: string;
  filePath: string;
  code: string;
  dependencies: string[];
  propsInterface?: string;
  stateVariables?: StateVariable[];
  apiCalls?: ApiCall[];
  eventHandlers?: EventHandler[];
}

export interface StateVariable {
  name: string;
  type: string;
  initialValue: string;
  usage: string[];
}

export interface ApiCall {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  purpose: string;
  modernImplementation: string;
}

export interface EventHandler {
  name: string;
  trigger: string;
  originalCode: string;
  modernImplementation: string;
}

export interface ConversionResult {
  components: ReactComponent[];
  migrationNotes: string[];
  warnings: string[];
  securityIssues: SecurityIssue[];
  modernizationPlan: ModernizationPlan;
  crossChamberSuggestions?: CrossChamberSuggestion[];
}

export interface SecurityIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  issue: string;
  location: string;
  recommendation: string;
}

export interface ModernizationPlan {
  phases: ModernizationPhase[];
  estimatedEffort: string;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export interface ModernizationPhase {
  phase: number;
  name: string;
  duration: string;
  objectives: string[];
  deliverables: string[];
  risks: string[];
}

export interface CrossChamberSuggestion {
  chamber: 'reanimator' | 'api-necromancer';
  reason: string;
  benefit: string;
}

export interface HtmlElement {
  tag: string;
  attributes: Record<string, string>;
  children: (HtmlElement | string)[];
  text?: string;
}

export interface JQueryPattern {
  pattern: RegExp;
  type: 'ajax' | 'dom-manipulation' | 'event-handler' | 'animation' | 'selector';
  modernEquivalent: string;
  complexity: 'simple' | 'moderate' | 'complex';
}

export interface ComponentStructure {
  hasState: boolean;
  hasEffects: boolean;
  hasApiCalls: boolean;
  hasFormHandling: boolean;
  hasRouting: boolean;
  complexity: 'simple' | 'moderate' | 'complex';
}
