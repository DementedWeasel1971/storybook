---
template: agents-neo4j-mcp.md
version: {{agentsVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/neo4j-mcp/AGENTS.neo4j-mcp.md
generatedBy: executor-crew
technology: Neo4j + MCP (Model Context Protocol) + TypeScript
generationTriggers: 
  - CLAUDE.md architecture changes
  - Neo4j MCP implementation requirements updates
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
---

# AGENTS.md: AI Agent Constitution for Neo4j MCP Service Integration Development

**Version**: {{agentsVersion}}  
**Generated from**: CLAUDE.md architectural specification  
**Date**: {{date}}  
**Technology**: Neo4j Graph Database + Model Context Protocol (MCP) + TypeScript + Node.js

This document provides the **official guidelines and mandatory protocols** for any AI agent contributing to this Neo4j MCP service integration project. **You MUST adhere to all instructions herein.**

## Project Overview

{{neo4jMcpProjectOverview}}

**Crucially, all AI agents MUST implement the Neo4j MCP service integration architecture defined in `CLAUDE.md` and document technical specifications in `docs/FRS.md` as implementation proceeds.**

## Neo4j MCP Implementation Requirements

Based on the architecture defined in CLAUDE.md, the following implementation requirements are mandatory:

{{neo4jMcpImplementationRequirements}}

### MCP TypeScript Node.js Project Structure Standards

1. **Mandatory Neo4j MCP Service Project Structure**
   ```
   neo4j-mcp-service/
   ├── src/
   │   ├── index.ts                      # MCP server entry point
   │   ├── server/
   │   │   ├── index.ts                  # MCP server setup and configuration
   │   │   ├── mcp-server.ts             # Main MCP server implementation
   │   │   ├── tool-registry.ts          # Tool registration and management
   │   │   ├── resource-registry.ts      # Resource registration and management
   │   │   └── transport-handler.ts      # MCP transport protocol handling
   │   ├── tools/
   │   │   ├── index.ts                  # Tool exports
   │   │   ├── graph-query-tools.ts      # Cypher execution and query tools
   │   │   ├── graph-exploration-tools.ts # Graph exploration and discovery tools
   │   │   ├── analytics-tools.ts        # Graph analytics and algorithm tools
   │   │   ├── recommendation-tools.ts   # Recommendation and similarity tools
   │   │   └── management-tools.ts       # Schema and management tools
   │   ├── resources/
   │   │   ├── index.ts                  # Resource exports
   │   │   ├── schema-resource.ts        # Graph schema information resource
   │   │   ├── metrics-resource.ts       # Performance and health metrics
   │   │   ├── context-resource.ts       # Graph context and summaries
   │   │   └── documentation-resource.ts # API and usage documentation
   │   ├── services/
   │   │   ├── index.ts                  # Service exports
   │   │   ├── graph-service.ts          # Core graph operations service
   │   │   ├── context-optimizer.ts      # LLM context optimization service
   │   │   ├── query-generator.ts        # Natural language to Cypher service
   │   │   ├── result-formatter.ts       # Result formatting for LLM consumption
   │   │   └── cache-service.ts          # Caching and performance optimization
   │   ├── database/
   │   │   ├── index.ts                  # Database exports
   │   │   ├── neo4j-connection.ts       # Neo4j driver connection management
   │   │   ├── session-manager.ts        # Session lifecycle and pooling
   │   │   ├── transaction-manager.ts    # Transaction handling
   │   │   └── query-executor.ts         # Query execution and error handling
   │   ├── models/
   │   │   ├── index.ts                  # Model exports
   │   │   ├── mcp-types.ts              # MCP protocol type definitions
   │   │   ├── graph-types.ts            # Graph entity type definitions
   │   │   ├── tool-schemas.ts           # Tool input/output schemas
   │   │   ├── resource-schemas.ts       # Resource data schemas
   │   │   └── context-types.ts          # Context optimization types
   │   ├── validation/
   │   │   ├── index.ts                  # Validation exports
   │   │   ├── tool-validators.ts        # Tool input validation
   │   │   ├── query-validators.ts       # Cypher query validation
   │   │   ├── security-validators.ts    # Security and injection prevention
   │   │   └── schema-validators.ts      # Data schema validation
   │   ├── context/
   │   │   ├── index.ts                  # Context management exports
   │   │   ├── graph-sampler.ts          # Intelligent graph sampling
   │   │   ├── context-compressor.ts     # Context compression algorithms
   │   │   ├── importance-scorer.ts      # Node/relationship importance scoring
   │   │   └── summarizer.ts             # Graph summarization and abstraction
   │   ├── security/
   │   │   ├── index.ts                  # Security exports
   │   │   ├── auth-handler.ts           # MCP authentication handling
   │   │   ├── authorization.ts          # Tool and resource authorization
   │   │   ├── query-sanitizer.ts        # Cypher injection prevention
   │   │   └── data-filter.ts            # Sensitive data filtering
   │   ├── monitoring/
   │   │   ├── index.ts                  # Monitoring exports
   │   │   ├── metrics-collector.ts      # Performance metrics collection
   │   │   ├── health-checker.ts         # Service health monitoring
   │   │   ├── audit-logger.ts           # Audit logging and compliance
   │   │   └── performance-profiler.ts   # Performance profiling and optimization
   │   ├── cache/
   │   │   ├── index.ts                  # Cache exports
   │   │   ├── context-cache.ts          # Context and result caching
   │   │   ├── query-cache.ts            # Query plan and result caching
   │   │   ├── schema-cache.ts           # Schema information caching
   │   │   └── cache-manager.ts          # Cache lifecycle management
   │   └── utils/
   │       ├── index.ts                  # Utility exports
   │       ├── config.ts                 # Configuration management
   │       ├── logger.ts                 # Structured logging
   │       ├── errors.ts                 # Custom error classes
   │       ├── helpers.ts                # Utility helper functions
   │       └── constants.ts              # Application constants
   ├── tests/
   │   ├── unit/                         # Unit tests
   │   │   ├── tools/                    # Tool unit tests
   │   │   ├── services/                 # Service unit tests
   │   │   ├── context/                  # Context optimization tests
   │   │   └── validation/               # Validation tests
   │   ├── integration/                  # Integration tests
   │   │   ├── mcp-server/               # MCP server integration tests
   │   │   ├── database/                 # Neo4j integration tests
   │   │   └── end-to-end/               # End-to-end workflow tests
   │   ├── fixtures/                     # Test data and fixtures
   │   │   ├── graph-data.ts             # Sample graph data
   │   │   ├── mcp-requests.ts           # Sample MCP requests
   │   │   └── expected-responses.ts     # Expected response data
   │   └── helpers/                      # Test helper utilities
   │       ├── mcp-client.ts             # Mock MCP client for testing
   │       ├── test-database.ts          # Test database setup
   │       └── mock-factories.ts         # Mock object factories
   ├── docs/                             # Documentation
   │   ├── tools.md                      # Tool documentation
   │   ├── resources.md                  # Resource documentation
   │   ├── deployment.md                 # Deployment guide
   │   └── examples.md                   # Usage examples
   ├── config/                           # Configuration files
   │   ├── mcp-server.config.ts          # MCP server configuration
   │   ├── database.config.ts            # Database configuration
   │   ├── cache.config.ts               # Cache configuration
   │   └── environment.config.ts         # Environment-specific configs
   ├── scripts/                          # Utility scripts
   │   ├── setup-database.ts             # Database setup script
   │   ├── seed-data.ts                  # Test data seeding
   │   └── performance-test.ts           # Performance testing script
   ├── docker/                           # Docker configuration
   │   ├── Dockerfile                    # Production Docker image
   │   ├── docker-compose.yml            # Development environment
   │   └── docker-compose.test.yml       # Testing environment
   ├── .env.example                      # Environment variables template
   ├── .gitignore                        # Git ignore rules
   ├── package.json                      # Node.js dependencies and scripts
   ├── tsconfig.json                     # TypeScript configuration
   ├── jest.config.js                    # Jest testing configuration
   ├── eslint.config.js                  # ESLint configuration  
   ├── prettier.config.js                # Prettier configuration
   └── README.md                         # Project documentation
   ```

2. **Mandatory Package.json Configuration**

   You MUST create a `package.json` with the following dependencies and scripts:
   ```json
   {
     "name": "neo4j-mcp-service",
     "version": "1.0.0",
     "description": "Neo4j Graph Database integration with Model Context Protocol for LLM-assisted graph operations",
     "main": "dist/index.js",
     "types": "dist/index.d.ts",
     "scripts": {
       "dev": "tsx src/index.ts",
       "build": "tsc",
       "start": "node dist/index.js",
       "test": "jest",
       "test:watch": "jest --watch",
       "test:coverage": "jest --coverage",
       "lint": "eslint src --ext .ts,.tsx --fix",
       "typecheck": "tsc --noEmit",
       "clean": "rimraf dist",
       "prebuild": "npm run clean",
       "format": "prettier --write src/**/*.ts",
       "check-format": "prettier --check src/**/*.ts",
       "setup:db": "tsx scripts/setup-database.ts",
       "seed:data": "tsx scripts/seed-data.ts",
       "test:performance": "tsx scripts/performance-test.ts"
     },
     "dependencies": {
       "@modelcontextprotocol/sdk": "^0.5.0",
       "neo4j-driver": "^5.15.0",
       "zod": "^3.22.4",
       "winston": "^3.11.0",
       "dotenv": "^16.3.1",
       "redis": "^4.6.12",
       "express": "^4.18.2",
       "cors": "^2.8.5",
       "helmet": "^7.1.0",
       "rate-limiter-flexible": "^4.0.1"
     },
     "devDependencies": {
       "@types/node": "^20.10.5",
       "@types/express": "^4.17.21",
       "@types/cors": "^2.8.17",
       "@types/jest": "^29.5.8",
       "@typescript-eslint/eslint-plugin": "^6.13.1",
       "@typescript-eslint/parser": "^6.13.1",
       "eslint": "^8.54.0",
       "jest": "^29.7.0",
       "prettier": "^3.1.0",
       "rimraf": "^5.0.5",
       "ts-jest": "^29.1.1",
       "tsx": "^4.6.0",
       "typescript": "^5.3.2"
     },
     "keywords": [
       "neo4j",
       "mcp",
       "model-context-protocol",
       "llm",
       "graph-database",
       "typescript",
       "nodejs"
     ]
   }
   ```

## Neo4j MCP Implementation Protocols

### Protocol 1: MCP Server Setup and Configuration

**MANDATORY**: All MCP server implementations MUST follow the official MCP SDK patterns with comprehensive error handling.

1. **Core MCP Server Implementation**
   ```typescript
   // src/server/mcp-server.ts
   import { Server } from '@modelcontextprotocol/sdk/server/index.js';
   import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
   import {
     CallToolRequestSchema,
     ListToolsRequestSchema,
     GetResourceRequestSchema,
     ListResourcesRequestSchema,
   } from '@modelcontextprotocol/sdk/types.js';
   import { GraphService } from '../services/graph-service.js';
   import { ToolRegistry } from './tool-registry.js';
   import { ResourceRegistry } from './resource-registry.js';
   import { Logger } from '../utils/logger.js';

   export class Neo4jMcpServer {
     private server: Server;
     private toolRegistry: ToolRegistry;
     private resourceRegistry: ResourceRegistry;
     private graphService: GraphService;
     private logger: Logger;

     constructor(
       graphService: GraphService,
       logger: Logger
     ) {
       this.graphService = graphService;
       this.logger = logger;
       
       // Initialize MCP server
       this.server = new Server(
         {
           name: 'neo4j-mcp-service',
           version: '1.0.0',
         },
         {
           capabilities: {
             tools: {},
             resources: {},
           },
         }
       );

       this.toolRegistry = new ToolRegistry(this.graphService, this.logger);
       this.resourceRegistry = new ResourceRegistry(this.graphService, this.logger);
       
       this.setupHandlers();
     }

     private setupHandlers(): void {
       // List tools handler
       this.server.setRequestHandler(ListToolsRequestSchema, async () => {
         try {
           return {
             tools: this.toolRegistry.getTools(),
           };
         } catch (error) {
           this.logger.error('Error listing tools', { error });
           throw error;
         }
       });

       // Call tool handler
       this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
         try {
           const { name, arguments: args } = request.params;
           return await this.toolRegistry.executeTool(name, args);
         } catch (error) {
           this.logger.error('Error executing tool', { 
             toolName: request.params.name, 
             error 
           });
           throw error;
         }
       });

       // List resources handler
       this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
         try {
           return {
             resources: this.resourceRegistry.getResources(),
           };
         } catch (error) {
           this.logger.error('Error listing resources', { error });
           throw error;
         }
       });

       // Get resource handler
       this.server.setRequestHandler(GetResourceRequestSchema, async (request) => {
         try {
           const { uri } = request.params;
           return await this.resourceRegistry.getResource(uri);
         } catch (error) {
           this.logger.error('Error getting resource', { 
             uri: request.params.uri, 
             error 
           });
           throw error;
         }
       });
     }

     async start(): Promise<void> {
       try {
         const transport = new StdioServerTransport();
         await this.server.connect(transport);
         
         this.logger.info('Neo4j MCP server started successfully');
         
         // Keep the server running
         process.on('SIGINT', async () => {
           this.logger.info('Shutting down Neo4j MCP server');
           await this.shutdown();
           process.exit(0);
         });
         
       } catch (error) {
         this.logger.error('Failed to start MCP server', { error });
         throw error;
       }
     }

     async shutdown(): Promise<void> {
       try {
         await this.graphService.close();
         this.logger.info('Neo4j MCP server shutdown complete');
       } catch (error) {
         this.logger.error('Error during shutdown', { error });
         throw error;
       }
     }
   }
   ```

2. **Tool Registry Implementation**
   ```typescript
   // src/server/tool-registry.ts
   import { Tool } from '@modelcontextprotocol/sdk/types.js';
   import { GraphService } from '../services/graph-service.js';
   import { Logger } from '../utils/logger.js';
   import {
     ExecuteCypherTool,
     ExploreGraphTool,
     AnalyticsGraphTool,
     RecommendationTool,
     SchemaDiscoveryTool
   } from '../tools/index.js';

   export class ToolRegistry {
     private tools: Map<string, any> = new Map();
     private toolDefinitions: Tool[] = [];

     constructor(
       private graphService: GraphService,
       private logger: Logger
     ) {
       this.registerTools();
     }

     private registerTools(): void {
       // Register graph query tools
       this.registerTool(new ExecuteCypherTool(this.graphService, this.logger));
       this.registerTool(new ExploreGraphTool(this.graphService, this.logger));
       this.registerTool(new AnalyticsGraphTool(this.graphService, this.logger));
       this.registerTool(new RecommendationTool(this.graphService, this.logger));
       this.registerTool(new SchemaDiscoveryTool(this.graphService, this.logger));
     }

     private registerTool(toolInstance: any): void {
       const definition = toolInstance.getDefinition();
       this.tools.set(definition.name, toolInstance);
       this.toolDefinitions.push(definition);
       
       this.logger.debug('Registered MCP tool', { name: definition.name });
     }

     getTools(): Tool[] {
       return this.toolDefinitions;
     }

     async executeTool(name: string, args: any): Promise<any> {
       const tool = this.tools.get(name);
       
       if (!tool) {
         throw new Error(`Tool '${name}' not found`);
       }

       this.logger.info('Executing MCP tool', { name, args });
       
       try {
         const result = await tool.execute(args);
         this.logger.info('Tool execution completed', { name });
         return result;
       } catch (error) {
         this.logger.error('Tool execution failed', { name, error });
         throw error;
       }
     }
   }
   ```

### Protocol 2: Graph Query Tools Implementation

**MANDATORY**: All graph query tools MUST implement secure, validated, and optimized Cypher execution.

1. **Execute Cypher Tool Implementation**
   ```typescript
   // src/tools/graph-query-tools.ts
   import { Tool } from '@modelcontextprotocol/sdk/types.js';
   import { z } from 'zod';
   import { GraphService } from '../services/graph-service.js';
   import { Logger } from '../utils/logger.js';
   import { QueryValidator } from '../validation/query-validators.js';

   export class ExecuteCypherTool {
     private validator: QueryValidator;

     constructor(
       private graphService: GraphService,
       private logger: Logger
     ) {
       this.validator = new QueryValidator();
     }

     getDefinition(): Tool {
       return {
         name: 'execute_cypher',
         description: 'Execute a Cypher query against the Neo4j database with security validation and result optimization',
         inputSchema: {
           type: 'object',
           properties: {
             query: {
               type: 'string',
               description: 'The Cypher query to execute'
             },
             parameters: {
               type: 'object',
               description: 'Query parameters for safe parameterized execution',
               additionalProperties: true
             },
             limit: {
               type: 'number',
               description: 'Maximum number of results to return (default: 100)',
               default: 100,
               minimum: 1,
               maximum: 1000
             },
             optimize_for_llm: {
               type: 'boolean',
               description: 'Whether to optimize results for LLM consumption',
               default: true
             }
           },
           required: ['query']
         }
       };
     }

     async execute(args: any): Promise<any> {
       // Validate input
       const schema = z.object({
         query: z.string().min(1),
         parameters: z.record(z.any()).optional().default({}),
         limit: z.number().min(1).max(1000).optional().default(100),
         optimize_for_llm: z.boolean().optional().default(true)
       });

       const { query, parameters, limit, optimize_for_llm } = schema.parse(args);

       try {
         // Security validation
         await this.validator.validateQuery(query, parameters);

         // Execute query with timeout
         const startTime = Date.now();
         const results = await this.graphService.executeCypher(
           query,
           parameters,
           { limit, timeout: 30000 }
         );

         const executionTime = Date.now() - startTime;

         // Optimize results for LLM if requested
         let processedResults = results;
         if (optimize_for_llm) {
           processedResults = await this.optimizeForLLM(results);
         }

         this.logger.info('Cypher query executed successfully', {
           query: query.substring(0, 100) + '...',
           resultCount: results.length,
           executionTime
         });

         return {
           content: [
             {
               type: 'text',
               text: JSON.stringify({
                 success: true,
                 query,
                 results: processedResults,
                 metadata: {
                   resultCount: results.length,
                   executionTime,
                   optimizedForLLM: optimize_for_llm
                 }
               }, null, 2)
             }
           ]
         };

       } catch (error) {
         this.logger.error('Cypher execution failed', { query, error });
         
         return {
           content: [
             {
               type: 'text',
               text: JSON.stringify({
                 success: false,
                 error: error.message,
                 query
               }, null, 2)
             }
           ],
           isError: true
         };
       }
     }

     private async optimizeForLLM(results: any[]): Promise<any[]> {
       // Implement context optimization logic
       return results.map(result => {
         // Flatten nested objects for better LLM consumption
         const flattened = this.flattenObject(result);
         
         // Remove internal Neo4j metadata
         const cleaned = this.removeInternalMetadata(flattened);
         
         return cleaned;
       });
     }

     private flattenObject(obj: any, prefix = ''): any {
       const flattened: any = {};
       
       for (const key in obj) {
         if (obj.hasOwnProperty(key)) {
           const newKey = prefix ? `${prefix}.${key}` : key;
           
           if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
             Object.assign(flattened, this.flattenObject(obj[key], newKey));
           } else {
             flattened[newKey] = obj[key];
           }
         }
       }
       
       return flattened;
     }

     private removeInternalMetadata(obj: any): any {
       const cleaned = { ...obj };
       
       // Remove Neo4j internal fields
       delete cleaned.identity;
       delete cleaned.elementId;
       delete cleaned._fields;
       delete cleaned._fieldLookup;
       
       return cleaned;
     }
   }
   ```

2. **Graph Exploration Tool Implementation**
   ```typescript
   // src/tools/graph-exploration-tools.ts
   import { Tool } from '@modelcontextprotocol/sdk/types.js';
   import { z } from 'zod';
   import { GraphService } from '../services/graph-service.js';
   import { ContextOptimizer } from '../services/context-optimizer.js';
   import { Logger } from '../utils/logger.js';

   export class ExploreGraphTool {
     private contextOptimizer: ContextOptimizer;

     constructor(
       private graphService: GraphService,
       private logger: Logger
     ) {
       this.contextOptimizer = new ContextOptimizer();
     }

     getDefinition(): Tool {
       return {
         name: 'explore_graph',
         description: 'Intelligently explore the graph starting from specified nodes, optimized for LLM context consumption',
         inputSchema: {
           type: 'object',
           properties: {
             start_nodes: {
               type: 'array',
               items: {
                 type: 'object',
                 properties: {
                   id: { type: 'string' },
                   label: { type: 'string' },
                   properties: { type: 'object' }
                 }
               },
               description: 'Starting nodes for exploration (by ID, label, or properties)'
             },
             max_depth: {
               type: 'number',
               description: 'Maximum depth for graph traversal',
               default: 2,
               minimum: 1,
               maximum: 5
             },
             relationship_types: {
               type: 'array',
               items: { type: 'string' },
               description: 'Specific relationship types to follow (empty for all)'
             },
             context_limit: {
               type: 'number',
               description: 'Maximum context size for LLM (in tokens)',
               default: 4000,
               minimum: 1000,
               maximum: 16000
             },
             exploration_strategy: {
               type: 'string',
               enum: ['breadth_first', 'depth_first', 'importance_based'],
               description: 'Strategy for graph exploration',
               default: 'importance_based'
             }
           },
           required: ['start_nodes']
         }
       };
     }

     async execute(args: any): Promise<any> {
       const schema = z.object({
         start_nodes: z.array(z.object({
           id: z.string().optional(),
           label: z.string().optional(),
           properties: z.record(z.any()).optional()
         })).min(1),
         max_depth: z.number().min(1).max(5).optional().default(2),
         relationship_types: z.array(z.string()).optional().default([]),
         context_limit: z.number().min(1000).max(16000).optional().default(4000),
         exploration_strategy: z.enum(['breadth_first', 'depth_first', 'importance_based']).optional().default('importance_based')
       });

       const { 
         start_nodes, 
         max_depth, 
         relationship_types, 
         context_limit, 
         exploration_strategy 
       } = schema.parse(args);

       try {
         // Find starting nodes
         const startingNodes = await this.findStartingNodes(start_nodes);
         
         if (startingNodes.length === 0) {
           throw new Error('No starting nodes found matching the criteria');
         }

         // Perform graph exploration
         const explorationResult = await this.performExploration(
           startingNodes,
           max_depth,
           relationship_types,
           exploration_strategy
         );

         // Optimize for LLM context
         const optimizedContext = await this.contextOptimizer.optimizeExplorationResults(
           explorationResult,
           context_limit
         );

         this.logger.info('Graph exploration completed', {
           startingNodesCount: startingNodes.length,
           maxDepth: max_depth,
           resultSize: explorationResult.nodes.length + explorationResult.relationships.length,
           optimizedSize: optimizedContext.estimatedTokens
         });

         return {
           content: [
             {
               type: 'text',
               text: JSON.stringify({
                 success: true,
                 exploration: {
                   starting_nodes: startingNodes,
                   discovered_nodes: optimizedContext.nodes,
                   relationships: optimizedContext.relationships,
                   patterns: optimizedContext.patterns,
                   summary: optimizedContext.summary
                 },
                 metadata: {
                   exploration_depth: max_depth,
                   strategy_used: exploration_strategy,
                   context_optimization: {
                     original_size: explorationResult.nodes.length + explorationResult.relationships.length,
                     optimized_size: optimizedContext.nodes.length + optimizedContext.relationships.length,
                     estimated_tokens: optimizedContext.estimatedTokens
                   }
                 }
               }, null, 2)
             }
           ]
         };

       } catch (error) {
         this.logger.error('Graph exploration failed', { args, error });
         
         return {
           content: [
             {
               type: 'text',
               text: JSON.stringify({
                 success: false,
                 error: error.message,
                 start_nodes
               }, null, 2)
             }
           ],
           isError: true
         };
       }
     }

     private async findStartingNodes(startNodeSpecs: any[]): Promise<any[]> {
       const foundNodes: any[] = [];

       for (const spec of startNodeSpecs) {
         if (spec.id) {
           // Find by ID
           const node = await this.graphService.findNodeById(spec.id);
           if (node) foundNodes.push(node);
         } else if (spec.label) {
           // Find by label and optional properties
           const nodes = await this.graphService.findNodesByLabel(
             spec.label, 
             spec.properties || {}
           );
           foundNodes.push(...nodes.slice(0, 10)); // Limit to prevent explosion
         } else if (spec.properties) {
           // Find by properties only
           const nodes = await this.graphService.findNodesByProperties(spec.properties);
           foundNodes.push(...nodes.slice(0, 10));
         }
       }

       return foundNodes;
     }

     private async performExploration(
       startingNodes: any[],
       maxDepth: number,
       relationshipTypes: string[],
       strategy: string
     ): Promise<any> {
       switch (strategy) {
         case 'breadth_first':
           return await this.breadthFirstExploration(startingNodes, maxDepth, relationshipTypes);
         case 'depth_first':
           return await this.depthFirstExploration(startingNodes, maxDepth, relationshipTypes);
         case 'importance_based':
           return await this.importanceBasedExploration(startingNodes, maxDepth, relationshipTypes);
         default:
           throw new Error(`Unknown exploration strategy: ${strategy}`);
       }
     }

     private async breadthFirstExploration(
       startingNodes: any[],
       maxDepth: number,
       relationshipTypes: string[]
     ): Promise<any> {
       const visited = new Set<string>();
       const nodes: any[] = [];
       const relationships: any[] = [];
       const queue: { node: any; depth: number }[] = [];

       // Initialize with starting nodes
       for (const node of startingNodes) {
         queue.push({ node, depth: 0 });
         visited.add(node.elementId);
         nodes.push(node);
       }

       while (queue.length > 0) {
         const { node, depth } = queue.shift()!;

         if (depth >= maxDepth) continue;

         // Get neighbors
         const neighbors = await this.graphService.getNodeNeighbors(
           node.elementId,
           relationshipTypes,
           1
         );

         for (const { neighbor, relationship } of neighbors) {
           if (!visited.has(neighbor.elementId)) {
             visited.add(neighbor.elementId);
             nodes.push(neighbor);
             queue.push({ node: neighbor, depth: depth + 1 });
           }
           relationships.push(relationship);
         }
       }

       return { nodes, relationships };
     }

     private async depthFirstExploration(
       startingNodes: any[],
       maxDepth: number,
       relationshipTypes: string[]
     ): Promise<any> {
       const visited = new Set<string>();
       const nodes: any[] = [];
       const relationships: any[] = [];

       const dfs = async (node: any, depth: number): Promise<void> => {
         if (depth >= maxDepth || visited.has(node.elementId)) return;

         visited.add(node.elementId);
         nodes.push(node);

         const neighbors = await this.graphService.getNodeNeighbors(
           node.elementId,
           relationshipTypes,
           1
         );

         for (const { neighbor, relationship } of neighbors) {
           relationships.push(relationship);
           await dfs(neighbor, depth + 1);
         }
       };

       for (const startNode of startingNodes) {
         await dfs(startNode, 0);
       }

       return { nodes, relationships };
     }

     private async importanceBasedExploration(
       startingNodes: any[],
       maxDepth: number,
       relationshipTypes: string[]
     ): Promise<any> {
       // First, get importance scores for all reachable nodes
       const importanceScores = await this.graphService.calculateImportanceScores(
         startingNodes.map(n => n.elementId),
         maxDepth
       );

       // Sort by importance and select top nodes
       const sortedNodes = Object.entries(importanceScores)
         .sort(([, a], [, b]) => (b as number) - (a as number))
         .slice(0, 100); // Limit to top 100 important nodes

       const selectedNodeIds = sortedNodes.map(([id]) => id);
       const nodes = await this.graphService.getNodesByIds(selectedNodeIds);
       const relationships = await this.graphService.getRelationshipsBetweenNodes(selectedNodeIds);

       return { nodes, relationships };
     }
   }
   ```

### Protocol 3: Context Optimization Service Implementation

**MANDATORY**: All context optimization MUST prioritize LLM effectiveness while maintaining graph structure integrity.

1. **Context Optimizer Service**
   ```typescript
   // src/services/context-optimizer.ts
   import { Logger } from '../utils/logger.js';
   import { GraphSampler } from '../context/graph-sampler.js';
   import { ContextCompressor } from '../context/context-compressor.js';
   import { ImportanceScorer } from '../context/importance-scorer.js';
   import { Summarizer } from '../context/summarizer.js';

   export interface OptimizationResult {
     nodes: any[];
     relationships: any[];
     patterns: any[];
     summary: string;
     estimatedTokens: number;
   }

   export class ContextOptimizer {
     private sampler: GraphSampler;
     private compressor: ContextCompressor;
     private scorer: ImportanceScorer;
     private summarizer: Summarizer;

     constructor(private logger: Logger) {
       this.sampler = new GraphSampler();
       this.compressor = new ContextCompressor();
       this.scorer = new ImportanceScorer();
       this.summarizer = new Summarizer();
     }

     async optimizeExplorationResults(
       explorationResult: any,
       contextLimit: number
     ): Promise<OptimizationResult> {
       try {
         // Step 1: Calculate importance scores
         const nodeScores = await this.scorer.scoreNodes(explorationResult.nodes);
         const relationshipScores = await this.scorer.scoreRelationships(explorationResult.relationships);

         // Step 2: Apply intelligent sampling
         const sampledData = await this.sampler.sampleGraph(
           explorationResult.nodes,
           explorationResult.relationships,
           nodeScores,
           relationshipScores,
           contextLimit
         );

         // Step 3: Compress and format data
         const compressedData = await this.compressor.compressGraphData(
           sampledData.nodes,
           sampledData.relationships
         );

         // Step 4: Generate patterns and summary
         const patterns = await this.extractPatterns(
           compressedData.nodes,
           compressedData.relationships
         );

         const summary = await this.summarizer.generateGraphSummary(
           compressedData.nodes,
           compressedData.relationships,
           patterns
         );

         // Step 5: Estimate token usage
         const estimatedTokens = this.estimateTokenCount(
           compressedData,
           patterns,
           summary
         );

         this.logger.debug('Context optimization completed', {
           originalNodes: explorationResult.nodes.length,
           originalRelationships: explorationResult.relationships.length,
           optimizedNodes: compressedData.nodes.length,
           optimizedRelationships: compressedData.relationships.length,
           estimatedTokens
         });

         return {
           nodes: compressedData.nodes,
           relationships: compressedData.relationships,
           patterns,
           summary,
           estimatedTokens
         };

       } catch (error) {
         this.logger.error('Context optimization failed', { error });
         throw error;
       }
     }

     private async extractPatterns(nodes: any[], relationships: any[]): Promise<any[]> {
       const patterns: any[] = [];

       // Extract common node label patterns
       const labelCounts = new Map<string, number>();
       nodes.forEach(node => {
         node.labels?.forEach((label: string) => {
           labelCounts.set(label, (labelCounts.get(label) || 0) + 1);
         });
       });

       patterns.push({
         type: 'node_distribution',
         description: 'Distribution of node types in the graph',
         data: Object.fromEntries(labelCounts)
       });

       // Extract relationship type patterns
       const relationshipCounts = new Map<string, number>();
       relationships.forEach(rel => {
         relationshipCounts.set(rel.type, (relationshipCounts.get(rel.type) || 0) + 1);
       });

       patterns.push({
         type: 'relationship_distribution',
         description: 'Distribution of relationship types in the graph',
         data: Object.fromEntries(relationshipCounts)
       });

       // Extract degree distribution patterns
       const degreeDistribution = this.calculateDegreeDistribution(nodes, relationships);
       patterns.push({
         type: 'degree_distribution',
         description: 'Node degree distribution showing connectivity patterns',
         data: degreeDistribution
       });

       return patterns;
     }

     private calculateDegreeDistribution(nodes: any[], relationships: any[]): any {
       const nodeDegrees = new Map<string, number>();

       // Initialize all nodes with degree 0
       nodes.forEach(node => {
         nodeDegrees.set(node.elementId, 0);
       });

       // Count degrees
       relationships.forEach(rel => {
         const startDegree = nodeDegrees.get(rel.startNodeElementId) || 0;
         const endDegree = nodeDegrees.get(rel.endNodeElementId) || 0;
         
         nodeDegrees.set(rel.startNodeElementId, startDegree + 1);
         nodeDegrees.set(rel.endNodeElementId, endDegree + 1);
       });

       // Create distribution
       const distribution = new Map<number, number>();
       nodeDegrees.forEach(degree => {
         distribution.set(degree, (distribution.get(degree) || 0) + 1);
       });

       return Object.fromEntries(distribution);
     }

     private estimateTokenCount(
       compressedData: any,
       patterns: any[],
       summary: string
     ): number {
       // Rough estimation: 1 token ≈ 4 characters
       const dataJson = JSON.stringify(compressedData);
       const patternsJson = JSON.stringify(patterns);
       
       const totalChars = dataJson.length + patternsJson.length + summary.length;
       return Math.ceil(totalChars / 4);
     }
   }
   ```

2. **Graph Sampler Implementation**
   ```typescript
   // src/context/graph-sampler.ts
   export interface SamplingResult {
     nodes: any[];
     relationships: any[];
   }

   export class GraphSampler {
     async sampleGraph(
       nodes: any[],
       relationships: any[],
       nodeScores: Map<string, number>,
       relationshipScores: Map<string, number>,
       targetTokens: number
     ): Promise<SamplingResult> {
       // Estimate current size
       const currentTokens = this.estimateGraphTokens(nodes, relationships);
       
       if (currentTokens <= targetTokens) {
         return { nodes, relationships };
       }

       // Calculate sampling ratio
       const samplingRatio = targetTokens / currentTokens;
       
       // Sample nodes based on importance scores
       const sampledNodes = await this.sampleNodesByImportance(
         nodes,
         nodeScores,
         samplingRatio
       );

       // Sample relationships based on sampled nodes and scores
       const sampledRelationships = await this.sampleRelationships(
         relationships,
         sampledNodes,
         relationshipScores,
         samplingRatio
       );

       return {
         nodes: sampledNodes,
         relationships: sampledRelationships
       };
     }

     private async sampleNodesByImportance(
       nodes: any[],
       scores: Map<string, number>,
       ratio: number
     ): Promise<any[]> {
       // Sort nodes by importance score
       const sortedNodes = nodes.sort((a, b) => {
         const scoreA = scores.get(a.elementId) || 0;
         const scoreB = scores.get(b.elementId) || 0;
         return scoreB - scoreA;
       });

       // Take top percentage based on ratio
       const targetCount = Math.max(1, Math.floor(nodes.length * ratio));
       return sortedNodes.slice(0, targetCount);
     }

     private async sampleRelationships(
       relationships: any[],
       sampledNodes: any[],
       scores: Map<string, number>,
       ratio: number
     ): Promise<any[]> {
       const sampledNodeIds = new Set(sampledNodes.map(n => n.elementId));

       // Filter relationships to only include those between sampled nodes
       const validRelationships = relationships.filter(rel => 
         sampledNodeIds.has(rel.startNodeElementId) && 
         sampledNodeIds.has(rel.endNodeElementId)
       );

       // Sort by importance and sample
       const sortedRelationships = validRelationships.sort((a, b) => {
         const scoreA = scores.get(a.elementId) || 0;
         const scoreB = scores.get(b.elementId) || 0;
         return scoreB - scoreA;
       });

       const targetCount = Math.max(1, Math.floor(validRelationships.length * ratio));
       return sortedRelationships.slice(0, targetCount);
     }

     private estimateGraphTokens(nodes: any[], relationships: any[]): number {
       const nodesJson = JSON.stringify(nodes);
       const relationshipsJson = JSON.stringify(relationships);
       const totalChars = nodesJson.length + relationshipsJson.length;
       return Math.ceil(totalChars / 4); // Rough token estimation
     }
   }
   ```

### Protocol 4: Resource Registry Implementation

**MANDATORY**: All MCP resources MUST provide structured, cacheable graph information optimized for LLM consumption.

1. **Resource Registry Implementation**
   ```typescript
   // src/server/resource-registry.ts
   import { Resource } from '@modelcontextprotocol/sdk/types.js';
   import { GraphService } from '../services/graph-service.js';
   import { Logger } from '../utils/logger.js';
   import {
     SchemaResource,
     MetricsResource,
     ContextResource,
     DocumentationResource
   } from '../resources/index.js';

   export class ResourceRegistry {
     private resources: Map<string, any> = new Map();
     private resourceDefinitions: Resource[] = [];

     constructor(
       private graphService: GraphService,
       private logger: Logger
     ) {
       this.registerResources();
     }

     private registerResources(): void {
       this.registerResource(new SchemaResource(this.graphService, this.logger));
       this.registerResource(new MetricsResource(this.graphService, this.logger));
       this.registerResource(new ContextResource(this.graphService, this.logger));
       this.registerResource(new DocumentationResource(this.graphService, this.logger));
     }

     private registerResource(resourceInstance: any): void {
       const definition = resourceInstance.getDefinition();
       this.resources.set(definition.uri, resourceInstance);
       this.resourceDefinitions.push(definition);
       
       this.logger.debug('Registered MCP resource', { uri: definition.uri });
     }

     getResources(): Resource[] {
       return this.resourceDefinitions;
     }

     async getResource(uri: string): Promise<any> {
       const resource = this.resources.get(uri);
       
       if (!resource) {
         throw new Error(`Resource '${uri}' not found`);
       }

       this.logger.info('Retrieving MCP resource', { uri });
       
       try {
         const result = await resource.get();
         this.logger.info('Resource retrieval completed', { uri });
         return result;
       } catch (error) {
         this.logger.error('Resource retrieval failed', { uri, error });
         throw error;
       }
     }
   }
   ```

2. **Schema Resource Implementation**
   ```typescript
   // src/resources/schema-resource.ts
   import { Resource } from '@modelcontextprotocol/sdk/types.js';
   import { GraphService } from '../services/graph-service.js';
   import { Logger } from '../utils/logger.js';

   export class SchemaResource {
     constructor(
       private graphService: GraphService,
       private logger: Logger
     ) {}

     getDefinition(): Resource {
       return {
         uri: 'neo4j://schema',
         name: 'Graph Schema',
         description: 'Complete schema information for the Neo4j graph database including node labels, relationship types, properties, and constraints',
         mimeType: 'application/json'
       };
     }

     async get(): Promise<any> {
       try {
         // Get all node labels
         const nodeLabels = await this.graphService.getNodeLabels();
         
         // Get all relationship types
         const relationshipTypes = await this.graphService.getRelationshipTypes();
         
         // Get property keys
         const propertyKeys = await this.graphService.getPropertyKeys();
         
         // Get constraints
         const constraints = await this.graphService.getConstraints();
         
         // Get indexes
         const indexes = await this.graphService.getIndexes();
         
         // Get sample data for each node type
         const nodeSamples = await this.getNodeSamples(nodeLabels);
         
         // Get sample relationships
         const relationshipSamples = await this.getRelationshipSamples(relationshipTypes);

         const schema = {
           database_info: {
             neo4j_version: await this.graphService.getNeo4jVersion(),
             database_name: await this.graphService.getDatabaseName(),
             last_updated: new Date().toISOString()
           },
           node_labels: nodeLabels,
           relationship_types: relationshipTypes,
           property_keys: propertyKeys,
           constraints: constraints,
           indexes: indexes,
           samples: {
             nodes: nodeSamples,
             relationships: relationshipSamples
           },
           statistics: {
             total_nodes: await this.graphService.getNodeCount(),
             total_relationships: await this.graphService.getRelationshipCount(),
             node_type_counts: await this.getNodeTypeCounts(nodeLabels),
             relationship_type_counts: await this.getRelationshipTypeCounts(relationshipTypes)
           }
         };

         return {
           contents: [
             {
               uri: 'neo4j://schema',
               mimeType: 'application/json',
               text: JSON.stringify(schema, null, 2)
             }
           ]
         };

       } catch (error) {
         this.logger.error('Failed to retrieve schema resource', { error });
         throw error;
       }
     }

     private async getNodeSamples(labels: string[]): Promise<any> {
       const samples: any = {};
       
       for (const label of labels.slice(0, 10)) { // Limit to first 10 labels
         try {
           const sample = await this.graphService.getSampleNodes(label, 3);
           samples[label] = sample;
         } catch (error) {
           this.logger.warn('Failed to get sample for label', { label, error });
         }
       }
       
       return samples;
     }

     private async getRelationshipSamples(types: string[]): Promise<any> {
       const samples: any = {};
       
       for (const type of types.slice(0, 10)) { // Limit to first 10 types
         try {
           const sample = await this.graphService.getSampleRelationships(type, 3);
           samples[type] = sample;
         } catch (error) {
           this.logger.warn('Failed to get sample for relationship type', { type, error });
         }
       }
       
       return samples;
     }

     private async getNodeTypeCounts(labels: string[]): Promise<any> {
       const counts: any = {};
       
       for (const label of labels) {
         try {
           counts[label] = await this.graphService.getNodeCountByLabel(label);
         } catch (error) {
           this.logger.warn('Failed to get count for label', { label, error });
           counts[label] = 0;
         }
       }
       
       return counts;
     }

     private async getRelationshipTypeCounts(types: string[]): Promise<any> {
       const counts: any = {};
       
       for (const type of types) {
         try {
           counts[type] = await this.graphService.getRelationshipCountByType(type);
         } catch (error) {
           this.logger.warn('Failed to get count for relationship type', { type, error });
           counts[type] = 0;
         }
       }
       
       return counts;
     }
   }
   ```

## Testing and Quality Assurance Requirements

### Protocol 5: Comprehensive Testing Framework

**MANDATORY**: All MCP tools and resources MUST have comprehensive test coverage including unit, integration, and LLM interaction tests.

1. **Jest Configuration for MCP Testing**
   ```javascript
   // jest.config.js
   module.exports = {
     preset: 'ts-jest',
     testEnvironment: 'node',
     roots: ['<rootDir>/src', '<rootDir>/tests'],
     testMatch: [
       '**/__tests__/**/*.ts',
       '**/?(*.)+(spec|test).ts'
     ],
     transform: {
       '^.+\\.ts$': 'ts-jest'
     },
     collectCoverageFrom: [
       'src/**/*.ts',
       '!src/**/*.d.ts',
       '!src/index.ts'
     ],
     coverageDirectory: 'coverage',
     coverageReporters: [
       'text',
       'lcov',
       'html'
     ],
     setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],
     moduleNameMapping: {
       '^@/(.*)$': '<rootDir>/src/$1'
     },
     testTimeout: 30000,
     // MCP-specific configuration
     globals: {
       'ts-jest': {
         useESM: true
       }
     },
     extensionsToTreatAsEsm: ['.ts']
   };
   ```

2. **MCP Tool Testing Example**
   ```typescript
   // tests/unit/tools/execute-cypher-tool.test.ts
   import { ExecuteCypherTool } from '../../../src/tools/graph-query-tools.js';
   import { GraphService } from '../../../src/services/graph-service.js';
   import { Logger } from '../../../src/utils/logger.js';
   import { MockGraphService } from '../../helpers/mock-graph-service.js';

   describe('ExecuteCypherTool', () => {
     let tool: ExecuteCypherTool;
     let mockGraphService: MockGraphService;
     let logger: Logger;

     beforeEach(() => {
       mockGraphService = new MockGraphService();
       logger = new Logger({ level: 'error' });
       tool = new ExecuteCypherTool(mockGraphService as any, logger);
     });

     describe('getDefinition', () => {
       it('should return valid tool definition', () => {
         const definition = tool.getDefinition();
         
         expect(definition.name).toBe('execute_cypher');
         expect(definition.description).toContain('Cypher query');
         expect(definition.inputSchema.type).toBe('object');
         expect(definition.inputSchema.properties.query).toBeDefined();
       });
     });

     describe('execute', () => {
       it('should execute valid Cypher query successfully', async () => {
         const mockResults = [
           { name: 'John', age: 30 },
           { name: 'Jane', age: 25 }
         ];
         
         mockGraphService.setExecuteCypherResult(mockResults);
         
         const args = {
           query: 'MATCH (p:Person) RETURN p.name as name, p.age as age',
           parameters: {},
           limit: 100,
           optimize_for_llm: true
         };

         const result = await tool.execute(args);
         
         expect(result.content).toBeDefined();
         expect(result.content[0].type).toBe('text');
         
         const responseData = JSON.parse(result.content[0].text);
         expect(responseData.success).toBe(true);
         expect(responseData.results).toEqual(mockResults);
         expect(responseData.metadata.resultCount).toBe(2);
       });

       it('should handle invalid query parameters', async () => {
         const args = {
           query: '', // Invalid empty query
           parameters: {}
         };

         await expect(tool.execute(args)).rejects.toThrow();
       });

       it('should handle Neo4j execution errors', async () => {
         mockGraphService.setExecuteCypherError(new Error('Syntax error'));
         
         const args = {
           query: 'INVALID CYPHER QUERY',
           parameters: {}
         };

         const result = await tool.execute(args);
         
         expect(result.isError).toBe(true);
         
         const responseData = JSON.parse(result.content[0].text);
         expect(responseData.success).toBe(false);
         expect(responseData.error).toContain('Syntax error');
       });

       it('should optimize results for LLM consumption when requested', async () => {
         const mockResults = [
           {
             identity: { low: 1, high: 0 }, // Neo4j internal field
             elementId: 'node-123',         // Neo4j internal field
             name: 'John',
             age: 30
           }
         ];
         
         mockGraphService.setExecuteCypherResult(mockResults);
         
         const args = {
           query: 'MATCH (p:Person) RETURN p',
           parameters: {},
           optimize_for_llm: true
         };

         const result = await tool.execute(args);
         
         const responseData = JSON.parse(result.content[0].text);
         const optimizedResult = responseData.results[0];
         
         // Check that internal Neo4j fields are removed
         expect(optimizedResult.identity).toBeUndefined();
         expect(optimizedResult.elementId).toBeUndefined();
         expect(optimizedResult.name).toBe('John');
         expect(optimizedResult.age).toBe(30);
       });
     });
   });
   ```

3. **Integration Test Example**
   ```typescript
   // tests/integration/mcp-server.test.ts
   import { Neo4jMcpServer } from '../../src/server/mcp-server.js';
   import { GraphService } from '../../src/services/graph-service.js';
   import { Logger } from '../../src/utils/logger.js';
   import { TestDatabaseSetup } from '../helpers/test-database.js';
   import { MockMcpClient } from '../helpers/mock-mcp-client.js';

   describe('Neo4j MCP Server Integration', () => {
     let testDb: TestDatabaseSetup;
     let mcpServer: Neo4jMcpServer;
     let mockClient: MockMcpClient;
     let graphService: GraphService;

     beforeAll(async () => {
       testDb = new TestDatabaseSetup();
       await testDb.setup();
       
       const logger = new Logger({ level: 'error' });
       graphService = new GraphService(testDb.getConnection(), logger);
       mcpServer = new Neo4jMcpServer(graphService, logger);
       
       mockClient = new MockMcpClient();
     });

     afterAll(async () => {
       await testDb.cleanup();
     });

     describe('Tool Discovery and Execution', () => {
       it('should list all available tools', async () => {
         const tools = await mockClient.listTools(mcpServer);
         
         expect(tools.tools).toBeDefined();
         expect(tools.tools.length).toBeGreaterThan(0);
         
         const toolNames = tools.tools.map(t => t.name);
         expect(toolNames).toContain('execute_cypher');
         expect(toolNames).toContain('explore_graph');
         expect(toolNames).toContain('analytics_graph');
       });

       it('should execute Cypher tool with real database', async () => {
         // First, insert test data
         await graphService.executeCypher(
           'CREATE (p:Person {name: $name, age: $age}) RETURN p',
           { name: 'Integration Test User', age: 28 }
         );

         const result = await mockClient.callTool(mcpServer, 'execute_cypher', {
           query: 'MATCH (p:Person {name: $name}) RETURN p.name as name, p.age as age',
           parameters: { name: 'Integration Test User' }
         });

         expect(result.content).toBeDefined();
         
         const responseData = JSON.parse(result.content[0].text);
         expect(responseData.success).toBe(true);
         expect(responseData.results).toHaveLength(1);
         expect(responseData.results[0].name).toBe('Integration Test User');
         expect(responseData.results[0].age).toBe(28);
       });

       it('should execute graph exploration tool', async () => {
         // Create a small test graph
         await graphService.executeCypher(`
           CREATE (p1:Person {name: 'Alice', age: 30})
           CREATE (p2:Person {name: 'Bob', age: 25})
           CREATE (c:Company {name: 'TechCorp'})
           CREATE (p1)-[:WORKS_AT]->(c)
           CREATE (p2)-[:WORKS_AT]->(c)
           CREATE (p1)-[:KNOWS]->(p2)
         `);

         const result = await mockClient.callTool(mcpServer, 'explore_graph', {
           start_nodes: [{ label: 'Person', properties: { name: 'Alice' } }],
           max_depth: 2,
           context_limit: 4000
         });

         expect(result.content).toBeDefined();
         
         const responseData = JSON.parse(result.content[0].text);
         expect(responseData.success).toBe(true);
         expect(responseData.exploration.discovered_nodes.length).toBeGreaterThan(0);
         expect(responseData.exploration.relationships.length).toBeGreaterThan(0);
       });
     });

     describe('Resource Discovery and Retrieval', () => {
       it('should list all available resources', async () => {
         const resources = await mockClient.listResources(mcpServer);
         
         expect(resources.resources).toBeDefined();
         expect(resources.resources.length).toBeGreaterThan(0);
         
         const resourceUris = resources.resources.map(r => r.uri);
         expect(resourceUris).toContain('neo4j://schema');
         expect(resourceUris).toContain('neo4j://metrics');
       });

       it('should retrieve schema resource', async () => {
         const result = await mockClient.getResource(mcpServer, 'neo4j://schema');
         
         expect(result.contents).toBeDefined();
         expect(result.contents[0].mimeType).toBe('application/json');
         
         const schemaData = JSON.parse(result.contents[0].text);
         expect(schemaData.node_labels).toBeDefined();
         expect(schemaData.relationship_types).toBeDefined();
         expect(schemaData.statistics).toBeDefined();
       });
     });
   });
   ```

## Implementation Checklist

Before completing any Neo4j MCP service integration project, verify ALL of the following requirements have been met:

### ✅ Core MCP Architecture Requirements
- [ ] MCP SDK v0.5+ integration with TypeScript support
- [ ] Complete tool registry with all required graph tools
- [ ] Resource registry with schema, metrics, and context resources
- [ ] Transport layer setup with proper error handling
- [ ] Authentication and authorization for all tools and resources

### ✅ Graph Integration Requirements
- [ ] Neo4j driver v5.x+ integration with session management
- [ ] Cypher query execution with security validation
- [ ] Graph exploration with intelligent sampling
- [ ] Context optimization for LLM consumption
- [ ] Performance monitoring and caching

### ✅ Context Optimization Features
- [ ] Intelligent graph sampling algorithms
- [ ] Context compression and summarization
- [ ] Importance scoring for nodes and relationships
- [ ] Token estimation and context size management
- [ ] Pattern extraction and insight generation

### ✅ Security and Validation
- [ ] Cypher injection prevention
- [ ] Query complexity limits and timeouts
- [ ] Input validation for all tools
- [ ] Sensitive data filtering
- [ ] Audit logging and compliance

### ✅ Testing and Quality Assurance
- [ ] Unit tests for all tools and services
- [ ] Integration tests with real Neo4j database
- [ ] MCP protocol compliance testing
- [ ] Performance and load testing
- [ ] LLM interaction testing

### ✅ Production Readiness
- [ ] Docker containerization with multi-stage builds
- [ ] Environment configuration management
- [ ] Health checks and monitoring endpoints
- [ ] Structured logging with performance metrics
- [ ] Error handling and graceful degradation

### ✅ Documentation and Maintenance
- [ ] Comprehensive tool and resource documentation
- [ ] API usage examples and best practices
- [ ] Deployment and operations guides
- [ ] Performance tuning recommendations
- [ ] Troubleshooting and debugging guides

## File Encoding and Standards
**All files generated by AI agents MUST be in UTF-8 encoding without BOM (Byte Order Mark).**

## Core Principles for AI Agents

1. **MCP Protocol First**: Always prioritize MCP specification compliance and best practices
2. **Context Efficiency**: Optimize all operations for LLM context window effectiveness
3. **Graph Performance**: Maintain high performance for graph database operations
4. **Security Integration**: Build security considerations into every layer
5. **Testing Completeness**: Ensure comprehensive test coverage for all functionality
6. **Production Readiness**: Design for scalability, monitoring, and operational excellence
7. **Documentation Excellence**: Maintain clear, comprehensive documentation for all components

---

**Prime Directive**: Build production-ready Neo4j MCP service integrations that enable seamless LLM-graph database interactions while maintaining high performance, security, and context optimization. Always ensure that the implementation maximizes the value of graph data for LLM reasoning and decision-making.

Built with ❤️ using the Architect Crew methodology, Neo4j graph database excellence, and MCP protocol standards.