---
name: "{{projectName}}"
description: "{{projectDescription}}"
category: "{{projectCategory}}"
author: "{{projectAuthor}}"
authorUrl: "{{projectAuthorUrl}}"
tags: {{projectTags}}
lastUpdated: "{{date}}"
# Custom fields for Architect Crew methodology
template: agents.md
version: {{agentsVersion}}
sourceTemplate: templates/AGENTS.template.md
generatedBy: executor-crew
generationTriggers: 
  - CLAUDE.md architecture changes
  - Implementation requirements updates
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
---

# React Design System with Storybook

## Project Overview

This is a **React-based Design System project** that uses Storybook for component development and documentation, enhanced with AI agent automation for scalable development. The project provides a comprehensive collection of reusable React components, design tokens, and documentation to ensure UI consistency across applications.

{{projectOverview}}

This document serves as both a **development guide** and **AI agent constitution**, providing official guidelines and mandatory protocols for any developer or AI agent contributing to this project.

**Crucially, all development work MUST implement the architecture defined in `CLAUDE.md` and document technical specifications in `docs/FRS.md` as implementation proceeds.**

## Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Component Library**: Storybook 8.3+ for development and documentation
- **Build System**: Vite for fast development and optimized builds
- **Styling**: CSS-in-JS or CSS modules with design tokens
- **Testing**: Jest + React Testing Library for component testing
- **Documentation**: Automated generation chain (RDS → CLAUDE → AGENTS → FRS)
- **Deployment**: Automated CI/CD with GitHub Actions
- **AI Integration**: Architect Crew methodology for automated development

## Project Structure

```
storybook/                          # Current directory - management workspace
├── templates/                      # Document generation templates
│   ├── AGENTS.template.md         # This template file
│   ├── CLAUDE.template.md         # Architecture template
│   └── FRS.template.md            # Technical specs template
├── scripts/                       # Generation and automation scripts
│   ├── generate-agents.js         # AGENTS.md generator
│   ├── generate-claude.js         # CLAUDE.md generator
│   └── generate-frs.js            # FRS.md generator
├── .github/workflows/             # CI/CD automation
│   ├── generate-docs.yml          # Document generation workflow
│   └── manual-generate.yml        # Manual trigger workflow
├── docs/                          # Project documentation
│   ├── FRS.md                     # Functional Requirements Spec
│   └── persona-*.md               # AI agent personas
├── AGENTS.md                      # Generated agent instructions
├── CLAUDE.md                      # Generated architecture spec
└── README.md                      # Project documentation

../design-system/                  # Main design system (sibling directory)
├── src/
│   ├── components/                # React components
│   ├── tokens/                    # Design tokens
│   ├── stories/                   # Storybook stories
│   └── tests/                     # Component tests
├── .storybook/                    # Storybook configuration
└── package.json                   # Dependencies and scripts
```

## Development Guidelines

### Code Style & Conventions

- **ALL COMPONENTS MUST BE REACT 18+ COMPATIBLE**
- Use TypeScript for type safety and developer experience
- Follow atomic design principles for component structure
- Ensure accessibility compliance (WCAG 2.1 AA minimum)
- Use semantic HTML elements and proper ARIA labels

### Naming Conventions

- **PascalCase for**: Components, Type definitions, Interfaces
- **camelCase for**: Variables, Functions, Methods, Hooks, Properties, Props
- **kebab-case for**: Directory names, File names
- **UPPERCASE for**: Environment variables, Constants, Global configurations

### Git Workflow

- Branch naming: `feature/component-name`, `fix/issue-description`, `docs/update-type`
- Commit message format: `type(scope): description` (conventional commits)
- Pull Request process: All changes require review and automated tests to pass

## Environment Setup

### Development Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0 or yarn >= 1.22.0
- TypeScript >= 5.0.0

### Installation Steps

```bash
# 1. Clone the repository
git clone [repository-url]

# 2. Navigate to design system directory
cd design-system

# 3. Install dependencies
npm install

# 4. Start Storybook development server
npm run storybook

# 5. Start component development (if separate dev server needed)
npm run dev
```

### Environment Variables Configuration

```env
# .env.local
STORYBOOK_PORT=6006
VITE_API_URL=http://localhost:3001
NODE_ENV=development
```

## Architectural Implementation Requirements

Based on the architecture defined in CLAUDE.md, the following implementation requirements are mandatory:

{{architecturalImplementationRequirements}}

### React Component Development Standards
{{reactStandards}}

### Storybook Integration Requirements
{{storybookRequirements}}

### Design System Standards
{{designSystemStandards}}

## Implementation Workflow

**Refer to `CLAUDE.md` for architectural guidance and document all technical decisions in `docs/FRS.md`.**

### Architecture-Driven Development Process

{{architectureDrivenDevelopment}}

### Implementation Commands

{{implementationCommands}}

## Code Implementation Standards

**All code MUST implement the architecture specified in `CLAUDE.md` and document technical details in `docs/FRS.md`.**

### Implementation Rules

{{implementationRules}}

### React/TypeScript Implementation

{{reactTypeScriptImplementation}}

### CSS Implementation Standards

{{cssImplementationStandards}}

### Storybook Implementation

{{storybookImplementation}}

### File Organization Implementation

{{fileOrganizationImplementation}}

## Testing Implementation Protocols

**All testing MUST implement the testing strategy defined in `CLAUDE.md` and document test specifications in `docs/FRS.md`.**

### Testing Implementation Principles
{{testingImplementationPrinciples}}

### Unit Testing Implementation
{{unitTestingImplementation}}

### Testing Implementation Requirements

{{testingImplementationRequirements}}

### Implementation Quality Gates

{{implementationQualityGates}}

## Technology Implementation

**Implement the technology stack specified in `CLAUDE.md` and document configurations in `docs/FRS.md`.**

### Core Technology Implementation

{{coreTechnologyImplementation}}

### Build System Implementation

{{buildSystemImplementation}}

### Deployment Implementation

{{deploymentImplementation}}

## Component Implementation Guide

### Component Implementation Requirements

When implementing components per the architecture in CLAUDE.md, AI agents MUST follow this process:

{{componentImplementationRequirements}}

#### 1. Architecture Compliance Check

{{architectureComplianceCheck}}

#### 2. Component Implementation Template

{{componentImplementationTemplate}}

#### 3. Styling Implementation

{{stylingImplementation}}

#### 4. Storybook Implementation

{{storybookComponentImplementation}}

#### 5. Testing Implementation

{{testingComponentImplementation}}

#### 6. FRS Documentation

{{frsDocumentationRequirements}}

#### 7. Integration Implementation

{{integrationImplementation}}

### Component Categories Implementation

{{componentCategoriesImplementation}}

### Design Token Implementation

{{designTokenImplementation}}

### Accessibility Implementation

{{accessibilityImplementation}}

### Performance Implementation

{{performanceImplementation}}

## Automated Implementation Workflow

### Implementation Process

{{implementationProcess}}

### Quality Assurance Implementation

{{qualityAssuranceImplementation}}

### FRS Documentation Process

{{frsDocumentationProcess}}

## Implementation Troubleshooting

{{implementationTroubleshooting}}

## Implementation Success Criteria

{{implementationSuccessCriteria}}

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

{{frsContentGeneration}}

### Technical Specifications to Capture

{{technicalSpecificationsCapture}}

### Implementation Artifacts to Document

{{implementationArtifactsDocumentation}}

## Prime Directive

{{primeDirective}}

**Implementation Authority**: This AGENTS.md provides implementation instructions based on CLAUDE.md architecture. All technical specifications discovered during implementation must be documented in FRS.md to complete the methodology cycle.

## Testing Strategy

### Unit Testing

- **Testing Framework**: Jest + React Testing Library for component testing
- **Test Coverage Requirements**: Minimum 90% coverage for components
- **Test File Organization**: `*.test.tsx` files alongside components

### Integration Testing

- **Test Scenarios**: Component interaction workflows and data flow validation
- **Testing Tools**: Storybook interaction testing and visual regression tests
- **Automation**: Automated test execution in CI/CD pipeline

### End-to-End Testing

- **Test Workflow**: Complete user journeys and accessibility testing
- **Automation Tools**: Playwright or Cypress for browser automation
- **Coverage**: Critical user paths and cross-browser compatibility

## Deployment Guide

### Build Process

```bash
# Build production-ready components
npm run build

# Build Storybook static site
npm run build-storybook

# Run all quality checks
npm run check:all
```

### Deployment Steps

1. **Prepare Production Environment**
   - Configure environment variables
   - Set up hosting infrastructure
   - Configure domain and SSL

2. **Execute Deployment Scripts**
   - Run automated build process
   - Deploy Storybook documentation site
   - Publish component library to NPM (if applicable)

3. **Verify Deployment Results**
   - Test deployed Storybook site
   - Validate component library accessibility
   - Confirm all examples and documentation work correctly

### Environment Variables for Production

```env
# Production environment variables
NODE_ENV=production
STORYBOOK_URL=https://yourdomain.com
CDN_URL=https://cdn.yourdomain.com
ANALYTICS_ID=your-analytics-id
```

## Performance Optimization

### Frontend Optimization

- **Code Splitting**: Implement lazy loading for non-critical components
- **Tree Shaking**: Ensure unused code is eliminated in builds
- **Bundle Analysis**: Regular monitoring of bundle sizes and dependencies
- **Image Optimization**: Use optimized formats and responsive images

### Component Performance

- **React.memo()**: Strategic memoization for expensive re-renders
- **useMemo/useCallback**: Optimize expensive calculations and callbacks
- **Virtual Scrolling**: For large lists and data tables
- **Accessibility Performance**: Ensure ARIA attributes don't impact performance

## Security Considerations

### Data Security

- **Input Validation**: Validate all props and user inputs
- **XSS Protection**: Sanitize any HTML content displayed in components
- **Dependency Security**: Regular security audits of NPM dependencies
- **Environment Variables**: Secure handling of sensitive configuration

### Component Security

- **Prop Validation**: TypeScript interfaces for all component props
- **Access Control**: Role-based component visibility where applicable
- **Content Security Policy**: Implement CSP headers for Storybook deployment
- **Third-party Libraries**: Vet all external dependencies for security issues

## Monitoring and Logging

### Application Monitoring

- **Performance Metrics**: Core Web Vitals and component render times
- **Error Tracking**: Automated error reporting for component failures
- **Usage Analytics**: Track component usage patterns and adoption
- **Accessibility Monitoring**: Automated a11y testing and reporting

### Documentation Monitoring

- **Build Status**: Monitor documentation generation pipeline health
- **Link Validation**: Ensure all documentation links remain valid
- **Content Freshness**: Track when documentation was last updated
- **User Feedback**: Collect and respond to documentation feedback

## Common Issues

### Issue 1: Component Hydration Mismatch in SSR

**Solution**: 
- Ensure server and client render identical content
- Use `useEffect` for client-only code
- Check for differences in date/time formatting between server and client

### Issue 2: Storybook Build Failures

**Solution**:
- Verify all component imports are correct
- Check for TypeScript type errors
- Ensure all required dependencies are installed
- Validate story file syntax and exports

### Issue 3: Design Token Inconsistencies

**Solution**:
- Implement design token validation in build process
- Use TypeScript for design token type safety
- Regular audits of token usage across components
- Automated testing for token compliance

## Reference Resources

- [React Official Documentation](https://react.dev/)
- [Storybook Official Documentation](https://storybook.js.org/docs)
- [TypeScript Official Documentation](https://www.typescriptlang.org/)
- [Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Design System Best Practices](https://designsystemsrepo.com/)
- [Component Testing with React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Changelog

### v{{agentsVersion}} ({{date}})

- Updated AGENTS.md to comply with standard format
- Added comprehensive metadata support
- Enhanced configuration options for maximum flexibility
- Integrated standard sections while preserving AI agent constitution
- Improved GitHub Action compatibility

---

**Note**: This AGENTS.md file follows the standard format while maintaining the Architect Crew methodology for AI agent automation. Please refer to `docs/FRS.md` for detailed technical specifications and implementation details.

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