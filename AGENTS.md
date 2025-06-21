# AGENTS.md: AI Agent Constitution for React Design System Development

This document provides the **official guidelines and mandatory protocols** for any AI agent contributing to this project. **You MUST adhere to all instructions herein.**

## Project Overview

This is a **React-based Design System project** that uses Storybook for component development and documentation. The project provides a comprehensive collection of reusable React components, design tokens, and documentation to ensure scalable UI consistency across applications. The main design system is located at `../design-system/`, while this `storybook` directory serves as a deployment and management workspace for Storybook-related tasks.

## Critical Architecture Constraints

### React Component Development Standards
- **ALL COMPONENTS MUST BE REACT 18+ COMPATIBLE**
- Use TypeScript for all component development
- Follow consistent component structure with implementation, styles, and stories
- Ensure components are fully documented in Storybook
- Components must be reusable and follow design system principles

### Storybook Integration Requirements
- Every component must have corresponding Storybook stories
- Stories should demonstrate all component variants and states
- Use Storybook 8.3+ features and best practices
- Build static documentation site for deployment
- Maintain component playground and testing environment

### Design System Standards
- Use design tokens for consistent styling (colors, spacing, typography)
- Follow atomic design principles (tokens → components → patterns)
- Implement CSS-in-JS or CSS modules for component styling
- Ensure accessibility compliance (WCAG 2.1 AA minimum)
- Support both light and dark theme variations

## Folder Structure

```
/storybook/ (current directory)
├── apps/                       # Application directories
│   └── design-system/         # Design system deployment scripts
├── AGENTS.md                   # This file - AI agent constitution
├── CLAUDE.md                   # Claude-specific instructions
└── README.md                   # Project overview and setup

/design-system/ (main project at ../design-system/)
├── src/
│   ├── components/            # React component library
│   ├── tokens/               # Design tokens
│   ├── stories/              # Additional Storybook stories
│   └── styles/               # Global styles and utilities
├── dist/                     # Build output for library distribution
├── storybook-static/         # Built Storybook documentation site
├── package.json              # Dependencies and scripts
├── .storybook/              # Storybook configuration
└── README.md                # Main project documentation
```

## Development Workflow

### Initial Setup

```bash
# Navigate to the main design system directory
cd ../design-system

# Install dependencies
npm install

# Start Storybook development server
npm run dev
```

### Development Commands

```bash
# Start Storybook development server (port 6006)
cd ../design-system && npm run dev

# Build component library for distribution
cd ../design-system && npm run build-lib

# Build Storybook static site for deployment
cd ../design-system && npm run build-storybook

# Run tests
cd ../design-system && npm test

# Run linting
cd ../design-system && npm run lint
```

## Code Style & Conventions

### General Rules

- **ALL COMPONENTS MUST BE REACT 18+ COMPATIBLE**
- Use TypeScript for type safety and developer experience
- Follow atomic design principles for component structure
- Ensure accessibility compliance (WCAG 2.1 AA minimum)
- Use semantic HTML elements and proper ARIA labels

### React/TypeScript Standards

- **Formatting**: Use Prettier with default settings
- **Linting**: ESLint with React and TypeScript configurations
- **Component Structure**:
  ```typescript
  // Component implementation pattern
  import React from 'react';
  import './ComponentName.css';
  
  interface ComponentNameProps {
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    children: React.ReactNode;
  }
  
  export const ComponentName: React.FC<ComponentNameProps> = ({
    variant = 'primary',
    size = 'medium',
    children,
    ...props
  }) => {
    return (
      <div className={`component-name component-name--${variant} component-name--${size}`} {...props}>
        {children}
      </div>
    );
  };
  ```

### CSS Styling Standards

- **Methodology**: BEM (Block Element Modifier) naming convention
- **Organization**: Component-scoped CSS files
- **Design Tokens**: Use CSS custom properties for consistent theming
- **Responsive Design**: Mobile-first approach with breakpoint tokens

### Storybook Story Conventions

- **Story Structure**: Demonstrate all component variants and states
- **Documentation**: Include comprehensive controls and documentation
- **Naming**: Use descriptive story names that explain the use case
- **Example Story Pattern**:
  ```typescript
  import type { Meta, StoryObj } from '@storybook/react';
  import { ComponentName } from './ComponentName';
  
  const meta: Meta<typeof ComponentName> = {
    title: 'Components/ComponentName',
    component: ComponentName,
    parameters: {
      docs: {
        description: {
          component: 'A reusable component for...'
        }
      }
    },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['primary', 'secondary']
      }
    }
  };
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const Primary: Story = {
    args: {
      variant: 'primary',
      children: 'Button Text'
    }
  };
  ```

### File Organization

- **Component Files**: Organize in component-specific directories
- **Design Tokens**: Centralize in `src/tokens/` directory
- **Global Styles**: Place in `src/styles/` directory
- **Export Pattern**: Use index.ts files for clean imports

## Testing Protocols

### Testing Requirements

After code modifications, run relevant tests:

```bash
# Run component tests (if configured)
cd ../design-system && npm test

# Build Storybook to verify all stories compile
cd ../design-system && npm run build-storybook

# Run TypeScript compilation check
cd ../design-system && npm run type-check

# Run linting
cd ../design-system && npm run lint
```

### Pre-Deployment Checklist

- [ ] All component tests pass
- [ ] All Storybook stories compile and display correctly
- [ ] TypeScript compilation successful
- [ ] Linting passes without errors
- [ ] Accessibility guidelines followed (WCAG 2.1 AA)
- [ ] Components work in different themes (light/dark)
- [ ] Design tokens properly implemented

### Testing Protocol Sequence Diagram

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Local as Local Environment
    participant Jest as Jest Runner
    participant RTL as React Testing Library
    participant Axe as Axe Accessibility
    participant Chromatic as Visual Testing
    participant CI as CI Pipeline
    
    Dev->>Local: npm test
    Local->>Jest: Run unit tests
    Jest->>RTL: Component rendering tests
    RTL->>Jest: Test results
    Jest->>Local: Unit test results
    Local->>Axe: Run accessibility tests
    Axe->>Local: A11y test results
    Dev->>CI: Push to repository
    CI->>Jest: Run full test suite
    CI->>Chromatic: Visual regression tests
    Chromatic->>CI: Visual test results
    CI->>CI: Generate test report
    CI->>Dev: Test results notification
```

### Component Quality Gates Flow

```mermaid
flowchart LR
    A[Component Code] --> B{Linting Pass?}
    B -->|No| B1[ESLint Errors]
    B -->|Yes| C{TypeScript Valid?}
    C -->|No| C1[Type Errors]
    C -->|Yes| D{Unit Tests Pass?}
    D -->|No| D1[Test Failures]
    D -->|Yes| E{A11y Tests Pass?}
    E -->|No| E1[Accessibility Issues]
    E -->|Yes| F{Visual Tests Pass?}
    F -->|No| F1[Visual Regressions]
    F -->|Yes| G{Performance OK?}
    G -->|No| G1[Performance Issues]
    G -->|Yes| H[Ready for Release]
    
    B1 --> I[Fix Issues]
    C1 --> I
    D1 --> I
    E1 --> I
    F1 --> I
    G1 --> I
    I --> A
```

## Technology Stack Management

### Core Dependencies

The design system uses these primary technologies:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@storybook/react": "^8.3.0",
    "@storybook/react-vite": "^8.3.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "rollup": "^4.0.0"
  }
}
```

### Adding New Dependencies

1. **Evaluate Necessity**: Ensure the dependency aligns with design system goals
2. **Check Bundle Size**: Consider impact on final bundle size
3. **Verify React Compatibility**: Must work with React 18+
4. **Update Documentation**: Add to dependency list and usage guidelines
5. **Test Integration**: Verify compatibility with Storybook and build process

### Approved Component Libraries (for reference/inspiration)

- **Headless UI**: For unstyled, accessible components
- **Radix UI**: For low-level UI primitives
- **React Aria**: For accessibility utilities
- **Framer Motion**: For animations (if needed)

### Build Tool Configuration

- **Vite**: Development server and build tool for Storybook
- **Rollup**: Library bundling for distribution
- **TypeScript**: Type checking and compilation
- **ESLint + Prettier**: Code quality and formatting

## Component Library Structure

Components in this design system follow a consistent structure within the main design system project at `../design-system/`.

## Deployment Process

### Build Commands

```bash
# Build component library
cd ../design-system && npm run build-lib

# Build Storybook documentation
cd ../design-system && npm run build-storybook
```

### Integration Options

- **NPM Package**: Publish library to npm registry for React applications
- **Static Assets**: Host built CSS and JS files on CDN  
- **Storybook Documentation**: Deploy documentation site for team reference
- **Framework Integration**: Import components into Next.js, Vite, or other React applications

## Pull Request Instructions

### PR Title Format

Must follow conventional commits:

- `feat:` New components or features
- `fix:` Bug fixes in existing components
- `docs:` Documentation updates
- `refactor:` Code refactoring without functionality changes
- `test:` Test additions or modifications
- `chore:` Maintenance tasks and dependencies

Examples:

- `feat: Add DatePicker component with accessibility support`
- `fix: Correct Button focus state styling`
- `docs: Update component usage guidelines`

### PR Body Requirements

```markdown
## Summary
Brief description of changes made.

## Component Compliance
- [ ] Component follows design system patterns
- [ ] TypeScript interfaces properly defined
- [ ] Accessibility requirements met (WCAG 2.1 AA)
- [ ] Responsive design implemented

## Testing Done
- [ ] Component tests pass
- [ ] Storybook stories created/updated
- [ ] Visual regression testing completed
- [ ] Accessibility testing performed
- [ ] Cross-browser compatibility verified

## Storybook Documentation
- [ ] All component variants documented
- [ ] Interactive controls configured
- [ ] Usage examples provided
- [ ] Design tokens properly utilized
```

## Security Requirements

### Component Security

- Sanitize all props and user input before rendering
- Use proper TypeScript types to prevent injection vulnerabilities
- Implement Content Security Policy headers for Storybook deployment
- Validate component props at runtime when necessary

### Development Security

- Keep dependencies updated and scan for vulnerabilities
- Use secure coding practices in component development
- Implement proper error boundaries for component isolation
- Follow React security best practices for XSS prevention

## Troubleshooting Guide

### Common Issues

1. **"Component not rendering in Storybook"**
   - Verify component export in index.ts
   - Check for TypeScript compilation errors
   - Ensure story file follows naming convention (*.stories.tsx)
   - Verify Storybook configuration is correct

2. **"Build failing during library compilation"**
   - Check for TypeScript errors in components
   - Verify all imports are correctly resolved
   - Ensure CSS imports are valid
   - Check Rollup configuration for missing externals

3. **"Styles not applying correctly"**
   - Verify CSS files are imported in component files
   - Check for CSS naming conflicts (use BEM methodology)
   - Ensure design tokens are properly imported
   - Verify CSS custom properties are defined

4. **"Component accessibility issues"**
   - Check semantic HTML usage
   - Verify ARIA labels and roles are correct
   - Ensure keyboard navigation works properly
   - Test with screen readers and accessibility tools

5. **"TypeScript type errors"**
   - Verify component prop interfaces are complete
   - Check for missing or incorrect type definitions
   - Ensure React types are properly imported
   - Validate generic type constraints

## Your Prime Directive

**Always ensure components are accessible, reusable, and follow design system principles.** Every component must work seamlessly across different applications and maintain consistency with the established design tokens and patterns. When in doubt, prioritize accessibility and user experience over visual complexity.

Remember: This design system serves as the foundation for consistent UI experiences across multiple applications. Design and develop accordingly.

## Architecture Flows and Rules

### Design System Architecture Flow

```mermaid
graph TB
    subgraph "Development Layer"
        A[React 18+] --> B[TypeScript]
        B --> C[Storybook 8.3+]
        C --> D[Component Development]
    end
    
    subgraph "Build Layer"
        E[Vite] --> F[Rollup]
        F --> G[Library Bundle]
        G --> H[NPM Distribution]
    end
    
    subgraph "Quality Layer"
        I[Jest] --> J[React Testing Library]
        J --> K[Chromatic Visual Testing]
        K --> L[Accessibility Testing]
    end
    
    subgraph "Deployment Layer"
        M[GitHub Actions] --> N[Semantic Versioning]
        N --> O[Automated Releases]
        O --> P[Documentation Hosting]
    end
    
    D --> E
    L --> M
    H --> Q[Consumer Applications]
    P --> R[Documentation Site]
```

### Component Development Sequence Diagram

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Git as Git Repository
    participant CI as CI/CD Pipeline
    participant SB as Storybook
    participant NPM as NPM Registry
    participant Docs as Documentation Site
    
    Dev->>Git: Create feature branch
    Dev->>Dev: Develop React component
    Dev->>Dev: Add TypeScript definitions
    Dev->>Dev: Create Storybook stories
    Dev->>Dev: Write unit tests
    Dev->>Git: Commit changes
    Dev->>Git: Push to remote
    Git->>CI: Trigger pipeline
    CI->>CI: Run linting
    CI->>CI: Run unit tests
    CI->>CI: Run accessibility tests
    CI->>CI: Build library
    CI->>CI: Build Storybook
    CI->>SB: Deploy Storybook preview
    Dev->>Git: Create pull request
    Git->>CI: Trigger review pipeline
    CI->>CI: Visual regression tests
    CI->>Git: Report results
    Git->>Git: Merge to main
    CI->>NPM: Publish package
    CI->>Docs: Deploy documentation
```

### Component Lifecycle State Flow

```mermaid
stateDiagram-v2
    [*] --> Planning
    Planning --> Development: Requirements Defined
    Development --> Testing: Component Implemented
    Testing --> CodeReview: Tests Pass
    CodeReview --> Staging: Review Approved
    Staging --> Production: QA Approved
    Production --> Maintenance: Component Released
    Maintenance --> Enhancement: Feature Request
    Enhancement --> Development: Enhancement Planned
    Maintenance --> Deprecation: Component Obsolete
    Deprecation --> Retired: Migration Complete
    Retired --> [*]
    
    Testing --> Development: Tests Fail
    CodeReview --> Development: Review Rejected
    Staging --> Development: QA Issues Found
    PreProduction --> Staging: Pre-prod Issues
    Production --> Rollback: Deployment Issues
    Rollback --> Staging: Previous Version
```

### Design System Entity Relationship Diagram

```mermaid
erDiagram
    DESIGN_TOKENS ||--o{ COMPONENTS : "styles"
    COMPONENTS ||--o{ STORIES : "documents"
    COMPONENTS ||--o{ TESTS : "validates"
    STORIES ||--o{ DOCUMENTATION : "generates"
    COMPONENTS ||--o{ LIBRARY_BUILD : "compiles_to"
    LIBRARY_BUILD ||--o{ NPM_PACKAGE : "publishes_as"
    COMPONENTS ||--o{ CONSUMER_APPS : "used_by"
    
    DESIGN_TOKENS {
        string name
        string category
        string value
        string description
        string scope
    }
    
    COMPONENTS {
        string name
        string type
        string variant
        boolean deprecated
        string version
        string[] dependencies
    }
    
    STORIES {
        string component_name
        string story_name
        object args
        string[] controls
        string documentation
    }
    
    TESTS {
        string component_name
        string test_type
        string test_file
        number coverage
        boolean passing
    }
    
    CONSUMER_APPS {
        string app_name
        string framework
        string version
        string[] used_components
    }
```

### Development Workflow Rules Engine

```mermaid
flowchart TD
    A[Code Change] --> B{TypeScript Valid?}
    B -->|No| C[Block: Fix TypeScript Errors]
    B -->|Yes| D{Tests Pass?}
    D -->|No| E[Block: Fix Failing Tests]
    D -->|Yes| F{Accessibility OK?}
    F -->|No| G[Block: Fix A11y Issues]
    F -->|Yes| H{Stories Updated?}
    H -->|No| I[Block: Add/Update Stories]
    H -->|Yes| J{Breaking Changes?}
    J -->|Yes| K[Require: Version Bump + Migration Guide]
    J -->|No| L{Visual Regression?}
    L -->|Yes| M[Block: Review Visual Changes]
    L -->|No| N[Allow: Merge to Main]
    
    C --> A
    E --> A
    G --> A
    I --> A
    K --> N
    M --> O{Approved?}
    O -->|Yes| N
    O -->|No| A
```

### Deployment State Machine

```mermaid
stateDiagram-v2
    [*] --> Development
    Development --> Testing: Code Complete
    Testing --> CodeReview: Tests Pass
    CodeReview --> Staging: Review Approved
    Staging --> PreProduction: Staging Tests Pass
    PreProduction --> Production: Final Approval
    Production --> Monitoring: Deployed
    Monitoring --> HotFix: Critical Issue
    HotFix --> PreProduction: Fix Ready
    Monitoring --> NextRelease: Stable
    NextRelease --> Development: New Features
    
    Testing --> Development: Test Failures
    CodeReview --> Development: Changes Requested
    Staging --> Development: Integration Issues
    PreProduction --> Staging: Pre-prod Issues
    Production --> Rollback: Deployment Issues
    Rollback --> Staging: Previous Version
```

### Component Dependency Graph

```mermaid
graph TD
    DT[Design Tokens] --> BC[Base Components]
    BC --> Button
    BC --> Input
    BC --> Icon
    BC --> Text
    
    Button --> Form[Form Components]
    Input --> Form
    Text --> Form
    
    Form --> Modal[Modal Components]
    Form --> Card[Card Components]
    
    Modal --> Layout[Layout Components]
    Card --> Layout
    
    Icon --> Navigation[Navigation Components]
    Button --> Navigation
    
    Layout --> Templates[Page Templates]
    Navigation --> Templates
    
    Templates --> Applications[Consumer Applications]
```

### Error Handling Flow

```mermaid
flowchart TD
    A[Component Error] --> B{Error Type}
    B -->|Runtime Error| C[Error Boundary]
    B -->|Prop Validation| D[PropTypes Warning]
    B -->|TypeScript Error| E[Compile-time Error]
    B -->|Accessibility Error| F[A11y Warning]
    
    C --> G[Fallback UI]
    D --> H[Console Warning]
    E --> I[Build Failure]
    F --> J[A11y Report]
    
    G --> K[Log Error]
    H --> L[Dev Notification]
    I --> M[Block Deployment]
    J --> N[Quality Gate Failure]
    
    K --> O[Error Tracking]
    L --> P[Fix in Development]
    M --> P
    N --> P
      P --> Q[Error Resolution]
    Q --> A
```

## Prime Directive Reinforcement

**Always ensure components are accessible, reusable, and follow design system principles.** Every component must work seamlessly across different applications and maintain consistency with the established design tokens and patterns. When in doubt, prioritize accessibility and user experience over visual complexity.

Remember: This design system serves as the foundation for consistent UI experiences across multiple applications. Design and develop accordingly.