---
template: claude.md
version: {{claudeVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/CLAUDE.template.md
generatedBy: architect-crew
generationTriggers: 
  - docs/RDS.md changes
  - docs/persona-*.md changes
chainedGeneration:
  - AGENTS.md (from CLAUDE.md architecture)
  - FRS.md (from AGENTS.md implementation)
---

# CLAUDE.md - Design System Architecture Definition & AI Collaboration Guide

**Version**: {{claudeVersion}}  
**Date**: {{date}}  
**Generated from**: RDS.md requirements analysis

This file defines the comprehensive architecture of the React Design System solution. It aligns with the Architect Crew methodology, where:
- **`docs/RDS.md`** outlines the **functional requirements** and user needs.
- **`CLAUDE.md`** (this file) interprets requirements and designs the architecture, ensuring AGENTS.md receives proper implementation guidance.
- **`AGENTS.md`** provides specific, actionable instructions for AI agents performing implementation tasks based on this architectural guidance.
- **`docs/FRS.md`** captures the **detailed technical specifications** that emerge from the implementation process.

## 1. Requirements Analysis & Architectural Interpretation

**Source**: `docs/RDS.md` (What & Why)  
**Architectural Response**: Translate functional requirements into technical architecture

{{requirementsAnalysis}}

### Persona-Driven Architecture Decisions

Based on the persona analysis from RDS.md, the following architectural decisions have been made:

{{personaArchitecturalDecisions}}

## 2. System Architecture Design

{{systemArchitectureDesign}}

### Foundation Layer Architecture
{{foundationLayerArchitecture}}

### Component Architecture Strategy
{{componentArchitectureStrategy}}

### Integration Architecture
{{integrationArchitecture}}

## 3. Development Methodology Specification

This architecture requires specific development approaches that will be codified in AGENTS.md:

{{developmentMethodology}}

### Component Development Standards
{{componentDevelopmentStandards}}

### Quality Assurance Framework
{{qualityAssuranceFramework}}

### Testing Strategy
{{testingStrategy}}

## 4. Technology Stack Architecture

{{technologyStackArchitecture}}

### Core Technology Decisions
{{coreTechnologyDecisions}}

### Build System Architecture
{{buildSystemArchitecture}}

### Deployment Architecture
{{deploymentArchitecture}}

## 5. Governance & Evolution Framework

{{governanceFramework}}

### Decision Making Process
{{decisionMakingProcess}}

### Architecture Evolution Strategy
{{architectureEvolutionStrategy}}

## 6. Implementation Guidance for AGENTS.md

The following specifications should be translated into specific implementation instructions for the Executor Crew:

{{implementationGuidance}}

### Component Creation Protocol
{{componentCreationProtocol}}

### Code Quality Standards
{{codeQualityStandards}}

### Documentation Requirements
{{documentationRequirements}}

## 7. Success Metrics & KPIs

{{successMetrics}}

### Performance Targets
{{performanceTargets}}

### Quality Gates
{{qualityGates}}

### Adoption Metrics
{{adoptionMetrics}}

## 8. Architectural Diagrams & Flows

### Primary System Architecture
{{primarySystemArchitecture}}

### Component Hierarchy
{{componentHierarchy}}

### Data Flow Architecture
{{dataFlowArchitecture}}

### Build & Deployment Pipeline
{{buildDeploymentPipeline}}

## 9. Risk Assessment & Mitigation

{{riskAssessment}}

### Technical Risks
{{technicalRisks}}

### Implementation Risks
{{implementationRisks}}

### Mitigation Strategies
{{mitigationStrategies}}

## 10. Implementation Roadmap

{{implementationRoadmap}}

### Phase 1: Foundation
{{phase1Foundation}}

### Phase 2: Core Components
{{phase2CoreComponents}}

### Phase 3: Advanced Features
{{phase3AdvancedFeatures}}

### Phase 4: Optimization & Scale
{{phase4Optimization}}

## Core Architectural Principles

{{coreArchitecturalPrinciples}}

1. **User-Centric Design**: Every architectural decision serves the personas identified in RDS.md
2. **Scalable Foundation**: Architecture supports growth from prototype to enterprise scale
3. **Developer Experience**: Optimized for developer productivity and satisfaction
4. **Performance First**: Built-in performance considerations at every layer
5. **Accessibility Native**: WCAG 2.1 AA compliance as architectural requirement
6. **Maintainable Evolution**: Designed for long-term maintenance and evolution

## Architectural Constraints & Guidelines

{{architecturalConstraints}}

### Technical Constraints
{{technicalConstraints}}

### Business Constraints  
{{businessConstraints}}

### Compliance Requirements
{{complianceRequirements}}

## Integration with Architect Crew Methodology

This architectural specification serves as the bridge between requirements (RDS.md) and implementation (AGENTS.md → FRS.md):

{{architectCrewIntegration}}

### AGENTS.md Generation Instructions

The following guidelines should be used when generating AGENTS.md from this architectural specification:

{{agentsGenerationInstructions}}

### FRS.md Capture Requirements

As implementation proceeds, the following technical details should be captured in FRS.md:

{{frsCapture​Requirements}}

## File Encoding Standards
**All documentation files, including `AGENTS.md` and any files generated or modified by AI, MUST be in UTF-8 encoding.**

## Prime Directive

**Ensure this architecture serves the user needs identified in RDS.md while providing clear, actionable guidance for the implementation team through AGENTS.md. Every architectural decision must be traceable back to a user requirement and forward to an implementation specification.**

---

**Architecture Authority**: This CLAUDE.md serves as the authoritative architectural specification. All implementation decisions in AGENTS.md must align with this architecture. Any conflicts should be resolved by updating this architectural specification first, then regenerating AGENTS.md.

Built with ❤️ using the Architect Crew methodology.