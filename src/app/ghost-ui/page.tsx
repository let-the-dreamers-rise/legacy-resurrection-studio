'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutTemplate, ArrowLeft, Download, CheckCircle2 } from 'lucide-react';
import type { ConversionResult } from '@/lib/ui';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { generateMigrationReport } from '@/lib/reports/migration-report';
import { downloadMarkdown, downloadTypeScript } from '@/lib/utils/download';
import { SpookyBackground } from '@/components/spooky';

const SAMPLE_LEGACY_HTML = `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">User Registration</h3>
          </div>
          <div class="panel-body">
            <form id="userForm">
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Enter username">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Enter email">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="button" class="btn btn-default" id="cancelBtn">Cancel</button>
            </form>
            <div id="message" style="display:none;" class="alert alert-success"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    $('#userForm').submit(function(e) {
      e.preventDefault();
      var username = $('#username').val();
      var email = $('#email').val();
      
      $.ajax({
        url: '/api/users',
        method: 'POST',
        data: { username: username, email: email },
        success: function(response) {
          $('#message').text('User created successfully!').show();
          $('#userForm')[0].reset();
        }
      });
    });

    $('#cancelBtn').click(function() {
      $('#userForm')[0].reset();
      $('#message').hide();
    });
  </script>
</body>
</html>`;

export default function GhostUiPage() {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!html.trim()) {
      setError('Please enter HTML content to convert');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/convert-ui', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Conversion failed');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = () => {
    setHtml(SAMPLE_LEGACY_HTML);
  };

  const handleDownloadComponent = (component: any) => {
    downloadTypeScript(component.code, `${component.name}.tsx`);
  };

  const handleDownloadReport = () => {
    if (!result) return;
    const reportContent = generateMigrationReport({
      projectName: 'UI Modernization',
      uiConversion: result,
      timestamp: new Date(),
    });
    downloadMarkdown(reportContent, 'ui-migration-report.md');
  };

  return (
    <div className="min-h-screen bg-void-black relative">
      <SpookyBackground />
      <header className="border-b border-fog-gray bg-shadow-gray/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutTemplate className="w-8 h-8 text-ghost-emerald animate-float-rotate" />
              <div>
                <h1 className="text-2xl font-bold text-ghost-white glitch-hover spooky-text">Ghost UI Converter</h1>
                <p className="text-xs text-phantom-gray animate-flicker">Peel off old skins, graft modern interfaces</p>
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 text-spirit-gray hover:text-ghost-white transition-colors focus:outline-none focus:ring-2 focus:ring-ghost-emerald rounded px-3 py-2"
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
                <h2 className="text-xl font-semibold text-ghost-white glitch-hover">Legacy HTML Input</h2>
                <Button
                  onClick={handleLoadSample}
                  variant="secondary"
                  size="sm"
                >
                  Use Sample Legacy UI
                </Button>
              </div>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full h-96 px-4 py-3 bg-void-black border border-fog-gray text-ghost-white rounded-lg focus:border-ghost-emerald focus:ring-2 focus:ring-ghost-emerald/20 focus:outline-none transition-all duration-300 placeholder:text-whisper-gray font-mono text-sm resize-none"
                placeholder="Paste your legacy HTML here..."
              />
              <Button
                onClick={handleConvert}
                isLoading={loading}
                className="w-full mt-4 bg-ghost-emerald hover:bg-green-600 focus:ring-ghost-emerald animate-heartbeat animate-eerie-glow"
              >
                {loading ? 'Converting...' : 'Convert to React'}
              </Button>
            </Card>
          </div>

          <div className="space-y-6">
            {error && (
              <Alert variant="danger" title="Conversion Failed">
                {error}
              </Alert>
            )}

            {loading && (
              <Card className="p-16">
                <LoadingSpinner size="lg" message="Exorcising jQuery demons..." />
              </Card>
            )}

            {result && !loading && (
              <div className="space-y-6 animate-fade-in">
                <Alert variant="success" title="Conversion Complete">
                  Successfully transformed legacy UI to modern React component
                </Alert>

                {result.components.map((component, idx) => (
                  <Card key={idx} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-ghost-white">{component.name}.tsx</h3>
                        <p className="text-xs text-phantom-gray mt-1">
                          {component.dependencies.length} dependencies
                        </p>
                      </div>
                      <Button
                        onClick={() => handleDownloadComponent(component)}
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                    <CodeBlock
                      code={component.code}
                      language="typescript"
                      maxHeight="500px"
                    />
                  </Card>
                ))}

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-ghost-white">What Changed</h3>
                    <Button
                      onClick={handleDownloadReport}
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Full Report
                    </Button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-void-black rounded-lg border border-fog-gray">
                      <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ghost-white block mb-1">Bootstrap → Tailwind CSS</strong>
                        <span className="text-spirit-gray">
                          Utility-first styling with modern design tokens and responsive patterns
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-void-black rounded-lg border border-fog-gray">
                      <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ghost-white block mb-1">jQuery → React Hooks</strong>
                        <span className="text-spirit-gray">
                          Declarative state management with useState and proper component lifecycle
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-void-black rounded-lg border border-fog-gray">
                      <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ghost-white block mb-1">AJAX → Fetch API</strong>
                        <span className="text-spirit-gray">
                          Modern async/await patterns with proper error handling in useEffect
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-void-black rounded-lg border border-fog-gray">
                      <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ghost-white block mb-1">DOM Manipulation → Virtual DOM</strong>
                        <span className="text-spirit-gray">
                          Conditional rendering and component composition for better performance
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {result.migrationNotes.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-ghost-white mb-4">Migration Notes</h3>
                    <ul className="space-y-2">
                      {result.migrationNotes.map((note, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-necro-purple-light mt-1">•</span>
                          <span className="text-spirit-gray text-sm">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {result.warnings.length > 0 && (
                  <Alert variant="warning" title="Conversion Warnings">
                    <ul className="space-y-1 mt-2">
                      {result.warnings.map((warning, idx) => (
                        <li key={idx} className="text-sm">• {warning}</li>
                      ))}
                    </ul>
                  </Alert>
                )}
              </div>
            )}

            {!result && !error && !loading && (
              <EmptyState
                icon={LayoutTemplate}
                title="Ready to Convert"
                description="No ritual has been performed yet. Offer your legacy HTML to begin the transformation."
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
