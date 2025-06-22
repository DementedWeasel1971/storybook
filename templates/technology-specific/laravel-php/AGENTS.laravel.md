---
template: agents-laravel.md
version: {{agentsVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/laravel-php/AGENTS.laravel.md
generatedBy: executor-crew
technology: Laravel/PHP
generationTriggers: 
  - CLAUDE.md architecture changes
  - Laravel implementation requirements updates
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
---

# AGENTS.md: AI Agent Constitution for Laravel Application Development

**Version**: {{agentsVersion}}  
**Generated from**: CLAUDE.md architectural specification  
**Date**: {{date}}  
**Technology**: Laravel/PHP

This document provides the **official guidelines and mandatory protocols** for any AI agent contributing to this Laravel project. **You MUST adhere to all instructions herein.**

## Project Overview

{{laravelProjectOverview}}

**Crucially, all AI agents MUST implement the Laravel architecture defined in `CLAUDE.md` and document technical specifications in `docs/FRS.md` as implementation proceeds.**

## Laravel Implementation Requirements

Based on the architecture defined in CLAUDE.md, the following Laravel implementation requirements are mandatory:

{{laravelImplementationRequirements}}

### PHP and Laravel Standards
{{phpLaravelStandards}}

### Database and Eloquent Requirements
{{databaseEloquentRequirements}}

### API Development Standards
{{apiDevelopmentStandards}}

## Implementation Workflow

**Refer to `CLAUDE.md` for architectural guidance and document all technical decisions in `docs/FRS.md`.**

### Laravel-Driven Development Process

{{laravelDrivenDevelopment}}

### Essential Laravel Commands

{{essentialLaravelCommands}}

## Code Implementation Standards

**All code MUST implement the Laravel architecture specified in `CLAUDE.md` and document technical details in `docs/FRS.md`.**

### Laravel Implementation Rules

{{laravelImplementationRules}}

### PHP/Laravel Code Standards

{{phpLaravelCodeStandards}}

### Database Implementation Standards

{{databaseImplementationStandards}}

### API Implementation Requirements

{{apiImplementationRequirements}}

### Frontend Integration Implementation

{{frontendIntegrationImplementation}}

## Laravel Testing Implementation Protocols

**All testing MUST implement the testing strategy defined in `CLAUDE.md` and document test specifications in `docs/FRS.md`.**

### Laravel Testing Principles
{{laravelTestingPrinciples}}

### PHPUnit Implementation
{{phpunitImplementation}}

### Feature Testing Requirements
{{featureTestingRequirements}}

### API Testing Protocols
{{apiTestingProtocols}}

## Laravel Technology Implementation

**Implement the Laravel technology stack specified in `CLAUDE.md` and document configurations in `docs/FRS.md`.**

### Core Laravel Implementation

{{coreLaravelImplementation}}

### Package and Dependency Implementation

{{packageDependencyImplementation}}

### Deployment Implementation

{{laravelDeploymentImplementation}}

## Laravel Component Implementation Guide

### Model Implementation Requirements

When implementing Eloquent models per the architecture in CLAUDE.md, AI agents MUST follow this process:

{{modelImplementationRequirements}}

#### 1. Model Architecture Compliance

{{modelArchitectureCompliance}}

#### 2. Eloquent Model Template

{{eloquentModelTemplate}}

#### 3. Migration Implementation

{{migrationImplementation}}

#### 4. Factory and Seeder Implementation

{{factorySeederImplementation}}

#### 5. Model Testing Implementation

{{modelTestingImplementation}}

#### 6. FRS Documentation for Models

{{modelFrsDocumentation}}

### Controller Implementation Guide

{{controllerImplementationGuide}}

#### 1. Controller Architecture Compliance

{{controllerArchitectureCompliance}}

#### 2. Controller Implementation Template

{{controllerImplementationTemplate}}

#### 3. Resource Controller Patterns

{{resourceControllerPatterns}}

#### 4. API Controller Implementation

{{apiControllerImplementation}}

#### 5. Controller Testing

{{controllerTesting}}

### Service Layer Implementation

{{serviceLayerImplementation}}

### Repository Pattern Implementation

{{repositoryPatternImplementation}}

### Middleware Implementation

{{middlewareImplementation}}

### Event and Listener Implementation

{{eventListenerImplementation}}

## Laravel Security Implementation

{{laravelSecurityImplementation}}

### Authentication Implementation
{{authenticationImplementation}}

### Authorization Implementation
{{authorizationImplementation}}

### Data Validation Implementation
{{dataValidationImplementation}}

### CSRF and XSS Protection
{{csrfXssProtection}}

## Performance Implementation

{{laravelPerformanceImplementation}}

### Database Optimization
{{databaseOptimization}}

### Caching Implementation
{{cachingImplementation}}

### Queue Implementation
{{queueImplementation}}

## Automated Implementation Workflow

### Laravel Implementation Process

{{laravelImplementationProcess}}

### Quality Assurance Implementation

{{laravelQualityAssurance}}

### FRS Documentation Process

{{laravelFrsDocumentationProcess}}

## Implementation Troubleshooting

{{laravelImplementationTroubleshooting}}

## Implementation Success Criteria

{{laravelImplementationSuccessCriteria}}

## FRS.md Generation Requirements

### Automated FRS.md Generation

**Purpose**: Generate comprehensive technical specifications in FRS.md based on Laravel implementation decisions made during development.

**Source**: Laravel implementation artifacts, code analysis, and architectural decisions from CLAUDE.md

**Generation Triggers**:
- Model implementations completed
- Controller and API implementations finished
- Database migrations and seeders completed
- Service layer implementations finished

**FRS Content Generation**:

{{laravelFrsContentGeneration}}

### Laravel-Specific Technical Specifications to Capture

{{laravelTechnicalSpecificationsCapture}}

### Laravel Implementation Artifacts to Document

{{laravelImplementationArtifactsDocumentation}}

## Prime Directive

{{laravelPrimeDirective}}

**Implementation Authority**: This AGENTS.md provides Laravel implementation instructions based on CLAUDE.md architecture. All technical specifications discovered during implementation must be documented in FRS.md to complete the methodology cycle.

## File Generation Chain

This creates the complete Architect Crew automation chain for Laravel development:

```
RDS.md (Requirements) 
    ↓ generates
CLAUDE.md (Laravel Architecture)
    ↓ generates  
AGENTS.md (Laravel Implementation Instructions)
    ↓ generates
FRS.md (Laravel Technical Specifications)
    ↓ enables
Validated Laravel Implementation
```

**Manual Regeneration**:
```bash
# Regenerate AGENTS.md from CLAUDE.md changes
npm run generate:agents

# Regenerate FRS.md from Laravel implementation
npm run generate:frs

# Regenerate entire Laravel chain
npm run generate:all
```

**File Encoding: This AGENTS.md file MUST be maintained in UTF-8 encoding.**