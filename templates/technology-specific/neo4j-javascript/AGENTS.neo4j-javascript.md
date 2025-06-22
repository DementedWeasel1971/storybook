---
template: agents-neo4j-javascript.md
version: {{agentsVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/neo4j-javascript/AGENTS.neo4j-javascript.md
generatedBy: executor-crew
technology: Neo4j + JavaScript/Node.js + TypeScript
generationTriggers: 
  - CLAUDE.md architecture changes
  - Neo4j JavaScript implementation requirements updates
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
---

# AGENTS.md: AI Agent Constitution for Neo4j JavaScript/Node.js Integration Development

**Version**: {{agentsVersion}}  
**Generated from**: CLAUDE.md architectural specification  
**Date**: {{date}}  
**Technology**: Neo4j Graph Database + JavaScript/Node.js + TypeScript Integration

This document provides the **official guidelines and mandatory protocols** for any AI agent contributing to this Neo4j JavaScript/Node.js integration project. **You MUST adhere to all instructions herein.**

## Project Overview

{{neo4jJavaScriptProjectOverview}}

**Crucially, all AI agents MUST implement the Neo4j JavaScript/Node.js integration architecture defined in `CLAUDE.md` and document technical specifications in `docs/FRS.md` as implementation proceeds.**

## Neo4j JavaScript/Node.js Implementation Requirements

Based on the architecture defined in CLAUDE.md, the following implementation requirements are mandatory:

{{neo4jJavaScriptImplementationRequirements}}

### TypeScript Node.js Project Structure Standards

1. **Mandatory Neo4j JavaScript/Node.js Project Structure**
   ```
   neo4j-nodejs-project/
   ├── src/
   │   ├── index.ts                      # Main application entry point
   │   ├── database/
   │   │   ├── index.ts                  # Database module exports
   │   │   ├── connection.ts             # Neo4j driver connection management
   │   │   ├── session-manager.ts        # Session lifecycle and pooling
   │   │   ├── transaction-manager.ts    # Transaction handling with TypeScript
   │   │   └── driver-factory.ts         # Driver instantiation and configuration
   │   ├── models/
   │   │   ├── index.ts                  # Model exports
   │   │   ├── base-node.interface.ts    # Base node TypeScript interfaces
   │   │   ├── base-relationship.interface.ts # Base relationship interfaces
   │   │   ├── graph-types.ts            # Graph entity type definitions
   │   │   ├── validation-schemas.ts     # Zod/Joi validation schemas
   │   │   └── model-factory.ts          # Model creation utilities
   │   ├── repositories/
   │   │   ├── index.ts                  # Repository exports
   │   │   ├── base-repository.ts        # Abstract base repository class
   │   │   ├── node-repository.ts        # Node CRUD operations
   │   │   ├── relationship-repository.ts # Relationship operations
   │   │   ├── graph-repository.ts       # Complex graph operations
   │   │   └── query-builder.ts          # Type-safe Cypher query builder
   │   ├── services/
   │   │   ├── index.ts                  # Service exports
   │   │   ├── graph-service.ts          # High-level graph operations
   │   │   ├── analytics-service.ts      # Graph analytics algorithms
   │   │   ├── recommendation-service.ts # Recommendation engine
   │   │   ├── search-service.ts         # Graph search and traversal
   │   │   └── batch-service.ts          # Batch processing operations
   │   ├── queries/
   │   │   ├── index.ts                  # Query exports
   │   │   ├── cypher-templates.ts       # Reusable Cypher query templates
   │   │   ├── parameter-builder.ts      # Query parameter management
   │   │   ├── query-optimizer.ts        # Query optimization utilities
   │   │   └── prepared-statements.ts    # Prepared statement management
   │   ├── cache/
   │   │   ├── index.ts                  # Cache exports
   │   │   ├── redis-cache.ts            # Redis caching implementation
   │   │   ├── memory-cache.ts           # Node.js in-memory caching
   │   │   ├── query-cache.ts            # Query result caching
   │   │   └── cache-manager.ts          # Cache lifecycle management
   │   ├── monitoring/
   │   │   ├── index.ts                  # Monitoring exports
   │   │   ├── metrics-collector.ts      # Performance metrics collection
   │   │   ├── health-checker.ts         # Database health monitoring
   │   │   ├── query-profiler.ts         # Query performance profiling
   │   │   └── logger.ts                 # Winston/Pino logging configuration
   │   ├── security/
   │   │   ├── index.ts                  # Security exports
   │   │   ├── auth-manager.ts           # JWT authentication management
   │   │   ├── query-validator.ts        # Cypher query security validation
   │   │   ├── access-control.ts         # Role-based access control
   │   │   └── encryption-utils.ts       # Data encryption utilities
   │   ├── api/
   │   │   ├── index.ts                  # API exports
   │   │   ├── express-routes.ts         # Express.js route definitions
   │   │   ├── fastify-routes.ts         # Fastify route definitions
   │   │   ├── graphql-resolvers.ts      # GraphQL resolver functions
   │   │   ├── middleware/               # Custom middleware
   │   │   │   ├── auth.middleware.ts    # Authentication middleware
   │   │   │   ├── cache.middleware.ts   # Caching middleware
   │   │   │   └── validation.middleware.ts # Request validation
   │   │   └── controllers/              # Route controllers
   │   │       ├── graph.controller.ts   # Graph operations controller
   │   │       ├── analytics.controller.ts # Analytics controller
   │   │       └── search.controller.ts  # Search controller
   │   └── utils/
   │       ├── index.ts                  # Utility exports
   │       ├── config.ts                 # Configuration management
   │       ├── exceptions.ts             # Custom exception classes
   │       ├── helpers.ts                # Utility helper functions
   │       ├── constants.ts              # Application constants
   │       └── type-guards.ts            # TypeScript type guard functions
   ├── tests/
   │   ├── unit/                         # Unit tests
   │   │   ├── repositories/             # Repository tests
   │   │   ├── services/                 # Service tests
   │   │   └── utils/                    # Utility tests
   │   ├── integration/                  # Integration tests
   │   │   ├── database/                 # Database integration tests
   │   │   ├── api/                      # API integration tests
   │   │   └── cache/                    # Cache integration tests
   │   ├── e2e/                          # End-to-end tests
   │   │   └── scenarios/                # Test scenarios
   │   ├── fixtures/                     # Test data fixtures
   │   │   ├── graph-data.ts             # Sample graph data
   │   │   └── test-schemas.ts           # Test schemas
   │   └── setup/                        # Test setup utilities
   │       ├── test-database.ts          # Test database setup
   │       └── mock-factories.ts         # Mock object factories
   ├── config/
   │   ├── database.config.ts            # Database configuration
   │   ├── cache.config.ts               # Cache configuration
   │   ├── api.config.ts                 # API configuration
   │   └── environment.config.ts         # Environment-specific configs
   ├── docs/                             # Documentation
   │   ├── api.md                        # API documentation
   │   ├── deployment.md                 # Deployment guide
   │   └── architecture.md               # Architecture documentation
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

2. **Mandatory TypeScript Configuration Standards**

   You MUST create a `tsconfig.json` with the following configuration:
   ```json
   {
     "compilerOptions": {
       "target": "ES2022",
       "module": "commonjs",
       "lib": ["ES2022"],
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true,
       "declaration": true,
       "declarationMap": true,
       "sourceMap": true,
       "removeComments": false,
       "noImplicitAny": true,
       "strictNullChecks": true,
       "strictFunctionTypes": true,
       "noImplicitReturns": true,
       "noFallthroughCasesInSwitch": true,
       "moduleResolution": "node",
       "allowSyntheticDefaultImports": true,
       "experimentalDecorators": true,
       "emitDecoratorMetadata": true,
       "resolveJsonModule": true,
       "baseUrl": "./",
       "paths": {
         "@/*": ["src/*"],
         "@/database/*": ["src/database/*"],
         "@/models/*": ["src/models/*"],
         "@/repositories/*": ["src/repositories/*"],
         "@/services/*": ["src/services/*"],
         "@/utils/*": ["src/utils/*"]
       }
     },
     "include": [
       "src/**/*"
     ],
     "exclude": [
       "node_modules",
       "dist",
       "tests"
     ]
   }
   ```

## Neo4j JavaScript/Node.js Implementation Protocols

### Protocol 1: TypeScript-First Neo4j Driver Integration

**MANDATORY**: All Neo4j driver interactions MUST be implemented with full TypeScript support and type safety.

1. **Driver Connection Management**
   ```typescript
   // src/database/connection.ts
   import neo4j, { Driver, Session, Config } from 'neo4j-driver';
   import { Neo4jConfig, ConnectionOptions } from '@/models/graph-types';

   export class Neo4jConnection {
     private driver: Driver | null = null;
     private readonly config: Neo4jConfig;

     constructor(config: Neo4jConfig) {
       this.config = config;
     }

     async connect(): Promise<void> {
       const connectionConfig: Config = {
         maxConnectionLifetime: this.config.maxConnectionLifetime || 3600000,
         maxConnectionPoolSize: this.config.maxConnectionPoolSize || 50,
         connectionAcquisitionTimeout: this.config.connectionTimeout || 60000,
         disableLosslessIntegers: true,
         logging: {
           level: this.config.logLevel || 'info',
           logger: (level, message) => console.log(`[${level}] ${message}`)
         }
       };

       this.driver = neo4j.driver(
         this.config.uri,
         neo4j.auth.basic(this.config.username, this.config.password),
         connectionConfig
       );

       // Verify connectivity
       await this.verifyConnectivity();
     }

     private async verifyConnectivity(): Promise<void> {
       if (!this.driver) {
         throw new Error('Driver not initialized');
       }

       const session = this.driver.session();
       try {
         await session.run('RETURN 1 as test');
       } finally {
         await session.close();
       }
     }

     getDriver(): Driver {
       if (!this.driver) {
         throw new Error('Database connection not established');
       }
       return this.driver;
     }

     async close(): Promise<void> {
       if (this.driver) {
         await this.driver.close();
         this.driver = null;
       }
     }
   }
   ```

2. **Type-Safe Session Management**
   ```typescript
   // src/database/session-manager.ts
   import { Driver, Session, SessionConfig, TransactionConfig } from 'neo4j-driver';
   import { DatabaseMode, SessionOptions } from '@/models/graph-types';

   export class SessionManager {
     constructor(private driver: Driver) {}

     createSession(options: SessionOptions = {}): Session {
       const sessionConfig: SessionConfig = {
         database: options.database || 'neo4j',
         defaultAccessMode: options.mode || neo4j.session.READ,
         bookmarks: options.bookmarks,
         impersonatedUser: options.impersonatedUser
       };

       return this.driver.session(sessionConfig);
     }

     async executeRead<T>(
       query: string,
       parameters: Record<string, any> = {},
       options: SessionOptions = {}
     ): Promise<T[]> {
       const session = this.createSession({ ...options, mode: neo4j.session.READ });
       try {
         const result = await session.executeRead(tx => 
           tx.run(query, parameters)
         );
         return result.records.map(record => record.toObject() as T);
       } finally {
         await session.close();
       }
     }

     async executeWrite<T>(
       query: string,
       parameters: Record<string, any> = {},
       options: SessionOptions = {}
     ): Promise<T[]> {
       const session = this.createSession({ ...options, mode: neo4j.session.WRITE });
       try {
         const result = await session.executeWrite(tx => 
           tx.run(query, parameters)
         );
         return result.records.map(record => record.toObject() as T);
       } finally {
         await session.close();
       }
     }
   }
   ```

### Protocol 2: Graph Model Type Definitions

**MANDATORY**: All graph entities MUST have comprehensive TypeScript interfaces and validation schemas.

1. **Base Graph Type Interfaces**
   ```typescript
   // src/models/base-node.interface.ts
   export interface BaseNode {
     id?: string;
     labels: string[];
     properties: Record<string, any>;
     createdAt?: Date;
     updatedAt?: Date;
   }

   export interface NodeWithId extends BaseNode {
     id: string;
   }

   export interface TypedNode<T = Record<string, any>> extends BaseNode {
     properties: T;
   }

   // src/models/base-relationship.interface.ts
   export interface BaseRelationship {
     id?: string;
     type: string;
     startNodeId: string;
     endNodeId: string;
     properties: Record<string, any>;
     createdAt?: Date;
   }

   export interface TypedRelationship<T = Record<string, any>> extends BaseRelationship {
     properties: T;
   }

   // src/models/graph-types.ts
   export interface Neo4jConfig {
     uri: string;
     username: string;
     password: string;
     database?: string;
     maxConnectionLifetime?: number;
     maxConnectionPoolSize?: number;
     connectionTimeout?: number;
     logLevel?: 'error' | 'warn' | 'info' | 'debug';
   }

   export interface SessionOptions {
     database?: string;
     mode?: import('neo4j-driver').SessionMode;
     bookmarks?: string[];
     impersonatedUser?: string;
   }

   export interface QueryResult<T = any> {
     records: T[];
     summary: import('neo4j-driver').ResultSummary;
   }

   export interface GraphPath {
     start: NodeWithId;
     end: NodeWithId;
     segments: PathSegment[];
     length: number;
   }

   export interface PathSegment {
     start: NodeWithId;
     relationship: BaseRelationship;
     end: NodeWithId;
   }
   ```

2. **Validation Schema Integration**
   ```typescript
   // src/models/validation-schemas.ts
   import { z } from 'zod';

   export const NodeSchema = z.object({
     id: z.string().optional(),
     labels: z.array(z.string()).min(1),
     properties: z.record(z.any()),
     createdAt: z.date().optional(),
     updatedAt: z.date().optional()
   });

   export const RelationshipSchema = z.object({
     id: z.string().optional(),
     type: z.string().min(1),
     startNodeId: z.string(),
     endNodeId: z.string(),
     properties: z.record(z.any()),
     createdAt: z.date().optional()
   });

   export const PersonNodeSchema = NodeSchema.extend({
     properties: z.object({
       name: z.string().min(1),
       email: z.string().email().optional(),
       age: z.number().int().positive().optional(),
       isActive: z.boolean().default(true)
     })
   });

   export const CompanyNodeSchema = NodeSchema.extend({
     properties: z.object({
       name: z.string().min(1),
       industry: z.string().optional(),
       employeeCount: z.number().int().positive().optional(),
       founded: z.number().int().optional()
     })
   });

   export type PersonNode = z.infer<typeof PersonNodeSchema>;
   export type CompanyNode = z.infer<typeof CompanyNodeSchema>;
   ```

### Protocol 3: Repository Pattern Implementation

**MANDATORY**: All database operations MUST follow the repository pattern with type safety and error handling.

1. **Base Repository Implementation**
   ```typescript
   // src/repositories/base-repository.ts
   import { SessionManager } from '@/database/session-manager';
   import { BaseNode, BaseRelationship, QueryResult } from '@/models/graph-types';
   import { Logger } from '@/utils/logger';

   export abstract class BaseRepository<T extends BaseNode> {
     protected sessionManager: SessionManager;
     protected logger: Logger;

     constructor(sessionManager: SessionManager, logger: Logger) {
       this.sessionManager = sessionManager;
       this.logger = logger;
     }

     abstract getLabel(): string;
     abstract validateEntity(entity: Partial<T>): T;

     async create(entity: Omit<T, 'id'>): Promise<T> {
       const validatedEntity = this.validateEntity(entity);
       const query = `
         CREATE (n:${this.getLabel()} $properties)
         SET n.createdAt = datetime()
         RETURN n
       `;

       try {
         const results = await this.sessionManager.executeWrite<T>(
           query,
           { properties: validatedEntity.properties }
         );

         if (results.length === 0) {
           throw new Error(`Failed to create ${this.getLabel()} node`);
         }

         this.logger.info(`Created ${this.getLabel()} node`, { id: results[0].id });
         return results[0];
       } catch (error) {
         this.logger.error(`Error creating ${this.getLabel()} node`, { error });
         throw error;
       }
     }

     async findById(id: string): Promise<T | null> {
       const query = `
         MATCH (n:${this.getLabel()})
         WHERE elementId(n) = $id
         RETURN n
       `;

       try {
         const results = await this.sessionManager.executeRead<T>(
           query,
           { id }
         );

         return results.length > 0 ? results[0] : null;
       } catch (error) {
         this.logger.error(`Error finding ${this.getLabel()} by id`, { id, error });
         throw error;
       }
     }

     async findByProperties(properties: Partial<T['properties']>): Promise<T[]> {
       const conditions = Object.keys(properties)
         .map(key => `n.${key} = $${key}`)
         .join(' AND ');

       const query = `
         MATCH (n:${this.getLabel()})
         WHERE ${conditions}
         RETURN n
       `;

       try {
         return await this.sessionManager.executeRead<T>(query, properties);
       } catch (error) {
         this.logger.error(`Error finding ${this.getLabel()} by properties`, { properties, error });
         throw error;
       }
     }

     async update(id: string, updates: Partial<T['properties']>): Promise<T> {
       const setClause = Object.keys(updates)
         .map(key => `n.${key} = $${key}`)
         .join(', ');

       const query = `
         MATCH (n:${this.getLabel()})
         WHERE elementId(n) = $id
         SET ${setClause}, n.updatedAt = datetime()
         RETURN n
       `;

       try {
         const results = await this.sessionManager.executeWrite<T>(
           query,
           { id, ...updates }
         );

         if (results.length === 0) {
           throw new Error(`${this.getLabel()} node with id ${id} not found`);
         }

         this.logger.info(`Updated ${this.getLabel()} node`, { id });
         return results[0];
       } catch (error) {
         this.logger.error(`Error updating ${this.getLabel()} node`, { id, error });
         throw error;
       }
     }

     async delete(id: string): Promise<boolean> {
       const query = `
         MATCH (n:${this.getLabel()})
         WHERE elementId(n) = $id
         DELETE n
         RETURN count(n) as deletedCount
       `;

       try {
         const results = await this.sessionManager.executeWrite<{ deletedCount: number }>(
           query,
           { id }
         );

         const deleted = results[0]?.deletedCount > 0;
         if (deleted) {
           this.logger.info(`Deleted ${this.getLabel()} node`, { id });
         }

         return deleted;
       } catch (error) {
         this.logger.error(`Error deleting ${this.getLabel()} node`, { id, error });
         throw error;
       }
     }

     async findAll(limit: number = 100, skip: number = 0): Promise<T[]> {
       const query = `
         MATCH (n:${this.getLabel()})
         RETURN n
         ORDER BY n.createdAt DESC
         SKIP $skip
         LIMIT $limit
       `;

       try {
         return await this.sessionManager.executeRead<T>(query, { limit, skip });
       } catch (error) {
         this.logger.error(`Error finding all ${this.getLabel()} nodes`, { error });
         throw error;
       }
     }
   }
   ```

2. **Specific Repository Implementation**
   ```typescript
   // src/repositories/person-repository.ts
   import { BaseRepository } from './base-repository';
   import { PersonNode, PersonNodeSchema } from '@/models/validation-schemas';
   import { SessionManager } from '@/database/session-manager';
   import { Logger } from '@/utils/logger';

   export class PersonRepository extends BaseRepository<PersonNode> {
     constructor(sessionManager: SessionManager, logger: Logger) {
       super(sessionManager, logger);
     }

     getLabel(): string {
       return 'Person';
     }

     validateEntity(entity: Partial<PersonNode>): PersonNode {
       return PersonNodeSchema.parse(entity);
     }

     async findByEmail(email: string): Promise<PersonNode | null> {
       const query = `
         MATCH (p:Person)
         WHERE p.email = $email
         RETURN p
       `;

       try {
         const results = await this.sessionManager.executeRead<PersonNode>(
           query,
           { email }
         );

         return results.length > 0 ? results[0] : null;
       } catch (error) {
         this.logger.error('Error finding person by email', { email, error });
         throw error;
       }
     }

     async findActivePersons(): Promise<PersonNode[]> {
       const query = `
         MATCH (p:Person)
         WHERE p.isActive = true
         RETURN p
         ORDER BY p.name
       `;

       try {
         return await this.sessionManager.executeRead<PersonNode>(query);
       } catch (error) {
         this.logger.error('Error finding active persons', { error });
         throw error;
       }
     }

     async getPersonConnections(personId: string, depth: number = 1): Promise<any[]> {
       const query = `
         MATCH path = (p:Person)-[*1..${depth}]-(connected)
         WHERE elementId(p) = $personId
         RETURN path
       `;

       try {
         return await this.sessionManager.executeRead(query, { personId });
       } catch (error) {
         this.logger.error('Error getting person connections', { personId, error });
         throw error;
       }
     }
   }
   ```

### Protocol 4: Service Layer Implementation

**MANDATORY**: All business logic MUST be implemented in service classes with comprehensive error handling and logging.

1. **Graph Service Implementation**
   ```typescript
   // src/services/graph-service.ts
   import { PersonRepository } from '@/repositories/person-repository';
   import { CompanyRepository } from '@/repositories/company-repository';
   import { RelationshipRepository } from '@/repositories/relationship-repository';
   import { SessionManager } from '@/database/session-manager';
   import { Logger } from '@/utils/logger';
   import { CacheManager } from '@/cache/cache-manager';

   export class GraphService {
     constructor(
       private personRepo: PersonRepository,
       private companyRepo: CompanyRepository,
       private relationshipRepo: RelationshipRepository,
       private sessionManager: SessionManager,
       private cacheManager: CacheManager,
       private logger: Logger
     ) {}

     async createPersonWorksAtRelationship(
       personId: string,
       companyId: string,
       properties: { position?: string; startDate?: Date; salary?: number } = {}
     ): Promise<any> {
       const cacheKey = `person_company_${personId}_${companyId}`;

       try {
         // Check if relationship already exists
         const existing = await this.relationshipRepo.findRelationship(
           personId,
           companyId,
           'WORKS_AT'
         );

         if (existing) {
           throw new Error('Person already works at this company');
         }

         // Create the relationship
         const relationship = await this.relationshipRepo.create({
           type: 'WORKS_AT',
           startNodeId: personId,
           endNodeId: companyId,
           properties
         });

         // Invalidate cache
         await this.cacheManager.delete(cacheKey);

         this.logger.info('Created WORKS_AT relationship', {
           personId,
           companyId,
           relationshipId: relationship.id
         });

         return relationship;
       } catch (error) {
         this.logger.error('Error creating WORKS_AT relationship', {
           personId,
           companyId,
           error
         });
         throw error;
       }
     }

     async findShortestPath(
       startNodeId: string,
       endNodeId: string,
       maxDepth: number = 6
     ): Promise<any[]> {
       const cacheKey = `shortest_path_${startNodeId}_${endNodeId}_${maxDepth}`;

       try {
         // Check cache first
         const cached = await this.cacheManager.get(cacheKey);
         if (cached) {
           return cached;
         }

         const query = `
           MATCH path = shortestPath((start)-[*1..${maxDepth}]-(end))
           WHERE elementId(start) = $startNodeId 
             AND elementId(end) = $endNodeId
           RETURN path
         `;

         const results = await this.sessionManager.executeRead(
           query,
           { startNodeId, endNodeId }
         );

         // Cache results for 10 minutes
         await this.cacheManager.set(cacheKey, results, 600);

         return results;
       } catch (error) {
         this.logger.error('Error finding shortest path', {
           startNodeId,
           endNodeId,
           error
         });
         throw error;
       }
     }

     async getRecommendations(
       userId: string,
       type: 'people' | 'companies' = 'people',
       limit: number = 10
     ): Promise<any[]> {
       const cacheKey = `recommendations_${userId}_${type}_${limit}`;

       try {
         // Check cache first
         const cached = await this.cacheManager.get(cacheKey);
         if (cached) {
           return cached;
         }

         let query: string;

         if (type === 'people') {
           query = `
             MATCH (user:Person)-[:KNOWS|WORKS_AT*2..3]-(recommended:Person)
             WHERE elementId(user) = $userId
               AND user <> recommended
               AND NOT (user)-[:KNOWS]-(recommended)
             RETURN recommended, count(*) as strength
             ORDER BY strength DESC
             LIMIT $limit
           `;
         } else {
           query = `
             MATCH (user:Person)-[:KNOWS|WORKS_AT]-(colleague:Person)-[:WORKS_AT]-(company:Company)
             WHERE elementId(user) = $userId
               AND NOT (user)-[:WORKS_AT]-(company)
             RETURN company, count(*) as connections
             ORDER BY connections DESC
             LIMIT $limit
           `;
         }

         const results = await this.sessionManager.executeRead(
           query,
           { userId, limit }
         );

         // Cache results for 1 hour
         await this.cacheManager.set(cacheKey, results, 3600);

         return results;
       } catch (error) {
         this.logger.error('Error getting recommendations', {
           userId,
           type,
           error
         });
         throw error;
       }
     }

     async performGraphAnalytics(analysisType: 'centrality' | 'community' | 'influence'): Promise<any> {
       try {
         let query: string;

         switch (analysisType) {
           case 'centrality':
             query = `
               CALL gds.pageRank.stream('myGraph')
               YIELD nodeId, score
               RETURN gds.util.asNode(nodeId) as node, score
               ORDER BY score DESC
               LIMIT 10
             `;
             break;
           case 'community':
             query = `
               CALL gds.louvain.stream('myGraph')
               YIELD nodeId, communityId
               RETURN gds.util.asNode(nodeId) as node, communityId
               ORDER BY communityId
             `;
             break;
           case 'influence':
             query = `
               MATCH (n:Person)-[r:KNOWS|WORKS_AT]-(m)
               RETURN n, count(r) as influence
               ORDER BY influence DESC
               LIMIT 20
             `;
             break;
           default:
             throw new Error(`Unknown analysis type: ${analysisType}`);
         }

         return await this.sessionManager.executeRead(query);
       } catch (error) {
         this.logger.error('Error performing graph analytics', {
           analysisType,
           error
         });
         throw error;
       }
     }
   }
   ```

### Protocol 5: API Integration Patterns

**MANDATORY**: All API endpoints MUST follow RESTful patterns with comprehensive validation, error handling, and TypeScript support.

1. **Express.js Integration**
   ```typescript
   // src/api/express-routes.ts
   import express, { Request, Response, NextFunction } from 'express';
   import { GraphService } from '@/services/graph-service';
   import { PersonRepository } from '@/repositories/person-repository';
   import { Logger } from '@/utils/logger';
   import { validateRequest } from '@/api/middleware/validation.middleware';
   import { authenticateUser } from '@/api/middleware/auth.middleware';
   import { PersonNodeSchema } from '@/models/validation-schemas';

   export function createGraphRoutes(
     graphService: GraphService,
     personRepo: PersonRepository,
     logger: Logger
   ): express.Router {
     const router = express.Router();

     // Create person endpoint
     router.post('/persons',
       authenticateUser,
       validateRequest(PersonNodeSchema),
       async (req: Request, res: Response, next: NextFunction) => {
         try {
           const person = await personRepo.create(req.body);
           res.status(201).json({
             success: true,
             data: person
           });
         } catch (error) {
           logger.error('Error creating person', { error });
           next(error);
         }
       }
     );

     // Get person by ID
     router.get('/persons/:id',
       authenticateUser,
       async (req: Request, res: Response, next: NextFunction) => {
         try {
           const { id } = req.params;
           const person = await personRepo.findById(id);

           if (!person) {
             return res.status(404).json({
               success: false,
               error: 'Person not found'
             });
           }

           res.json({
             success: true,
             data: person
           });
         } catch (error) {
           logger.error('Error finding person', { id: req.params.id, error });
           next(error);
         }
       }
     );

     // Get recommendations
     router.get('/persons/:id/recommendations',
       authenticateUser,
       async (req: Request, res: Response, next: NextFunction) => {
         try {
           const { id } = req.params;
           const { type = 'people', limit = 10 } = req.query;

           const recommendations = await graphService.getRecommendations(
             id,
             type as 'people' | 'companies',
             parseInt(limit as string)
           );

           res.json({
             success: true,
             data: recommendations
           });
         } catch (error) {
           logger.error('Error getting recommendations', { 
             id: req.params.id, 
             error 
           });
           next(error);
         }
       }
     );

     // Find shortest path
     router.get('/graph/shortest-path',
       authenticateUser,
       async (req: Request, res: Response, next: NextFunction) => {
         try {
           const { start, end, maxDepth = 6 } = req.query;

           if (!start || !end) {
             return res.status(400).json({
               success: false,
               error: 'Start and end node IDs are required'
             });
           }

           const path = await graphService.findShortestPath(
             start as string,
             end as string,
             parseInt(maxDepth as string)
           );

           res.json({
             success: true,
             data: path
           });
         } catch (error) {
           logger.error('Error finding shortest path', { error });
           next(error);
         }
       }
     );

     // Graph analytics
     router.get('/graph/analytics/:type',
       authenticateUser,
       async (req: Request, res: Response, next: NextFunction) => {
         try {
           const { type } = req.params;

           if (!['centrality', 'community', 'influence'].includes(type)) {
             return res.status(400).json({
               success: false,
               error: 'Invalid analysis type'
             });
           }

           const results = await graphService.performGraphAnalytics(
             type as 'centrality' | 'community' | 'influence'
           );

           res.json({
             success: true,
             data: results
           });
         } catch (error) {
           logger.error('Error performing analytics', { type, error });
           next(error);
         }
       }
     );

     return router;
   }
   ```

2. **GraphQL Integration**
   ```typescript
   // src/api/graphql-resolvers.ts
   import { GraphService } from '@/services/graph-service';
   import { PersonRepository } from '@/repositories/person-repository';
   import { CompanyRepository } from '@/repositories/company-repository';
   import { Logger } from '@/utils/logger';

   export interface GraphQLContext {
     graphService: GraphService;
     personRepo: PersonRepository;
     companyRepo: CompanyRepository;
     logger: Logger;
     user?: any;
   }

   export const resolvers = {
     Query: {
       person: async (
         _: any,
         { id }: { id: string },
         context: GraphQLContext
       ) => {
         try {
           return await context.personRepo.findById(id);
         } catch (error) {
           context.logger.error('GraphQL error finding person', { id, error });
           throw error;
         }
       },

       persons: async (
         _: any,
         { limit = 10, skip = 0 }: { limit?: number; skip?: number },
         context: GraphQLContext
       ) => {
         try {
           return await context.personRepo.findAll(limit, skip);
         } catch (error) {
           context.logger.error('GraphQL error finding persons', { error });
           throw error;
         }
       },

       shortestPath: async (
         _: any,
         { start, end, maxDepth = 6 }: { start: string; end: string; maxDepth?: number },
         context: GraphQLContext
       ) => {
         try {
           return await context.graphService.findShortestPath(start, end, maxDepth);
         } catch (error) {
           context.logger.error('GraphQL error finding shortest path', { 
             start, 
             end, 
             error 
           });
           throw error;
         }
       }
     },

     Mutation: {
       createPerson: async (
         _: any,
         { input }: { input: any },
         context: GraphQLContext
       ) => {
         try {
           return await context.personRepo.create(input);
         } catch (error) {
           context.logger.error('GraphQL error creating person', { input, error });
           throw error;
         }
       },

       createWorksAtRelationship: async (
         _: any,
         { personId, companyId, properties }: { 
           personId: string; 
           companyId: string; 
           properties?: any 
         },
         context: GraphQLContext
       ) => {
         try {
           return await context.graphService.createPersonWorksAtRelationship(
             personId,
             companyId,
             properties
           );
         } catch (error) {
           context.logger.error('GraphQL error creating relationship', { 
             personId, 
             companyId, 
             error 
           });
           throw error;
         }
       }
     },

     Person: {
       recommendations: async (
         parent: any,
         { type = 'people', limit = 10 }: { type?: string; limit?: number },
         context: GraphQLContext
       ) => {
         try {
           return await context.graphService.getRecommendations(
             parent.id,
             type as 'people' | 'companies',
             limit
           );
         } catch (error) {
           context.logger.error('GraphQL error getting recommendations', { 
             personId: parent.id, 
             error 
           });
           throw error;
         }
       },

       connections: async (
         parent: any,
         { depth = 1 }: { depth?: number },
         context: GraphQLContext
       ) => {
         try {
           return await context.personRepo.getPersonConnections(parent.id, depth);
         } catch (error) {
           context.logger.error('GraphQL error getting connections', { 
             personId: parent.id, 
             error 
           });
           throw error;
         }
       }
     }
   };

   export const typeDefs = `
     type Person {
       id: ID!
       name: String!
       email: String
       age: Int
       isActive: Boolean!
       recommendations(type: String, limit: Int): [Recommendation!]!
       connections(depth: Int): [Connection!]!
     }

     type Company @node(labels: ["Company"]) {
       id: ID!
       name: String!
       industry: String
       employeeCount: Int
       founded: Int
     }

     type Recommendation {
       node: Person!
       strength: Int!
     }

     type Connection {
       path: [PathSegment!]!
     }

     type PathSegment {
       start: Person!
       relationship: Relationship!
       end: Person!
     }

     type Relationship {
       id: ID!
       type: String!
       properties: JSON
     }

     input PersonInput {
       name: String!
       email: String
       age: Int
       isActive: Boolean = true
     }

     type Query {
       person(id: ID!): Person
       persons(limit: Int, skip: Int): [Person!]!
       shortestPath(start: ID!, end: ID!, maxDepth: Int): [PathSegment!]!
     }

     type Mutation {
       createPerson(input: PersonInput!): Person!
       createWorksAtRelationship(
         personId: ID!,
         companyId: ID!,
         properties: JSON
       ): Relationship!
     }

     scalar JSON
   `;
   ```

### Protocol 6: Testing and Quality Assurance Standards

**MANDATORY**: All code MUST have comprehensive test coverage including unit tests, integration tests, and end-to-end tests.

1. **Jest Configuration**
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
     testTimeout: 30000
   };
   ```

2. **Test Database Setup**
   ```typescript
   // tests/setup/test-database.ts
   import { Neo4jConnection } from '@/database/connection';
   import { SessionManager } from '@/database/session-manager';
   import { testConfig } from './test-config';

   export class TestDatabaseSetup {
     private connection: Neo4jConnection;
     private sessionManager: SessionManager;

     constructor() {
       this.connection = new Neo4jConnection(testConfig.database);
     }

     async setup(): Promise<SessionManager> {
       await this.connection.connect();
       this.sessionManager = new SessionManager(this.connection.getDriver());
       await this.seedTestData();
       return this.sessionManager;
     }

     async cleanup(): Promise<void> {
       await this.clearTestData();
       await this.connection.close();
     }

     private async seedTestData(): Promise<void> {
       const queries = [
         'CREATE (p1:Person {name: "John Doe", email: "john@example.com"})',
         'CREATE (p2:Person {name: "Jane Smith", email: "jane@example.com"})',
         'CREATE (c1:Company {name: "Tech Corp", industry: "Technology"})',
         'MATCH (p1:Person {name: "John Doe"}), (c1:Company {name: "Tech Corp"}) CREATE (p1)-[:WORKS_AT {position: "Developer"}]->(c1)'
       ];

       for (const query of queries) {
         await this.sessionManager.executeWrite(query);
       }
     }

     private async clearTestData(): Promise<void> {
       await this.sessionManager.executeWrite('MATCH (n) DETACH DELETE n');
     }
   }
   ```

3. **Unit Test Example**
   ```typescript
   // tests/unit/repositories/person-repository.test.ts
   import { PersonRepository } from '@/repositories/person-repository';
   import { SessionManager } from '@/database/session-manager';
   import { Logger } from '@/utils/logger';
   import { TestDatabaseSetup } from '../../setup/test-database';
   import { PersonNode } from '@/models/validation-schemas';

   describe('PersonRepository', () => {
     let testDb: TestDatabaseSetup;
     let sessionManager: SessionManager;
     let personRepo: PersonRepository;
     let logger: Logger;

     beforeAll(async () => {
       testDb = new TestDatabaseSetup();
       sessionManager = await testDb.setup();
       logger = new Logger({ level: 'error' });
       personRepo = new PersonRepository(sessionManager, logger);
     });

     afterAll(async () => {
       await testDb.cleanup();
     });

     describe('create', () => {
       it('should create a new person node', async () => {
         const personData: Partial<PersonNode> = {
           labels: ['Person'],
           properties: {
             name: 'Test Person',
             email: 'test@example.com',
             age: 30,
             isActive: true
           }
         };

         const createdPerson = await personRepo.create(personData);

         expect(createdPerson).toBeDefined();
         expect(createdPerson.id).toBeDefined();
         expect(createdPerson.properties.name).toBe('Test Person');
         expect(createdPerson.properties.email).toBe('test@example.com');
       });

       it('should throw error for invalid person data', async () => {
         const invalidData = {
           labels: ['Person'],
           properties: {
             // Missing required name field
             email: 'invalid@example.com'
           }
         };

         await expect(personRepo.create(invalidData)).rejects.toThrow();
       });
     });

     describe('findByEmail', () => {
       it('should find person by email', async () => {
         const person = await personRepo.findByEmail('john@example.com');

         expect(person).toBeDefined();
         expect(person?.properties.name).toBe('John Doe');
         expect(person?.properties.email).toBe('john@example.com');
       });

       it('should return null for non-existent email', async () => {
         const person = await personRepo.findByEmail('nonexistent@example.com');
         expect(person).toBeNull();
       });
     });

     describe('getPersonConnections', () => {
       it('should return person connections', async () => {
         // First, get John Doe's ID
         const john = await personRepo.findByEmail('john@example.com');
         expect(john).toBeDefined();

         const connections = await personRepo.getPersonConnections(john!.id!);

         expect(connections).toBeDefined();
         expect(Array.isArray(connections)).toBe(true);
       });
     });
   });
   ```

4. **Integration Test Example**
   ```typescript
   // tests/integration/api/graph-routes.test.ts
   import request from 'supertest';
   import express from 'express';
   import { createGraphRoutes } from '@/api/express-routes';
   import { GraphService } from '@/services/graph-service';
   import { PersonRepository } from '@/repositories/person-repository';
   import { TestDatabaseSetup } from '../../setup/test-database';
   import { Logger } from '@/utils/logger';

   describe('Graph API Routes', () => {
     let app: express.Application;
     let testDb: TestDatabaseSetup;
     let graphService: GraphService;
     let personRepo: PersonRepository;

     beforeAll(async () => {
       testDb = new TestDatabaseSetup();
       const sessionManager = await testDb.setup();
       const logger = new Logger({ level: 'error' });

       personRepo = new PersonRepository(sessionManager, logger);
       // Initialize other repositories and services...

       app = express();
       app.use(express.json());
       app.use('/api/graph', createGraphRoutes(graphService, personRepo, logger));
     });

     afterAll(async () => {
       await testDb.cleanup();
     });

     describe('POST /api/graph/persons', () => {
       it('should create a new person', async () => {
         const personData = {
           labels: ['Person'],
           properties: {
             name: 'API Test Person',
             email: 'apitest@example.com',
             age: 25,
             isActive: true
           }
         };

         const response = await request(app)
           .post('/api/graph/persons')
           .send(personData)
           .expect(201);

         expect(response.body.success).toBe(true);
         expect(response.body.data).toBeDefined();
         expect(response.body.data.properties.name).toBe('API Test Person');
       });

       it('should return 400 for invalid data', async () => {
         const invalidData = {
           properties: {
             // Missing required name field
             email: 'invalid@example.com'
           }
         };

         const response = await request(app)
           .post('/api/graph/persons')
           .send(invalidData)
           .expect(400);

         expect(response.body.success).toBe(false);
       });
     });

     describe('GET /api/graph/persons/:id', () => {
       it('should return person by ID', async () => {
         // Create a person first
         const person = await personRepo.create({
           labels: ['Person'],
           properties: {
             name: 'Test Get Person',
             email: 'testget@example.com',
             isActive: true
           }
         });

         const response = await request(app)
           .get(`/api/graph/persons/${person.id}`)
           .expect(200);

         expect(response.body.success).toBe(true);
         expect(response.body.data.properties.name).toBe('Test Get Person');
       });

       it('should return 404 for non-existent person', async () => {
         const response = await request(app)
           .get('/api/graph/persons/nonexistent-id')
           .expect(404);

         expect(response.body.success).toBe(false);
         expect(response.body.error).toBe('Person not found');
       });
     });
   });
   ```

## Performance and Monitoring Requirements

### Protocol 7: Performance Optimization Standards

**MANDATORY**: All Neo4j operations MUST be optimized for performance with comprehensive monitoring.

1. **Query Performance Monitoring**
   ```typescript
   // src/monitoring/query-profiler.ts
   import { Logger } from '@/utils/logger';
   import { PerformanceMetrics } from '@/models/monitoring-types';

   export class QueryProfiler {
     constructor(private logger: Logger) {}

     async profileQuery<T>(
       queryName: string,
       queryFn: () => Promise<T>,
       threshold: number = 1000
     ): Promise<T> {
       const startTime = process.hrtime.bigint();
       const startMemory = process.memoryUsage();

       try {
         const result = await queryFn();
         const endTime = process.hrtime.bigint();
         const endMemory = process.memoryUsage();

         const metrics: PerformanceMetrics = {
           queryName,
           executionTime: Number(endTime - startTime) / 1_000_000, // Convert to ms
           memoryUsage: {
             heapUsed: endMemory.heapUsed - startMemory.heapUsed,
             heapTotal: endMemory.heapTotal - startMemory.heapTotal,
             external: endMemory.external - startMemory.external
           },
           timestamp: new Date()
         };

         if (metrics.executionTime > threshold) {
           this.logger.warn('Slow query detected', metrics);
         } else {
           this.logger.debug('Query performance', metrics);
         }

         return result;
       } catch (error) {
         const endTime = process.hrtime.bigint();
         const executionTime = Number(endTime - startTime) / 1_000_000;

         this.logger.error('Query failed', {
           queryName,
           executionTime,
           error: error.message
         });

         throw error;
       }
     }
   }
   ```

2. **Connection Pool Monitoring**
   ```typescript
   // src/monitoring/health-checker.ts
   import { Driver } from 'neo4j-driver';
   import { Logger } from '@/utils/logger';

   export interface HealthStatus {
     status: 'healthy' | 'degraded' | 'unhealthy';
     database: {
       connected: boolean;
       responseTime: number;
       activeConnections: number;
     };
     memory: NodeJS.MemoryUsage;
     uptime: number;
     timestamp: Date;
   }

   export class HealthChecker {
     constructor(
       private driver: Driver,
       private logger: Logger
     ) {}

     async checkHealth(): Promise<HealthStatus> {
       const startTime = process.hrtime.bigint();
       let databaseHealthy = false;
       let responseTime = 0;

       try {
         const session = this.driver.session();
         try {
           await session.run('RETURN 1 as healthCheck');
           databaseHealthy = true;
           const endTime = process.hrtime.bigint();
           responseTime = Number(endTime - startTime) / 1_000_000;
         } finally {
           await session.close();
         }
       } catch (error) {
         this.logger.error('Database health check failed', { error });
         databaseHealthy = false;
       }

       const memoryUsage = process.memoryUsage();
       const uptime = process.uptime();

       // Determine overall health status
       let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

       if (!databaseHealthy) {
         status = 'unhealthy';
       } else if (responseTime > 1000 || memoryUsage.heapUsed > 500 * 1024 * 1024) {
         status = 'degraded';
       }

       return {
         status,
         database: {
           connected: databaseHealthy,
           responseTime,
           activeConnections: 0 // Would need to implement connection counting
         },
         memory: memoryUsage,
         uptime,
         timestamp: new Date()
       };
     }

     async startHealthChecks(intervalMs: number = 30000): Promise<void> {
       setInterval(async () => {
         try {
           const health = await this.checkHealth();
           
           if (health.status !== 'healthy') {
             this.logger.warn('System health degraded', health);
           } else {
             this.logger.debug('Health check passed', health);
           }
         } catch (error) {
           this.logger.error('Health check error', { error });
         }
       }, intervalMs);
     }
   }
   ```

## Deployment and Production Standards

### Protocol 8: Docker and Container Configuration

**MANDATORY**: All applications MUST be containerized with production-ready Docker configurations.

1. **Production Dockerfile**
   ```dockerfile
   # docker/Dockerfile
   FROM node:18-alpine AS builder

   WORKDIR /app

   # Copy package files
   COPY package*.json ./
   COPY tsconfig.json ./

   # Install dependencies
   RUN npm ci --only=production

   # Copy source code
   COPY src/ ./src/

   # Build application
   RUN npm run build

   # Production stage
   FROM node:18-alpine AS production

   WORKDIR /app

   # Create non-root user
   RUN addgroup -g 1001 -S nodejs
   RUN adduser -S nodejs -u 1001

   # Copy built application
   COPY --from=builder /app/dist ./dist
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/package*.json ./

   # Set ownership
   RUN chown -R nodejs:nodejs /app
   USER nodejs

   # Health check
   HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
     CMD node dist/health-check.js

   # Expose port
   EXPOSE 3000

   # Start application
   CMD ["node", "dist/index.js"]
   ```

2. **Docker Compose Configuration**
   ```yaml
   # docker-compose.yml
   version: '3.8'

   services:
     neo4j-app:
       build:
         context: .
         dockerfile: docker/Dockerfile
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - NEO4J_URI=bolt://neo4j:7687
         - NEO4J_USERNAME=neo4j
         - NEO4J_PASSWORD=password
         - REDIS_URL=redis://redis:6379
       depends_on:
         - neo4j
         - redis
       restart: unless-stopped
       networks:
         - app-network

     neo4j:
       image: neo4j:5.15-community
       ports:
         - "7474:7474"
         - "7687:7687"
       environment:
         - NEO4J_AUTH=neo4j/password
         - NEO4J_PLUGINS=["apoc", "graph-data-science"]
         - NEO4J_dbms_security_procedures_unrestricted=apoc.*,gds.*
       volumes:
         - neo4j_data:/data
         - neo4j_logs:/logs
       restart: unless-stopped
       networks:
         - app-network

     redis:
       image: redis:7-alpine
       ports:
         - "6379:6379"
       volumes:
         - redis_data:/data
       restart: unless-stopped
       networks:
         - app-network

   volumes:
     neo4j_data:
     neo4j_logs:
     redis_data:

   networks:
     app-network:
       driver: bridge
   ```

## Implementation Checklist

Before completing any Neo4j JavaScript/Node.js integration project, verify ALL of the following requirements have been met:

### ✅ Core Architecture Requirements
- [ ] Neo4j driver v5.x+ integration with TypeScript support
- [ ] Comprehensive type definitions for nodes and relationships
- [ ] Connection pool management with health monitoring
- [ ] Session lifecycle management with proper cleanup
- [ ] Transaction handling with rollback capabilities

### ✅ Repository Pattern Implementation
- [ ] Base repository class with CRUD operations
- [ ] Specific repository implementations for each entity type
- [ ] Type-safe query building and parameter binding
- [ ] Comprehensive error handling and logging
- [ ] Validation using Zod or similar schema validation

### ✅ Service Layer Architecture
- [ ] High-level business logic in service classes
- [ ] Graph analytics and recommendation algorithms
- [ ] Caching integration with Redis or in-memory stores
- [ ] Performance monitoring and profiling
- [ ] Batch operation support for bulk processing

### ✅ API Integration
- [ ] RESTful API endpoints with Express.js or Fastify
- [ ] GraphQL resolvers for complex graph queries
- [ ] Authentication and authorization middleware
- [ ] Request validation and error handling
- [ ] Rate limiting and security measures

### ✅ Testing and Quality Assurance
- [ ] Unit tests with Jest and comprehensive mocking
- [ ] Integration tests with testcontainers
- [ ] End-to-end API testing with supertest
- [ ] Performance testing and benchmarking
- [ ] Test coverage reports and quality gates

### ✅ Production Readiness
- [ ] Docker containerization with multi-stage builds
- [ ] Environment configuration management
- [ ] Health checks and monitoring endpoints
- [ ] Logging with structured format (JSON)
- [ ] Security hardening and vulnerability scanning

### ✅ Documentation and Maintenance
- [ ] Comprehensive API documentation
- [ ] Architecture decision records
- [ ] Deployment and operations guides
- [ ] Performance tuning recommendations
- [ ] Troubleshooting and debugging guides

## File Encoding and Standards
**All files generated by AI agents MUST be in UTF-8 encoding without BOM (Byte Order Mark).**

## Core Principles for AI Agents

1. **Type Safety First**: Always prioritize TypeScript type safety and compile-time error detection
2. **Performance Evidence**: Back all performance optimizations with benchmarks and profiling data
3. **Security Integration**: Build security considerations into every layer of the architecture
4. **Testing Completeness**: Ensure comprehensive test coverage for all critical functionality
5. **Production Readiness**: Design for scalability, monitoring, and operational excellence
6. **Documentation Excellence**: Maintain clear, comprehensive documentation for all components
7. **Neo4j Best Practices**: Follow official Neo4j driver recommendations and graph modeling patterns

---

**Prime Directive**: Build production-ready Neo4j JavaScript/Node.js integrations that leverage the full power of graph databases while maintaining type safety, performance, and scalability. Always ensure that the implementation can handle real-world production workloads with comprehensive monitoring and error handling.

Built with ❤️ using the Architect Crew methodology and Neo4j graph database excellence.