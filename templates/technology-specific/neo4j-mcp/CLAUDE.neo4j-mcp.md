---
template: claude-neo4j-mcp.md
version: {{claudeVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/neo4j-mcp/CLAUDE.neo4j-mcp.md
generatedBy: architect-crew
technology: Neo4j + MCP (Model Context Protocol) + TypeScript
generationTriggers:
  - RDS.md changes
  - Neo4j MCP architectural requirements
chainedGeneration:
  - AGENTS.md (from CLAUDE.md architecture)
  - FRS.md (from AGENTS.md implementation)
---

# CLAUDE.md - Neo4j MCP Service Integration Architecture Definition & AI Collaboration Guide

**Version**: {{claudeVersion}}  
**Date**: {{date}}  
**Generated from**: RDS.md requirements analysis  
**Technology Stack**: Neo4j Graph Database + Model Context Protocol (MCP) + TypeScript + Node.js

This file defines the comprehensive architecture of the Neo4j MCP service integration solution. It aligns with the Architect Crew methodology, where:
- **`docs/RDS.md`** outlines the **functional requirements** and user needs.
- **`docs/FRS.md`** provides the **detailed technical specifications**, including all UML diagrams (Mermaid) and specific implementation blueprints.
- **`CLAUDE.md`** (this file) instructs Claude (and similar AI) on how to interpret these documents, contribute to the architecture, and ensure `AGENTS.md` is correctly aligned.
- **`AGENTS.md`** provides specific, actionable instructions for AI agents performing implementation tasks.

## 1. From RDS → FRS Validation

**Source**: `docs/RDS.md` (What & Why)  
**Ensure**: Every RDS requirement appears in FRS diagrams/contracts.

{{rdsToFrsValidation}}

## 2. Neo4j MCP Service Integration Architectural Overview

{{neo4jMcpArchitecturalOverview}}

### Core Integration Principles

1. **LLM-Assisted Graph Operations**
   - Comprehensive Neo4j database integration exposed through MCP protocol
   - Natural language to Cypher query translation for LLM consumption
   - Context-aware graph exploration and pattern discovery
   - Real-time graph analytics accessible to LLM reasoning systems

2. **Production-Ready MCP Architecture**
   - Official @modelcontextprotocol/sdk integration with TypeScript
   - Scalable connection management and session handling
   - Comprehensive error handling and retry logic
   - Security-first design with authentication and authorization

3. **Graph Context Protocol Integration**
   - Efficient graph data serialization for LLM context windows
   - Intelligent graph sampling and summarization
   - Multi-hop relationship traversal with context preservation
   - Graph pattern matching exposed as MCP tools and resources

4. **Enterprise Graph MCP Framework**
   - Modular architecture following MCP and Node.js best practices
   - Service layer patterns for graph operations
   - Configurable authentication and security
   - Comprehensive monitoring and observability

## 3. System Architecture Layers

```mermaid
graph TB
    subgraph "LLM Client Layer"
        A[Claude/GPT Client] --> B[MCP Client SDK]
        B --> C[Tool Invocation Protocol]
        C --> D[Resource Request Protocol]
    end
    
    subgraph "MCP Server Layer"
        D --> E[Neo4j MCP Server]
        E --> F[Tool Registry]
        E --> G[Resource Registry]
        F --> H[Graph Operations Tools]
        G --> I[Graph Data Resources]
    end
    
    subgraph "Graph Service Layer"
        H --> J[Graph Query Service]
        I --> K[Graph Context Service]
        J --> L[Cypher Generation]
        K --> M[Context Optimization]
    end
    
    subgraph "Neo4j Driver Layer"
        L --> N[Neo4j Driver v5.x]
        M --> N
        N --> O[Session Management]
        O --> P[Transaction Handling]
        P --> Q[Connection Pool]
    end
    
    subgraph "Graph Database Layer"
        Q --> R[Neo4j Database]
        R --> S[Node Storage]
        R --> T[Relationship Storage]
        R --> U[Index Management]
    end
    
    subgraph "Context & Caching Layer"
        V[Context Cache] --> W[Graph Summaries]
        X[Query Cache] --> Y[Result Cache]
        
        W --> K
        Y --> J
    end
```

### LLM-Graph Integration Flow

```mermaid
sequenceDiagram
    participant LLM as LLM Client (Claude)
    participant MCP as MCP Neo4j Server
    participant Graph as Graph Service
    participant Cache as Context Cache
    participant Neo4j as Neo4j Database
    participant Context as Context Optimizer
    
    LLM->>MCP: Request graph exploration tool
    MCP->>Graph: Initialize graph exploration
    Graph->>Cache: Check cached context
    
    alt Context Cache Hit
        Cache->>Graph: Return cached graph context
    else Context Cache Miss
        Graph->>Neo4j: Execute graph discovery query
        Neo4j->>Graph: Return graph data
        Graph->>Context: Optimize for LLM context
        Context->>Graph: Return optimized context
        Graph->>Cache: Store context summary
    end
    
    Graph->>MCP: Return tool response
    MCP->>LLM: Provide graph context
    
    LLM->>MCP: Request specific graph query
    MCP->>Graph: Execute Cypher generation
    Graph->>Neo4j: Run generated Cypher
    Neo4j->>Graph: Return query results
    Graph->>Context: Format for LLM consumption
    Context->>MCP: Optimized result format
    MCP->>LLM: Return formatted results
```

## 4. MCP Protocol Architecture for Graph Databases

### MCP Server Implementation Patterns

```mermaid
graph LR
    subgraph "MCP Server Core"
        A[Server Instance] --> B[Tool Registry]
        A --> C[Resource Registry]
        A --> D[Protocol Handler]
    end
    
    subgraph "Graph Tools"
        E[Cypher Execute Tool] --> F[Query Validation]
        G[Graph Explore Tool] --> H[Pattern Discovery]
        I[Analytics Tool] --> J[Graph Algorithms]
        K[Recommendation Tool] --> L[Similarity Analysis]
    end
    
    subgraph "Graph Resources"
        M[Schema Resource] --> N[Node Labels]
        M --> O[Relationship Types]
        P[Metrics Resource] --> Q[Performance Stats]
        P --> R[Health Status]
    end
    
    subgraph "Context Management"
        S[Context Serializer] --> T[Graph Sampling]
        U[Result Formatter] --> V[LLM Optimization]
        W[Memory Manager] --> X[Context Windows]
    end
    
    B --> E
    B --> G
    B --> I
    B --> K
    
    C --> M
    C --> P
    
    F --> S
    H --> S
    J --> U
    L --> U
    
    T --> W
    V --> W
```

### MCP Tool Definitions for Graph Operations

```mermaid
graph TD
    A[Graph MCP Tools] --> B[Query Tools]
    A --> C[Exploration Tools]
    A --> D[Analytics Tools]
    A --> E[Management Tools]
    
    B --> F[execute_cypher]
    B --> G[query_nodes]
    B --> H[query_relationships]
    B --> I[find_paths]
    
    C --> J[explore_neighborhood]
    C --> K[discover_patterns]
    C --> L[traverse_graph]
    C --> M[sample_subgraph]
    
    D --> N[calculate_centrality]
    D --> O[detect_communities]
    D --> P[find_recommendations]
    D --> Q[analyze_relationships]
    
    E --> R[get_schema]
    E --> S[get_statistics]
    E --> T[health_check]
    E --> U[clear_cache]
```

## 5. Graph Context Protocol and LLM Integration

### Context Optimization Strategies

1. **Graph Sampling for LLM Context**
   - `intelligent_sampling`: Select representative nodes and relationships
   - `importance_scoring`: Weight nodes by centrality and relevance
   - `context_windowing`: Fit graph data within LLM context limits
   - `hierarchical_summarization`: Multi-level graph abstractions

2. **Natural Language Graph Interface**
   - `cypher_translation`: Convert natural language to Cypher queries
   - `result_narration`: Translate graph results to natural language
   - `pattern_explanation`: Explain discovered graph patterns
   - `relationship_description`: Describe relationship semantics

3. **Intelligent Graph Exploration**
   - `guided_traversal`: LLM-directed graph exploration
   - `question_answering`: Graph-based question answering
   - `hypothesis_testing`: Test graph-based hypotheses
   - `insight_generation`: Generate insights from graph patterns

4. **Context-Aware Caching**
   - `semantic_caching`: Cache based on query semantics
   - `context_invalidation`: Smart cache invalidation
   - `preemptive_loading`: Anticipate LLM context needs
   - `compression_algorithms`: Efficient context compression

## 6. TypeScript MCP SDK Integration Architecture

### MCP Server Framework Integration

```mermaid
graph LR
    subgraph "MCP SDK Integration"
        A[McpServer Instance] --> B[Tool Handlers]
        A --> C[Resource Handlers]
        A --> D[Transport Layer]
    end
    
    subgraph "Graph Tool Handlers"
        E[CypherExecuteTool] --> F[Query Validation]
        G[GraphExploreTool] --> H[Exploration Logic]
        I[AnalyticsTool] --> J[Algorithm Execution]
        K[RecommendationTool] --> L[Similarity Computation]
    end
    
    subgraph "Resource Handlers"
        M[SchemaResource] --> N[Schema Discovery]
        O[MetricsResource] --> P[Performance Monitoring]
        Q[ContextResource] --> R[Context Management]
    end
    
    subgraph "Neo4j Integration"
        S[Graph Service] --> T[Session Management]
        T --> U[Query Execution]
        U --> V[Result Processing]
        V --> W[Context Formatting]
    end
    
    B --> E
    B --> G
    B --> I
    B --> K
    
    C --> M
    C --> O
    C --> Q
    
    F --> S
    H --> S
    J --> S
    L --> S
    
    N --> S
    P --> S
    R --> S
```

### LLM Context Serialization Pattern

```mermaid
sequenceDiagram
    participant LLM as LLM Client
    participant MCP as MCP Server
    participant Optimizer as Context Optimizer
    participant Graph as Graph Service
    participant Formatter as Result Formatter
    participant Neo4j as Neo4j Database
    
    LLM->>MCP: Request graph exploration with context limit
    MCP->>Optimizer: Initialize context optimization
    Optimizer->>Graph: Request graph sampling strategy
    Graph->>Neo4j: Execute sampling queries
    Neo4j->>Graph: Return sampled data
    
    Graph->>Optimizer: Provide raw graph data
    Optimizer->>Optimizer: Apply context compression
    Optimizer->>Formatter: Format for LLM consumption
    Formatter->>Formatter: Apply semantic formatting
    
    Formatter->>MCP: Return optimized context
    MCP->>LLM: Provide formatted graph context
    
    LLM->>MCP: Request follow-up based on context
    MCP->>Graph: Execute targeted query
    Graph->>Neo4j: Run specific Cypher
    Neo4j->>Graph: Return targeted results
    Graph->>Formatter: Format results
    Formatter->>MCP: Return formatted results
    MCP->>LLM: Provide results within context
```

## 7. Security and Authentication Architecture

### MCP Security Framework

```mermaid
graph TB
    subgraph "Authentication Layer"
        A[MCP Client] --> B[Authentication Handler]
        B --> C[Token Validation]
        C --> D[Authorization Check]
    end
    
    subgraph "Graph Security Layer"
        D --> E[Query Authorization]
        E --> F[Data Filtering]
        F --> G[Result Sanitization]
    end
    
    subgraph "Neo4j Security"
        G --> H[Database Authentication]
        H --> I[Role-Based Access]
        I --> J[Query Validation]
        J --> K[Injection Prevention]
    end
    
    subgraph "Context Security"
        K --> L[Context Sanitization]
        L --> M[Sensitive Data Filtering]
        M --> N[Privacy Compliance]
    end
    
    subgraph "Audit & Monitoring"
        N --> O[Access Logging]
        O --> P[Query Auditing]
        P --> Q[Security Monitoring]
    end
```

### MCP Tool Security Patterns

1. **Tool Authorization**
   - `role_based_tools`: Different tools for different user roles
   - `query_complexity_limits`: Prevent expensive operations
   - `data_access_controls`: Control access to sensitive data
   - `rate_limiting`: Prevent abuse and DoS attacks

2. **Query Security**
   - `cypher_sanitization`: Prevent Cypher injection attacks
   - `parameter_validation`: Validate all query parameters
   - `result_filtering`: Filter sensitive data from results
   - `audit_logging`: Log all query execution

3. **Context Security**
   - `data_anonymization`: Anonymize sensitive data in context
   - `privacy_preserving`: Maintain privacy in graph exploration
   - `content_filtering`: Filter inappropriate content
   - `compliance_checks`: Ensure regulatory compliance

## 8. Performance and Scalability Architecture

### MCP Performance Optimization Strategies

1. **Context Window Optimization**
   - Intelligent graph sampling to maximize information density
   - Hierarchical summarization for multi-scale context
   - Compression algorithms for efficient context utilization
   - Adaptive context sizing based on query complexity

2. **Caching Architecture**
   - Multi-level caching (query, context, schema)
   - Semantic caching based on query intent
   - Preemptive caching for common patterns
   - Distributed caching for scalability

3. **Query Optimization**
   - Query plan caching and optimization
   - Parallel query execution for complex operations
   - Result streaming for large datasets
   - Index-aware query generation

4. **Scalability Features**
   - Horizontal scaling with load balancing
   - Connection pooling and session management
   - Async processing for non-blocking operations
   - Resource management and throttling

### Performance Monitoring and Observability

```mermaid
graph LR
    subgraph "MCP Metrics"
        A[Tool Invocation Metrics] --> B[Response Times]
        A --> C[Success Rates]
        A --> D[Error Rates]
        A --> E[Context Usage]
    end
    
    subgraph "Graph Metrics"
        F[Query Performance] --> G[Execution Times]
        F --> H[Resource Usage]
        F --> I[Cache Hit Rates]
        F --> J[Connection Stats]
    end
    
    subgraph "Context Metrics"
        K[Context Optimization] --> L[Compression Ratios]
        K --> M[Sampling Efficiency]
        K --> N[LLM Effectiveness]
        K --> O[Memory Usage]
    end
    
    subgraph "System Health"
        B --> P[Alerting System]
        G --> P
        L --> P
        P --> Q[Health Dashboard]
        P --> R[Automated Scaling]
    end
```

## 9. Integration Patterns and Use Cases

### Common LLM-Graph Integration Patterns

1. **Conversational Graph Exploration**
   - "Find connections between Person A and Company B"
   - "Discover influential nodes in the social network"
   - "Explain the relationship patterns in this dataset"
   - "Recommend similar entities based on graph structure"

2. **Knowledge Graph Question Answering**
   - "What is the shortest path between these concepts?"
   - "Which entities are most similar to this one?"
   - "Find all entities with these specific properties"
   - "Analyze the community structure of this graph"

3. **Graph-Guided Content Generation**
   - "Generate a summary of this entity's connections"
   - "Create a narrative about relationship patterns"
   - "Explain the significance of this graph structure"
   - "Describe the role of this node in the network"

4. **Analytical Graph Insights**
   - "Identify anomalous patterns in the graph"
   - "Find emerging communities or clusters"
   - "Detect influential spreaders in the network"
   - "Analyze temporal changes in graph structure"

### Advanced MCP Graph Use Cases

```mermaid
graph TD
    A[LLM-Driven Analytics] --> B[Natural Language Queries]
    A --> C[Automated Insights]
    A --> D[Hypothesis Testing]
    
    E[Interactive Exploration] --> F[Guided Discovery]
    E --> G[Context-Aware Navigation]
    E --> H[Progressive Disclosure]
    
    I[Knowledge Synthesis] --> J[Multi-Source Integration]
    I --> K[Concept Mapping]
    I --> L[Relationship Inference]
    
    M[Decision Support] --> N[Recommendation Systems]
    M --> O[Risk Assessment]
    M --> P[Impact Analysis]
```

## 10. Development and Testing Architecture

### MCP Development Workflow

```mermaid
graph LR
    A[Development] --> B[MCP Server Setup]
    B --> C[Tool Implementation]
    C --> D[Resource Creation]
    D --> E[Integration Testing]
    E --> F[LLM Testing]
    F --> G[Performance Testing]
    G --> H[Security Testing]
    H --> I[Production Deployment]
    
    subgraph "Quality Gates"
        J[Code Review]
        K[Test Coverage]
        L[Performance Benchmarks]
        M[Security Scans]
        N[MCP Compliance]
    end
    
    C --> J
    D --> K
    F --> L
    G --> M
    H --> N
```

### Testing Strategies for MCP Graph Integration

1. **Unit Testing Patterns**
   - Mock MCP client interactions
   - Test graph operation logic in isolation
   - Verify context optimization algorithms
   - Test security and validation functions

2. **Integration Testing**
   - Test complete MCP tool workflows
   - Verify Neo4j integration functionality
   - Test context serialization and formatting
   - Validate error handling and recovery

3. **LLM Integration Testing**
   - Test with actual LLM clients (Claude, GPT)
   - Verify context window optimization
   - Test tool discovery and invocation
   - Validate result interpretation

4. **Performance Testing**
   - Benchmark tool response times
   - Test with large graph datasets
   - Measure context optimization efficiency
   - Validate scalability under load

## Core Principles for System Architecture, Integrity, and AI Collaboration

1. **Context-First Design**: Architecture decisions prioritize LLM context efficiency and effectiveness
2. **MCP Protocol Compliance**: Follow official MCP specifications and best practices
3. **Graph Performance**: Optimize for graph database performance while maintaining context clarity
4. **Security Integration**: Built-in security at every layer including query validation and data filtering
5. **Scalability Planning**: Design for horizontal scaling and high-availability deployments
6. **Documentation Integrity**: Maintain CLAUDE.md and AGENTS.md alignment with implementation
7. **Technical Merit**: Justify all architectural decisions with graph database and MCP best practices

## Architectural Diagrams and Flows

### Primary Architecture Flow
```mermaid
graph LR
    A[RDS Requirements] --> B[FRS Technical Specs]
    B --> C[CLAUDE Architecture]
    C --> D[AGENTS Implementation]
    D --> E[Neo4j MCP Service]
    E --> F[LLM-Graph Applications]
    
    subgraph "Feedback Loop"
        F --> G[Usage Analytics]
        G --> H[Architecture Updates]
        H --> A
    end
```

### MCP Graph Data Flow Architecture
```mermaid
flowchart TD
    A[LLM Request] --> B{Tool or Resource?}
    B -->|Tool| C[Tool Execution Pipeline]
    B -->|Resource| D[Resource Retrieval Pipeline]
    
    C --> E[Query Generation]
    E --> F[Neo4j Execution]
    F --> G[Result Processing]
    G --> H[Context Optimization]
    
    D --> I[Resource Generation]
    I --> J[Schema Discovery]
    J --> K[Data Summarization]
    K --> H
    
    H --> L[MCP Response]
    L --> M[LLM Context Integration]
```

### Context Optimization Flow
```mermaid
flowchart TD
    A[Raw Graph Data] --> B{Context Size Check}
    B -->|Within Limits| C[Direct Formatting]
    B -->|Exceeds Limits| D[Apply Sampling Strategy]
    
    D --> E[Importance Scoring]
    E --> F[Representative Selection]
    F --> G[Hierarchical Summarization]
    G --> H[Compression Application]
    
    C --> I[Format for LLM]
    H --> I
    
    I --> J[Validate Context Quality]
    J --> K[Return Optimized Context]
```

## File Encoding Standards
**All documentation files, including `AGENTS.md` and any files generated or modified by AI, MUST be in UTF-8 encoding.**

## Implementation Status and Next Steps

**Current Implementation Status**:
- ⏳ Template creation in progress
- ⏳ Core Neo4j MCP architecture definition complete
- ⏳ MCP protocol integration patterns defined
- ⏳ LLM context optimization strategies ready

**Immediate Next Steps**:
1. Complete AGENTS.md implementation guidelines
2. Generate FRS.md technical specifications
3. Set up Node.js project with MCP SDK and Neo4j driver
4. Implement MCP tools and resources for graph operations
5. Create comprehensive testing framework with LLM integration
6. Add authentication, caching, and monitoring layers
7. Implement context optimization and performance features

**Architecture Evolution Timeline**:
- **Phase 1** (Current): Core architecture and MCP templates
- **Phase 2** (Next 30 days): Basic MCP server with Neo4j integration
- **Phase 3** (Next 60 days): Advanced context optimization and LLM features
- **Phase 4** (Next 90 days): Production features and enterprise patterns

---

**Prime Directive**: Always ensure seamless integration between Neo4j graph database and LLM systems through the Model Context Protocol while maximizing context efficiency and maintaining high performance for graph operations.

Built with ❤️ using the Architect Crew methodology, Neo4j graph database excellence, and MCP protocol standards.