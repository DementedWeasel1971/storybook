# Architect Crew Methodology - Reference Implementation

This repository contains the **Architect Crew methodology** implementation for automated documentation generation in development projects. It demonstrates the complete documentation chain: **RDS → CLAUDE → AGENTS → FRS** using a React Design System as the reference implementation.

## 🏗️ Architecture Overview

The Architect Crew methodology creates a complete automation chain for design system documentation:

```mermaid
graph LR
    A[docs/RDS.md] --> B[CLAUDE.md]
    B --> C[AGENTS.md]
    C --> D[docs/FRS.md]
    D --> E[Implementation]
    
    subgraph "Generation Scripts"
        F[generate-claude.js]
        G[generate-agents.js]
        H[generate-frs.js]
    end
    
    A --> F
    B --> G
    C --> H
    
    subgraph "Templates"
        I[CLAUDE.template.md]
        J[AGENTS.template.md]
        K[FRS.template.md]
    end
    
    F --> I
    G --> J
    H --> K
```

## 📋 Document Roles

| Document | Purpose | Generated From | Generates |
|----------|---------|----------------|-----------|
| **RDS.md** | Requirements & user needs | Manual creation | CLAUDE.md |
| **CLAUDE.md** | Architecture & design | RDS.md + personas | AGENTS.md |
| **AGENTS.md** | Implementation instructions | CLAUDE.md architecture | FRS.md |
| **FRS.md** | Technical specifications | Implementation analysis | Validation |

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- NPM dependencies installed: `npm install`

### Generate Documentation

```bash
# Generate entire chain
npm run generate:all

# Generate specific documents
npm run generate:claude    # RDS → CLAUDE
npm run generate:agents    # CLAUDE → AGENTS  
npm run generate:frs       # AGENTS → FRS

# Dry run (preview without writing)
npm run generate:all:dry-run
npm run generate:claude:dry-run
npm run generate:agents:dry-run
npm run generate:frs:dry-run

# Force regeneration
npm run generate:all:force
```

## 📁 Directory Structure

```
storybook/
├── docs/                                  # Documentation output
│   ├── RDS.md                            # Requirements (manual)
│   ├── FRS.md                            # Technical specs (generated)
│   └── persona-*.md                      # User personas (manual)
├── templates/                             # Generation templates
│   ├── CLAUDE.template.md                # Architecture template
│   ├── AGENTS.template.md                # Implementation template
│   ├── FRS.template.md                   # Technical specs template
│   ├── UNIVERSAL-ADAPTATION-GUIDE.md     # Technology adaptation guide
│   └── technology-specific/              # Technology-specific templates
│       ├── python/                       # Python development templates
│       ├── flask/                        # Flask web framework templates
│       ├── autogluon/                    # AutoGluon ML templates
│       ├── laravel-php/                  # Laravel PHP templates
│       ├── simpy-pyomo-mcp/              # Simulation & optimization templates
│       ├── googlemaps-mcp/               # Google Maps MCP templates
│       └── openai-laravel-mcp/           # OpenAI Laravel MCP templates
├── implementations/                       # Working implementations
│   ├── fastapi-neo4j-mysql/             # FastAPI implementation
│   ├── laravel-mysql/                    # Laravel implementation
│   └── simpy-pyomo-mcp-system/           # SimPy-Pyomo-MCP implementation
├── googlemaps-mcp-service/               # Google Maps MCP Node.js implementation
│   ├── src/                              # TypeScript source code
│   ├── tests/                            # Comprehensive test suite
│   └── package.json                      # Node.js dependencies
├── apps/                                 # Application implementations
│   └── design-system/                    # React Design System
├── scripts/                              # Generation scripts
│   ├── generate-claude.js               # RDS → CLAUDE generator
│   ├── generate-agents.js               # CLAUDE → AGENTS generator
│   └── generate-frs.js                  # AGENTS → FRS generator
├── .github/workflows/                    # Automation workflows
│   ├── generate-docs.yml                # Auto generation on changes
│   └── manual-generate.yml              # Manual generation workflow
├── CLAUDE.md                            # Architecture (generated)
├── AGENTS.md                            # Implementation guide (generated)
├── METHODOLOGY.md                       # Complete methodology framework
├── LESSONS-LEARNED.md                   # Implementation insights
└── package.json                         # Scripts and dependencies
```

## Stakeholders & Personas

This design system is built to serve multiple personas across the development and design lifecycle. Each persona has specific needs and requirements that drive the system's architecture and features:

### Primary Stakeholders

- **Product Owner** - Voice of the customer, articulating priorities and customer pain points
- **Brand Manager** - Voice of the brand, ensuring consistent brand identity and visual representation
- **Copywriter** - Voice of tone and messaging, maintaining consistent brand voice across all content
- **Frontend Developers** - Building consistent, reusable components with TypeScript support
- **UI/UX Designers** - Ensuring design-to-code consistency and accessibility compliance
- **Product Managers** - Driving brand consistency and faster feature delivery
- **QA Engineers** - Implementing automated testing and quality assurance
- **DevOps Engineers** - Managing CI/CD pipelines and deployment infrastructure

For detailed persona requirements and specifications, see the individual persona files in the `docs/` directory.

## Architect Crew Methodology & Documentation Structure

This repository employs the **Architect Crew methodology** to manage requirements, technical design, and AI collaboration:

-   **`docs/RDS.md` (Requirements Document Specification):** This document outlines the **functional requirements** of the design system. It answers *what* the system should do and *why*, based on user personas and business needs. It is the source of truth for functional goals.
-   **`docs/FRS.md` (Functional Requirements Specification):** This document provides the **detailed technical specifications**. It answers *how* the system should be built, including all UML diagrams (using Mermaid), component architecture, API contracts, and other specific implementation blueprints. It is the authoritative source for all technical design.
-   **`CLAUDE.md` (AI Architect Instructions):** This file guides the "Architect AI" (e.g., Claude) in its role. Its primary responsibilities include translating functional requirements from `docs/RDS.md` into detailed technical specifications in `docs/FRS.md`, and ensuring that `AGENTS.md` is correctly aligned to guide implementing AIs.
-   **`AGENTS.md` (AI Agent Constitution):** This document provides direct, actionable instructions for AI agents performing implementation tasks. Crucially, it mandates that agents **MUST** refer to `docs/FRS.md` for all technical details and specifications when implementing features or components. *(Note: Due to technical issues during a recent update, AGENTS.md may not fully reflect this yet. The intention is for it to strictly enforce FRS.md adherence.)*

This structure ensures a clear separation of concerns: functional requirements are distinct from technical specifications, and AI roles are clearly defined to maintain architectural integrity and accurate documentation.

### 🤖 Automated Generation Chain

This repository now includes **automated generation capabilities** that maintain the Architect Crew methodology through code:

#### Generation Flow: RDS → CLAUDE → AGENTS → FRS

1. **RDS → CLAUDE (Architecture Generation)**
   - **Trigger**: Changes to `docs/RDS.md` or `docs/persona-*.md`
   - **Process**: Analyzes requirements and personas to generate architectural decisions
   - **Output**: `CLAUDE.md` with complete system architecture
   - **Script**: `scripts/generate-claude.js`
   - **Template**: `templates/CLAUDE.template.md`

2. **CLAUDE → AGENTS (Implementation Instructions)**
   - **Trigger**: Changes to `CLAUDE.md`
   - **Process**: Translates architecture into specific implementation instructions
   - **Output**: `AGENTS.md` with detailed implementation guidance
   - **Script**: `scripts/generate-agents.js`
   - **Template**: `templates/AGENTS.template.md`

3. **AGENTS → FRS (Technical Documentation)**
   - **Trigger**: Changes to `AGENTS.md` or implementation files
   - **Process**: Analyzes actual implementation and documents technical specifications
   - **Output**: `docs/FRS.md` with complete technical documentation
   - **Script**: `scripts/generate-frs.js`
   - **Template**: `templates/FRS.template.md`

#### Automated Workflows

- **`generate-docs.yml`**: Automatically detects changes and regenerates appropriate documents
- **`manual-generate.yml`**: Allows manual triggering of generation for specific documents
- **Quality Gates**: Validates content, UTF-8 encoding, and required sections

#### Generation Commands

```bash
# Generate entire documentation chain
npm run generate:all

# Generate specific documents
npm run generate:claude    # RDS → CLAUDE
npm run generate:agents    # CLAUDE → AGENTS  
npm run generate:frs       # AGENTS → FRS

# Preview mode (no file changes)
npm run generate:claude:dry-run
npm run generate:agents:dry-run
npm run generate:frs:dry-run

# Force regeneration (ignore timestamps)
npm run generate:all:force
```

This automation ensures that the Architect Crew methodology is consistently applied and that all documentation remains synchronized as the project evolves.

## 🌟 **Methodology Resources**

This project implements the Architect Crew methodology and provides a complete framework for technology-agnostic development:

### **Core Methodology Documentation**
- **[METHODOLOGY.md](METHODOLOGY.md)** - Complete methodology framework for any technology stack
- **[LESSONS-LEARNED.md](LESSONS-LEARNED.md)** - Insights and optimization from Storybook implementation
- **[UNIVERSAL-ADAPTATION-GUIDE.md](templates/UNIVERSAL-ADAPTATION-GUIDE.md)** - Guide for adapting to any technology

### **Technology-Specific Templates**
- **[React/TypeScript Templates](templates/)** - Current Storybook implementation templates
- **[Python Templates](templates/technology-specific/python/)** - General Python development framework
- **[Flask Templates](templates/technology-specific/flask/)** - Flask web application framework
- **[AutoGluon Templates](templates/technology-specific/autogluon/)** - AutoML and machine learning framework
- **[Laravel/PHP Templates](templates/technology-specific/laravel-php/)** - Complete Laravel adaptation
- **[SimPy-Pyomo-MCP Templates](templates/technology-specific/simpy-pyomo-mcp/)** - Simulation and optimization framework
- **[Google Maps MCP Templates](templates/technology-specific/googlemaps-mcp/)** - Google Maps API with MCP integration
- **[OpenAI Laravel MCP Templates](templates/technology-specific/openai-laravel-mcp/)** - OpenAI API with Laravel and MCP
- **[Neo4j Python Templates](templates/technology-specific/neo4j-python/)** - Graph database integration with Python
- **[Neo4j JavaScript Templates](templates/technology-specific/neo4j-javascript/)** - Graph database integration with Node.js/TypeScript
- **[Neo4j MCP Templates](templates/technology-specific/neo4j-mcp/)** - LLM-assisted graph database operations via MCP
- **Technology Adapters** - Automated generation for specific tech stacks

### **Methodology Capabilities**
✅ **Automated documentation** synchronization across the development chain  
✅ **Consistent architecture** decisions through defined agent roles  
✅ **Streamlined implementation** with technology-specific guidance  
✅ **Quality assurance** through built-in validation and testing protocols  
✅ **Accelerated onboarding** with comprehensive documentation and examples  

### **Technology Stack Support**
The methodology supports diverse technology stacks and project types:
- **Web frameworks**: Flask, Laravel, Django, ASP.NET, Express.js
- **Machine Learning**: AutoGluon, TensorFlow, PyTorch, scikit-learn
- **API Integration**: OpenAI, Google Maps, MCP services
- **Graph Databases**: Neo4j with Python, JavaScript/Node.js, and MCP integration
- **LLM Integration**: Model Context Protocol (MCP) services and AI-assisted development
- **General Programming**: Python, JavaScript, Java, C#, Go, PHP
- **Mobile frameworks**: React Native, Flutter, Swift, Kotlin
- **Desktop applications**: Electron, Qt, WPF
- Any project type or team size

**Get started with the [METHODOLOGY.md](METHODOLOGY.md) guide.**

## BDD Requirements Flow

The design system follows a structured Behavior-Driven Development (BDD) approach. Functional requirements originate from `docs/RDS.md` and are then translated into detailed technical designs in `docs/FRS.md`. These technical designs then inform the BDD process:

```mermaid
stateDiagram-v2
    [*] --> RDS : Requirements Document Specification
    
    RDS --> Features : Articulate Features
    Features --> Scenarios : Break down into Scenarios
    
    state Features {
        [*] --> FeatureDefinition
        FeatureDefinition --> FeatureDescription
        FeatureDescription --> [*]
    }
    
    state Scenarios {
        [*] --> ScenarioIdentification
        ScenarioIdentification --> AcceptanceCriteria
        AcceptanceCriteria --> GherkinNotation
        GherkinNotation --> [*]
    }
    
    Scenarios --> UserStories : Each Scenario becomes User Story
    
    state UserStories {
        [*] --> StoryNaming
        StoryNaming --> StoryDescription
        StoryDescription --> BDDFormat
        BDDFormat --> StoryAcceptanceCriteria
        
        note right of BDDFormat : As a {persona}\nI want to {action}\nSo that {outcome}
        note right of StoryAcceptanceCriteria : Gherkin notation:\nGiven/When/Then
    }
    
    UserStories --> TestCases : Acceptance Criteria → Test Cases
    
    state TestCases {
        [*] --> UnitTests
        [*] --> IntegrationTests
        [*] --> E2ETests
        [*] --> AccessibilityTests
        
        UnitTests --> TestExecution
        IntegrationTests --> TestExecution
        E2ETests --> TestExecution
        AccessibilityTests --> TestExecution
        
        TestExecution --> [*]
    }
    
    TestCases --> Implementation : Drive Component Development
    Implementation --> Validation : Verify against Acceptance Criteria
    Validation --> [*] : Requirements Satisfied
    
    note left of RDS : Central source of truth\nfor all requirements
    note right of TestCases : Executable specifications\nderived from Gherkin
```

### BDD Methodology Implementation

1.  **`docs/RDS.md` (Requirements Document Specification)**: Central source of truth defining all **functional system requirements**.
2.  **`docs/FRS.md` (Functional Requirements Specification)**: Detailed **technical specifications** derived from RDS, including UML diagrams, API designs, and component architecture. This is the blueprint for implementation.
3.  **Features**: High-level capabilities articulated from RDS requirements and FRS technical designs.
4.  **Scenarios**: Specific situations broken down from each feature.
4. **Acceptance Criteria**: Gherkin notation (Given/When/Then) defining scenario success conditions
5. **User Stories**: Each scenario converted to user story format with BDD structure
6. **Test Cases**: Executable tests derived directly from acceptance criteria
7. **Implementation**: Component development driven by test cases
8. **Validation**: Verification that implementation satisfies original acceptance criteria

This approach ensures traceability from high-level requirements through to implementation and testing, maintaining alignment with stakeholder needs throughout the development process.

## Architecture Overview

### Technology Stack Overview

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

### System Integration Design

```mermaid
graph LR
    subgraph "Design System Core"
        A[Design Tokens] --> B[Base Components]
        B --> C[Complex Components]
        C --> D[Component Library]
    end
    
    subgraph "Development Workflow"
        E[Local Development] --> F[Storybook Dev Server]
        F --> G[Component Stories]
        G --> H[Visual Testing]
    end
    
    subgraph "Distribution Channels"
        D --> I[NPM Package]
        D --> J[CDN Distribution]
        G --> K[Static Storybook Site]
    end
    
    subgraph "Consumer Applications"
        I --> L[React Applications]
        J --> M[Laravel Applications]
        K --> N[Design Documentation]
    end
    
    subgraph "Quality Gates"
        O[Unit Tests] --> P[Visual Regression]
        P --> Q[Accessibility Audit]
        Q --> R[Performance Testing]
    end
    
    H --> O
    R --> I
    R --> J
```

### Component Architecture Flow

```mermaid
flowchart TD
    A[Design Tokens] --> B{Component Type}
    B -->|Atomic| C[Button, Input, Icon]
    B -->|Molecular| D[Form, Card, Modal]
    B -->|Organism| E[Header, Sidebar, Layout]
    
    C --> F[TypeScript Definitions]
    D --> F
    E --> F
    
    F --> G[Storybook Stories]
    G --> H[Documentation]
    
    F --> I[Unit Tests]
    I --> J[Visual Tests]
    J --> K[Accessibility Tests]
    
    K --> L[Build Process]
    L --> M[Bundle Optimization]
    M --> N[Distribution]
    
    N --> O[Consumer Integration]
    O --> P[Feedback Loop]
    P --> A
```

## Technology Stack

- **React 18+** - Component library framework
- **TypeScript** - Type safety and developer experience
- **Storybook 8.3+** - Component development and documentation
- **Rollup** - Library bundling and distribution
- **Vite** - Development server and build tooling
- **CSS** - Component styling

## Deployment & Integration Architecture

### CI/CD Pipeline

```mermaid
gitGraph
    commit id: "Feature Branch"
    branch feature
    checkout feature
    commit id: "Component Development"
    commit id: "Add Storybook Stories"
    commit id: "Unit Tests"
    checkout main
    merge feature
    commit id: "Automated Testing"
    commit id: "Visual Regression"
    commit id: "Build Library"
    commit id: "Deploy Storybook"
    commit id: "Publish NPM"
```

### Multi-Platform Integration

```mermaid
graph TB
    subgraph "Design System Source"
        A[Component Library] --> B[Build Process]
        B --> C[Multiple Outputs]
    end
    
    subgraph "Distribution Formats"
        C --> D[ES Modules]
        C --> E[CommonJS]
        C --> F[UMD Bundle]
        C --> G[TypeScript Definitions]
    end
    
    subgraph "Integration Targets"
        D --> H[Modern React Apps]
        E --> I[Node.js Applications]
        F --> J[Laravel Blade Templates]
        F --> K[CDN Integration]
        G --> L[IDE Support]
    end
    
    subgraph "Documentation & Tools"
        M[Storybook Static] --> N[GitHub Pages]
        M --> O[Netlify/Vercel]
        M --> P[Internal Documentation]
    end
    
    C --> M
```

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Repository Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DementedWeasel1971/storybook.git
   cd storybook
   ```

2. **Install root dependencies (for generation scripts):**
   ```bash
   npm install
   ```

### Specific Implementation Setup

#### React Design System
```bash
cd apps/design-system
npm install
npm run dev  # Start Storybook on port 6006
```

#### Google Maps MCP Service
```bash
cd googlemaps-mcp-service
npm install
npm run dev  # Start development server (requires setup of .env file)
```

#### Technology Template Usage
```bash
# Example: Use Flask template for new project
cp templates/technology-specific/flask/CLAUDE.flask.md ./CLAUDE.md
cp templates/technology-specific/flask/AGENTS.flask.md ./AGENTS.md
cp templates/technology-specific/flask/FRS.flask.md ./docs/FRS.md
```

## Development

### Running Storybook

Start the Storybook development server on port 6006:

```bash
cd apps/design-system
npm run storybook
```

Visit `http://localhost:6006` to view the component library and documentation.

### Running Google Maps MCP Service

Start the Google Maps MCP development server:

```bash
cd googlemaps-mcp-service
npm run dev
```

### Building the Library

Build the component library for distribution:

```bash
cd apps/design-system
npm run build-lib
```

### Building Storybook Static Site

Generate a static Storybook site for deployment:

```bash
cd apps/design-system
npm run build-storybook
```

### Build Everything

Build both the library and Storybook static site:

```bash
cd apps/design-system
npm run build
```

## Component Architecture

### Component Structure

Each component follows a consistent structure:

```text
ComponentName/
├── ComponentName.tsx         # Component implementation
├── ComponentName.css         # Component styles
├── ComponentName.stories.tsx # Storybook stories
└── index.ts                 # Export file
```

### Design System Layers

1. **Design Tokens** (`src/tokens/`)
   - Colors, spacing, typography definitions
   - Consistent design language foundation

2. **Components** (`src/components/`)
   - Reusable React components (Button, Card, Input, etc.)
   - Fully typed with TypeScript

3. **Stories** (`src/stories/`)
   - Storybook stories and usage examples
   - Component documentation and testing

4. **Global Styles** (`src/styles/`)
   - CSS utilities and global styling
   - Theme configuration

## Build Outputs

- **Library**: `apps/design-system/dist/`
  - CommonJS, ESM, and TypeScript definitions
  - Ready for npm distribution

- **Storybook**: `apps/design-system/storybook-static/`
  - Static site for documentation hosting
  - Deployable to any web server

## Contributing

1. Create feature branches from `main`
2. Follow the existing component structure
3. Add Storybook stories for new components
4. Test components in Storybook before submitting
5. Update documentation as needed

## Deployment

The design system can be deployed in multiple ways:

- **NPM Package**: Distribute the built library
- **Static Site**: Deploy Storybook documentation
- **Laravel Integration**: Import components into PHP applications via CDN or build process

## License

[Add your license information here]

## Cross-References and Related Resources

### Core Documentation
- **[METHODOLOGY.md](METHODOLOGY.md)** - Complete Architect Crew methodology framework
- **[LESSONS-LEARNED.md](LESSONS-LEARNED.md)** - Implementation insights and best practices
- **[docs/RDS.md](docs/RDS.md)** - Requirements specification for the design system
- **[docs/FRS.md](docs/FRS.md)** - Technical specifications and implementation details

### Technology Templates
- **[templates/technology-specific/](templates/technology-specific/)** - Complete template library
- **[templates/UNIVERSAL-ADAPTATION-GUIDE.md](templates/UNIVERSAL-ADAPTATION-GUIDE.md)** - Technology adaptation guide

### Working Implementations
- **[apps/design-system/](apps/design-system/)** - React Design System with Storybook
- **[googlemaps-mcp-service/](googlemaps-mcp-service/)** - Google Maps MCP Node.js service
- **[implementations/](implementations/)** - Additional framework implementations

### Generation Scripts
- **[scripts/generate-claude.js](scripts/generate-claude.js)** - RDS → CLAUDE generator
- **[scripts/generate-agents.js](scripts/generate-agents.js)** - CLAUDE → AGENTS generator
- **[scripts/generate-frs.js](scripts/generate-frs.js)** - AGENTS → FRS generator

## Support

For questions and support:
- Review the comprehensive documentation in the `docs/` directory
- Check the technology-specific templates for guidance
- Examine working implementations for examples
- Create an issue in the repository for specific problems