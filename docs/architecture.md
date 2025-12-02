# Architecture Overview

## System Architecture

Legacy Resurrection Studio follows a modern, layered architecture built on Next.js 14 with the App Router pattern.

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │Dashboard │  │Reanimator│  │API Necro │  Ghost UI   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘│
└───────┼─────────────┼─────────────┼─────────────┼──────┘
        │             │             │             │
        └─────────────┴─────────────┴─────────────┘
                      │
        ┌─────────────▼─────────────────────────┐
        │      Next.js API Routes (Server)      │
        │  ┌──────────┐  ┌──────────┐          │
        │  │/analyze  │  │/soap-to- │ /convert-│
        │  │          │  │rest      │ ui       │
        │  └────┬─────┘  └────┬─────┘ └────┬───┘│
        └───────┼─────────────┼────────────┼────┘
                │             │            │
        ┌───────▼─────────────▼────────────▼────┐
        │         Business Logic Layer           │
        │  ┌──────────┐  ┌──────┐  ┌─────────┐ │
        │  │/lib/     │  │/lib/ │  │/lib/ui  │ │
        │  │analysis  │  │soap  │  │         │ │
        │  └──────────┘  └──────┘  └─────────┘ │
        └────────────────────────────────────────┘
```

## Directory Structure

```
legacy-resurrection-studio/
├── .kiro/                      # Kiro AI configuration
│   ├── specs/                  # Feature specifications
│   │   ├── analysis-spec.yaml
│   │   ├── soap-spec.yaml
│   │   ├── ui-spec.yaml
│   │   ├── theme-spec.yaml
│   │   └── migration-plan-spec.yaml
│   ├── hooks/                  # Automation hooks
│   │   ├── doc-sync.yaml
│   │   ├── test-gen.yaml
│   │   └── type-check.yaml
│   └── steering/               # Development guidelines
│       ├── ui-consistency.md
│       ├── migration-voice.md
│       └── code-conventions.md
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Dashboard
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles
│   │   ├── reanimator/
│   │   │   └── page.tsx        # Legacy Reanimator chamber
│   │   ├── api-necromancer/
│   │   │   └── page.tsx        # API Necromancer chamber
│   │   ├── ghost-ui/
│   │   │   └── page.tsx        # Ghost UI chamber
│   │   └── api/                # API routes
│   │       ├── analyze/
│   │       │   └── route.ts
│   │       ├── soap-to-rest/
│   │       │   └── route.ts
│   │       └── convert-ui/
│   │           └── route.ts
│   │
│   ├── components/             # Shared UI components
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── CodeBlock.tsx
│   │       ├── Alert.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── EmptyState.tsx
│   │
│   └── lib/                    # Business logic
│       ├── analysis/           # Legacy code analysis
│       │   ├── index.ts
│       │   ├── detector.ts     # Pattern detection
│       │   ├── scorer.ts       # Risk scoring
│       │   ├── router.ts       # Chamber routing
│       │   └── types.ts
│       ├── soap/               # SOAP to REST conversion
│       │   ├── index.ts
│       │   ├── parser.ts       # WSDL parsing
│       │   ├── transformer.ts  # REST transformation
│       │   ├── openapi-generator.ts
│       │   └── types.ts
│       ├── ui/                 # UI conversion
│       │   ├── index.ts
│       │   ├── component-generator.ts
│       │   ├── tailwind-mapper.ts
│       │   └── types.ts
│       ├── reports/            # Report generation
│       │   └── migration-report.ts
│       └── utils/              # Utilities
│           └── download.ts
│
├── docs/                       # Documentation
│   ├── architecture.md
│   ├── kiro-usage.md
│   ├── demo-script.md
│   ├── devpost-draft.md
│   └── blog-post-draft.md
│
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies
```

## Data Flow

### Legacy Reanimator Flow

```
User Input (Code)
    │
    ▼
POST /api/analyze
    │
    ├─► Pattern Detector (detector.ts)
    │   └─► Identifies legacy patterns
    │
    ├─► Risk Scorer (scorer.ts)
    │   └─► Calculates modernization score
    │
    ├─► Chamber Router (router.ts)
    │   └─► Suggests specialized chambers
    │
    └─► Response (RiskReport)
        └─► Display results + download report
```

### API Necromancer Flow

```
User Input (WSDL)
    │
    ▼
POST /api/soap-to-rest
    │
    ├─► WSDL Parser (parser.ts)
    │   └─► Extracts operations, messages, types
    │
    ├─► REST Transformer (transformer.ts)
    │   └─► Maps SOAP ops to REST endpoints
    │
    ├─► OpenAPI Generator (openapi-generator.ts)
    │   └─► Creates OpenAPI 3.0 spec
    │
    └─► Response (ConversionResult)
        └─► Display spec + download artifacts
```

### Ghost UI Flow

```
User Input (HTML)
    │
    ▼
POST /api/convert-ui
    │
    ├─► HTML Parser
    │   └─► Extracts structure and classes
    │
    ├─► Component Generator (component-generator.ts)
    │   └─► Creates React component
    │
    ├─► Tailwind Mapper (tailwind-mapper.ts)
    │   └─► Converts Bootstrap to Tailwind
    │
    └─► Response (ConversionResult)
        └─► Display component + download file
```

## Component Architecture

### Shared UI Components

All chambers use a consistent component library:

- **Button**: Primary, secondary, ghost, danger variants
- **Card**: Default, elevated, glass variants with optional glow
- **Badge**: Info, success, warning, danger, neutral variants
- **CodeBlock**: Syntax highlighting with copy functionality
- **Alert**: Contextual alerts with icons
- **LoadingSpinner**: Animated loading states
- **EmptyState**: Placeholder for empty results

### Design System

**Color Palette:**
- Primary: `necro-purple` (#8B5CF6)
- Background: `void-black` (#0A0A0F)
- Surface: `shadow-gray` (#1A1A24)
- Text: `ghost-white` (#F9FAFB)
- Accents: Chamber-specific (cyan, violet, emerald)

**Typography:**
- Font: Inter (sans-serif)
- Mono: JetBrains Mono (code)
- Scale: 12px - 48px

**Spacing:**
- Consistent 4px grid system
- Tailwind spacing utilities

## API Design

### REST Endpoints

**POST /api/analyze**
```typescript
Request: { code: string }
Response: { report: RiskReport }
```

**POST /api/soap-to-rest**
```typescript
Request: { wsdl: string }
Response: { result: ConversionResult }
```

**POST /api/convert-ui**
```typescript
Request: { html: string }
Response: { result: ConversionResult }
```

### Error Handling

All API routes follow consistent error handling:

```typescript
try {
  // Processing logic
  return NextResponse.json({ result });
} catch (error) {
  console.error('Error:', error);
  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  );
}
```

## State Management

### Client-Side State

Each chamber uses React hooks for local state:

```typescript
const [input, setInput] = useState('');
const [loading, setLoading] = useState(false);
const [result, setResult] = useState<Result | null>(null);
const [error, setError] = useState<string | null>(null);
```

No global state management needed—chambers are independent.

## Performance Considerations

### Code Splitting

- Each chamber is a separate route (automatic code splitting)
- Shared components bundled separately
- Syntax highlighter loaded only when needed

### Optimization

- Server-side rendering for initial page load
- Client-side navigation for instant transitions
- Lazy loading for heavy components
- Memoization for expensive computations

## Security

### Input Validation

- All user inputs sanitized before processing
- XML parsing with safe defaults
- No eval() or dangerous code execution

### API Security

- CORS configured for same-origin only
- Rate limiting (future enhancement)
- Input size limits to prevent DoS

## Deployment

### Build Process

```bash
npm run build    # Creates optimized production build
npm start        # Serves production build
```

### Environment Variables

None required for basic functionality. Optional:

- `NEXT_PUBLIC_API_URL`: Custom API endpoint
- `ANALYTICS_ID`: Analytics tracking

### Hosting Recommendations

- **Vercel**: Optimal for Next.js (zero config)
- **Netlify**: Good alternative with edge functions
- **AWS Amplify**: Enterprise deployment option
- **Docker**: Self-hosted containerized deployment

## Testing Strategy

### Unit Tests

- Business logic in `/lib` directories
- Pure functions for transformations
- Mock external dependencies

### Integration Tests

- API routes with sample inputs
- End-to-end conversion flows
- Error handling scenarios

### E2E Tests

- User workflows through chambers
- Download functionality
- Cross-browser compatibility

## Monitoring & Observability

### Logging

- Server-side errors logged to console
- Client-side errors caught by error boundaries
- API request/response logging

### Metrics (Future)

- Conversion success rates
- Average processing times
- Popular patterns detected
- User engagement per chamber

---

This architecture enables rapid development, easy maintenance, and seamless scaling for enterprise use cases.
