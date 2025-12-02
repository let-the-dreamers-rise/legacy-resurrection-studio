# Code Conventions - Legacy Resurrection Studio

## TypeScript Standards

### Strict Mode
- Always use TypeScript strict mode
- No implicit any
- Strict null checks enabled
- No unused locals or parameters

### Naming Conventions
- **Files**: kebab-case (e.g., `soap-parser.ts`)
- **Components**: PascalCase (e.g., `ChamberCard.tsx`)
- **Functions**: camelCase (e.g., `parseWsdl()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Interfaces**: PascalCase with descriptive names (e.g., `SoapOperation`)
- **Types**: PascalCase (e.g., `RiskLevel`)

### File Organization
```
src/lib/[domain]/
  ├── index.ts          # Public API exports
  ├── types.ts          # Type definitions
  ├── [feature].ts      # Implementation
  └── [feature].test.ts # Tests
```

### Import Order
1. React/Next.js imports
2. Third-party libraries
3. Internal lib imports
4. Internal component imports
5. Types
6. Styles

```typescript
import { useState } from 'react';
import { parseString } from 'xml2js';
import { analyzeLegacyCode } from '@/lib/analysis';
import { Button } from '@/components/ui/button';
import type { WsdlDocument } from '@/lib/soap/types';
import styles from './styles.module.css';
```

## React Component Standards

### Functional Components Only
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', onClick, children }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}
```

### Hooks Usage
- Use `useState` for simple local state
- Use `useReducer` for complex state logic
- Extract custom hooks for reusable logic
- Prefix custom hooks with `use` (e.g., `useWsdlParser`)

### Props
- Always define TypeScript interfaces for props
- Use optional props with default values
- Destructure props in function signature
- Use children prop for composition

## API Route Standards

### Structure
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.data) {
      return NextResponse.json(
        { error: 'Missing required field: data' },
        { status: 400 }
      );
    }
    
    // Processing
    const result = await processData(body.data);
    
    return NextResponse.json({ result });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Error Handling
- Always use try-catch blocks
- Return appropriate HTTP status codes
- Include descriptive error messages
- Log errors for debugging

## Code Quality

### Comments
- Use JSDoc for public APIs
- Explain "why" not "what"
- Keep comments up to date
- Remove commented-out code

### Functions
- Single responsibility principle
- Max 50 lines per function
- Pure functions when possible
- Descriptive names that explain intent

### DRY Principle
- Extract repeated logic into utilities
- Create reusable components
- Use constants for magic numbers
- Share types across modules

## Performance

### Optimization
- Use React.memo for expensive components
- Implement proper key props in lists
- Lazy load heavy components
- Debounce expensive operations

### Bundle Size
- Import only what you need
- Use dynamic imports for large dependencies
- Avoid unnecessary dependencies
- Tree-shake unused code

## Accessibility

### Requirements
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators visible
- Color contrast WCAG AA minimum

### Examples
```typescript
<button
  aria-label="Convert SOAP to REST"
  onClick={handleConvert}
  className="focus:ring-2 focus:ring-necro-purple"
>
  Convert
</button>
```

## Testing

### Coverage
- Unit tests for utilities
- Integration tests for API routes
- Component tests for UI
- E2E tests for critical flows

### Naming
```typescript
describe('SoapParser', () => {
  it('should parse valid WSDL document', () => {
    // Test implementation
  });
  
  it('should throw error for invalid XML', () => {
    // Test implementation
  });
});
```

## Git Commit Messages

### Format
```
type(scope): subject

body (optional)

footer (optional)
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `style`: Formatting changes
- `docs`: Documentation
- `test`: Adding tests
- `chore`: Maintenance

### Examples
```
feat(soap): add WSDL parser with type mapping
fix(ui): resolve Bootstrap class conversion edge case
refactor(analysis): extract pattern detection logic
```
