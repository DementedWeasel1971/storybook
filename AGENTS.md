---
template: agents.md
version: 2.0.0
lastUpdated: 2025-06-22
sourceTemplate: templates/AGENTS.template.md
generatedBy: executor-crew
generationTriggers: 
  - CLAUDE.md architecture changes
  - Implementation requirements updates
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
---

# AGENTS.md: AI Agent Constitution for React Design System Development

**Version**: 2.0.0  
**Generated from**: CLAUDE.md architectural specification  
**Date**: 2025-06-22

This document provides the **official guidelines and mandatory protocols** for any AI agent contributing to this project. **You MUST adhere to all instructions herein.**

## Project Overview

This is a React Design System project following the Architect Crew methodology. The architecture is defined in CLAUDE.md and must be implemented exactly as specified.

**Project Goals:**
- Create a scalable, accessible React component library
- Implement design tokens for consistent styling
- Provide comprehensive Storybook documentation
- Ensure WCAG 2.1 AA accessibility compliance
- Support TypeScript for type safety
- Enable tree-shaking for optimal bundle sizes

**Technology Stack:**
- React 18+ with TypeScript 5+
- Storybook 8.3+ for documentation
- Vite for development, Rollup for bundling
- Jest + React Testing Library for testing
- CSS Modules for component styling

**Crucially, all AI agents MUST implement the architecture defined in `CLAUDE.md` and document technical specifications in `docs/FRS.md` as implementation proceeds.**

## Architectural Implementation Requirements

Based on the architecture defined in CLAUDE.md, the following implementation requirements are mandatory:

### Mandatory Architecture Implementation

**Layer Implementation Order:**
1. **Foundation Layer**: Design tokens, CSS variables, base styles
2. **Primitive Layer**: Atomic components (Button, Input, Text)
3. **Component Layer**: Molecular components (Form, Card, Modal)
4. **Pattern Layer**: Organism-level compositions
5. **Documentation Layer**: Storybook stories and examples

**Implementation Requirements:**
- All components MUST use design tokens
- TypeScript interfaces required for all props
- Accessibility testing mandatory for each component
- Storybook stories required for documentation
- Unit tests with 90%+ coverage

### React Component Development Standards
### React Implementation Standards

**Component Structure:**
```typescript
interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}

export const Component: React.FC<ComponentProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  className = '',
  onClick,
  ...props
}) => {
  // Implementation
};
```

**Requirements:**
- Functional components with TypeScript
- Props interface with JSDoc documentation
- Default values for optional props
- Forward refs for DOM access
- Consistent prop naming conventions

### Storybook Integration Requirements
### Storybook Implementation Requirements

**Story Structure:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  parameters: {
    docs: {
      description: {
        component: 'Component description here'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline']
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button Text'
  }
};
```

**Requirements:**
- Stories for all component variants
- Accessibility addon integration
- Controls for interactive props
- Documentation descriptions

### Design System Standards
### Design System Implementation Standards

**Design Token Usage:**
```css
.component {
  color: var(--color-primary-500);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
}
```

**Component API Consistency:**
- `variant` prop for visual variations
- `size` prop for sizing options
- `disabled` prop for interaction states
- `className` prop for custom styling
- Event handlers with `on` prefix

## Implementation Workflow

**Refer to `CLAUDE.md` for architectural guidance and document all technical decisions in `docs/FRS.md`.**

### Architecture-Driven Development Process

### Architecture-Driven Development Process

**Implementation Workflow:**
1. **Architecture Review**: Verify CLAUDE.md requirements
2. **Design Token Setup**: Define required tokens
3. **Component Interface**: Create TypeScript interface
4. **Implementation**: Build component with accessibility
5. **Testing**: Unit tests and accessibility validation
6. **Stories**: Create Storybook documentation
7. **Integration**: Test with other components
8. **FRS Update**: Document technical specifications
9. **Review**: Code review and approval
10. **Release**: Version and deploy

**Quality Gates:**
- TypeScript compilation success
- All tests passing (90%+ coverage)
- Accessibility audit passing
- Storybook builds without errors
- Performance budget compliance

### Implementation Commands

### Essential Implementation Commands

**Development Commands:**
```bash
# Navigate to design system directory
cd ../design-system

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build library
npm run build-lib

# Build Storybook
npm run build-storybook

# Run accessibility tests
npm run test:a11y

# Lint code
npm run lint

# Type check
npm run type-check
```

**Component Generation:**
```bash
# Create new component
npm run create:component ComponentName

# Run full test suite
npm run test:all

# Validate implementation
npm run validate
```

## Code Implementation Standards

**All code MUST implement the architecture specified in `CLAUDE.md` and document technical details in `docs/FRS.md`.**

### Implementation Rules

### Mandatory Implementation Rules

**Code Quality Rules:**
1. All code MUST be TypeScript with strict type checking
2. All components MUST have comprehensive prop interfaces
3. All components MUST include accessibility attributes
4. All components MUST have unit tests with 90%+ coverage
5. All components MUST have Storybook stories
6. All styling MUST use design tokens
7. All components MUST support className prop
8. All interactive components MUST handle keyboard navigation

**File Naming Rules:**
- Components: PascalCase (e.g., `Button.tsx`)
- Tests: `ComponentName.test.tsx`
- Stories: `ComponentName.stories.tsx`
- Styles: `ComponentName.module.css`
- Types: `ComponentName.types.ts`

**Import/Export Rules:**
- Named exports only (no default exports)
- Barrel exports in index.ts files
- Explicit imports (no `import *`)

### React/TypeScript Implementation

### React + TypeScript Implementation Standards

**Component Template:**
```typescript
import React from 'react';
import { clsx } from 'clsx';
import styles from './Component.module.css';

export interface ComponentProps {
  /**
   * Visual variant of the component
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline';
  
  /**
   * Size of the component
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Component children
   */
  children: React.ReactNode;
}

export const Component = React.forwardRef<
  HTMLElement,
  ComponentProps
>(({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  ...props
}, ref) => {
  const componentClasses = clsx(
    styles.component,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    {
      [styles.disabled]: disabled,
    },
    className
  );

  return (
    <element
      ref={ref}
      className={componentClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </element>
  );
});

Component.displayName = 'Component';
```

### CSS Implementation Standards

### CSS Implementation Standards

**CSS Module Structure:**
```css
/* Component.module.css */
.component {
  /* Base styles using design tokens */
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  /* Spacing */
  padding: var(--spacing-md) var(--spacing-lg);
  margin: 0;
  
  /* Appearance */
  border: 1px solid transparent;
  border-radius: var(--border-radius-md);
  background-color: transparent;
  
  /* Transitions */
  transition: all var(--transition-duration-fast) var(--transition-easing-ease);
  
  /* Accessibility */
  cursor: pointer;
  user-select: none;
}

/* Variants */
.variant-primary {
  background-color: var(--color-primary-500);
  color: var(--color-white);
  border-color: var(--color-primary-500);
}

.variant-primary:hover {
  background-color: var(--color-primary-600);
  border-color: var(--color-primary-600);
}

.variant-primary:focus {
  outline: 2px solid var(--color-primary-200);
  outline-offset: 2px;
}

/* Sizes */
.size-sm {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.size-lg {
  padding: var(--spacing-lg) var(--spacing-xl);
  font-size: var(--font-size-lg);
}

/* States */
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

/* Responsive design */
@media (min-width: 768px) {
  .component {
    /* Tablet styles */
  }
}

@media (min-width: 1024px) {
  .component {
    /* Desktop styles */
  }
}
```

**CSS Requirements:**
- Use CSS custom properties for all values
- Follow BEM-like naming within modules
- Include focus states for accessibility
- Support responsive design
- Use logical properties where possible

### Storybook Implementation

### Storybook Implementation Requirements

**Complete Story Example:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Foundation/Component',
  component: Component,
  parameters: {
    docs: {
      description: {
        component: `
Component description with usage guidelines.

## When to use
- Use case 1
- Use case 2

## When not to use
- Avoid case 1
- Avoid case 2
        `
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline'],
      description: 'Visual variant of the component'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the component is disabled'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Component Content'
  }
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Component variant="primary">Primary</Component>
      <Component variant="secondary">Secondary</Component>
      <Component variant="outline">Outline</Component>
    </div>
  )
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Component size="sm">Small</Component>
      <Component size="md">Medium</Component>
      <Component size="lg">Large</Component>
    </div>
  )
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled'
  }
};
```

**Story Requirements:**
- Default story with common usage
- Variant showcase stories
- Size demonstration stories
- Disabled/edge case stories
- Accessibility testing integration
- Comprehensive documentation

### File Organization Implementation

### File Organization Implementation

**Component Directory Structure:**
```
src/
├── components/
│   └── ComponentName/
│       ├── index.ts                 # Public exports
│       ├── ComponentName.tsx        # Main component
│       ├── ComponentName.types.ts   # Type definitions
│       ├── ComponentName.module.css # Component styles
│       ├── ComponentName.test.tsx   # Unit tests
│       ├── ComponentName.stories.tsx # Storybook stories
│       └── README.md               # Component documentation
├── tokens/
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── index.ts
├── utils/
│   ├── classNames.ts
│   ├── accessibility.ts
│   └── index.ts
└── types/
    ├── common.ts
    └── index.ts
```

**Index File Pattern:**
```typescript
// components/ComponentName/index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';

// components/index.ts
export { ComponentName } from './ComponentName';
// ... other exports
```

## Testing Implementation Protocols

**All testing MUST implement the testing strategy defined in `CLAUDE.md` and document test specifications in `docs/FRS.md`.**

### Testing Implementation Principles
### Testing Implementation Principles

**Testing Strategy:**
1. **Unit Tests**: Test component behavior in isolation
2. **Integration Tests**: Test component interactions
3. **Accessibility Tests**: Automated a11y validation
4. **Visual Tests**: Screenshot comparison (when available)

**Test Coverage Requirements:**
- 90%+ line coverage
- 100% branch coverage for critical paths
- All prop combinations tested
- All event handlers tested
- All accessibility features tested

**Testing Philosophy:**
- Test behavior, not implementation
- Focus on user interactions
- Validate accessibility features
- Test edge cases and error states
- Mock external dependencies

### Unit Testing Implementation
### Unit Testing Implementation

**Test Template:**
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders with default props', () => {
    render(<ComponentName>Test Content</ComponentName>);
    
    const component = screen.getByRole('button');
    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent('Test Content');
  });

  it('applies variant classes correctly', () => {
    render(<ComponentName variant="secondary">Test</ComponentName>);
    
    const component = screen.getByRole('button');
    expect(component).toHaveClass('variant-secondary');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<ComponentName onClick={handleClick}>Test</ComponentName>);
    
    const component = screen.getByRole('button');
    fireEvent.click(component);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('respects disabled state', () => {
    const handleClick = jest.fn();
    render(
      <ComponentName disabled onClick={handleClick}>
        Test
      </ComponentName>
    );
    
    const component = screen.getByRole('button');
    expect(component).toBeDisabled();
    
    fireEvent.click(component);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('meets accessibility requirements', async () => {
    const { container } = render(<ComponentName>Test</ComponentName>);
    
    // Test keyboard navigation
    const component = screen.getByRole('button');
    component.focus();
    expect(component).toHaveFocus();
    
    // Test ARIA attributes
    expect(component).toHaveAttribute('type', 'button');
    
    // Run accessibility audit
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

**Test Requirements:**
- Test all prop variations
- Test all user interactions
- Test accessibility features
- Test error boundaries
- Test responsive behavior
- Mock external dependencies properly

### Testing Implementation Requirements

### Testing Implementation Requirements

**Required Test Types:**
1. **Render Tests**: Component renders correctly
2. **Prop Tests**: All props work as expected
3. **Event Tests**: User interactions function properly
4. **Accessibility Tests**: WCAG compliance validation
5. **Edge Case Tests**: Error states and boundaries
6. **Integration Tests**: Component composition testing

**Accessibility Testing Requirements:**
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// In every component test file
it('has no accessibility violations', async () => {
  const { container } = render(<Component>Test</Component>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

**Performance Testing:**
```typescript
it('renders within performance budget', () => {
  const startTime = performance.now();
  render(<Component>Test</Component>);
  const endTime = performance.now();
  
  expect(endTime - startTime).toBeLessThan(16); // 60fps threshold
});
```

### Implementation Quality Gates

### Implementation Quality Gates

**Pre-commit Quality Gates:**
1. TypeScript compilation successful
2. ESLint passes with zero warnings
3. Prettier formatting applied
4. All unit tests pass
5. Test coverage ≥ 90%
6. No accessibility violations
7. Bundle size within budget

**Pre-merge Quality Gates:**
1. All pre-commit gates pass
2. Storybook builds successfully
3. Visual regression tests pass
4. Integration tests pass
5. Performance budget maintained
6. Documentation updated
7. Code review approved

**Release Quality Gates:**
1. All pre-merge gates pass
2. End-to-end tests pass
3. Cross-browser testing complete
4. Accessibility audit complete
5. Security scan passes
6. Changelog updated
7. Version bumped appropriately

**Automated Checks:**
```bash
# Run all quality checks
npm run check:all

# Individual checks
npm run check:types
npm run check:lint
npm run check:test
npm run check:a11y
npm run check:build
npm run check:bundle-size
```

## Technology Implementation

**Implement the technology stack specified in `CLAUDE.md` and document configurations in `docs/FRS.md`.**

### Core Technology Implementation

### Core Technology Implementation

**React 18+ Implementation:**
```typescript
// Use React 18 features appropriately
import React, { Suspense, lazy } from 'react';

// Concurrent features for better UX
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

**TypeScript 5+ Configuration:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  }
}
```

**Development Dependencies:**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.0.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0"
}
```

### Build System Implementation

### Build System Implementation

**Vite Configuration (vite.config.ts):**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystem',
      formats: ['es', 'umd'],
      fileName: (format) => `design-system.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  }
});
```

**Package.json Scripts:**
```json
{
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "npm run build-lib && npm run build-storybook",
    "build-lib": "vite build",
    "build-storybook": "storybook build",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.{ts,tsx}",
    "lint:fix": "eslint src/**/*.{ts,tsx} --fix",
    "type-check": "tsc --noEmit",
    "check:all": "npm run type-check && npm run lint && npm run test && npm run build"
  }
}
```

### Deployment Implementation

### Deployment Implementation

**GitHub Actions Workflow:**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test:coverage
      - run: npm run build
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build-storybook
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2.0
        with:
          publish-dir: './storybook-static'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

**NPM Publishing:**
```json
{
  "name": "@company/design-system",
  "version": "1.0.0",
  "main": "dist/design-system.umd.js",
  "module": "dist/design-system.es.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

## Component Implementation Guide

### Component Implementation Requirements

When implementing components per the architecture in CLAUDE.md, AI agents MUST follow this process:

### Component Implementation Requirements

**Implementation Checklist:**
- [ ] Architecture compliance verified against CLAUDE.md
- [ ] TypeScript interface defined with JSDoc
- [ ] Design tokens integrated for all styling
- [ ] Accessibility attributes implemented
- [ ] Keyboard navigation support added
- [ ] Focus management implemented
- [ ] Unit tests written (90%+ coverage)
- [ ] Accessibility tests included
- [ ] Storybook stories created
- [ ] Component documented in README
- [ ] Integration tests written
- [ ] Performance validated
- [ ] FRS.md updated with implementation details

**Pre-Implementation Review:**
1. Verify component exists in CLAUDE.md architecture
2. Check design token requirements
3. Identify accessibility needs
4. Plan testing strategy
5. Review integration points

#### 1. Architecture Compliance Check

### Architecture Compliance Check

**Before implementing any component, verify:**

1. **CLAUDE.md Alignment:**
   - Component is defined in architectural specification
   - Design pattern matches architectural decisions
   - Technology choices align with stack decisions
   - Quality requirements are understood

2. **Design Token Usage:**
   - All colors use design token variables
   - Spacing follows token scale
   - Typography uses token system
   - Border radius uses token values

3. **Accessibility Requirements:**
   - WCAG 2.1 AA compliance planned
   - Keyboard navigation designed
   - Screen reader support considered
   - Color contrast verified

4. **Performance Considerations:**
   - Bundle size impact assessed
   - Tree-shaking compatibility ensured
   - Runtime performance optimized
   - Memory usage minimized

**Compliance Validation:**
```bash
# Run architecture compliance check
npm run check:architecture ComponentName
```

#### 2. Component Implementation Template

### Component Implementation Template

**Step 1: Create Component Structure**
```bash
mkdir src/components/ComponentName
cd src/components/ComponentName

# Create required files
touch index.ts
touch ComponentName.tsx
touch ComponentName.types.ts
touch ComponentName.module.css
touch ComponentName.test.tsx
touch ComponentName.stories.tsx
touch README.md
```

**Step 2: Implement TypeScript Interface**
```typescript
// ComponentName.types.ts
export interface ComponentNameProps {
  /**
   * Description of the prop
   * @default defaultValue
   */
  propName?: PropType;
  
  /**
   * Required prop description
   */
  requiredProp: RequiredType;
  
  /**
   * Event handler description
   */
  onEvent?: (event: EventType) => void;
  
  /**
   * Children content
   */
  children?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
```

**Step 3: Implement Component**
```typescript
// ComponentName.tsx
import React from 'react';
import { clsx } from 'clsx';
import styles from './ComponentName.module.css';
import type { ComponentNameProps } from './ComponentName.types';

export const ComponentName = React.forwardRef<
  HTMLElement,
  ComponentNameProps
>(({
  propName = 'defaultValue',
  requiredProp,
  onEvent,
  children,
  className,
  ...props
}, ref) => {
  // Component logic here

  return (
    <element
      ref={ref}
      className={clsx(styles.component, className)}
      {...props}
    >
      {children}
    </element>
  );
});

ComponentName.displayName = 'ComponentName';
```

**Step 4: Export Component**
```typescript
// index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
```

#### 3. Styling Implementation

### Component Styling Implementation

**CSS Module Template:**
```css
/* ComponentName.module.css */

/* Base component styles */
.component {
  /* Layout */
  display: flex;
  
  /* Typography */
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  
  /* Colors */
  color: var(--color-text-primary);
  background-color: var(--color-background-primary);
  
  /* Spacing */
  padding: var(--spacing-md);
  margin: 0;
  
  /* Border */
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-md);
  
  /* Transitions */
  transition: all var(--transition-duration-fast) var(--transition-easing-ease);
}

/* Hover states */
.component:hover {
  background-color: var(--color-background-primary-hover);
  border-color: var(--color-border-primary-hover);
}

/* Focus states */
.component:focus,
.component:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

/* Active states */
.component:active {
  background-color: var(--color-background-primary-active);
}

/* Disabled states */
.component:disabled,
.component[aria-disabled="true"] {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
  pointer-events: none;
}

/* Variants */
.variant-primary {
  background-color: var(--color-primary-500);
  color: var(--color-white);
  border-color: var(--color-primary-500);
}

.variant-secondary {
  background-color: var(--color-secondary-500);
  color: var(--color-white);
  border-color: var(--color-secondary-500);
}

/* Sizes */
.size-sm {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.size-lg {
  padding: var(--spacing-lg) var(--spacing-xl);
  font-size: var(--font-size-lg);
}

/* Responsive design */
@media (max-width: 768px) {
  .component {
    /* Mobile styles */
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .component {
    /* Tablet styles */
  }
}

@media (min-width: 1025px) {
  .component {
    /* Desktop styles */
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .component {
    transition: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .component {
    border-width: 2px;
  }
}
```

**Styling Requirements:**
- Use design tokens for all values
- Include all interaction states
- Support responsive design
- Implement accessibility features
- Follow consistent naming patterns

#### 4. Storybook Implementation

### Storybook Component Implementation

**Complete Stories File:**
```typescript
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: `
# ComponentName

Description of the component and its purpose.

## Usage Guidelines

### When to use
- Use case 1
- Use case 2

### When not to use
- Avoid case 1
- Avoid case 2

## Accessibility

This component follows WCAG 2.1 AA guidelines:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## Performance

- Tree-shakable
- Minimal runtime overhead
- Optimized for modern browsers
        `
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          },
          {
            id: 'keyboard-navigation',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline'],
      description: 'Visual variant of the component'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the component is disabled'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Component Content'
  }
};

// Variant showcase
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
      <ComponentName variant="outline">Outline</ComponentName>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants of the component.'
      }
    }
  }
};

// Size showcase
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ComponentName size="sm">Small</ComponentName>
      <ComponentName size="md">Medium</ComponentName>
      <ComponentName size="lg">Large</ComponentName>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different sizes of the component.'
      }
    }
  }
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Component'
  },
  parameters: {
    docs: {
      description: {
        story: 'Component in disabled state.'
      }
    }
  }
};

// Interactive example
export const Interactive: Story = {
  args: {
    children: 'Click me',
    onClick: () => alert('Component clicked!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example with event handling.'
      }
    }
  }
};

// Accessibility demonstration
export const AccessibilityDemo: Story = {
  render: () => (
    <div>
      <p>Use Tab to navigate between components:</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <ComponentName>First</ComponentName>
        <ComponentName>Second</ComponentName>
        <ComponentName disabled>Disabled (skipped)</ComponentName>
        <ComponentName>Third</ComponentName>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of keyboard navigation and accessibility features.'
      }
    }
  }
};
```

**Story Requirements:**
- Include all component variants
- Demonstrate all prop combinations
- Show accessibility features
- Provide usage examples
- Include performance notes

#### 5. Testing Implementation

### Component Testing Implementation

**Complete Test Suite:**
```typescript
// ComponentName.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ComponentName } from './ComponentName';
import type { ComponentNameProps } from './ComponentName.types';

expect.extend(toHaveNoViolations);

// Test utilities
const defaultProps: ComponentNameProps = {
  children: 'Test Content'
};

const renderComponent = (props: Partial<ComponentNameProps> = {}) => {
  return render(<ComponentName {...defaultProps} {...props} />);
};

describe('ComponentName', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      renderComponent();
      
      const component = screen.getByRole('button');
      expect(component).toBeInTheDocument();
      expect(component).toHaveTextContent('Test Content');
    });

    it('renders with custom className', () => {
      renderComponent({ className: 'custom-class' });
      
      const component = screen.getByRole('button');
      expect(component).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<ComponentName ref={ref}>Test</ComponentName>);
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Variants', () => {
    it('applies primary variant class', () => {
      renderComponent({ variant: 'primary' });
      
      const component = screen.getByRole('button');
      expect(component).toHaveClass('variant-primary');
    });

    it('applies secondary variant class', () => {
      renderComponent({ variant: 'secondary' });
      
      const component = screen.getByRole('button');
      expect(component).toHaveClass('variant-secondary');
    });
  });

  describe('Sizes', () => {
    it('applies small size class', () => {
      renderComponent({ size: 'sm' });
      
      const component = screen.getByRole('button');
      expect(component).toHaveClass('size-sm');
    });

    it('applies large size class', () => {
      renderComponent({ size: 'lg' });
      
      const component = screen.getByRole('button');
      expect(component).toHaveClass('size-lg');
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      renderComponent({ disabled: true });
      
      const component = screen.getByRole('button');
      expect(component).toBeDisabled();
      expect(component).toHaveClass('disabled');
    });

    it('prevents click when disabled', () => {
      const handleClick = jest.fn();
      renderComponent({ disabled: true, onClick: handleClick });
      
      const component = screen.getByRole('button');
      fireEvent.click(component);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Events', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      renderComponent({ onClick: handleClick });
      
      const component = screen.getByRole('button');
      await user.click(component);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      renderComponent({ onClick: handleClick });
      
      const component = screen.getByRole('button');
      component.focus();
      await user.keyboard('{Enter}');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = renderComponent();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      renderComponent();
      
      const component = screen.getByRole('button');
      await user.tab();
      
      expect(component).toHaveFocus();
    });

    it('has correct ARIA attributes', () => {
      renderComponent({ disabled: true });
      
      const component = screen.getByRole('button');
      expect(component).toHaveAttribute('aria-disabled', 'true');
    });

    it('supports screen readers', () => {
      renderComponent({ 'aria-label': 'Custom label' });
      
      const component = screen.getByRole('button');
      expect(component).toHaveAccessibleName('Custom label');
    });
  });

  describe('Performance', () => {
    it('renders within performance budget', () => {
      const startTime = performance.now();
      renderComponent();
      const endTime = performance.now();
      
      // Should render within 16ms (60fps)
      expect(endTime - startTime).toBeLessThan(16);
    });

    it('does not cause memory leaks', () => {
      const { unmount } = renderComponent();
      
      // Verify component unmounts cleanly
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Integration', () => {
    it('works with form elements', () => {
      render(
        <form>
          <ComponentName type="submit">Submit</ComponentName>
        </form>
      );
      
      const component = screen.getByRole('button');
      expect(component).toHaveAttribute('type', 'submit');
    });

    it('integrates with other components', () => {
      render(
        <div>
          <ComponentName>First</ComponentName>
          <ComponentName>Second</ComponentName>
        </div>
      );
      
      const components = screen.getAllByRole('button');
      expect(components).toHaveLength(2);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(<ComponentName />);
      
      const component = screen.getByRole('button');
      expect(component).toBeInTheDocument();
    });

    it('handles complex children', () => {
      render(
        <ComponentName>
          <span>Complex</span>
          <strong>Children</strong>
        </ComponentName>
      );
      
      const component = screen.getByRole('button');
      expect(component).toHaveTextContent('ComplexChildren');
    });

    it('handles rapid successive clicks', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      renderComponent({ onClick: handleClick });
      
      const component = screen.getByRole('button');
      
      // Rapid clicks
      await user.click(component);
      await user.click(component);
      await user.click(component);
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });
});
```

**Testing Requirements:**
- Test all component functionality
- Include accessibility testing
- Test all prop combinations
- Test event handling
- Test edge cases and error states
- Achieve 90%+ code coverage

#### 6. FRS Documentation

### FRS Documentation Requirements

**Required FRS Updates After Implementation:**

1. **Component API Documentation:**
   ```markdown
   ### ComponentName API

   **Props Interface:**
   \`\`\`typescript
   interface ComponentNameProps {
     variant?: 'primary' | 'secondary' | 'outline';
     size?: 'sm' | 'md' | 'lg';
     disabled?: boolean;
     className?: string;
     children: React.ReactNode;
     onClick?: (event: React.MouseEvent) => void;
   }
   \`\`\`

   **Usage Example:**
   \`\`\`typescript
   import { ComponentName } from '@company/design-system';

   function App() {
     return (
       <ComponentName 
         variant="primary" 
         size="lg"
         onClick={() => console.log('clicked')}
       >
         Click me
       </ComponentName>
     );
   }
   \`\`\`
   ```

2. **Technical Implementation Details:**
   - Bundle size impact
   - Performance characteristics
   - Accessibility features implemented
   - Browser compatibility
   - Known limitations

3. **Integration Patterns:**
   - Framework integration examples
   - Common usage patterns
   - Best practices
   - Troubleshooting guide

4. **Testing Coverage:**
   - Test scenarios covered
   - Accessibility test results
   - Performance benchmarks
   - Browser testing results

**FRS Update Process:**
1. Implement component
2. Document technical specifications
3. Update FRS.md with implementation details
4. Review and validate documentation
5. Merge changes

#### 7. Integration Implementation

### Integration Implementation

**Framework Integration Examples:**

**Next.js Integration:**
```typescript
// pages/_app.tsx
import type { AppProps } from 'next/app';
import '@company/design-system/dist/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// pages/index.tsx
import { Button, Card } from '@company/design-system';

export default function Home() {
  return (
    <Card>
      <Button variant="primary">Next.js Integration</Button>
    </Card>
  );
}
```

**Vite Integration:**
```typescript
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@company/design-system/dist/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**webpack Integration:**
```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

**Theme Integration:**
```typescript
import { ThemeProvider, createTheme } from '@company/design-system';

const customTheme = createTheme({
  colors: {
    primary: '#custom-color'
  }
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Component Categories Implementation

### Component Categories Implementation

**Foundation Components (Atoms):**
- Button: Interactive element with variants and states
- Input: Form input with validation states
- Text: Typography component with semantic variants
- Icon: SVG icon system with accessibility
- Avatar: User profile image with fallbacks
- Badge: Status indicators and labels

**Layout Components (Molecules):**
- Card: Content container with header/body/footer
- Stack: Vertical layout with consistent spacing
- Grid: Responsive grid system
- Flex: Flexible layout container
- Divider: Visual separator element
- Container: Page width container

**Complex Components (Organisms):**
- Modal: Overlay dialog with focus management
- Table: Data table with sorting and filtering
- Form: Complete form with validation
- Navigation: App navigation with responsive behavior
- Pagination: Data pagination controls
- Dropdown: Menu system with keyboard navigation

**Pattern Components (Templates):**
- Page: Complete page layout templates
- Dashboard: Admin dashboard patterns
- Auth: Authentication form patterns
- Settings: Settings page patterns

**Implementation Priority:**
1. Foundation components first
2. Layout components second
3. Complex components third
4. Pattern components last

**Each component must include:**
- TypeScript interface
- CSS Module styles
- Unit tests (90%+ coverage)
- Storybook stories
- Accessibility features
- Performance optimization

### Design Token Implementation

### Design Token Implementation

**Token Structure:**
```typescript
// tokens/colors.ts
export const colors = {
  // Primitive colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    500: '#6b7280',
    900: '#111827'
  },
  
  // Semantic colors
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    900: '#1e3a8a'
  },
  
  // Functional colors
  text: {
    primary: 'var(--color-gray-900)',
    secondary: 'var(--color-gray-600)',
    disabled: 'var(--color-gray-400)'
  },
  
  background: {
    primary: '#ffffff',
    secondary: 'var(--color-gray-50)',
    disabled: 'var(--color-gray-100)'
  }
};
```

**CSS Variable Generation:**
```css
:root {
  /* Color tokens */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-500: #6b7280;
  --color-gray-900: #111827;
  
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
  
  /* Spacing tokens */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Typography tokens */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --line-height-tight: 1.25;
  --line-height-base: 1.5;
  --line-height-relaxed: 1.75;
  
  /* Border tokens */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-width-thin: 1px;
  --border-width-thick: 2px;
  
  /* Shadow tokens */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
  
  /* Transition tokens */
  --transition-duration-fast: 150ms;
  --transition-duration-normal: 300ms;
  --transition-easing-ease: ease;
  --transition-easing-ease-in: ease-in;
  --transition-easing-ease-out: ease-out;
}

/* Dark theme tokens */
[data-theme="dark"] {
  --color-text-primary: var(--color-gray-50);
  --color-background-primary: var(--color-gray-900);
  /* ... other dark theme overrides */
}
```

**Token Implementation Requirements:**
- Use semantic naming for functional tokens
- Support light and dark themes
- Include responsive typography scales
- Provide accessibility-compliant color contrasts
- Support CSS custom properties for runtime theming

### Accessibility Implementation

### Accessibility Implementation

**WCAG 2.1 AA Compliance Requirements:**

1. **Keyboard Navigation:**
   ```typescript
   // Implement keyboard event handlers
   const handleKeyDown = (event: React.KeyboardEvent) => {
     switch (event.key) {
       case 'Enter':
       case ' ':
         event.preventDefault();
         onClick?.(event as any);
         break;
       case 'Escape':
         onClose?.();
         break;
       case 'Tab':
         // Handle focus management
         break;
     }
   };
   ```

2. **ARIA Attributes:**
   ```typescript
   <button
     type="button"
     role="button"
     aria-label={ariaLabel}
     aria-describedby={ariaDescribedBy}
     aria-expanded={isExpanded}
     aria-pressed={isPressed}
     aria-disabled={disabled}
     tabIndex={disabled ? -1 : 0}
   >
     {children}
   </button>
   ```

3. **Focus Management:**
   ```typescript
   import { useRef, useEffect } from 'react';

   const ComponentName: React.FC<Props> = ({ autoFocus }) => {
     const elementRef = useRef<HTMLElement>(null);

     useEffect(() => {
       if (autoFocus && elementRef.current) {
         elementRef.current.focus();
       }
     }, [autoFocus]);

     return <element ref={elementRef} />;
   };
   ```

4. **Color Contrast:**
   ```css
   /* Ensure minimum 4.5:1 contrast ratio */
   .component {
     color: var(--color-text-primary); /* #111827 on #ffffff = 16:1 */
     background-color: var(--color-background-primary);
   }

   .component:focus {
     outline: 2px solid var(--color-focus-ring); /* High contrast focus indicator */
     outline-offset: 2px;
   }
   ```

5. **Screen Reader Support:**
   ```typescript
   // Provide meaningful labels and descriptions
   <button
     aria-label="Close dialog"
     aria-describedby="dialog-description"
   >
     <Icon name="close" aria-hidden="true" />
   </button>

   <div id="dialog-description" className="sr-only">
     This action will close the dialog and discard changes
   </div>
   ```

**Accessibility Testing:**
```typescript
// Include in every component test
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

**Accessibility Checklist:**
- [ ] Keyboard navigation implemented
- [ ] ARIA attributes correctly applied
- [ ] Focus indicators visible and clear
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader labels provided
- [ ] Automated accessibility tests pass
- [ ] Manual keyboard testing completed
- [ ] Screen reader testing completed

### Performance Implementation

### Performance Implementation

**Performance Requirements:**

1. **Bundle Size Optimization:**
   ```typescript
   // Tree-shakable exports
   export { Button } from './Button';
   export { Input } from './Input';
   // Avoid barrel exports that include everything

   // Lazy loading for complex components
   const Modal = React.lazy(() => import('./Modal'));
   ```

2. **Runtime Performance:**
   ```typescript
   // Memoize expensive calculations
   const memoizedValue = useMemo(() => {
     return expensiveCalculation(props);
   }, [props.dependency]);

   // Optimize re-renders
   const MemoizedComponent = React.memo(Component);

   // Use callback optimization
   const handleClick = useCallback((event) => {
     onClick?.(event);
   }, [onClick]);
   ```

3. **CSS Performance:**
   ```css
   /* Use efficient selectors */
   .component {
     /* Avoid complex selectors */
   }

   /* Minimize paint and layout operations */
   .component {
     transform: translateX(0); /* Use transforms for animations */
     will-change: transform; /* Hint browser for optimization */
   }

   /* Optimize animations */
   @media (prefers-reduced-motion: no-preference) {
     .component {
       transition: transform 0.2s ease;
     }
   }
   ```

4. **Memory Management:**
   ```typescript
   // Clean up event listeners
   useEffect(() => {
     const handleResize = () => {
       // Handle resize
     };

     window.addEventListener('resize', handleResize);
     
     return () => {
       window.removeEventListener('resize', handleResize);
     };
   }, []);

   // Clean up timers
   useEffect(() => {
     const timer = setTimeout(() => {
       // Timer logic
     }, 1000);

     return () => clearTimeout(timer);
   }, []);
   ```

**Performance Budget:**
- Component bundle size: <10KB gzipped
- First paint: <100ms
- Interactive: <200ms
- Memory usage: <5MB per component
- CPU usage: <10ms per interaction

**Performance Testing:**
```typescript
// Include performance tests
it('renders within performance budget', () => {
  const startTime = performance.now();
  render(<Component />);
  const endTime = performance.now();
  
  expect(endTime - startTime).toBeLessThan(16); // 60fps budget
});

// Bundle size testing
it('has acceptable bundle size', () => {
  const bundleSize = getBundleSize('Component');
  expect(bundleSize).toBeLessThan(10 * 1024); // 10KB limit
});
```

**Performance Monitoring:**
- Monitor bundle sizes in CI/CD
- Track Core Web Vitals
- Set performance budgets
- Use Lighthouse CI for automated audits
- Monitor runtime performance metrics

## Automated Implementation Workflow

### Implementation Process

### Implementation Process Workflow

**Step-by-Step Implementation Process:**

1. **Planning Phase (30 minutes):**
   - [ ] Review CLAUDE.md architectural requirements
   - [ ] Identify component requirements and constraints
   - [ ] Plan design token usage
   - [ ] Design accessibility strategy
   - [ ] Plan testing approach

2. **Setup Phase (15 minutes):**
   - [ ] Create component directory structure
   - [ ] Set up basic files (component, types, styles, tests, stories)
   - [ ] Configure development environment

3. **Implementation Phase (2-4 hours):**
   - [ ] Implement TypeScript interface with JSDoc
   - [ ] Build component with accessibility features
   - [ ] Create CSS Module styles with design tokens
   - [ ] Implement keyboard navigation
   - [ ] Add ARIA attributes and labels

4. **Testing Phase (1-2 hours):**
   - [ ] Write comprehensive unit tests
   - [ ] Add accessibility tests with jest-axe
   - [ ] Test keyboard navigation manually
   - [ ] Verify screen reader compatibility
   - [ ] Validate performance benchmarks

5. **Documentation Phase (30 minutes):**
   - [ ] Create Storybook stories for all variants
   - [ ] Write component README with usage examples
   - [ ] Document accessibility features
   - [ ] Add integration examples

6. **Integration Phase (30 minutes):**
   - [ ] Test component with other components
   - [ ] Verify build process works correctly
   - [ ] Test in different browsers
   - [ ] Validate responsive behavior

7. **Review Phase (30 minutes):**
   - [ ] Run all quality checks
   - [ ] Review code for compliance
   - [ ] Update FRS.md with implementation details
   - [ ] Create pull request for review

8. **Deployment Phase (15 minutes):**
   - [ ] Merge approved changes
   - [ ] Update version and changelog
   - [ ] Deploy documentation updates
   - [ ] Communicate changes to team

**Quality Checkpoints:**
- After each phase, run: `npm run check:all`
- Before PR: Complete accessibility audit
- Before merge: All tests pass and coverage ≥ 90%
- Before release: Cross-browser testing complete

### Quality Assurance Implementation

### Quality Assurance Implementation

**QA Process Integration:**

1. **Pre-Development QA:**
   ```bash
   # Architecture compliance check
   npm run check:architecture ComponentName
   
   # Design token validation
   npm run validate:tokens
   ```

2. **Development QA:**
   ```bash
   # Continuous validation during development
   npm run dev # Includes type checking and linting
   npm run test:watch # Continuous testing
   ```

3. **Pre-Commit QA:**
   ```bash
   # Automated pre-commit hooks
   npm run lint:fix
   npm run type-check
   npm run test
   npm run test:a11y
   ```

4. **Pre-Merge QA:**
   ```bash
   # Complete QA suite
   npm run check:all
   npm run build
   npm run test:integration
   npm run test:e2e
   ```

**QA Standards:**
- Code coverage: ≥90%
- Accessibility: WCAG 2.1 AA compliance
- Performance: Within defined budgets
- Browser support: Modern browsers (last 2 versions)
- Type safety: Zero TypeScript errors
- Linting: Zero ESLint warnings/errors

**Automated QA Tools:**
- ESLint for code quality
- Prettier for formatting
- TypeScript for type safety
- Jest for unit testing
- React Testing Library for component testing
- jest-axe for accessibility testing
- Chromatic for visual testing (when available)
- Lighthouse CI for performance testing

**Manual QA Checklist:**
- [ ] Keyboard navigation works correctly
- [ ] Screen reader announces content properly
- [ ] Component works in all supported browsers
- [ ] Responsive design functions correctly
- [ ] Dark/light themes work properly
- [ ] Component integrates well with others
- [ ] Performance is within acceptable limits
- [ ] Accessibility features are complete

### FRS Documentation Process

### FRS Documentation Process

**Automated FRS.md Generation Process:**

1. **Implementation Analysis:**
   - Scan component implementations for API details
   - Extract TypeScript interfaces and prop definitions
   - Analyze CSS modules for styling patterns
   - Review test files for coverage and scenarios
   - Collect performance benchmarks

2. **Technical Specification Extraction:**
   - Component APIs with full TypeScript definitions
   - Integration patterns and usage examples
   - Build configuration details
   - Testing methodologies and coverage
   - Performance characteristics and budgets

3. **Architecture Compliance Validation:**
   - Verify implementation matches CLAUDE.md specifications
   - Document any deviations with justifications
   - Confirm accessibility requirements are met
   - Validate technology stack decisions

4. **FRS Content Generation:**
   ```bash
   # Generate FRS.md from implementation
   npm run generate:frs
   
   # Manual update process
   npm run update:frs ComponentName
   ```

**FRS Content Structure:**
- System architecture as implemented
- Component library specifications
- Technology stack configuration
- Build system details
- Testing framework implementation
- Performance metrics and budgets
- Deployment configuration
- Quality assurance results

**FRS Update Triggers:**
- New component implementations
- Architecture pattern changes
- Technology stack updates
- Performance optimization changes
- Build system modifications
- Testing framework updates

**FRS Maintenance:**
- Weekly automated updates
- Manual review and validation
- Version control for all changes
- Stakeholder notification of updates

## Implementation Troubleshooting

### Implementation Troubleshooting

**Common Issues and Solutions:**

1. **TypeScript Compilation Errors:**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit --pretty
   
   # Common fixes:
   # - Add missing type imports
   # - Update interface definitions
   # - Check generic type constraints
   ```

2. **CSS Module Issues:**
   ```bash
   # Generate CSS type definitions
   npm run generate:css-types
   
   # Common fixes:
   # - Verify CSS module naming
   # - Check import statements
   # - Validate class name usage
   ```

3. **Storybook Build Failures:**
   ```bash
   # Clear Storybook cache
   npm run storybook:clear-cache
   
   # Common fixes:
   # - Update story syntax
   # - Check addon configuration
   # - Verify asset imports
   ```

4. **Test Failures:**
   ```bash
   # Run tests with detailed output
   npm run test -- --verbose
   
   # Common fixes:
   # - Update test queries
   # - Mock external dependencies
   # - Fix async test handling
   ```

5. **Accessibility Violations:**
   ```bash
   # Run accessibility audit
   npm run test:a11y
   
   # Common fixes:
   # - Add missing ARIA labels
   # - Improve color contrast
   # - Fix keyboard navigation
   ```

6. **Performance Issues:**
   ```bash
   # Analyze bundle size
   npm run analyze:bundle
   
   # Common fixes:
   # - Remove unused dependencies
   # - Optimize imports
   # - Add lazy loading
   ```

**Debug Commands:**
```bash
# Development debugging
npm run dev:debug
npm run test:debug
npm run storybook:debug

# Build debugging
npm run build:analyze
npm run build:verbose

# Performance debugging
npm run perf:analyze
npm run bundle:analyze
```

**Getting Help:**
- Check component README files
- Review Storybook documentation
- Consult CLAUDE.md for architecture guidance
- Check GitHub issues for known problems
- Contact design system team for support

## Implementation Success Criteria

### Implementation Success Criteria

**Component Implementation Success Criteria:**

1. **Functionality Criteria (25%):**
   - [ ] All required props implemented and functional
   - [ ] All variants and states work correctly
   - [ ] Event handlers function as expected
   - [ ] Component renders without errors
   - [ ] Integration with other components works

2. **Quality Criteria (25%):**
   - [ ] TypeScript compilation successful (0 errors)
   - [ ] ESLint passes (0 warnings/errors)
   - [ ] Test coverage ≥ 90%
   - [ ] All tests pass
   - [ ] Performance within budget

3. **Accessibility Criteria (25%):**
   - [ ] WCAG 2.1 AA compliance verified
   - [ ] Keyboard navigation implemented
   - [ ] Screen reader compatibility confirmed
   - [ ] Focus management working
   - [ ] Color contrast validated

4. **Documentation Criteria (25%):**
   - [ ] Storybook stories complete and functional
   - [ ] Component README written
   - [ ] API documentation complete
   - [ ] Usage examples provided
   - [ ] FRS.md updated

**Project-Level Success Criteria:**

1. **Architecture Compliance:**
   - [ ] All components follow architectural patterns
   - [ ] Design tokens used consistently
   - [ ] File organization matches standards
   - [ ] Code style guidelines followed

2. **Performance Targets:**
   - [ ] Bundle size < 500KB total
   - [ ] Individual components < 10KB
   - [ ] Build time < 30 seconds
   - [ ] Test suite runs < 60 seconds

3. **Developer Experience:**
   - [ ] TypeScript provides comprehensive IntelliSense
   - [ ] Development server starts quickly
   - [ ] Hot reload works consistently
   - [ ] Error messages are helpful

4. **Deployment Readiness:**
   - [ ] CI/CD pipeline passes
   - [ ] Documentation site builds
   - [ ] NPM package can be published
   - [ ] All environments work correctly

**Validation Commands:**
```bash
# Validate complete implementation
npm run validate:all

# Check individual criteria
npm run validate:functionality
npm run validate:quality
npm run validate:accessibility
npm run validate:documentation

# Generate success report
npm run report:success
```

**Success Metrics:**
- Implementation velocity: Components per sprint
- Quality score: Automated checks passing rate
- Developer satisfaction: Team feedback scores
- Adoption rate: Component usage in applications

## FRS.md Generation Requirements

### Automated FRS.md Generation

**Purpose**: Generate comprehensive technical specifications in FRS.md based on implementation decisions made during development.

**Source**: Implementation artifacts, code analysis, and architectural decisions from CLAUDE.md

**Generation Triggers**:
- Component implementations completed
- Architecture patterns established
- Technical decisions documented
- Integration patterns implemented

**FRS Content Generation**:

### FRS Content Generation Requirements

**Automated FRS Generation Strategy:**

1. **Implementation Scanning:**
   - Parse component TypeScript files for API definitions
   - Extract CSS modules for styling implementation
   - Analyze test files for coverage and test scenarios
   - Review Storybook stories for documentation patterns
   - Collect build artifacts and bundle analysis

2. **Technical Specification Extraction:**
   ```typescript
   // Extract component APIs
   interface ComponentAPI {
     name: string;
     props: PropDefinition[];
     events: EventHandler[];
     variants: VariantDefinition[];
     accessibility: AccessibilityFeatures;
   }

   // Extract implementation patterns
   interface ImplementationPattern {
     styling: CSSPattern;
     testing: TestPattern;
     integration: IntegrationMethod;
     performance: PerformanceMetrics;
   }
   ```

3. **Architecture Validation:**
   - Compare implementation against CLAUDE.md specifications
   - Document architectural compliance
   - Identify deviations and justifications
   - Validate technology stack usage

4. **FRS Document Structure:**
   ```markdown
   # Technical Specifications

   ## Component APIs
   - TypeScript interfaces
   - Usage examples
   - Integration patterns

   ## Implementation Details
   - Build configuration
   - Testing setup
   - Performance characteristics

   ## Quality Metrics
   - Test coverage reports
   - Accessibility audit results
   - Performance benchmarks
   ```

**Generation Triggers:**
- Component implementation completion
- Build system changes
- Technology stack updates
- Performance optimization
- Testing framework updates

**Content Sources:**
- TypeScript declaration files
- Component implementation files
- Test suites and coverage reports
- Build configuration files
- Performance benchmarks
- Accessibility audit results

### Technical Specifications to Capture

### Technical Specifications to Capture

**Component-Level Specifications:**

1. **API Specifications:**
   ```typescript
   // Capture complete TypeScript definitions
   interface ComponentProps {
     // All props with types and documentation
   }

   // Export patterns
   export { Component } from './Component';
   export type { ComponentProps } from './Component';
   ```

2. **Styling Specifications:**
   ```css
   /* CSS architecture patterns */
   .component {
     /* Design token usage */
     /* Layout patterns */
     /* Responsive design */
     /* Accessibility features */
   }
   ```

3. **Testing Specifications:**
   - Test coverage percentages
   - Testing methodologies used
   - Accessibility test results
   - Performance test benchmarks
   - Browser compatibility results

**System-Level Specifications:**

1. **Build System Configuration:**
   - Vite configuration details
   - Rollup bundle settings
   - TypeScript compiler options
   - PostCSS processing setup
   - Asset optimization settings

2. **Development Workflow:**
   - NPM scripts and their purposes
   - Development server configuration
   - Hot reload implementation
   - Debugging setup
   - Quality gate configurations

3. **Deployment Configuration:**
   - CI/CD pipeline details
   - Build artifact specifications
   - Distribution package structure
   - Documentation deployment
   - Performance monitoring setup

**Performance Specifications:**
- Bundle size measurements
- Runtime performance metrics
- Memory usage patterns
- Loading performance
- Accessibility compliance scores

**Integration Specifications:**
- Framework compatibility details
- Integration examples
- Common usage patterns
- Migration guides
- Troubleshooting documentation

### Implementation Artifacts to Document

### Implementation Artifacts to Document

**Build Artifacts:**

1. **Distribution Packages:**
   ```
   dist/
   ├── design-system.es.js     # ES module bundle
   ├── design-system.umd.js    # UMD bundle
   ├── design-system.d.ts      # TypeScript declarations
   ├── styles.css              # Complete CSS bundle
   └── assets/                 # Static assets
   ```

2. **Documentation Artifacts:**
   ```
   storybook-static/
   ├── index.html              # Storybook documentation
   ├── static/                 # Static assets
   └── assets/                 # Generated assets
   ```

**Development Artifacts:**

1. **Source Code Structure:**
   ```
   src/
   ├── components/             # Component implementations
   ├── tokens/                 # Design token definitions
   ├── utils/                  # Utility functions
   └── types/                  # Type definitions
   ```

2. **Configuration Files:**
   - TypeScript configuration (`tsconfig.json`)
   - Vite configuration (`vite.config.ts`)
   - Storybook configuration (`.storybook/`)
   - Jest configuration (`jest.config.js`)
   - ESLint configuration (`.eslintrc.js`)

**Quality Artifacts:**

1. **Test Results:**
   - Unit test coverage reports
   - Accessibility audit results
   - Performance benchmark reports
   - Visual regression test results
   - Cross-browser test results

2. **Analysis Reports:**
   - Bundle analyzer reports
   - Dependency analysis
   - Security audit results
   - Performance profiling data
   - Code quality metrics

**Deployment Artifacts:**

1. **Package Metadata:**
   - NPM package configuration
   - Version history and changelog
   - License and attribution
   - Dependency specifications
   - Installation instructions

2. **Documentation Deployment:**
   - Live Storybook site
   - API documentation
   - Integration guides
   - Migration documentation
   - Troubleshooting guides

**Documentation Requirements:**
- Artifact descriptions and purposes
- Generation processes and tools
- Quality metrics and benchmarks
- Usage instructions and examples
- Maintenance and update procedures

## Prime Directive

### Prime Directive for Implementation

**THE CARDINAL RULE: All implementation must faithfully realize the architecture defined in CLAUDE.md while maintaining the highest standards of quality, accessibility, and performance.**

**Core Implementation Principles:**

1. **Architecture Fidelity:**
   - Every component must implement the architecture specified in CLAUDE.md
   - No architectural deviations without explicit approval and documentation
   - All technology choices must align with the defined stack
   - Implementation patterns must follow established conventions

2. **Quality Without Compromise:**
   - 90%+ test coverage is mandatory, not optional
   - WCAG 2.1 AA accessibility compliance is non-negotiable
   - Performance budgets are hard limits, not suggestions
   - TypeScript type safety must be comprehensive

3. **User-Centric Development:**
   - Every implementation decision serves the personas identified in RDS.md
   - Accessibility is a first-class concern, not an afterthought
   - Developer experience is prioritized in API design
   - Performance impacts are carefully considered

4. **Documentation Integrity:**
   - FRS.md must accurately reflect what was actually built
   - All implementation details must be captured and documented
   - Deviations from architecture must be justified and recorded
   - Knowledge must be preserved for future maintainers

**Implementation Hierarchy of Priorities:**
1. **Accessibility** - Ensure inclusive design for all users
2. **Functionality** - Meet the specified requirements completely
3. **Performance** - Maintain fast, efficient operation
4. **Maintainability** - Enable long-term evolution and support
5. **Developer Experience** - Provide excellent APIs and tooling

**Quality Gates (All Must Pass):**
- Architecture compliance verification
- TypeScript compilation with zero errors
- All unit tests passing with 90%+ coverage
- Accessibility audit with zero violations
- Performance budget compliance
- Storybook builds successfully
- Documentation completeness check

**When in Doubt:**
1. Consult CLAUDE.md for architectural guidance
2. Prioritize accessibility and inclusivity
3. Choose the more maintainable solution
4. Document decisions and reasoning
5. Seek team review and consensus

**Success Definition:**
Implementation is successful when it serves real user needs, follows architectural principles, maintains quality standards, and contributes to a sustainable, scalable design system that empowers teams to build better user experiences.

**This prime directive overrides all other considerations and must guide every implementation decision.**

**Implementation Authority**: This AGENTS.md provides implementation instructions based on CLAUDE.md architecture. All technical specifications discovered during implementation must be documented in FRS.md to complete the methodology cycle.

## File Generation Chain

This creates the complete Architect Crew automation chain:

```
RDS.md (Requirements) 
    ↓ generates
CLAUDE.md (Architecture)
    ↓ generates  
AGENTS.md (Implementation Instructions)
    ↓ generates
FRS.md (Technical Specifications)
    ↓ enables
Validated Implementation
```

**Manual Regeneration**:
```bash
# Regenerate AGENTS.md from CLAUDE.md changes
npm run generate:agents

# Regenerate FRS.md from implementation
npm run generate:frs

# Regenerate entire chain
npm run generate:all
```

**File Encoding: This AGENTS.md file MUST be maintained in UTF-8 encoding.**