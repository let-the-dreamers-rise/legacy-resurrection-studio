# UI Consistency Guide - Legacy Resurrection Studio

## Design Philosophy

Legacy Resurrection Studio embodies the aesthetic of a **necromancer's laboratory** - dark, mysterious, professional, and powerful. Every UI element should feel intentional, polished, and slightly otherworldly.

### Core Principles
1. **Dark & Elegant**: Professional dark theme, not gaming or childish
2. **Purposeful Animation**: Subtle, meaningful motion that enhances UX
3. **Clear Hierarchy**: Information architecture that guides users naturally
4. **Responsive Excellence**: Flawless experience across all devices
5. **Accessibility First**: Beautiful AND usable for everyone

## Color Usage

### Primary Actions
Use `necro-purple` (#8B5CF6) for:
- Primary buttons
- Active states
- Key CTAs
- Important highlights
- Glow effects

### Backgrounds
- `void-black` (#0A0A0F): Main app background
- `shadow-gray` (#1A1A24): Cards, panels
- `mist-gray` (#2A2A3A): Elevated surfaces
- `fog-gray` (#3A3A4A): Borders, subtle dividers

### Text
- `ghost-white` (#F9FAFB): Primary text, headings
- `spirit-gray` (#D1D5DB): Body text, descriptions
- `phantom-gray` (#9CA3AF): Secondary text, labels
- `whisper-gray` (#6B7280): Disabled, placeholder text

### Semantic Colors
- Success: `success-green` (#10B981)
- Warning: `warning-amber` (#F59E0B)
- Error: `danger-red` (#EF4444)
- Info: `info-blue` (#3B82F6)

### Chamber-Specific Accents
- **Legacy Reanimator**: `reanimator-cyan` (#06B6D4)
- **API Necromancer**: `necromancer-violet` (#8B5CF6)
- **Ghost UI**: `ghost-emerald` (#10B981)

## Typography

### Font Stack
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Scale & Usage
- **5xl (48px)**: Page titles, hero text
- **4xl (36px)**: Section headings
- **3xl (30px)**: Chamber titles
- **2xl (24px)**: Card titles
- **xl (20px)**: Subsection headings
- **lg (18px)**: Emphasized text
- **base (16px)**: Body text (default)
- **sm (14px)**: Secondary text, labels
- **xs (12px)**: Captions, metadata

### Font Weights
- **700 (bold)**: Headings, important labels
- **600 (semibold)**: Subheadings, button text
- **500 (medium)**: Emphasized body text
- **400 (normal)**: Body text (default)

## Spacing System

Use Tailwind's spacing scale consistently:
- **Micro spacing** (1-2): Between related elements
- **Small spacing** (3-4): Between components
- **Medium spacing** (6-8): Between sections
- **Large spacing** (12-16): Between major areas
- **XL spacing** (20-24): Page margins

## Component Patterns

### Buttons

```tsx
// Primary Action
<button className="px-6 py-3 bg-necro-purple hover:bg-necro-purple-dark text-ghost-white font-semibold rounded-lg transition-all duration-300 hover:shadow-glow">
  Resurrect Code
</button>

// Secondary Action
<button className="px-6 py-3 bg-mist-gray hover:bg-fog-gray text-ghost-white font-semibold rounded-lg transition-all duration-300">
  Cancel
</button>

// Ghost Button
<button className="px-6 py-3 bg-transparent hover:bg-shadow-gray text-spirit-gray font-semibold rounded-lg transition-all duration-300 border border-fog-gray">
  Learn More
</button>

// Danger Action
<button className="px-6 py-3 bg-danger-red hover:bg-red-600 text-ghost-white font-semibold rounded-lg transition-all duration-300">
  Delete
</button>
```

### Cards

```tsx
// Standard Card
<div className="bg-shadow-gray border border-fog-gray rounded-lg p-6 shadow-lg">
  {/* Content */}
</div>

// Elevated Card
<div className="bg-mist-gray border border-fog-gray rounded-lg p-6 shadow-xl">
  {/* Content */}
</div>

// Glowing Card (hover state)
<div className="bg-shadow-gray border border-necro-purple rounded-lg p-6 shadow-glow hover:shadow-glow-strong transition-all duration-300">
  {/* Content */}
</div>

// Chamber Card
<div className="bg-shadow-gray border border-fog-gray rounded-lg p-8 hover:border-[chamber-color] hover:shadow-glow transition-all duration-500 cursor-pointer group">
  {/* Content with group-hover effects */}
</div>
```

### Input Fields

```tsx
<input
  type="text"
  className="w-full px-4 py-3 bg-shadow-gray border border-fog-gray text-ghost-white rounded-lg focus:border-necro-purple focus:ring-2 focus:ring-necro-purple/20 focus:outline-none transition-all duration-300 placeholder:text-whisper-gray"
  placeholder="Enter WSDL URL..."
/>

<textarea
  className="w-full px-4 py-3 bg-shadow-gray border border-fog-gray text-ghost-white rounded-lg focus:border-necro-purple focus:ring-2 focus:ring-necro-purple/20 focus:outline-none transition-all duration-300 placeholder:text-whisper-gray font-mono text-sm"
  rows={10}
  placeholder="Paste your legacy code..."
/>
```

### Badges

```tsx
// Risk Level Badges
<span className="px-3 py-1 bg-info-blue/20 text-info-blue border border-info-blue/30 rounded-full text-sm font-medium">
  Low Risk
</span>

<span className="px-3 py-1 bg-warning-amber/20 text-warning-amber border border-warning-amber/30 rounded-full text-sm font-medium">
  Medium Risk
</span>

<span className="px-3 py-1 bg-danger-red/20 text-danger-red border border-danger-red/30 rounded-full text-sm font-medium">
  High Risk
</span>

<span className="px-3 py-1 bg-danger-red text-ghost-white border border-danger-red rounded-full text-sm font-medium">
  Critical
</span>
```

## Animation Guidelines

### Transitions
All interactive elements should have smooth transitions:
```css
transition-all duration-300 ease-in-out
```

### Hover Effects
- Buttons: Background color change + glow
- Cards: Border color change + shadow enhancement
- Links: Color change + underline

### Loading States
```tsx
// Skeleton Loader
<div className="animate-pulse bg-mist-gray rounded h-4 w-full" />

// Spinner
<div className="animate-spin rounded-full h-8 w-8 border-4 border-fog-gray border-t-necro-purple" />
```

### Entrance Animations
```tsx
// Fade In
<div className="animate-fade-in">

// Slide Up
<div className="animate-slide-up">
```

### Ambient Effects
- Subtle floating particles on dashboard
- Gentle pulse on status indicators
- Smooth glow transitions on hover

## Layout Patterns

### Dashboard Layout
```tsx
<div className="min-h-screen bg-void-black">
  <header className="border-b border-fog-gray bg-shadow-gray/50 backdrop-blur">
    {/* Navigation */}
  </header>
  
  <main className="container mx-auto px-6 py-12">
    {/* 3 Chamber Cards in grid */}
  </main>
</div>
```

### Chamber Page Layout
```tsx
<div className="min-h-screen bg-void-black">
  <header className="border-b border-fog-gray bg-shadow-gray/50 backdrop-blur">
    {/* Chamber title + navigation */}
  </header>
  
  <main className="container mx-auto px-6 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        {/* Input area */}
      </div>
      <div className="space-y-6">
        {/* Output area */}
      </div>
    </div>
  </main>
</div>
```

## Responsive Breakpoints

Follow Tailwind's default breakpoints:
- **sm**: 640px (mobile landscape)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)
- **2xl**: 1536px (extra large)

### Mobile-First Approach
Always design for mobile first, then enhance for larger screens:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## Accessibility Requirements

### Focus States
All interactive elements must have visible focus indicators:
```tsx
focus:ring-2 focus:ring-necro-purple focus:outline-none
```

### Color Contrast
- Maintain WCAG AA minimum (4.5:1 for normal text)
- Use semantic colors consistently
- Never rely on color alone to convey information

### Keyboard Navigation
- All actions accessible via keyboard
- Logical tab order
- Escape key closes modals
- Enter key submits forms

### Screen Readers
```tsx
<button aria-label="Convert SOAP to REST API">
  <Icon />
</button>

<div role="alert" aria-live="polite">
  {errorMessage}
</div>
```

### Reduced Motion
```tsx
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Icon Usage

### Icon Library
Use Lucide React for consistent, beautiful icons:
```tsx
import { Skull, Zap, Ghost, Code, FileCode } from 'lucide-react';
```

### Icon Sizing
- **sm**: 16px (inline with text)
- **base**: 20px (buttons, labels)
- **lg**: 24px (section headers)
- **xl**: 32px (feature highlights)
- **2xl**: 48px (hero sections)

### Icon Colors
Match text color or use accent colors for emphasis:
```tsx
<Skull className="w-6 h-6 text-necro-purple" />
```

## Code Display

### Syntax Highlighting
Use consistent syntax highlighting for code blocks:
```tsx
<pre className="bg-void-black border border-fog-gray rounded-lg p-4 overflow-x-auto">
  <code className="text-sm font-mono text-ghost-white">
    {codeContent}
  </code>
</pre>
```

### Inline Code
```tsx
<code className="px-2 py-1 bg-mist-gray text-necro-purple-light rounded text-sm font-mono">
  const example
</code>
```

## Empty States

```tsx
<div className="flex flex-col items-center justify-center py-16 text-center">
  <Ghost className="w-16 h-16 text-phantom-gray mb-4" />
  <h3 className="text-xl font-semibold text-spirit-gray mb-2">
    No Legacy Code Yet
  </h3>
  <p className="text-phantom-gray mb-6">
    Upload or paste your legacy code to begin resurrection
  </p>
  <button className="px-6 py-3 bg-necro-purple hover:bg-necro-purple-dark text-ghost-white font-semibold rounded-lg transition-all duration-300">
    Get Started
  </button>
</div>
```

## Error States

```tsx
<div className="bg-danger-red/10 border border-danger-red/30 rounded-lg p-4 flex items-start gap-3">
  <AlertCircle className="w-5 h-5 text-danger-red flex-shrink-0 mt-0.5" />
  <div>
    <h4 className="text-danger-red font-semibold mb-1">
      Conversion Failed
    </h4>
    <p className="text-spirit-gray text-sm">
      {errorMessage}
    </p>
  </div>
</div>
```

## Success States

```tsx
<div className="bg-success-green/10 border border-success-green/30 rounded-lg p-4 flex items-start gap-3">
  <CheckCircle className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
  <div>
    <h4 className="text-success-green font-semibold mb-1">
      Resurrection Complete
    </h4>
    <p className="text-spirit-gray text-sm">
      Your code has been successfully modernized
    </p>
  </div>
</div>
```
