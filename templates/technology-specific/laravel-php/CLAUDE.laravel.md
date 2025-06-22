---
template: claude-laravel.md
version: {{claudeVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/laravel-php/CLAUDE.laravel.md
generatedBy: architect-crew
technology: Laravel/PHP
generationTriggers: 
  - docs/RDS.md changes
  - docs/persona-*.md changes
chainedGeneration:
  - AGENTS.md (from CLAUDE.md architecture)
  - FRS.md (from AGENTS.md implementation)
---

# CLAUDE.md - Laravel Application Architecture Definition & AI Collaboration Guide

**Version**: {{claudeVersion}}  
**Date**: {{date}}  
**Generated from**: RDS.md requirements analysis  
**Technology Stack**: Laravel/PHP

This file defines the comprehensive architecture of the Laravel application solution. It aligns with the Architect Crew methodology, where:
- **`docs/RDS.md`** outlines the **functional requirements** and user needs.
- **`CLAUDE.md`** (this file) interprets requirements and designs the architecture, ensuring AGENTS.md receives proper implementation guidance.
- **`AGENTS.md`** provides specific, actionable instructions for AI agents performing implementation tasks based on this architectural guidance.
- **`docs/FRS.md`** captures the **detailed technical specifications** that emerge from the implementation process.

## 1. Requirements Analysis & Architectural Interpretation

**Source**: `docs/RDS.md` (What & Why)  
**Architectural Response**: Translate functional requirements into Laravel technical architecture

{{requirementsAnalysis}}

### Laravel-Specific Architectural Decisions

Based on the persona analysis from RDS.md and Laravel ecosystem capabilities:

{{laravelArchitecturalDecisions}}

## 2. Laravel System Architecture Design

{{laravelSystemArchitecture}}

### MVC Architecture Strategy
{{mvcArchitectureStrategy}}

### Database Design and Eloquent Strategy
{{databaseEloquentStrategy}}

### API Architecture (Laravel Sanctum/Passport)
{{apiArchitectureStrategy}}

### Frontend Integration Strategy
{{frontendIntegrationStrategy}}

## 3. Laravel Development Methodology Specification

This architecture requires specific Laravel development approaches that will be codified in AGENTS.md:

{{laravelDevelopmentMethodology}}

### Laravel Component Development Standards
{{laravelComponentStandards}}

### Database Migration and Seeding Strategy
{{migrationSeedingStrategy}}

### Testing Strategy (PHPUnit + Laravel Testing)
{{laravelTestingStrategy}}

## 4. Technology Stack Architecture

{{laravelTechnologyStack}}

### Core Laravel Decisions
{{coreLaravelDecisions}}

### Package and Dependency Strategy
{{packageDependencyStrategy}}

### Deployment Architecture
{{laravelDeploymentArchitecture}}

## 5. Security and Performance Framework

{{securityPerformanceFramework}}

### Laravel Security Implementation
{{laravelSecurityImplementation}}

### Caching Strategy (Redis/Memcached)
{{cachingStrategy}}

### Queue and Job Processing
{{queueJobStrategy}}

## 6. Implementation Guidance for AGENTS.md

The following specifications should be translated into specific implementation instructions for the Executor Crew:

{{laravelImplementationGuidance}}

### Laravel Artisan Command Strategy
{{artisanCommandStrategy}}

### Service Provider and Container Strategy
{{serviceProviderStrategy}}

### Event and Listener Architecture
{{eventListenerArchitecture}}

## 7. Success Metrics & KPIs

{{laravelSuccessMetrics}}

### Performance Targets
{{laravelPerformanceTargets}}

### Code Quality Gates
{{laravelQualityGates}}

### Scalability Metrics
{{laravelScalabilityMetrics}}

## 8. Laravel Architectural Patterns & Best Practices

### Repository Pattern Implementation
{{repositoryPatternImplementation}}

### Service Layer Architecture
{{serviceLayerArchitecture}}

### Form Request Validation Strategy
{{formRequestValidationStrategy}}

### Resource and Collection Strategy
{{resourceCollectionStrategy}}

## 9. Laravel-Specific Risk Assessment

{{laravelRiskAssessment}}

### Common Laravel Pitfalls
{{commonLaravelPitfalls}}

### Performance Bottlenecks
{{performanceBottlenecks}}

### Security Considerations
{{laravelSecurityConsiderations}}

## 10. Implementation Roadmap

{{laravelImplementationRoadmap}}

### Phase 1: Core Laravel Setup
{{phase1CoreSetup}}

### Phase 2: Database and Models
{{phase2DatabaseModels}}

### Phase 3: API and Controllers
{{phase3ApiControllers}}

### Phase 4: Frontend Integration
{{phase4FrontendIntegration}}

### Phase 5: Testing and Deployment
{{phase5TestingDeployment}}

## Core Laravel Architectural Principles

{{coreLaravelPrinciples}}

1. **Eloquent-First Design**: Leverage Laravel's ORM capabilities for data modeling
2. **Artisan-Driven Development**: Use command-line tools for scaffolding and maintenance
3. **Service-Oriented Architecture**: Separate business logic into dedicated service classes
4. **API-First Approach**: Design APIs that can support multiple frontend implementations
5. **Test-Driven Development**: Comprehensive testing with Laravel's testing utilities
6. **Security by Default**: Implement Laravel's built-in security features from the start

## Laravel Technology Constraints & Guidelines

{{laravelTechnologyConstraints}}

### Framework Constraints
{{frameworkConstraints}}

### PHP Version Requirements
{{phpVersionRequirements}}

### Database Compatibility
{{databaseCompatibility}}

### Hosting Environment Considerations
{{hostingEnvironmentConsiderations}}

## Integration with Architect Crew Methodology

This architectural specification serves as the bridge between requirements (RDS.md) and implementation (AGENTS.md → FRS.md):

{{architectCrewLaravelIntegration}}

### AGENTS.md Generation Instructions

The following guidelines should be used when generating AGENTS.md from this architectural specification:

{{laravelAgentsGenerationInstructions}}

### FRS.md Capture Requirements

As implementation proceeds, the following technical details should be captured in FRS.md:

{{laravelFrsCaptureRequirements}}

## File Encoding Standards
**All documentation files, including `AGENTS.md` and any files generated or modified by AI, MUST be in UTF-8 encoding.**

## Prime Directive

**Ensure this Laravel architecture serves the user needs identified in RDS.md while providing clear, actionable guidance for the implementation team through AGENTS.md. Every architectural decision must be traceable back to a user requirement and forward to a Laravel-specific implementation specification.**

---

**Architecture Authority**: This CLAUDE.md serves as the authoritative Laravel architectural specification. All implementation decisions in AGENTS.md must align with this architecture. Any conflicts should be resolved by updating this architectural specification first, then regenerating AGENTS.md.

Built with ❤️ using the Architect Crew methodology and Laravel excellence.