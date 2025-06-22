---
template: agents.md
version: {{agentsVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/AGENTS.template.md
generatedBy: executor-crew
generationTriggers: 
  - CLAUDE.md architecture changes
  - Implementation requirements updates
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
---

# AGENTS.md: AI Agent Constitution for React Design System Development

**Version**: {{agentsVersion}}  
**Generated from**: CLAUDE.md architectural specification  
**Date**: {{date}}

This document provides the **official guidelines and mandatory protocols** for any AI agent contributing to this project. **You MUST adhere to all instructions herein.**

## Project Overview

{{projectOverview}}

**Crucially, all AI agents MUST implement the architecture defined in `CLAUDE.md` and document technical specifications in `docs/FRS.md` as implementation proceeds.**

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