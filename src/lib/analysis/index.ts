import type { RiskReport, AnalysisOptions, CodeFile } from './types';
import { detectPatterns, analyzeComplexity } from './detector';
import { 
  calculateRiskScore, 
  determineRiskBand, 
  identifyTopFindings,
  generateRecommendations,
  generateMigrationPhases 
} from './scorer';
import { determineResurrectionRoutes } from './router';

export * from './types';

export async function analyzeLegacyCode(
  files: CodeFile[],
  _options: AnalysisOptions = { depth: 'standard', aggressiveScoring: true }
): Promise<RiskReport> {
  // Detect all patterns with enterprise-grade rules
  const patterns = detectPatterns(files);
  
  // Calculate aggressive risk score
  const overallScore = calculateRiskScore(patterns);
  
  // Determine risk band
  const riskBand = determineRiskBand(overallScore);
  
  // Identify top 3 most impactful findings
  const topFindings = identifyTopFindings(patterns);
  
  // Generate intelligent recommendations
  const recommendations = generateRecommendations(patterns, overallScore);
  
  // Determine which chambers to use
  const resurrectionRoutes = determineResurrectionRoutes(patterns);
  
  // Generate phased migration plan
  const migrationPhases = generateMigrationPhases(patterns, overallScore);
  
  // Analyze code complexity
  const complexityMetrics = analyzeComplexity(files);

  const totalLines = files.reduce((sum, file) => {
    return sum + file.content.split('\n').length;
  }, 0);

  return {
    overallScore,
    riskBand,
    topFindings,
    patternsDetected: patterns,
    recommendations,
    resurrectionRoutes,
    migrationPhases,
    analyzedFiles: files.length,
    totalLines,
    complexityMetrics,
  };
}
