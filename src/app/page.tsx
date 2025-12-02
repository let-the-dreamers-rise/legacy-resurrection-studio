import Link from 'next/link';
import { Activity, Zap, LayoutTemplate, Sparkles } from 'lucide-react';
import { SpookyBackground } from '@/components/spooky';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-void-black relative">
      <SpookyBackground />
      <header className="border-b border-fog-gray bg-shadow-gray/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-necro-purple animate-pulse-glow" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-ghost-white glitch-hover spooky-text">
                  Legacy Resurrection Studio
                </h1>
                <p className="text-xs text-phantom-gray animate-flicker">Ultimate Edition</p>
              </div>
            </div>
            <Link
              href="/docs"
              className="px-4 py-2 text-sm text-spirit-gray hover:text-ghost-white transition-colors"
            >
              Documentation
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16 animate-fade-in relative z-10">
          <h2 className="text-5xl font-bold text-ghost-white mb-4 bg-gradient-to-r from-ghost-white via-necro-purple-light to-ghost-white bg-clip-text text-transparent glitch-hover spooky-text">
            Resurrect Your Legacy Code
          </h2>
          <p className="text-xl text-spirit-gray max-w-3xl mx-auto mb-8">
            Transform outdated technologies into modern, maintainable architectures with AI-powered resurrection chambers
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/reanimator"
              className="px-6 py-3 bg-necro-purple hover:bg-necro-purple-dark text-ghost-white font-semibold rounded-lg transition-all duration-300 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-necro-purple focus:ring-offset-2 focus:ring-offset-void-black animate-heartbeat animate-eerie-glow"
            >
              Start Analysis
            </Link>
            <a
              href="#chambers"
              className="px-6 py-3 bg-transparent hover:bg-shadow-gray text-spirit-gray font-semibold rounded-lg transition-all duration-300 border border-fog-gray focus:outline-none focus:ring-2 focus:ring-fog-gray focus:ring-offset-2 focus:ring-offset-void-black"
            >
              Explore Chambers
            </a>
          </div>
        </div>

        <div id="chambers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative z-10">
          <ChamberCard
            href="/reanimator"
            icon={<Activity className="w-12 h-12" />}
            title="Legacy Reanimator"
            subtitle="Autopsy and triage for haunted codebases"
            description="Analyze legacy code for patterns, calculate risk scores, and receive strategic modernization recommendations with automated routing to specialized chambers."
            accentColor="reanimator-cyan"
            delay="0ms"
          />

          <ChamberCard
            href="/api-necromancer"
            icon={<Zap className="w-12 h-12" />}
            title="API Necromancer"
            subtitle="Raise SOAP relics into living RESTful APIs"
            description="Transform SOAP/WSDL services into modern REST APIs with complete OpenAPI 3.0 specifications, implementation stubs, and migration strategies."
            accentColor="necromancer-violet"
            delay="100ms"
          />

          <ChamberCard
            href="/ghost-ui"
            icon={<LayoutTemplate className="w-12 h-12" />}
            title="Ghost UI Converter"
            subtitle="Peel off old skins, graft modern interfaces"
            description="Convert Bootstrap/jQuery UI into modern React components with Tailwind CSS styling, proper state management, and accessibility compliance."
            accentColor="ghost-emerald"
            delay="200ms"
          />
        </div>

        <div className="bg-shadow-gray/50 backdrop-blur border border-fog-gray rounded-lg p-8 mb-16 relative z-10 animate-eerie-glow">
          <h3 className="text-2xl font-semibold text-ghost-white mb-6 text-center">
            Guided Resurrection Scenarios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScenarioCard
              title="Haunted PHP Monolith"
              description="Legacy PHP application with jQuery spaghetti code"
              chamber="reanimator"
              icon="🧟"
            />
            <ScenarioCard
              title="Bank SOAP Service"
              description="Enterprise SOAP/WSDL service requiring REST modernization"
              chamber="api-necromancer"
              icon="🏦"
            />
            <ScenarioCard
              title="Bootstrap Admin Dashboard"
              description="Legacy Bootstrap 3 admin panel with jQuery plugins"
              chamber="ghost-ui"
              icon="👻"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-necro-purple/10 via-transparent to-necro-purple/10 border border-necro-purple/30 rounded-lg p-8 text-center relative z-10 animate-eerie-glow">
          <h3 className="text-2xl font-semibold text-ghost-white mb-4">
            Enterprise-Ready Migration Workflow
          </h3>
          <p className="text-spirit-gray mb-6 max-w-2xl mx-auto">
            Built for real-world legacy modernization projects. Each chamber generates production-ready artifacts, comprehensive migration reports, and strategic implementation guidance.
          </p>
          <div className="flex gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-green rounded-full animate-pulse" />
              <span className="text-spirit-gray">OpenAPI 3.0 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-green rounded-full animate-pulse" />
              <span className="text-spirit-gray">TypeScript + React</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-green rounded-full animate-pulse" />
              <span className="text-spirit-gray">Accessibility First</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-fog-gray mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center gap-6">
            <p className="text-phantom-gray text-sm text-center">
              Built for Kiroween Hackathon 2025 · Legacy Resurrection Studio – Ultimate Edition
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://legacy-resurrection-studio.vercel.app"
                target="_blank"
                rel="noreferrer"
                aria-label="Live Demo"
                className="px-4 py-2 bg-necro-purple/20 hover:bg-necro-purple/30 text-necro-purple-light border border-necro-purple/40 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-necro-purple focus:ring-offset-2 focus:ring-offset-void-black"
              >
                Live Demo
              </a>
              <a
                href="https://github.com/let-the-dreamers-rise/legacy-resurrection-studio"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                className="px-4 py-2 bg-shadow-gray hover:bg-mist-gray text-spirit-gray hover:text-ghost-white border border-fog-gray rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-fog-gray focus:ring-offset-2 focus:ring-offset-void-black"
              >
                GitHub
              </a>
              <a
                href="https://devpost.com/software/legacy-resurrection-studio"
                target="_blank"
                rel="noreferrer"
                aria-label="Devpost Submission"
                className="px-4 py-2 bg-shadow-gray hover:bg-mist-gray text-spirit-gray hover:text-ghost-white border border-fog-gray rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-fog-gray focus:ring-offset-2 focus:ring-offset-void-black"
              >
                Devpost
              </a>
              <Link
                href="/docs"
                aria-label="Documentation"
                className="px-4 py-2 bg-shadow-gray hover:bg-mist-gray text-spirit-gray hover:text-ghost-white border border-fog-gray rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-fog-gray focus:ring-offset-2 focus:ring-offset-void-black"
              >
                Docs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface ChamberCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  delay: string;
}

function ChamberCard({ href, icon, title, subtitle, description, accentColor, delay }: ChamberCardProps) {
  return (
    <Link
      href={href}
      className="group bg-shadow-gray/50 backdrop-blur border border-fog-gray rounded-lg p-8 hover:border-necro-purple hover:shadow-glow transition-all duration-500 cursor-pointer animate-slide-up hover:animate-eerie-glow hover:-translate-y-2"
      style={{ animationDelay: delay }}
    >
      <div className={`text-${accentColor} mb-4 group-hover:animate-float-rotate transition-transform`}>
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-ghost-white mb-2 group-hover:text-necro-purple-light transition-colors glitch-hover spooky-text">
        {title}
      </h3>
      <p className="text-sm text-necro-purple-light mb-3 italic">
        {subtitle}
      </p>
      <p className="text-spirit-gray leading-relaxed mb-6">
        {description}
      </p>
      <div className="flex items-center text-necro-purple-light group-hover:translate-x-2 transition-transform">
        <span className="text-sm font-medium">Enter Chamber</span>
        <svg
          className="w-4 h-4 ml-2"
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
  );
}

interface ScenarioCardProps {
  title: string;
  description: string;
  chamber: string;
  icon: string;
}

function ScenarioCard({ title, description, chamber, icon }: ScenarioCardProps) {
  return (
    <Link
      href={`/${chamber}?scenario=${encodeURIComponent(title)}`}
      className="bg-void-black border border-fog-gray rounded-lg p-6 hover:border-necro-purple transition-all duration-300 group"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="text-lg font-semibold text-ghost-white mb-2 group-hover:text-necro-purple-light transition-colors">
        {title}
      </h4>
      <p className="text-sm text-spirit-gray mb-4">
        {description}
      </p>
      <span className="text-xs text-necro-purple-light font-medium">
        Try Scenario →
      </span>
    </Link>
  );
}
