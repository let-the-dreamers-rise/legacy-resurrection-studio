import type { LegacyPattern, ResurrectionRoute } from './types';

export function determineResurrectionRoutes(patterns: LegacyPattern[]): ResurrectionRoute[] {
  const routes: ResurrectionRoute[] = [];

  // SOAP/API Necromancer routing
  const soapPatterns = patterns.filter((p) => p.id === 'soap-service');
  if (soapPatterns.length > 0) {
    routes.push({
      chamber: 'api-necromancer',
      reason: `${soapPatterns[0].occurrences} SOAP/WSDL patterns detected - ready for REST conversion`,
      priority: 1,
      confidence: 'high',
    });
  }

  // Ghost UI routing
  const uiPatterns = patterns.filter(
    (p) => p.id === 'jquery-usage' || p.id === 'bootstrap-classes'
  );
  if (uiPatterns.length > 0) {
    const totalOccurrences = uiPatterns.reduce((sum, p) => sum + p.occurrences, 0);
    routes.push({
      chamber: 'ghost-ui',
      reason: `${totalOccurrences} legacy UI patterns detected - convert to React + Tailwind`,
      priority: 2,
      confidence: uiPatterns.length >= 3 ? 'high' : 'medium',
    });
  }

  // Reanimator routing
  const jsPatterns = patterns.filter(
    (p) => p.id === 'var-declarations' || p.id === 'innerhtml-usage' || p.id === 'document.write'
  );
  if (jsPatterns.length > 0) {
    const totalOccurrences = jsPatterns.reduce((sum, p) => sum + p.occurrences, 0);
    routes.push({
      chamber: 'reanimator',
      reason: `${totalOccurrences} legacy JavaScript patterns - modernize syntax and practices`,
      priority: 3,
      confidence: jsPatterns.length >= 5 ? 'high' : 'medium',
    });
  }

  return routes.sort((a, b) => a.priority - b.priority);
}
