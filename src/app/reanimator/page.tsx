'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Activity, ArrowLeft, Download } from 'lucide-react';
import type { RiskReport } from '@/lib/analysis';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { generateMigrationReport } from '@/lib/reports/migration-report';
import { downloadMarkdown } from '@/lib/utils/download';
import { SpookyBackground } from '@/components/spooky';

const SAMPLE_CODE = `<?php
// Legacy PHP Monolith - Multiple Critical Issues
$db = mysql_connect("localhost", "root", "password123");
mysql_select_db("ecommerce_db", $db);

// Hardcoded credentials
$api_key = "sk_live_abc123def456ghi789";

// SQL Injection vulnerability
$user_id = $_GET['id'];
$query = "SELECT * FROM users WHERE id = " . $user_id;
$result = mysql_query($query);

// XSS vulnerability
while ($row = mysql_fetch_array($result)) {
    echo "<h1>Welcome " . $row['username'] . "</h1>";
}

// God function - 500+ lines
function processOrder($order_data) {
    global $db, $api_key;
    
    $total = 0;
    foreach ($order_data['items'] as $item) {
        $total += $item['price'] * $item['quantity'];
    }
    
    // SQL injection again
    $sql = "INSERT INTO orders (user_id, total) VALUES (" . 
           $order_data['user_id'] . ", " . $total . ")";
    mysql_query($sql);
    
    return true;
}
?>
<html>
<head>
    <script src="https://code.jquery.com/jquery-1.8.3.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-primary">
                    <div class="panel-heading">Place Order</div>
                    <div class="panel-body">
                        <form id="orderForm">
                            <div class="form-group">
                                <select class="form-control" id="product">
                                    <option value="1">Widget</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        var apiKey = "<?php echo $api_key; ?>";
        
        $(document).ready(function() {
            $('#orderForm').submit(function(e) {
                e.preventDefault();
                $.ajax({
                    url: '/api/order.php',
                    method: 'POST',
                    data: { product_id: $('#product').val() },
                    success: function(response) {
                        $('#result').html(response);
                        $.ajax({
                            url: '/api/inventory.php',
                            success: function() {
                                console.log('Updated');
                            }
                        });
                    }
                });
            });
        });
    </script>
</body>
</html>`;

export default function ReanimatorPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<RiskReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setReport(data.report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = () => {
    setCode(SAMPLE_CODE);
  };

  const handleDownloadReport = () => {
    if (!report) return;
    const reportContent = generateMigrationReport({
      projectName: 'Legacy Codebase Analysis',
      analysisReport: report,
      timestamp: new Date(),
    });
    downloadMarkdown(reportContent, 'resurrection-report.md');
  };

  return (
    <div className="min-h-screen bg-void-black relative">
      <SpookyBackground />
      <header className="border-b border-fog-gray bg-shadow-gray/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-reanimator-cyan animate-float-rotate" />
              <div>
                <h1 className="text-2xl font-bold text-ghost-white glitch-hover spooky-text">Legacy Reanimator</h1>
                <p className="text-xs text-phantom-gray animate-flicker">Autopsy and triage for haunted codebases</p>
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 text-spirit-gray hover:text-ghost-white transition-colors focus:outline-none focus:ring-2 focus:ring-reanimator-cyan rounded px-3 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="p-6 animate-eerie-glow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-ghost-white glitch-hover">Code Input</h2>
                <Button
                  onClick={handleLoadSample}
                  variant="secondary"
                  size="sm"
                >
                  Load Sample
                </Button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 px-4 py-3 bg-void-black border border-fog-gray text-ghost-white rounded-lg focus:border-reanimator-cyan focus:ring-2 focus:ring-reanimator-cyan/20 focus:outline-none transition-all duration-300 placeholder:text-whisper-gray font-mono text-sm resize-none"
                placeholder="Paste your legacy code here..."
              />
              <Button
                onClick={handleAnalyze}
                isLoading={loading}
                className="w-full mt-4 bg-reanimator-cyan hover:bg-cyan-600 focus:ring-reanimator-cyan animate-heartbeat animate-eerie-glow"
              >
                {loading ? 'Analyzing...' : 'Analyze Code'}
              </Button>
            </Card>
          </div>

          <div className="space-y-6">
            {error && (
              <Alert variant="danger" title="Analysis Failed">
                {error}
              </Alert>
            )}

            {loading && (
              <Card className="p-16">
                <LoadingSpinner size="lg" message="Channeling spectral compilers..." />
              </Card>
            )}

            {report && !loading && (
              <div className="space-y-6 animate-fade-in">
                <Alert variant="success" title="Resurrection Complete">
                  Your code has been successfully analyzed
                </Alert>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-ghost-white">Risk Assessment</h2>
                    <Button
                      onClick={handleDownloadReport}
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Report
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-spirit-gray">Overall Score</span>
                        <span className="text-ghost-white font-semibold">{report.overallScore}/100</span>
                      </div>
                      <div className="h-3 bg-void-black rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            report.overallScore >= 70
                              ? 'bg-success-green'
                              : report.overallScore >= 40
                              ? 'bg-warning-amber'
                              : 'bg-danger-red'
                          }`}
                          style={{ width: `${report.overallScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  {report.riskBand && (
                    <div className="mb-4 p-3 bg-void-black rounded-lg border-l-4" style={{
                      borderLeftColor: 
                        report.riskBand.level === 'low' ? '#10B981' :
                        report.riskBand.level === 'medium' ? '#F59E0B' :
                        report.riskBand.level === 'high' ? '#EF4444' : '#DC2626'
                    }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-ghost-white">
                          Risk Band: {report.riskBand.level.toUpperCase()}
                        </span>
                        <span className="text-xs text-phantom-gray">({report.riskBand.range})</span>
                      </div>
                      <p className="text-sm text-spirit-gray">{report.riskBand.description}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-void-black rounded-lg p-4">
                      <div className="text-2xl font-bold text-ghost-white">{report.patternsDetected.length}</div>
                      <div className="text-sm text-spirit-gray">Patterns Found</div>
                    </div>
                    <div className="bg-void-black rounded-lg p-4">
                      <div className="text-2xl font-bold text-ghost-white">{report.analyzedFiles}</div>
                      <div className="text-sm text-spirit-gray">Files Analyzed</div>
                    </div>
                  </div>
                </Card>

                {report.topFindings && report.topFindings.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-ghost-white mb-4">Top 3 Critical Findings</h3>
                    <div className="space-y-3">
                      {report.topFindings.map((finding, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-void-black rounded-lg border border-fog-gray">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-danger-red/20 flex items-center justify-center text-danger-red font-bold text-sm">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-ghost-white font-medium">{finding.pattern}</span>
                              <Badge variant={
                                finding.severity === 'critical' ? 'danger' :
                                finding.severity === 'high' ? 'danger' :
                                finding.severity === 'medium' ? 'warning' : 'info'
                              } size="sm">
                                {finding.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-spirit-gray">{finding.impact}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {report.complexityMetrics && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-ghost-white mb-4">Complexity Metrics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-void-black rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-ghost-white">{report.complexityMetrics.avgFunctionLength}</div>
                        <div className="text-xs text-spirit-gray">Avg Function Length</div>
                      </div>
                      <div className="bg-void-black rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-ghost-white">{report.complexityMetrics.maxFunctionLength}</div>
                        <div className="text-xs text-spirit-gray">Max Function Length</div>
                      </div>
                      <div className="bg-void-black rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-danger-red">{report.complexityMetrics.godFunctions}</div>
                        <div className="text-xs text-spirit-gray">God Functions</div>
                      </div>
                    </div>
                  </Card>
                )}

                {report.patternsDetected.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-ghost-white mb-4">Detected Patterns</h3>
                    <div className="space-y-3">
                      {report.patternsDetected.map((pattern) => (
                        <div key={pattern.id} className="bg-void-black rounded-lg p-4 border border-fog-gray hover:border-reanimator-cyan/50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-ghost-white font-medium">{pattern.name}</h4>
                            <Badge
                              variant={
                                pattern.severity === 'critical' || pattern.severity === 'high'
                                  ? 'danger'
                                  : pattern.severity === 'medium'
                                  ? 'warning'
                                  : 'info'
                              }
                              size="sm"
                            >
                              {pattern.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-spirit-gray mb-2">{pattern.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-phantom-gray">{pattern.occurrences} occurrences</span>
                            <span className="text-reanimator-cyan">{pattern.modernizationPath}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {report.recommendations.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-ghost-white mb-4">Recommendations</h3>
                    <ul className="space-y-2">
                      {report.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-success-green mt-1">✓</span>
                          <span className="text-spirit-gray text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {report.resurrectionRoutes.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-ghost-white mb-4">Suggested Chambers</h3>
                    <div className="space-y-3">
                      {report.resurrectionRoutes.map((route) => (
                        <Link
                          key={route.chamber}
                          href={`/${route.chamber}`}
                          className="block bg-void-black rounded-lg p-4 hover:border-necro-purple border border-fog-gray transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-ghost-white font-medium mb-1 group-hover:text-necro-purple-light transition-colors">
                                {route.chamber === 'api-necromancer'
                                  ? 'API Necromancer'
                                  : route.chamber === 'ghost-ui'
                                  ? 'Ghost UI Converter'
                                  : 'Legacy Reanimator'}
                              </h4>
                              <p className="text-sm text-spirit-gray">{route.reason}</p>
                            </div>
                            <svg
                              className="w-5 h-5 text-necro-purple group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Card>
                )}

                {report.migrationPhases && report.migrationPhases.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-ghost-white mb-4">Migration Roadmap</h3>
                    <div className="space-y-4">
                      {report.migrationPhases.map((phase) => (
                        <div key={phase.phase} className="bg-void-black rounded-lg p-4 border border-fog-gray">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-necro-purple/20 flex items-center justify-center text-necro-purple font-bold">
                              {phase.phase}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-ghost-white font-semibold">{phase.name}</h4>
                                <span className="text-xs text-phantom-gray">{phase.duration}</span>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-spirit-gray font-semibold mb-1">Key Activities:</p>
                                <ul className="text-xs text-spirit-gray space-y-1">
                                  {phase.activities.slice(0, 3).map((activity, idx) => (
                                    <li key={idx}>• {activity}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-necro-purple/10 rounded-lg border border-necro-purple/30">
                      <p className="text-sm text-spirit-gray">
                        <strong className="text-necro-purple-light">Strangler Fig Pattern:</strong> Build new system alongside legacy, migrate incrementally, deprecate old system. Minimizes risk and maintains business continuity.
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {!report && !error && !loading && (
              <EmptyState
                icon={Activity}
                title="Ready to Analyze"
                description="No ritual has been performed yet. Offer some legacy material to begin the summoning."
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
