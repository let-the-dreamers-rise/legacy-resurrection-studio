import Link from 'next/link';
import { Activity, Zap, LayoutTemplate, Sparkles, ExternalLink, ArrowLeft } from 'lucide-react';
import { SpookyBackground } from '@/components/spooky';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-void-black relative">
      <SpookyBackground />
      <header className="border-b border-fog-gray bg-shadow-gray/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-spirit-gray hover:text-ghost-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-necro-purple animate-pulse-glow" />
              <h1 className="text-xl font-bold text-ghost-white">Documentation</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10">
        <div className="mb-12 text-center animate-fade-in relative z-10">
          <h2 className="text-4xl font-bold text-ghost-white mb-4 glitch-hover spooky-text">
            Documentation · Legacy Resurrection Studio
          </h2>
          <p className="text-xl text-spirit-gray max-w-3xl mx-auto">
            A necromancer&apos;s manual for raising legacy systems into modern architectures.
          </p>
        </div>

        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-ghost-white mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-necro-purple rounded" />
            Overview
          </h3>
          <div className="bg-shadow-gray/50 backdrop-blur border border-fog-gray rounded-lg p-8">
            <p className="text-spirit-gray leading-relaxed mb-4">
              Legacy Resurrection Studio is an enterprise-grade modernization platform that transforms outdated technologies into modern, maintainable architectures. The system employs three specialized &ldquo;resurrection chambers&rdquo; that analyze legacy code, detect patterns, and generate production-ready migration artifacts.
            </p>
            <p className="text-spirit-gray leading-relaxed">
              Each chamber performs deep analysis using pattern detection engines, security scanners, and complexity scoring algorithms. The platform generates comprehensive migration plans with realistic timelines, cross-chamber routing suggestions, and production-ready code output. Built for real-world enterprise modernization projects requiring strategic planning and phased implementation.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-ghost-white mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-necro-purple rounded" />
            Chambers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ChamberDocCard
              href="/reanimator"
              icon={<Activity className="w-8 h-8" />}
              title="Legacy Reanimator"
              description="Analyzes legacy codebases for anti-patterns, calculates risk scores, and provides strategic modernization recommendations with intelligent routing."
              accentColor="reanimator-cyan"
            />
            <ChamberDocCard
              href="/api-necromancer"
              icon={<Zap className="w-8 h-8" />}
              title="API Necromancer"
              description="Transforms SOAP/WSDL services into modern REST APIs with complete OpenAPI 3.0 specifications and 4-phase migration strategies."
              accentColor="necromancer-violet"
            />
            <ChamberDocCard
              href="/ghost-ui"
              icon={<LayoutTemplate className="w-8 h-8" />}
              title="Ghost UI Converter"
              description="Converts Bootstrap/jQuery UI into modern React + Tailwind components with security analysis and state management migration."
              accentColor="ghost-emerald"
            />
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-ghost-white mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-necro-purple rounded" />
            Architecture
          </h3>
          <div className="bg-shadow-gray/50 backdrop-blur border border-fog-gray rounded-lg p-8">
            <p className="text-spirit-gray leading-relaxed mb-6">
              Built on Next.js 14 App Router with TypeScript strict mode, the platform employs a modular architecture with specialized analysis libraries, API routes, and chamber-specific pipelines.
            </p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-ghost-white mb-3">Core Libraries</h4>
              <ul className="space-y-2 text-spirit-gray">
                <li className="flex items-start gap-2">
                  <span className="text-necro-purple mt-1">▸</span>
                  <span><code className="text-necro-purple-light">src/lib/analysis</code> - Pattern detection, risk scoring, and routing engine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-necro-purple mt-1">▸</span>
                  <span><code className="text-necro-purple-light">src/lib/soap</code> - WSDL parsing, REST transformation, OpenAPI generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-necro-purple mt-1">▸</span>
                  <span><code className="text-necro-purple-light">src/lib/ui</code> - jQuery analysis, React generation, security scanning</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-ghost-white mb-3">API Routes</h4>
              <ul className="space-y-2 text-spirit-gray">
                <li className="flex items-start gap-2">
                  <span className="text-necro-purple mt-1">▸</span>
                  <span><code className="text-necro-purple-light">/api/analyze</code> - Legacy code analysis and chamber routing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-necro-purple mt-1">▸</span>
                  <span><code className="text-necro-purple-light">/api/soap-to-rest</code> - SOAP to REST conversion with OpenAPI output</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-necro-purple mt-1">▸</span>
                  <span><code className="text-necro-purple-light">/api/convert-ui</code> - UI modernization with security analysis</span>
                </li>
              </ul>
            </div>

            <div className="bg-void-black border border-fog-gray rounded-lg p-6 font-mono text-sm">
              <div className="text-spirit-gray">
                <div className="mb-2 text-necro-purple-light">{/* Modernization Pipeline */}</div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-phantom-gray">Legacy Input</span>
                  <span className="text-necro-purple">→</span>
                  <span className="text-phantom-gray">Pattern Detection</span>
                </div>
                <div className="flex items-center gap-2 mb-1 ml-8">
                  <span className="text-necro-purple">→</span>
                  <span className="text-phantom-gray">Chamber Pipelines</span>
                </div>
                <div className="flex items-center gap-2 ml-16">
                  <span className="text-necro-purple">→</span>
                  <span className="text-success-green">Modern Output</span>
                </div>
              </div>
            </div>

            <p className="text-spirit-gray leading-relaxed mt-6">
              Each chamber generates modernization artifacts including migration reports, code stubs, OpenAPI specifications, React components, and strategic implementation guidance with realistic timelines.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-ghost-white mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-necro-purple rounded" />
            Kiro Usage
          </h3>
          <div className="bg-shadow-gray/50 backdrop-blur border border-fog-gray rounded-lg p-8">
            <p className="text-spirit-gray leading-relaxed mb-6">
              This project leverages Kiro as an engineering partner, not just a code generator. Kiro maintains consistency across the codebase through specs, hooks, and steering rules.
            </p>
            
            <div className="space-y-4">
              <div className="bg-void-black border border-fog-gray rounded-lg p-6">
                <h4 className="text-lg font-semibold text-necro-purple-light mb-3">Specs</h4>
                <p className="text-spirit-gray mb-3">Formal specifications that define feature requirements, design, and implementation tasks:</p>
                <ul className="space-y-2 text-spirit-gray text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-necro-purple mt-1">•</span>
                    <span><code className="text-necro-purple-light">analysis-spec.yaml</code> - Pattern detection and risk scoring specifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-necro-purple mt-1">•</span>
                    <span><code className="text-necro-purple-light">soap-spec.yaml</code> - SOAP to REST transformation requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-necro-purple mt-1">•</span>
                    <span><code className="text-necro-purple-light">ui-spec.yaml</code> - UI modernization and component generation specs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-necro-purple mt-1">•</span>
                    <span><code className="text-necro-purple-light">theme-spec.yaml</code> - Dark necromancer theme and design system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-necro-purple mt-1">•</span>
                    <span><code className="text-necro-purple-light">migration-plan-spec.yaml</code> - Migration strategy templates</span>
                  </li>
                </ul>
              </div>

              <div className="bg-void-black border border-fog-gray rounded-lg p-6">
                <h4 className="text-lg font-semibold text-necro-purple-light mb-3">Hooks</h4>
                <p className="text-spirit-gray mb-3">Automated workflows triggered by events:</p>
                <ul className="space-y-2 text-spirit-gray text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-necro-purple mt-1">•</span>
                    <span><code className="text-necro-purple-light">doc-sync.yaml</code> - Auto-syncs documentation when code changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-necro-purple mt-1">•</span>
                    <span><code className="text-necro-purple-light">test-gen.yaml</code> - Generates tests for new components</span>
                  </li>
                </ul>
              </div>

              <div className="bg-void-black border border-fog-gray rounded-lg p-6">
                <h4 className="text-lg font-semibold text-necro-purple-light mb-3">Steering</h4>
                <p className="text-spirit-gray mb-3">Context and guidelines included in all Kiro interactions:</p>
                <ul className="space-y-2 text-spirit-gray text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-necro-purple mt-1">•</span>
                    <span><code className="text-necro-purple-light">code-conventions.md</code> - TypeScript standards, naming, file organization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-necro-purple mt-1">•</span>
                    <span><code className="text-necro-purple-light">migration-voice.md</code> - Professional tone for migration documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-necro-purple mt-1">•</span>
                    <span><code className="text-necro-purple-light">ui-consistency.md</code> - Dark theme, spacing, component patterns</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-necro-purple/10 border border-necro-purple/30 rounded-lg p-6">
              <p className="text-spirit-gray leading-relaxed">
                Kiro acts as an engineering partner by maintaining consistency across all chambers, auto-syncing artifacts when specifications change, and ensuring every generated component follows the established design system and coding standards.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-ghost-white mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-necro-purple rounded" />
            Useful Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ExternalLinkCard
              href="https://legacy-resurrection-studio.vercel.app"
              title="Live Demo"
              description="Try the production deployment"
            />
            <ExternalLinkCard
              href="https://github.com/AshwinGoyal705/legacy-resurrection-studio"
              title="GitHub Repository"
              description="View source code and contribute"
            />
            <ExternalLinkCard
              href="https://devpost.com/software/legacy-resurrection-studio"
              title="Devpost Submission"
              description="Kiroween 2025 hackathon entry"
            />
            <ExternalLinkCard
              href="https://github.com/AshwinGoyal705/legacy-resurrection-studio#readme"
              title="README"
              description="Quick start and installation guide"
            />
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-necro-purple hover:bg-necro-purple-dark text-ghost-white font-semibold rounded-lg transition-all duration-300 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-necro-purple focus:ring-offset-2 focus:ring-offset-void-black"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </main>

      <footer className="border-t border-fog-gray mt-20">
        <div className="container mx-auto px-6 py-8">
          <p className="text-phantom-gray text-sm text-center">
            Built for Kiroween Hackathon 2025 · Legacy Resurrection Studio – Ultimate Edition
          </p>
        </div>
      </footer>
    </div>
  );
}

interface ChamberDocCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
}

function ChamberDocCard({ href, icon, title, description, accentColor }: ChamberDocCardProps) {
  return (
    <Link
      href={href}
      className="group bg-void-black border border-fog-gray rounded-lg p-6 hover:border-necro-purple transition-all duration-300"
    >
      <div className={`text-${accentColor} mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-ghost-white mb-3 group-hover:text-necro-purple-light transition-colors">
        {title}
      </h4>
      <p className="text-sm text-spirit-gray leading-relaxed">
        {description}
      </p>
    </Link>
  );
}

interface ExternalLinkCardProps {
  href: string;
  title: string;
  description: string;
}

function ExternalLinkCard({ href, title, description }: ExternalLinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group bg-shadow-gray/50 backdrop-blur border border-fog-gray rounded-lg p-6 hover:border-necro-purple transition-all duration-300 flex items-start gap-4"
    >
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-ghost-white mb-2 group-hover:text-necro-purple-light transition-colors flex items-center gap-2">
          {title}
          <ExternalLink className="w-4 h-4" />
        </h4>
        <p className="text-sm text-spirit-gray">
          {description}
        </p>
      </div>
    </a>
  );
}
