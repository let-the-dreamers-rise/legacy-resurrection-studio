export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type PatternCategory = 
  | 'security' 
  | 'performance' 
  | 'maintainability' 
  | 'modernization' 
  | 'architecture'
  | 'data-access'
  | 'ui-framework'
  | 'api-design';

export interface PatternLocation {
  file: string;
  line: number;
  column?: number;
  snippet?: string;
}

export interface LegacyPattern {
  id: string;
  name: string;
  severity: RiskLevel;
  category: PatternCategory;
  occurrences: number;
  locations: PatternLocation[];
  modernizationPath: string;
  description: string;
  rationale: string;
  recommendation: string;
  suggestedTarget?: 'api-necromancer' | 'ghost-ui' | 'platform-refactor';
}

export interface ResurrectionRoute {
  chamber: 'reanimator' | 'api-necromancer' | 'ghost-ui';
  reason: string;
  priority: number;
  confidence: 'high' | 'medium' | 'low';
}

export interface RiskBand {
  level: 'low' | 'medium' | 'high' | 'critical';
  range: string;
  description: string;
}

export interface TopFinding {
  pattern: string;
  severity: RiskLevel;
  impact: string;
}

export interface MigrationPhase {
  phase: number;
  name: string;
  duration: string;
  activities: string[];
  deliverables: string[];
}

export interface RiskReport {
  overallScore: number;
  riskBand: RiskBand;
  topFindings: TopFinding[];
  patternsDetected: LegacyPattern[];
  recommendations: string[];
  resurrectionRoutes: ResurrectionRoute[];
  migrationPhases: MigrationPhase[];
  analyzedFiles: number;
  totalLines: number;
  complexityMetrics: {
    avgFunctionLength: number;
    maxFunctionLength: number;
    godFunctions: number;
  };
}

export interface AnalysisOptions {
  depth: 'quick' | 'standard' | 'deep';
  fileTypes?: string[];
  aggressiveScoring?: boolean;
}

export interface CodeFile {
  path: string;
  content: string;
  type: string;
}
