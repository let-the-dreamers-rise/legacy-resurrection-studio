'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, ArrowLeft, Download } from 'lucide-react';
import type { ConversionResult } from '@/lib/soap';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { generateMigrationReport } from '@/lib/reports/migration-report';
import { downloadMarkdown, downloadJSON } from '@/lib/utils/download';
import { SpookyBackground } from '@/components/spooky';

const SAMPLE_WSDL = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:tns="http://example.com/user-service"
             targetNamespace="http://example.com/user-service">
  
  <message name="GetUserRequest">
    <part name="userId" type="xsd:string"/>
  </message>
  
  <message name="GetUserResponse">
    <part name="user" type="tns:User"/>
  </message>
  
  <message name="CreateUserRequest">
    <part name="username" type="xsd:string"/>
    <part name="email" type="xsd:string"/>
  </message>
  
  <message name="CreateUserResponse">
    <part name="userId" type="xsd:string"/>
  </message>
  
  <portType name="UserServicePortType">
    <operation name="GetUser">
      <input message="tns:GetUserRequest"/>
      <output message="tns:GetUserResponse"/>
    </operation>
    <operation name="CreateUser">
      <input message="tns:CreateUserRequest"/>
      <output message="tns:CreateUserResponse"/>
    </operation>
  </portType>
</definitions>`;

export default function ApiNecromancerPage() {
  const [wsdl, setWsdl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!wsdl.trim()) {
      setError('Please enter WSDL content to convert');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/soap-to-rest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wsdl }),
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
    setWsdl(SAMPLE_WSDL);
  };

  const handleDownloadOpenAPI = () => {
    if (!result) return;
    downloadJSON(result.openApiSpec, 'openapi-spec.json');
  };

  const handleDownloadReport = () => {
    if (!result) return;
    const reportContent = generateMigrationReport({
      projectName: 'SOAP to REST Migration',
      soapConversion: result,
      timestamp: new Date(),
    });
    downloadMarkdown(reportContent, 'api-migration-report.md');
  };

  return (
    <div className="min-h-screen bg-void-black relative">
      <SpookyBackground />
      <header className="border-b border-fog-gray bg-shadow-gray/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-necromancer-violet animate-float-rotate" />
              <div>
                <h1 className="text-2xl font-bold text-ghost-white glitch-hover spooky-text">API Necromancer</h1>
                <p className="text-xs text-phantom-gray animate-flicker">Raise SOAP relics into living RESTful APIs</p>
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 text-spirit-gray hover:text-ghost-white transition-colors focus:outline-none focus:ring-2 focus:ring-necromancer-violet rounded px-3 py-2"
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
                <h2 className="text-xl font-semibold text-ghost-white glitch-hover">WSDL Input</h2>
                <Button
                  onClick={handleLoadSample}
                  variant="secondary"
                  size="sm"
                >
                  Use Sample WSDL
                </Button>
              </div>
              <textarea
                value={wsdl}
                onChange={(e) => setWsdl(e.target.value)}
                className="w-full h-96 px-4 py-3 bg-void-black border border-fog-gray text-ghost-white rounded-lg focus:border-necromancer-violet focus:ring-2 focus:ring-necromancer-violet/20 focus:outline-none transition-all duration-300 placeholder:text-whisper-gray font-mono text-sm resize-none"
                placeholder="Paste your WSDL content here..."
              />
              <Button
                onClick={handleConvert}
                isLoading={loading}
                className="w-full mt-4 bg-necromancer-violet hover:bg-necro-purple-dark focus:ring-necromancer-violet animate-heartbeat animate-eerie-glow"
              >
                {loading ? 'Converting...' : 'Convert to REST'}
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
                <LoadingSpinner size="lg" message="Channeling SOAP spirits into REST..." />
              </Card>
            )}

            {result && !loading && (
              <div className="space-y-6 animate-fade-in">
                <Alert variant="success" title="Conversion Complete">
                  Successfully transformed SOAP service to REST API
                </Alert>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-ghost-white">Extracted Operations</h3>
                    <Badge variant="info">{result.endpoints.length} endpoints</Badge>
                  </div>
                  <div className="space-y-2">
                    {result.endpoints.map((endpoint, idx) => (
                      <div key={idx} className="bg-void-black rounded-lg p-3 flex items-center gap-3 border border-fog-gray hover:border-necromancer-violet/50 transition-colors">
                        <Badge
                          variant={
                            endpoint.method === 'GET' ? 'info' :
                            endpoint.method === 'POST' ? 'success' :
                            endpoint.method === 'PUT' ? 'warning' :
                            'danger'
                          }
                          size="sm"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-spirit-gray text-sm font-mono flex-1">{endpoint.path}</code>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-ghost-white">OpenAPI Specification</h3>
                    <Button
                      onClick={handleDownloadOpenAPI}
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download JSON
                    </Button>
                  </div>
                  <CodeBlock
                    code={JSON.stringify(result.openApiSpec, null, 2)}
                    language="json"
                    maxHeight="400px"
                  />
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-ghost-white">Migration Plan</h3>
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
                  <div className="space-y-4 text-sm text-spirit-gray">
                    <div className="bg-void-black rounded-lg p-4 border border-fog-gray">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-necromancer-violet/20 flex items-center justify-center text-necromancer-violet font-semibold">
                          1
                        </div>
                        <div>
                          <strong className="text-ghost-white block mb-1">Phase 1: Foundation</strong>
                          <p>Deploy REST API alongside existing SOAP service using the strangler fig pattern. Implement authentication layer and monitoring.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-void-black rounded-lg p-4 border border-fog-gray">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-necromancer-violet/20 flex items-center justify-center text-necromancer-violet font-semibold">
                          2
                        </div>
                        <div>
                          <strong className="text-ghost-white block mb-1">Phase 2: Migration</strong>
                          <p>Gradually migrate clients to REST endpoints while monitoring traffic. Implement feature flags for controlled rollout.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-void-black rounded-lg p-4 border border-fog-gray">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-necromancer-violet/20 flex items-center justify-center text-necromancer-violet font-semibold">
                          3
                        </div>
                        <div>
                          <strong className="text-ghost-white block mb-1">Phase 3: Deprecation</strong>
                          <p>Deprecate SOAP endpoints once all clients have migrated. Maintain documentation and provide migration support.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

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
                icon={Zap}
                title="Ready to Convert"
                description="No ritual has been performed yet. Offer your WSDL to begin the transformation."
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
