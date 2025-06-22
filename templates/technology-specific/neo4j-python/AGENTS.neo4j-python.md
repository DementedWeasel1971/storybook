---
template: agents-neo4j-python.md
version: {{agentsVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/neo4j-python/AGENTS.neo4j-python.md
generatedBy: executor-crew
technology: Neo4j + Python
generationTriggers: 
  - CLAUDE.md architecture changes
  - Neo4j Python implementation requirements updates
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
---

# AGENTS.md: AI Agent Constitution for Neo4j Python Integration Development

**Version**: {{agentsVersion}}  
**Generated from**: CLAUDE.md architectural specification  
**Date**: {{date}}  
**Technology**: Neo4j Graph Database + Python + Driver Integration

This document provides the **official guidelines and mandatory protocols** for any AI agent contributing to this Neo4j Python integration project. **You MUST adhere to all instructions herein.**

## Project Overview

{{neo4jPythonProjectOverview}}

**Crucially, all AI agents MUST implement the Neo4j Python integration architecture defined in `CLAUDE.md` and document technical specifications in `docs/FRS.md` as implementation proceeds.**

## Neo4j Python Implementation Requirements

Based on the architecture defined in CLAUDE.md, the following implementation requirements are mandatory:

{{neo4jPythonImplementationRequirements}}

### Python Project Structure Standards

1. **Mandatory Neo4j Python Project Structure**
   ```
   neo4j-python-project/
   ├── src/
   │   ├── __init__.py
   │   ├── database/
   │   │   ├── __init__.py
   │   │   ├── connection.py           # Neo4j driver connection management
   │   │   ├── session_manager.py      # Session lifecycle management
   │   │   ├── transaction_manager.py  # Transaction handling
   │   │   └── pool_manager.py         # Connection pool management
   │   ├── models/
   │   │   ├── __init__.py
   │   │   ├── base_node.py           # Base node model classes
   │   │   ├── base_relationship.py    # Base relationship model classes
   │   │   ├── graph_models.py        # Specific graph entity models
   │   │   └── schema_validator.py     # Graph schema validation
   │   ├── repositories/
   │   │   ├── __init__.py
   │   │   ├── base_repository.py     # Base repository pattern
   │   │   ├── node_repository.py     # Node CRUD operations
   │   │   ├── relationship_repository.py  # Relationship operations
   │   │   └── graph_repository.py    # Complex graph operations
   │   ├── services/
   │   │   ├── __init__.py
   │   │   ├── graph_service.py       # High-level graph operations
   │   │   ├── analytics_service.py   # Graph analytics and algorithms
   │   │   ├── recommendation_service.py  # Recommendation algorithms
   │   │   └── search_service.py      # Graph search and traversal
   │   ├── queries/
   │   │   ├── __init__.py
   │   │   ├── cypher_builder.py      # Dynamic Cypher query builder
   │   │   ├── query_templates.py     # Reusable query templates
   │   │   ├── parameter_builder.py   # Query parameter management
   │   │   └── query_optimizer.py     # Query optimization utilities
   │   ├── cache/
   │   │   ├── __init__.py
   │   │   ├── redis_cache.py         # Redis caching implementation
   │   │   ├── memory_cache.py        # In-memory caching
   │   │   ├── query_cache.py         # Query result caching
   │   │   └── cache_manager.py       # Cache lifecycle management
   │   ├── monitoring/
   │   │   ├── __init__.py
   │   │   ├── metrics_collector.py   # Performance metrics collection
   │   │   ├── health_checker.py      # Database health monitoring
   │   │   ├── query_profiler.py      # Query performance profiling
   │   │   └── logger_config.py       # Logging configuration
   │   ├── security/
   │   │   ├── __init__.py
   │   │   ├── auth_manager.py        # Authentication management
   │   │   ├── query_validator.py     # Query security validation
   │   │   ├── access_control.py      # Role-based access control
   │   │   └── encryption_utils.py    # Data encryption utilities
   │   ├── api/
   │   │   ├── __init__.py
   │   │   ├── fastapi_routes.py      # FastAPI route definitions
   │   │   ├── flask_routes.py        # Flask route definitions
   │   │   ├── django_views.py        # Django view implementations
   │   │   └── graphql_resolvers.py   # GraphQL resolver functions
   │   └── utils/
   │       ├── __init__.py
   │       ├── config.py              # Configuration management
   │       ├── exceptions.py          # Custom exception classes
   │       ├── helpers.py             # Utility functions
   │       └── validators.py          # Data validation utilities
   ├── tests/
   │   ├── __init__.py
   │   ├── unit/
   │   │   ├── test_models.py         # Unit tests for models
   │   │   ├── test_repositories.py   # Repository pattern tests
   │   │   ├── test_services.py       # Service layer tests
   │   │   └── test_queries.py        # Query builder tests
   │   ├── integration/
   │   │   ├── test_database.py       # Database integration tests
   │   │   ├── test_api.py            # API endpoint tests
   │   │   ├── test_performance.py    # Performance benchmarks
   │   │   └── test_security.py       # Security validation tests
   │   ├── fixtures/
   │   │   ├── graph_data.py          # Test graph data
   │   │   ├── mock_responses.py      # Mock database responses
   │   │   └── test_containers.py     # Docker test containers
   │   └── conftest.py                # Pytest configuration
   ├── config/
   │   ├── development.yml            # Development configuration
   │   ├── production.yml             # Production configuration
   │   ├── testing.yml                # Testing configuration
   │   └── docker-compose.yml         # Neo4j test environment
   ├── scripts/
   │   ├── migrate_schema.py          # Graph schema migration
   │   ├── seed_data.py               # Test data seeding
   │   ├── backup_graph.py            # Graph backup utilities
   │   └── performance_test.py        # Performance testing script
   ├── docker/
   │   ├── Dockerfile                 # Application container
   │   ├── neo4j.dockerfile           # Neo4j container
   │   └── docker-compose.prod.yml    # Production compose
   ├── docs/
   │   ├── api.md                     # API documentation
   │   ├── graph_schema.md            # Graph schema documentation
   │   ├── deployment.md              # Deployment guide
   │   └── examples/                  # Usage examples
   ├── requirements.txt               # Python dependencies
   ├── requirements-dev.txt           # Development dependencies
   ├── pyproject.toml                 # Project configuration
   ├── .env.example                   # Environment variables template
   └── README.md                      # Project documentation
   ```

## 2. Mandatory Neo4j Python Implementation Patterns

### Neo4j Driver Connection Management

**File**: `src/database/connection.py`

```python
from typing import Optional, Dict, Any
from neo4j import GraphDatabase, Driver, Session
from neo4j.exceptions import ServiceUnavailable, AuthError
import logging
from contextlib import contextmanager
import time

class Neo4jConnection:
    """
    Neo4j database connection manager with best practices implementation.
    """
    
    def __init__(self, 
                 uri: str, 
                 username: str, 
                 password: str,
                 max_connection_lifetime: int = 3600,
                 max_connection_pool_size: int = 50,
                 connection_acquisition_timeout: int = 60,
                 **kwargs):
        self.uri = uri
        self.username = username
        self.password = password
        self.driver: Optional[Driver] = None
        self.logger = logging.getLogger(__name__)
        
        self.driver_config = {
            'max_connection_lifetime': max_connection_lifetime,
            'max_connection_pool_size': max_connection_pool_size,
            'connection_acquisition_timeout': connection_acquisition_timeout,
            'encrypted': kwargs.get('encrypted', True),
            'trust': kwargs.get('trust', 'TRUST_DEFAULT'),
            **kwargs
        }
    
    def connect(self) -> Driver:
        """
        Establish connection to Neo4j database with retry logic.
        """
        if self.driver is None:
            try:
                self.driver = GraphDatabase.driver(
                    self.uri,
                    auth=(self.username, self.password),
                    **self.driver_config
                )
                
                # Verify connectivity
                self.driver.verify_connectivity()
                self.logger.info(f"Successfully connected to Neo4j at {self.uri}")
                
            except ServiceUnavailable as e:
                self.logger.error(f"Neo4j service unavailable: {e}")
                raise
            except AuthError as e:
                self.logger.error(f"Authentication failed: {e}")
                raise
            except Exception as e:
                self.logger.error(f"Failed to connect to Neo4j: {e}")
                raise
        
        return self.driver
    
    def close(self):
        """
        Close the Neo4j driver connection.
        """
        if self.driver is not None:
            self.driver.close()
            self.driver = None
            self.logger.info("Neo4j connection closed")
    
    @contextmanager
    def session(self, database: Optional[str] = None, **kwargs):
        """
        Context manager for Neo4j sessions with automatic cleanup.
        """
        if self.driver is None:
            self.connect()
        
        session_config = {
            'database': database or 'neo4j',
            **kwargs
        }
        
        session = self.driver.session(**session_config)
        try:
            yield session
        finally:
            session.close()
    
    def health_check(self) -> bool:
        """
        Perform health check on Neo4j connection.
        """
        try:
            with self.session() as session:
                result = session.run("RETURN 1 as health_check")
                return result.single()['health_check'] == 1
        except Exception as e:
            self.logger.error(f"Health check failed: {e}")
            return False
    
    def get_server_info(self) -> Dict[str, Any]:
        """
        Get Neo4j server information for monitoring.
        """
        try:
            with self.session() as session:
                result = session.run("""
                    CALL dbms.components() 
                    YIELD name, versions, edition 
                    RETURN name, versions[0] as version, edition
                """)
                return {record['name']: {
                    'version': record['version'],
                    'edition': record['edition']
                } for record in result}
        except Exception as e:
            self.logger.error(f"Failed to get server info: {e}")
            return {}
```

### Graph Model Implementation with py2neo Integration

**File**: `src/models/graph_models.py`

```python
from typing import Dict, Any, List, Optional, Union
from dataclasses import dataclass, field
from abc import ABC, abstractmethod
import uuid
from datetime import datetime

# Official driver imports
from neo4j import Session
from neo4j.graph import Node, Relationship

# py2neo imports (optional OGM layer)
try:
    from py2neo.ogm import GraphObject, Property, RelatedTo, RelatedFrom
    PY2NEO_AVAILABLE = True
except ImportError:
    PY2NEO_AVAILABLE = False
    GraphObject = object  # Fallback base class

@dataclass
class BaseGraphEntity:
    """
    Base class for all graph entities with common functionality.
    """
    id: Optional[str] = field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert entity to dictionary for Neo4j operations."""
        return {
            'id': self.id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
    
    @classmethod
    def from_node(cls, node: Node):
        """Create entity from Neo4j node."""
        return cls(**node)

# Official Driver Pattern Implementation
@dataclass
class Person(BaseGraphEntity):
    """
    Person node model using official driver patterns.
    """
    name: str = ""
    email: str = ""
    age: Optional[int] = None
    properties: Dict[str, Any] = field(default_factory=dict)
    
    def to_dict(self) -> Dict[str, Any]:
        data = super().to_dict()
        data.update({
            'name': self.name,
            'email': self.email,
            'age': self.age,
            **self.properties
        })
        return data
    
    @property
    def labels(self) -> List[str]:
        return ['Person']

@dataclass
class Company(BaseGraphEntity):
    """
    Company node model.
    """
    name: str = ""
    industry: str = ""
    founded_year: Optional[int] = None
    website: Optional[str] = None
    
    def to_dict(self) -> Dict[str, Any]:
        data = super().to_dict()
        data.update({
            'name': self.name,
            'industry': self.industry,
            'founded_year': self.founded_year,
            'website': self.website
        })
        return data
    
    @property
    def labels(self) -> List[str]:
        return ['Company', 'Organization']

# py2neo OGM Implementation (optional)
if PY2NEO_AVAILABLE:
    class PersonOGM(GraphObject):
        """
        Person model using py2neo OGM for higher-level abstractions.
        """
        __primarykey__ = "id"
        
        id = Property()
        name = Property()
        email = Property()
        age = Property()
        created_at = Property()
        updated_at = Property()
        
        # Relationships
        works_at = RelatedTo("CompanyOGM", "WORKS_AT")
        friends_with = RelatedTo("PersonOGM", "FRIENDS_WITH")
        knows = RelatedTo("PersonOGM", "KNOWS")
        
        def __init__(self, **kwargs):
            super().__init__()
            for key, value in kwargs.items():
                if hasattr(self, key):
                    setattr(self, key, value)
    
    class CompanyOGM(GraphObject):
        """
        Company model using py2neo OGM.
        """
        __primarykey__ = "id"
        
        id = Property()
        name = Property()
        industry = Property()
        founded_year = Property()
        website = Property()
        created_at = Property()
        updated_at = Property()
        
        # Relationships
        employees = RelatedFrom("PersonOGM", "WORKS_AT")
        partners_with = RelatedTo("CompanyOGM", "PARTNERS_WITH")

# Relationship Models
@dataclass
class WorksAtRelationship:
    """
    WORKS_AT relationship model.
    """
    position: str = ""
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    salary: Optional[float] = None
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            'position': self.position,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'salary': self.salary
        }
    
    @property
    def relationship_type(self) -> str:
        return 'WORKS_AT'

class GraphModelFactory:
    """
    Factory class for creating appropriate model instances.
    """
    
    @staticmethod
    def create_person(use_ogm: bool = False, **kwargs) -> Union[Person, 'PersonOGM']:
        """Create person instance based on OGM preference."""
        if use_ogm and PY2NEO_AVAILABLE:
            return PersonOGM(**kwargs)
        else:
            return Person(**kwargs)
    
    @staticmethod
    def create_company(use_ogm: bool = False, **kwargs) -> Union[Company, 'CompanyOGM']:
        """Create company instance based on OGM preference."""
        if use_ogm and PY2NEO_AVAILABLE:
            return CompanyOGM(**kwargs)
        else:
            return Company(**kwargs)
```

### Repository Pattern Implementation

**File**: `src/repositories/base_repository.py`

```python
from typing import Dict, Any, List, Optional, Type, TypeVar, Generic
from abc import ABC, abstractmethod
from neo4j import Session, Transaction
from ..database.connection import Neo4jConnection
from ..models.graph_models import BaseGraphEntity
import logging

T = TypeVar('T', bound=BaseGraphEntity)

class BaseRepository(Generic[T], ABC):
    """
    Base repository pattern for Neo4j operations.
    """
    
    def __init__(self, connection: Neo4jConnection, model_class: Type[T]):
        self.connection = connection
        self.model_class = model_class
        self.logger = logging.getLogger(self.__class__.__name__)
    
    @property
    @abstractmethod
    def node_labels(self) -> List[str]:
        """Return the node labels for this repository."""
        pass
    
    def create(self, entity: T, **kwargs) -> T:
        """
        Create a new node in the graph.
        """
        labels_str = ':'.join(self.node_labels)
        properties = entity.to_dict()
        
        cypher = f"""
        CREATE (n:{labels_str} $props)
        RETURN n
        """
        
        with self.connection.session() as session:
            result = session.run(cypher, props=properties)
            record = result.single()
            
            if record:
                node = record['n']
                return self.model_class.from_node(node)
            else:
                raise ValueError("Failed to create node")
    
    def find_by_id(self, entity_id: str) -> Optional[T]:
        """
        Find node by ID.
        """
        labels_str = ':'.join(self.node_labels)
        cypher = f"""
        MATCH (n:{labels_str} {{id: $id}})
        RETURN n
        """
        
        with self.connection.session() as session:
            result = session.run(cypher, id=entity_id)
            record = result.single()
            
            if record:
                node = record['n']
                return self.model_class.from_node(node)
            return None
    
    def find_all(self, limit: Optional[int] = None) -> List[T]:
        """
        Find all nodes of this type.
        """
        labels_str = ':'.join(self.node_labels)
        cypher = f"""
        MATCH (n:{labels_str})
        RETURN n
        {f'LIMIT {limit}' if limit else ''}
        """
        
        with self.connection.session() as session:
            result = session.run(cypher)
            return [self.model_class.from_node(record['n']) for record in result]
    
    def update(self, entity: T) -> T:
        """
        Update an existing node.
        """
        labels_str = ':'.join(self.node_labels)
        properties = entity.to_dict()
        entity_id = properties.pop('id')
        
        cypher = f"""
        MATCH (n:{labels_str} {{id: $id}})
        SET n += $props
        RETURN n
        """
        
        with self.connection.session() as session:
            result = session.run(cypher, id=entity_id, props=properties)
            record = result.single()
            
            if record:
                node = record['n']
                return self.model_class.from_node(node)
            else:
                raise ValueError(f"Node with id {entity_id} not found")
    
    def delete(self, entity_id: str) -> bool:
        """
        Delete a node by ID.
        """
        labels_str = ':'.join(self.node_labels)
        cypher = f"""
        MATCH (n:{labels_str} {{id: $id}})
        DELETE n
        RETURN COUNT(n) as deleted_count
        """
        
        with self.connection.session() as session:
            result = session.run(cypher, id=entity_id)
            record = result.single()
            return record['deleted_count'] > 0 if record else False
    
    def find_by_property(self, property_name: str, property_value: Any) -> List[T]:
        """
        Find nodes by a specific property value.
        """
        labels_str = ':'.join(self.node_labels)
        cypher = f"""
        MATCH (n:{labels_str})
        WHERE n.{property_name} = $value
        RETURN n
        """
        
        with self.connection.session() as session:
            result = session.run(cypher, value=property_value)
            return [self.model_class.from_node(record['n']) for record in result]
    
    def count(self) -> int:
        """
        Count total nodes of this type.
        """
        labels_str = ':'.join(self.node_labels)
        cypher = f"""
        MATCH (n:{labels_str})
        RETURN COUNT(n) as count
        """
        
        with self.connection.session() as session:
            result = session.run(cypher)
            record = result.single()
            return record['count'] if record else 0
    
    def batch_create(self, entities: List[T]) -> List[T]:
        """
        Create multiple nodes efficiently using UNWIND.
        """
        if not entities:
            return []
        
        labels_str = ':'.join(self.node_labels)
        properties_list = [entity.to_dict() for entity in entities]
        
        cypher = f"""
        UNWIND $props_list as props
        CREATE (n:{labels_str})
        SET n = props
        RETURN n
        """
        
        with self.connection.session() as session:
            result = session.run(cypher, props_list=properties_list)
            return [self.model_class.from_node(record['n']) for record in result]
```

## 3. Query Building and Optimization Requirements

### Cypher Query Builder Implementation

**File**: `src/queries/cypher_builder.py`

```python
from typing import Dict, Any, List, Optional, Union
from dataclasses import dataclass, field
from enum import Enum

class QueryType(Enum):
    MATCH = "MATCH"
    CREATE = "CREATE"
    MERGE = "MERGE"
    DELETE = "DELETE"
    SET = "SET"
    REMOVE = "REMOVE"

@dataclass
class QueryBuilder:
    """
    Dynamic Cypher query builder with parameter safety.
    """
    query_parts: List[str] = field(default_factory=list)
    parameters: Dict[str, Any] = field(default_factory=dict)
    returns: List[str] = field(default_factory=list)
    
    def match(self, pattern: str, where: Optional[str] = None) -> 'QueryBuilder':
        """Add MATCH clause to query."""
        match_clause = f"MATCH {pattern}"
        if where:
            match_clause += f" WHERE {where}"
        self.query_parts.append(match_clause)
        return self
    
    def create(self, pattern: str) -> 'QueryBuilder':
        """Add CREATE clause to query."""
        self.query_parts.append(f"CREATE {pattern}")
        return self
    
    def merge(self, pattern: str, on_create: Optional[str] = None, on_match: Optional[str] = None) -> 'QueryBuilder':
        """Add MERGE clause with optional ON CREATE/MATCH."""
        merge_clause = f"MERGE {pattern}"
        if on_create:
            merge_clause += f" ON CREATE {on_create}"
        if on_match:
            merge_clause += f" ON MATCH {on_match}"
        self.query_parts.append(merge_clause)
        return self
    
    def where(self, condition: str) -> 'QueryBuilder':
        """Add WHERE clause to query."""
        self.query_parts.append(f"WHERE {condition}")
        return self
    
    def set_properties(self, assignments: str) -> 'QueryBuilder':
        """Add SET clause to query."""
        self.query_parts.append(f"SET {assignments}")
        return self
    
    def delete_nodes(self, variables: str) -> 'QueryBuilder':
        """Add DELETE clause to query."""
        self.query_parts.append(f"DELETE {variables}")
        return self
    
    def order_by(self, order: str) -> 'QueryBuilder':
        """Add ORDER BY clause to query."""
        self.query_parts.append(f"ORDER BY {order}")
        return self
    
    def limit(self, count: int) -> 'QueryBuilder':
        """Add LIMIT clause to query."""
        self.query_parts.append(f"LIMIT {count}")
        return self
    
    def skip(self, count: int) -> 'QueryBuilder':
        """Add SKIP clause to query."""
        self.query_parts.append(f"SKIP {count}")
        return self
    
    def return_values(self, *values: str) -> 'QueryBuilder':
        """Set RETURN clause values."""
        self.returns.extend(values)
        return self
    
    def with_clause(self, variables: str) -> 'QueryBuilder':
        """Add WITH clause to query."""
        self.query_parts.append(f"WITH {variables}")
        return self
    
    def add_parameter(self, name: str, value: Any) -> 'QueryBuilder':
        """Add parameter to query."""
        self.parameters[name] = value
        return self
    
    def add_parameters(self, params: Dict[str, Any]) -> 'QueryBuilder':
        """Add multiple parameters to query."""
        self.parameters.update(params)
        return self
    
    def build(self) -> str:
        """Build the complete Cypher query string."""
        query = " ".join(self.query_parts)
        
        if self.returns:
            query += f" RETURN {', '.join(self.returns)}"
        
        return query
    
    def get_parameters(self) -> Dict[str, Any]:
        """Get query parameters dictionary."""
        return self.parameters.copy()
    
    def reset(self) -> 'QueryBuilder':
        """Reset builder to initial state."""
        self.query_parts.clear()
        self.parameters.clear()
        self.returns.clear()
        return self

# Query Templates for Common Operations
class QueryTemplates:
    """
    Pre-built query templates for common graph operations.
    """
    
    @staticmethod
    def find_shortest_path(start_label: str, end_label: str, 
                          start_property: str, start_value: Any,
                          end_property: str, end_value: Any,
                          relationship_types: Optional[List[str]] = None) -> QueryBuilder:
        """Template for shortest path queries."""
        rel_filter = f":{':'.join(relationship_types)}" if relationship_types else ""
        
        return (QueryBuilder()
               .match(f"(start:{start_label} {{{start_property}: $start_value}})")
               .match(f"(end:{end_label} {{{end_property}: $end_value}})")
               .match(f"path = shortestPath((start)-[{rel_filter}*]-(end))")
               .add_parameter("start_value", start_value)
               .add_parameter("end_value", end_value)
               .return_values("path", "length(path) as distance"))
    
    @staticmethod
    def find_mutual_connections(person1_id: str, person2_id: str) -> QueryBuilder:
        """Template for finding mutual connections between two people."""
        return (QueryBuilder()
               .match("(p1:Person {id: $person1_id})-[:KNOWS]-(mutual)-[:KNOWS]-(p2:Person {id: $person2_id})")
               .add_parameter("person1_id", person1_id)
               .add_parameter("person2_id", person2_id)
               .return_values("mutual.name as mutual_friend", "mutual.id as mutual_id"))
    
    @staticmethod
    def recommendation_by_similar_users(user_id: str, limit: int = 10) -> QueryBuilder:
        """Template for collaborative filtering recommendations."""
        return (QueryBuilder()
               .match("(user:Person {id: $user_id})-[:LIKES]->(item)")
               .match("(other:Person)-[:LIKES]->(item)")
               .where("user <> other")
               .match("(other)-[:LIKES]->(recommendation)")
               .where("NOT (user)-[:LIKES]->(recommendation)")
               .add_parameter("user_id", user_id)
               .return_values("recommendation", "COUNT(*) as score")
               .order_by("score DESC")
               .limit(limit))
```

## 4. Performance Optimization Requirements

### Caching Implementation

**File**: `src/cache/query_cache.py`

```python
import redis
import json
import hashlib
from typing import Any, Optional, Dict, List
from datetime import datetime, timedelta
import logging

class QueryCache:
    """
    Redis-based query result caching with intelligent invalidation.
    """
    
    def __init__(self, redis_client: redis.Redis, default_ttl: int = 3600):
        self.redis = redis_client
        self.default_ttl = default_ttl
        self.logger = logging.getLogger(__name__)
        
    def _generate_cache_key(self, query: str, parameters: Dict[str, Any]) -> str:
        """Generate cache key from query and parameters."""
        # Sort parameters for consistent cache keys
        sorted_params = json.dumps(parameters, sort_keys=True, default=str)
        cache_input = f"{query}|{sorted_params}"
        return f"neo4j_query:{hashlib.md5(cache_input.encode()).hexdigest()}"
    
    def get(self, query: str, parameters: Dict[str, Any]) -> Optional[List[Dict[str, Any]]]:
        """Retrieve cached query results."""
        cache_key = self._generate_cache_key(query, parameters)
        
        try:
            cached_data = self.redis.get(cache_key)
            if cached_data:
                self.logger.debug(f"Cache hit for key: {cache_key}")
                return json.loads(cached_data)
            else:
                self.logger.debug(f"Cache miss for key: {cache_key}")
                return None
        except Exception as e:
            self.logger.error(f"Cache retrieval error: {e}")
            return None
    
    def set(self, query: str, parameters: Dict[str, Any], 
            results: List[Dict[str, Any]], ttl: Optional[int] = None) -> bool:
        """Cache query results with TTL."""
        cache_key = self._generate_cache_key(query, parameters)
        cache_ttl = ttl or self.default_ttl
        
        try:
            serialized_results = json.dumps(results, default=str)
            self.redis.setex(cache_key, cache_ttl, serialized_results)
            self.logger.debug(f"Cached results for key: {cache_key}, TTL: {cache_ttl}")
            return True
        except Exception as e:
            self.logger.error(f"Cache storage error: {e}")
            return False
    
    def invalidate_pattern(self, pattern: str) -> int:
        """Invalidate all cache keys matching pattern."""
        try:
            keys = self.redis.keys(f"neo4j_query:*{pattern}*")
            if keys:
                deleted = self.redis.delete(*keys)
                self.logger.info(f"Invalidated {deleted} cache entries matching pattern: {pattern}")
                return deleted
            return 0
        except Exception as e:
            self.logger.error(f"Cache invalidation error: {e}")
            return 0
    
    def clear_all(self) -> bool:
        """Clear all cached query results."""
        try:
            keys = self.redis.keys("neo4j_query:*")
            if keys:
                self.redis.delete(*keys)
                self.logger.info(f"Cleared {len(keys)} cache entries")
            return True
        except Exception as e:
            self.logger.error(f"Cache clear error: {e}")
            return False

class CachedQueryExecutor:
    """
    Query executor with intelligent caching.
    """
    
    def __init__(self, session, cache: QueryCache):
        self.session = session
        self.cache = cache
        self.logger = logging.getLogger(__name__)
    
    def execute_query(self, query: str, parameters: Dict[str, Any] = None, 
                     use_cache: bool = True, cache_ttl: Optional[int] = None) -> List[Dict[str, Any]]:
        """Execute query with optional caching."""
        if parameters is None:
            parameters = {}
        
        # Try cache first if enabled
        if use_cache:
            cached_results = self.cache.get(query, parameters)
            if cached_results is not None:
                return cached_results
        
        # Execute query
        start_time = datetime.utcnow()
        try:
            result = self.session.run(query, parameters)
            records = [record.data() for record in result]
            
            execution_time = (datetime.utcnow() - start_time).total_seconds()
            self.logger.debug(f"Query executed in {execution_time:.3f}s: {query[:100]}...")
            
            # Cache results if enabled
            if use_cache:
                self.cache.set(query, parameters, records, cache_ttl)
            
            return records
            
        except Exception as e:
            execution_time = (datetime.utcnow() - start_time).total_seconds()
            self.logger.error(f"Query failed after {execution_time:.3f}s: {e}")
            raise
```

## 5. Testing Implementation Requirements

### Unit Testing Framework

**File**: `tests/unit/test_repositories.py`

```python
import pytest
from unittest.mock import Mock, patch, MagicMock
from neo4j.graph import Node
from src.repositories.base_repository import BaseRepository
from src.models.graph_models import Person
from src.database.connection import Neo4jConnection

class TestPersonRepository(BaseRepository[Person]):
    """Test implementation of BaseRepository for Person entities."""
    
    @property
    def node_labels(self):
        return ['Person']

class TestBaseRepository:
    """Unit tests for BaseRepository implementation."""
    
    @pytest.fixture
    def mock_connection(self):
        """Mock Neo4j connection."""
        return Mock(spec=Neo4jConnection)
    
    @pytest.fixture
    def repository(self, mock_connection):
        """Repository instance for testing."""
        return TestPersonRepository(mock_connection, Person)
    
    @pytest.fixture
    def sample_person(self):
        """Sample person entity for testing."""
        return Person(
            id="test-123",
            name="John Doe",
            email="john@example.com",
            age=30
        )
    
    @pytest.fixture
    def mock_node(self):
        """Mock Neo4j node."""
        node = Mock(spec=Node)
        node.__getitem__ = lambda self, key: {
            'id': 'test-123',
            'name': 'John Doe',
            'email': 'john@example.com',
            'age': 30
        }[key]
        return node
    
    def test_create_person(self, repository, sample_person, mock_connection):
        """Test creating a new person."""
        # Mock session and result
        mock_session = Mock()
        mock_result = Mock()
        mock_record = Mock()
        mock_record.__getitem__ = lambda self, key: self.mock_node if key == 'n' else None
        mock_record.mock_node = self.mock_node
        
        mock_result.single.return_value = mock_record
        mock_session.run.return_value = mock_result
        mock_connection.session.return_value.__enter__.return_value = mock_session
        
        # Execute test
        created_person = repository.create(sample_person)
        
        # Assertions
        assert created_person is not None
        mock_session.run.assert_called_once()
        call_args = mock_session.run.call_args
        assert "CREATE" in call_args[0][0]
        assert "Person" in call_args[0][0]
    
    def test_find_by_id(self, repository, mock_connection, mock_node):
        """Test finding person by ID."""
        # Mock session and result
        mock_session = Mock()
        mock_result = Mock()
        mock_record = Mock()
        mock_record.__getitem__ = lambda self, key: mock_node if key == 'n' else None
        
        mock_result.single.return_value = mock_record
        mock_session.run.return_value = mock_result
        mock_connection.session.return_value.__enter__.return_value = mock_session
        
        # Execute test
        found_person = repository.find_by_id("test-123")
        
        # Assertions
        assert found_person is not None
        mock_session.run.assert_called_once()
        call_args = mock_session.run.call_args
        assert "MATCH" in call_args[0][0]
        assert call_args[1]['id'] == "test-123"
    
    def test_find_by_id_not_found(self, repository, mock_connection):
        """Test finding non-existent person."""
        # Mock session with no results
        mock_session = Mock()
        mock_result = Mock()
        mock_result.single.return_value = None
        mock_session.run.return_value = mock_result
        mock_connection.session.return_value.__enter__.return_value = mock_session
        
        # Execute test
        found_person = repository.find_by_id("non-existent")
        
        # Assertions
        assert found_person is None
    
    def test_batch_create(self, repository, mock_connection):
        """Test batch creation of multiple entities."""
        # Create test data
        people = [
            Person(name="Person 1", email="person1@example.com"),
            Person(name="Person 2", email="person2@example.com"),
            Person(name="Person 3", email="person3@example.com")
        ]
        
        # Mock session and result
        mock_session = Mock()
        mock_result = Mock()
        mock_records = [Mock() for _ in people]
        for i, record in enumerate(mock_records):
            record.__getitem__ = lambda self, key, i=i: people[i] if key == 'n' else None
        
        mock_result.__iter__ = lambda self: iter(mock_records)
        mock_session.run.return_value = mock_result
        mock_connection.session.return_value.__enter__.return_value = mock_session
        
        # Execute test
        created_people = repository.batch_create(people)
        
        # Assertions
        assert len(created_people) == 3
        mock_session.run.assert_called_once()
        call_args = mock_session.run.call_args
        assert "UNWIND" in call_args[0][0]
        assert len(call_args[1]['props_list']) == 3
```

## 6. Quality Assurance and Testing Standards

### Testing Requirements

1. **Unit Testing Coverage**: Minimum 90% code coverage for all service classes
2. **Integration Testing**: Complete test coverage for Neo4j database operations
3. **Performance Testing**: Query execution time and connection pool benchmarks
4. **Security Testing**: Authentication, authorization, and query injection tests

### Code Quality Standards

1. **Python Conventions**: Follow PEP 8 coding standards and type hints
2. **Documentation**: Comprehensive docstrings for all public methods
3. **Error Handling**: Consistent exception handling with proper Neo4j error responses
4. **Logging**: Structured logging for all database operations and performance metrics

## 7. Security Implementation Requirements

### Authentication and Authorization

1. **Neo4j Authentication**: Secure credential management and connection encryption
2. **Query Validation**: Input sanitization and Cypher injection prevention
3. **Access Control**: Role-based access to graph operations and data filtering
4. **Audit Logging**: Comprehensive logging of all database operations

## 8. Performance and Scalability Requirements

### Optimization Strategy

1. **Connection Pooling**: Efficient connection pool management with health monitoring
2. **Query Optimization**: Parameter usage, index utilization, and batch processing
3. **Caching Implementation**: Multi-level caching with Redis and in-memory stores
4. **Monitoring**: Real-time performance tracking and alerting

### Scalability Features

1. **Read Replica Support**: Load balancing across Neo4j cluster nodes
2. **Async Processing**: Non-blocking operations using asyncio patterns
3. **Batch Operations**: Efficient bulk processing with UNWIND operations
4. **Resource Management**: Memory-efficient result streaming and processing

---

**Remember**: All AI agents MUST follow these implementation requirements exactly. Any deviation from these standards will result in implementation rejection and requirement for refactoring.

**File Encoding**: All files MUST be created in UTF-8 encoding without BOM.

**Prime Directive**: Implement a production-ready Neo4j Python integration that follows graph database best practices while providing efficient relationship-based data modeling and querying capabilities.