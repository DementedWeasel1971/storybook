#!/usr/bin/env python3
"""
FastAPI Architect Crew Methodology Commands
Python CLI commands for methodology automation
"""

import click
import os
import shutil
from pathlib import Path
from datetime import datetime
import logging
import json
from typing import Dict, List, Any

logger = logging.getLogger(__name__)

@click.group()
def methodology():
    """Architect Crew methodology commands for FastAPI projects"""
    pass

@methodology.command()
@click.option('--force', is_flag=True, help='Force regeneration of existing files')
def setup(force: bool):
    """Setup Architect Crew methodology for FastAPI project"""
    click.echo('🚀 Setting up Architect Crew methodology for FastAPI...')
    
    try:
        # Create methodology directories
        create_directories()
        
        # Copy methodology templates
        copy_templates(force)
        
        # Generate initial documentation
        generate_initial_docs(force)
        
        # Setup FastAPI-specific configurations
        setup_fastapi_configurations()
        
        # Create development scripts
        create_development_scripts()
        
        click.echo('✅ Architect Crew methodology setup completed!')
        display_next_steps()
        
    except Exception as e:
        click.echo(f'❌ Setup failed: {e}', err=True)
        return 1
    
    return 0

def create_directories():
    """Create necessary directories for methodology"""
    directories = [
        'docs',
        'docs/personas',
        'methodology',
        'methodology/templates',
        'methodology/scripts',
        'methodology/adapters',
        'app',
        'app/models',
        'app/schemas',
        'app/services',
        'app/api',
        'app/api/v1',
        'app/api/v1/endpoints',
        'app/graph',
        'app/graph/models',
        'app/graph/schemas',
        'app/core',
        'app/core/security',
        'app/core/database',
        'tests',
        'tests/unit',
        'tests/integration',
        'tests/graph',
        'tests/api',
        'alembic',
        'alembic/versions',
        'scripts',
        'docker',
        'k8s'
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        click.echo(f'📁 Created directory: {directory}')

def copy_templates(force: bool):
    """Copy FastAPI-specific templates"""
    templates = {
        'CLAUDE.fastapi.md': 'methodology/templates/CLAUDE.template.md',
        'AGENTS.fastapi.md': 'methodology/templates/AGENTS.template.md',
        'FRS.fastapi.md': 'methodology/templates/FRS.template.md'
    }
    
    # Create templates from embedded content
    create_fastapi_templates()
    
    click.echo('📄 Created FastAPI-specific templates')

def create_fastapi_templates():
    """Create FastAPI-specific templates"""
    
    # CLAUDE template for FastAPI
    claude_template = '''---
template: claude_fastapi.md
version: {{claudeVersion}}
generationTriggers: 
  - docs/RDS.md changes
  - docs/persona-*.md changes
chainedGeneration:
  - AGENTS.md (from CLAUDE.md architecture)
  - FRS.md (from AGENTS.md implementation)
technology: FastAPI + Neo4j + MySQL
---

# CLAUDE.md - FastAPI Architecture Specification
## Architect Crew Methodology™ for {{projectName}}

**Version**: {{claudeVersion}}  
**Technology Stack**: Python FastAPI + Neo4j + MySQL + FastAPI-MCP  
**Generated**: {{generationDate}}  
**Architecture Type**: Hybrid Database API with Graph Analytics

## 🏗️ **Architectural Decisions**

### **Core Technology Architecture**

```yaml
architecture_pattern: "Domain-Driven Design with CQRS"
api_framework: "FastAPI with async/await"
database_strategy: "Hybrid Database Architecture"
  relational: "MySQL 8.0+ with SQLAlchemy 2.0"
  graph: "Neo4j with py2neo/neo4j-driver"
  caching: "Redis for application and session caching"
authentication: "JWT with FastAPI-Users"
mcp_integration: "FastAPI-MCP for model context protocol"

performance_strategy:
  async_architecture: "Full async/await implementation"
  database_optimization: "Connection pooling and query optimization"
  graph_optimization: "Cypher query optimization and indexing"
  caching_layers: "Multi-level caching (Redis + in-memory)"
  background_processing: "Celery for async tasks"
```

### **Database Architecture Decisions**

#### **MySQL (Relational Data)**
- **Use Case**: Structured data, transactions, ACID compliance
- **Pattern**: Repository pattern with SQLAlchemy async ORM
- **Optimization**: Connection pooling, query optimization, indexing
- **Hosting**: Hosted MySQL with connection optimization

#### **Neo4j (Graph Data)**
- **Use Case**: Relationships, recommendations, social graphs
- **Pattern**: Graph service layer with Cypher queries
- **Optimization**: Constraint and index optimization
- **Integration**: Synchronized with MySQL for hybrid queries

#### **Redis (Caching)**
- **Use Case**: Session storage, API caching, pub/sub
- **Pattern**: Cache-aside pattern with TTL management
- **Optimization**: Memory optimization and eviction policies

### **API Architecture**

```python
api_design:
  pattern: "RESTful with OpenAPI documentation"
  versioning: "URL versioning (/api/v1/)"
  authentication: "JWT bearer tokens"
  validation: "Pydantic models with automatic validation"
  error_handling: "Structured error responses"
  rate_limiting: "Redis-based rate limiting"
  cors: "Configurable CORS for frontend integration"
```

### **Security Architecture**

```yaml
security_framework:
  authentication: "JWT with refresh token rotation"
  authorization: "Role-based access control (RBAC)"
  password_security: "bcrypt hashing with salt"
  input_validation: "Pydantic validation and sanitization"
  sql_injection: "SQLAlchemy ORM protection"
  xss_protection: "Response sanitization"
  rate_limiting: "API endpoint rate limiting"
  cors_policy: "Strict CORS configuration"
```

### **FastAPI-MCP Integration Strategy**

```yaml
mcp_architecture:
  integration_pattern: "Service layer integration"
  use_cases:
    - "Content analysis and classification"
    - "Intelligent recommendation generation"
    - "Natural language query processing"
    - "Context-aware response enhancement"
  implementation:
    - "Async MCP client wrapper"
    - "Error handling and fallback strategies"
    - "Performance monitoring and optimization"
    - "Context management and state handling"
```

## 🚀 **System Integration Architecture**

### **Component Integration**

```mermaid
graph TB
    subgraph "API Layer"
        A[FastAPI Application] --> B[Authentication Middleware]
        B --> C[Rate Limiting Middleware]
        C --> D[API Endpoints]
    end
    
    subgraph "Service Layer"
        D --> E[Business Logic Services]
        E --> F[MCP Integration Service]
        E --> G[Graph Analytics Service]
    end
    
    subgraph "Data Layer"
        E --> H[MySQL Repository]
        G --> I[Neo4j Graph Service]
        F --> J[Redis Cache Service]
    end
    
    subgraph "External Services"
        F --> K[FastAPI-MCP Server]
        L[Background Tasks] --> M[Celery Workers]
    end
    
    H --> N[Hosted MySQL]
    I --> O[Neo4j Cluster]
    J --> P[Redis Cluster]
```

### **Deployment Architecture**

```yaml
deployment_strategy:
  containerization: "Docker with multi-stage builds"
  orchestration: "Kubernetes with horizontal pod autoscaling"
  load_balancing: "Nginx reverse proxy with SSL termination"
  monitoring: "OpenTelemetry with Prometheus and Grafana"
  logging: "Structured logging with centralized collection"
  
database_deployment:
  mysql: "Hosted MySQL with read replicas"
  neo4j: "Neo4j cluster with high availability"
  redis: "Redis cluster with persistence"
  
scaling_strategy:
  horizontal: "Pod autoscaling based on CPU and memory"
  database: "Read replicas and connection pooling"
  caching: "Distributed Redis with sharding"
  background_tasks: "Celery worker scaling"
```

## 📊 **Performance and Quality Standards**

### **Performance Targets**

```yaml
performance_requirements:
  api_response_time: "< 200ms for simple queries"
  graph_query_time: "< 500ms for complex relationships"
  database_connection: "< 50ms connection establishment"
  cache_hit_ratio: "> 85% for frequently accessed data"
  throughput: "1000+ requests/second sustained"
  availability: "99.9% uptime with graceful degradation"
```

### **Quality Gates**

```yaml
quality_standards:
  code_coverage: "> 90% for critical paths"
  type_coverage: "100% Python type hints"
  security_scan: "Zero critical vulnerabilities"
  performance_tests: "Load testing under expected traffic"
  accessibility: "API documentation accessibility"
  documentation: "Complete OpenAPI documentation"
```

## 🔍 **Monitoring and Observability**

### **Observability Strategy**

```yaml
monitoring_architecture:
  metrics: "Prometheus with custom FastAPI metrics"
  tracing: "OpenTelemetry distributed tracing"
  logging: "Structured JSON logging with correlation IDs"
  alerting: "Grafana alerts with PagerDuty integration"
  
healthchecks:
  application: "FastAPI health endpoint"
  databases: "Connection and query validation"
  external_services: "MCP server connectivity"
  dependencies: "Redis and cache validation"
```

### **Error Handling Strategy**

```python
error_handling:
  pattern: "Centralized exception handling"
  logging: "Structured error logging with context"
  user_feedback: "User-friendly error messages"
  monitoring: "Error rate monitoring and alerting"
  recovery: "Graceful degradation strategies"
```

## 🎯 **Success Criteria**

### **Technical Success Metrics**

- All FastAPI endpoints documented and tested
- Hybrid database integration functioning correctly
- MCP integration providing enhanced capabilities
- Performance targets met under load
- Security requirements validated
- Deployment automation functional

### **Business Success Metrics**

- API adoption rate by frontend teams
- Query performance improvements over baseline
- Reduction in development time for new features
- System reliability and uptime targets
- Cost optimization through efficient resource usage

---

**This architecture provides a robust foundation for building scalable FastAPI applications with hybrid database capabilities and AI-enhanced features through MCP integration.**
'''
    
    # AGENTS template for FastAPI
    agents_template = '''---
template: agents_fastapi.md
version: {{agentsVersion}}
generationTriggers: 
  - CLAUDE.md architecture changes
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
technology: FastAPI + Neo4j + MySQL
---

# AGENTS.md - FastAPI Implementation Guide
## Architect Crew Methodology™ Implementation Instructions

**Version**: {{agentsVersion}}  
**Technology**: Python FastAPI + Neo4j + MySQL + FastAPI-MCP  
**Generated**: {{generationDate}}  
**Implementation Type**: Hybrid Database API Development

---

## 🛠️ **Implementation Standards**

### **Project Structure Requirements**

```
project/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI application
│   ├── models/                    # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── base.py
│   │   └── user.py
│   ├── schemas/                   # Pydantic schemas
│   │   ├── __init__.py
│   │   └── user.py
│   ├── services/                  # Business logic
│   │   ├── __init__.py
│   │   └── user_service.py
│   ├── api/                       # API routes
│   │   ├── __init__.py
│   │   ├── dependencies.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── api.py
│   │       └── endpoints/
│   ├── graph/                     # Neo4j graph operations
│   │   ├── __init__.py
│   │   ├── models.py
│   │   └── schemas.py
│   └── core/                      # Core configurations
│       ├── __init__.py
│       ├── config.py
│       ├── database.py
│       ├── security.py
│       └── mcp_client.py
├── tests/
│   ├── unit/
│   ├── integration/
│   └── graph/
├── alembic/                      # Database migrations
├── requirements.txt
├── .env.example
├── Dockerfile
└── docker-compose.yml
```

### **Code Style Standards**

```python
# All Python code must follow these standards:

# 1. Type hints are MANDATORY
from typing import List, Dict, Optional, Any

def process_user_data(user_id: str, data: Dict[str, Any]) -> Optional[User]:
    pass

# 2. Async/await for all I/O operations
async def get_user(db: AsyncSession, user_id: str) -> Optional[User]:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

# 3. Pydantic models for all API schemas
class UserCreate(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "username": "johndoe",
                "password": "securepassword123"
            }
        }

# 4. Dependency injection for all services
def get_user_service(
    db: AsyncSession = Depends(get_db_session),
    graph_db: GraphDatabase = Depends(get_graph_db)
) -> UserService:
    return UserService(db, graph_db)
```

## 🚀 **Development Workflow**

### **Setup and Installation**

```bash
# 1. Environment setup
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# 2. Database setup
docker-compose up -d mysql neo4j redis
python -m alembic upgrade head
python -m app.core.neo4j_setup

# 3. Development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### **Database Migration Workflow**

```bash
# Create new migration
python -m alembic revision --autogenerate -m "Add user table"

# Review generated migration file
# Edit alembic/versions/xxx_add_user_table.py if needed

# Apply migration
python -m alembic upgrade head

# Rollback if needed
python -m alembic downgrade -1
```

### **Neo4j Schema Management**

```python
# app/core/neo4j_setup.py - Run this after changes
def setup_neo4j_constraints_and_indexes():
    graph = Graph(settings.NEO4J_URI, auth=(settings.NEO4J_USERNAME, settings.NEO4J_PASSWORD))
    
    # Always create constraints first
    constraints = [
        "CREATE CONSTRAINT user_id_unique IF NOT EXISTS FOR (u:User) REQUIRE u.user_id IS UNIQUE",
        "CREATE CONSTRAINT interest_name_unique IF NOT EXISTS FOR (i:Interest) REQUIRE i.name IS UNIQUE"
    ]
    
    for constraint in constraints:
        graph.run(constraint)
    
    # Then create indexes
    indexes = [
        "CREATE INDEX user_username_index IF NOT EXISTS FOR (u:User) ON (u.username)",
        "CREATE INDEX interest_category_index IF NOT EXISTS FOR (i:Interest) ON (i.category)"
    ]
    
    for index in indexes:
        graph.run(index)
```

## 📊 **Testing Protocols**

### **Testing Strategy**

```yaml
testing_approach:
  unit_tests: "pytest with async support"
  integration_tests: "TestClient for API testing"
  graph_tests: "Neo4j test database"
  performance_tests: "locust for load testing"
  coverage_target: "> 90% for all modules"
```

### **Test Implementation Patterns**

```python
# tests/conftest.py
import pytest
import asyncio
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from app.main import app
from app.core.database import get_db_session

@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture
async def async_client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.fixture
async def db_session():
    # Use test database
    engine = create_async_engine("sqlite+aiosqlite:///test.db")
    async with AsyncSession(engine) as session:
        yield session

# tests/test_api/test_users.py
@pytest.mark.asyncio
async def test_create_user(async_client: AsyncClient):
    user_data = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "testpassword123"
    }
    
    response = await async_client.post("/api/v1/users/", json=user_data)
    
    assert response.status_code == 201
    assert response.json()["email"] == user_data["email"]
    assert "password" not in response.json()

# tests/test_graph/test_recommendations.py
@pytest.mark.asyncio
async def test_user_recommendations():
    # Setup test graph data
    graph_db = GraphDatabase()
    
    # Create test users and relationships
    user1 = graph_db.create_user_node("user1", {"username": "alice"})
    user2 = graph_db.create_user_node("user2", {"username": "bob"})
    
    # Test recommendations
    recommendations = graph_db.recommend_connections("user1")
    
    assert len(recommendations) >= 0
    assert all("user_id" in rec for rec in recommendations)
```

### **Performance Testing**

```python
# tests/performance/locustfile.py
from locust import HttpUser, task, between

class APIUser(HttpUser):
    wait_time = between(1, 3)
    
    def on_start(self):
        # Login and get token
        response = self.client.post("/api/v1/auth/login", json={
            "username": "testuser",
            "password": "testpass"
        })
        self.token = response.json()["access_token"]
        self.headers = {"Authorization": f"Bearer {self.token}"}
    
    @task(3)
    def get_users(self):
        self.client.get("/api/v1/users/", headers=self.headers)
    
    @task(1)
    def get_recommendations(self):
        self.client.get("/api/v1/users/recommendations", headers=self.headers)
```

## 🔒 **Security Implementation**

### **Authentication and Authorization**

```python
# app/core/security.py
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
    return encoded_jwt

def verify_token(token: str) -> Optional[str]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        username: str = payload.get("sub")
        if username is None:
            return None
        return username
    except JWTError:
        return None

# app/api/dependencies.py
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db_session)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    username = verify_token(token)
    if username is None:
        raise credentials_exception
    
    user = await get_user_by_username(db, username)
    if user is None:
        raise credentials_exception
    
    return user
```

### **Input Validation and Sanitization**

```python
# app/schemas/user.py
from pydantic import BaseModel, EmailStr, Field, validator
import re

class UserCreate(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)
    full_name: Optional[str] = Field(None, max_length=100)
    
    @validator('username')
    def username_alphanumeric(cls, v):
        if not re.match("^[a-zA-Z0-9_]+$", v):
            raise ValueError('Username must be alphanumeric')
        return v
    
    @validator('password')
    def validate_password(cls, v):
        if not re.search(r"[A-Z]", v):
            raise ValueError('Password must contain uppercase letter')
        if not re.search(r"[a-z]", v):
            raise ValueError('Password must contain lowercase letter')
        if not re.search(r"\d", v):
            raise ValueError('Password must contain digit')
        return v
```

## 🚀 **Deployment Process**

### **Container Build Process**

```bash
# Build and deployment workflow

# 1. Run tests
pytest --cov=app --cov-report=html

# 2. Security scanning
safety check
bandit -r app/

# 3. Code quality
black app/ --check
isort app/ --check-only
flake8 app/
mypy app/

# 4. Build container
docker build -t your-app:latest .

# 5. Run container tests
docker-compose -f docker-compose.test.yml up --abort-on-container-exit

# 6. Deploy
docker-compose up -d
```

### **Database Migration in Production**

```bash
# Production deployment script
#!/bin/bash
set -e

echo "Starting production deployment..."

# Backup databases
echo "Creating database backups..."
mysqldump --host=$MYSQL_HOST --user=$MYSQL_USERNAME --password=$MYSQL_PASSWORD $MYSQL_DATABASE > backup_$(date +%Y%m%d_%H%M%S).sql

# Run migrations
echo "Running database migrations..."
python -m alembic upgrade head

# Setup Neo4j
echo "Setting up Neo4j constraints and indexes..."
python -m app.core.neo4j_setup

# Start application
echo "Starting application..."
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

echo "Deployment completed successfully!"
```

## 📊 **Monitoring and Logging**

### **Application Monitoring**

```python
# app/core/monitoring.py
from prometheus_client import Counter, Histogram, Gauge
import time
import functools

# Metrics
REQUEST_COUNT = Counter('requests_total', 'Total requests', ['method', 'endpoint'])
REQUEST_LATENCY = Histogram('request_duration_seconds', 'Request latency')
ACTIVE_CONNECTIONS = Gauge('active_connections', 'Active database connections')

def monitor_requests(func):
    @functools.wraps(func)
    async def wrapper(*args, **kwargs):
        start_time = time.time()
        try:
            result = await func(*args, **kwargs)
            return result
        finally:
            REQUEST_LATENCY.observe(time.time() - start_time)
    return wrapper

# app/main.py
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(title="Your FastAPI App")

# Add Prometheus instrumentation
Instrumentator().instrument(app).expose(app)
```

### **Structured Logging**

```python
# app/core/logging.py
import structlog
import logging.config

LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "json": {
            "format": "%(message)s",
            "class": "pythonjsonlogger.jsonlogger.JsonFormatter",
        },
    },
    "handlers": {
        "default": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "json",
        },
    },
    "loggers": {
        "": {
            "handlers": ["default"],
            "level": "INFO",
            "propagate": False,
        },
    },
}

logging.config.dictConfig(LOGGING_CONFIG)
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()
```

## 🔧 **Quality Gates and Validation**

### **Pre-commit Hooks**

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.3.0
    hooks:
      - id: black
        language_version: python3.11
  
  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort
  
  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8
        args: [--max-line-length=88, --extend-ignore=E203]
  
  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.3.0
    hooks:
      - id: mypy
        additional_dependencies: [types-requests]
```

### **CI/CD Pipeline Requirements**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: testpass
          MYSQL_DATABASE: testdb
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3
      
      neo4j:
        image: neo4j:5.14
        env:
          NEO4J_AUTH: neo4j/testpass
        options: --health-cmd="cypher-shell -u neo4j -p testpass 'RETURN 1'" --health-interval=10s --health-timeout=5s --health-retries=3
      
      redis:
        image: redis:7-alpine
        options: --health-cmd="redis-cli ping" --health-interval=10s --health-timeout=5s --health-retries=3
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install pytest-cov safety bandit
      
      - name: Run security checks
        run: |
          safety check
          bandit -r app/
      
      - name: Run tests
        run: |
          pytest --cov=app --cov-report=xml
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## 🎯 **Implementation Checklist**

### **Required Implementation Steps**

- [ ] **Project Structure**: Create all required directories and files
- [ ] **Environment Configuration**: Setup .env with all required variables
- [ ] **Database Models**: Implement SQLAlchemy models with proper relationships
- [ ] **Graph Models**: Create Neo4j node and relationship models
- [ ] **API Schemas**: Define Pydantic models for all endpoints
- [ ] **Service Layer**: Implement business logic with dependency injection
- [ ] **API Endpoints**: Create FastAPI routes with proper validation
- [ ] **Authentication**: Implement JWT-based authentication system
- [ ] **MCP Integration**: Setup FastAPI-MCP client and integration
- [ ] **Testing**: Write comprehensive tests for all components
- [ ] **Documentation**: Generate OpenAPI documentation
- [ ] **Monitoring**: Setup metrics, logging, and health checks
- [ ] **Deployment**: Create Docker containers and deployment scripts

### **Quality Validation**

- [ ] **Code Coverage**: Achieve >90% test coverage
- [ ] **Type Safety**: 100% type hint coverage
- [ ] **Security**: Pass all security scans
- [ ] **Performance**: Meet response time requirements
- [ ] **Documentation**: Complete API documentation
- [ ] **Monitoring**: All metrics and alerts configured

---

**Follow these implementation guidelines exactly to ensure a robust, scalable FastAPI application with hybrid database architecture and MCP integration.**
'''
    
    # FRS template for FastAPI
    frs_template = '''---
template: frs_fastapi.md
version: {{frsVersion}}
generationTriggers: 
  - AGENTS.md implementation changes
  - app/ source code changes
technology: FastAPI + Neo4j + MySQL
---

# FRS.md - FastAPI Technical Specifications
## Functional Requirements Specification

**Version**: {{frsVersion}}  
**Technology**: Python FastAPI + Neo4j + MySQL + FastAPI-MCP  
**Generated**: {{generationDate}}  
**Implementation Status**: {{implementationStatus}}

---

## 📊 **System Architecture Overview**

### **Technology Stack Analysis**

```yaml
technology_implementation:
  runtime: "Python 3.11+ with asyncio"
  framework: "FastAPI 0.104+ with Uvicorn ASGI server"
  databases:
    relational: "MySQL 8.0+ with SQLAlchemy 2.0 async ORM"
    graph: "Neo4j 5.14+ with py2neo and neo4j-driver"
    cache: "Redis 7+ for caching and sessions"
  integration: "FastAPI-MCP for model context protocol"
  deployment: "Docker containers with Kubernetes orchestration"
```

### **Application Architecture**

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Frontend] --> B[Mobile App]
        B --> C[Third-party APIs]
    end
    
    subgraph "API Gateway"
        D[Nginx Load Balancer] --> E[FastAPI Application]
    end
    
    subgraph "Application Layer"
        E --> F[Authentication Middleware]
        F --> G[Rate Limiting]
        G --> H[API Routes]
        H --> I[Business Logic Services]
    end
    
    subgraph "Data Access Layer"
        I --> J[MySQL Repository]
        I --> K[Neo4j Graph Service]
        I --> L[Redis Cache Service]
        I --> M[MCP Integration Service]
    end
    
    subgraph "Data Storage"
        J --> N[Hosted MySQL Cluster]
        K --> O[Neo4j Database]
        L --> P[Redis Cluster]
        M --> Q[External MCP Server]
    end
    
    subgraph "Infrastructure"
        R[Monitoring] --> S[Logging]
        S --> T[Alerting]
    end
```

## 📊 **Database Specifications**

### **MySQL Schema Design**

```sql
-- Users table with optimized indexing
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_superuser BOOLEAN DEFAULT FALSE,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_users_email (email),
    INDEX idx_users_username (username),
    INDEX idx_users_active (is_active),
    INDEX idx_users_created (created_at),
    FULLTEXT INDEX idx_users_bio (bio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Posts table with relationship to users
CREATE TABLE posts (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(500),
    user_id CHAR(36) NOT NULL,
    category_id CHAR(36),
    published_at TIMESTAMP NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_posts_user (user_id),
    INDEX idx_posts_published (published_at),
    INDEX idx_posts_featured (is_featured),
    INDEX idx_posts_slug (slug),
    INDEX idx_posts_user_published (user_id, published_at),
    FULLTEXT INDEX idx_posts_content (title, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### **Neo4j Graph Schema**

```cypher
// Node constraints and indexes
CREATE CONSTRAINT user_id_unique IF NOT EXISTS FOR (u:User) REQUIRE u.user_id IS UNIQUE;
CREATE CONSTRAINT interest_name_unique IF NOT EXISTS FOR (i:Interest) REQUIRE i.name IS UNIQUE;
CREATE CONSTRAINT tag_name_unique IF NOT EXISTS FOR (t:Tag) REQUIRE t.name IS UNIQUE;

// Performance indexes
CREATE INDEX user_username_index IF NOT EXISTS FOR (u:User) ON (u.username);
CREATE INDEX interest_category_index IF NOT EXISTS FOR (i:Interest) ON (i.category);
CREATE INDEX tag_category_index IF NOT EXISTS FOR (t:Tag) ON (t.category);
CREATE INDEX relationship_created_index IF NOT EXISTS FOR ()-[r:FOLLOWS]-() ON (r.created_at);

// Graph data model
// User nodes
(:User {user_id: string, username: string, full_name: string, created_at: datetime})

// Interest nodes
(:Interest {name: string, category: string, description: string})

// Tag nodes  
(:Tag {name: string, category: string, weight: float})

// Relationships
(:User)-[:FOLLOWS {created_at: datetime, weight: float}]->(:User)
(:User)-[:INTERESTED_IN {strength: float, created_at: datetime}]->(:Interest)
(:User)-[:TAGGED_WITH {relevance: float, created_at: datetime}]->(:Tag)
(:Interest)-[:RELATED_TO {similarity: float}]->(:Interest)
```

## 🚀 **API Specifications**

### **OpenAPI Documentation Structure**

```python
# app/main.py - FastAPI application configuration
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="FastAPI application with hybrid database architecture",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)
```

### **API Endpoint Specifications**

```yaml
api_endpoints:
  authentication:
    - POST /api/v1/auth/login
    - POST /api/v1/auth/register
    - POST /api/v1/auth/refresh
    - POST /api/v1/auth/logout
  
  users:
    - GET /api/v1/users/
    - POST /api/v1/users/
    - GET /api/v1/users/{user_id}
    - PUT /api/v1/users/{user_id}
    - DELETE /api/v1/users/{user_id}
    - GET /api/v1/users/me
    - GET /api/v1/users/recommendations
    - POST /api/v1/users/interests
  
  posts:
    - GET /api/v1/posts/
    - POST /api/v1/posts/
    - GET /api/v1/posts/{post_id}
    - PUT /api/v1/posts/{post_id}
    - DELETE /api/v1/posts/{post_id}
    - GET /api/v1/posts/search
  
  graph:
    - GET /api/v1/graph/connections/{user_id}
    - POST /api/v1/graph/relationships
    - GET /api/v1/graph/recommendations/{user_id}
    - GET /api/v1/graph/analytics/community
  
  health:
    - GET /health
    - GET /ready
    - GET /metrics
```

### **Response Schema Specifications**

```python
# app/schemas/responses.py
from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from datetime import datetime

class UserResponse(BaseModel):
    id: str
    email: str
    username: str
    full_name: Optional[str] = None
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class PostResponse(BaseModel):
    id: str
    title: str
    slug: str
    excerpt: Optional[str] = None
    published_at: Optional[datetime] = None
    is_featured: bool
    author: UserResponse
    created_at: datetime
    
    class Config:
        from_attributes = True

class ConnectionRecommendation(BaseModel):
    user_id: str
    username: str
    full_name: Optional[str]
    common_interests: int
    mutual_connections: int
    recommendation_score: float

class PaginatedResponse(BaseModel):
    items: List[Any]
    total: int
    page: int
    size: int
    pages: int

class ErrorResponse(BaseModel):
    detail: str
    error_code: Optional[str] = None
    timestamp: datetime
    path: str
```

## 📊 **Performance Specifications**

### **Database Performance Metrics**

```yaml
mysql_performance:
  connection_pool_size: 20
  max_overflow: 30
  pool_timeout: 30
  pool_recycle: 3600
  query_timeout: 30
  target_response_time: "< 100ms for simple queries"
  max_connections: 1000

neo4j_performance:
  connection_pool_size: 50
  max_connection_lifetime: 3600
  max_connection_pool_size: 100
  connection_acquisition_timeout: 60
  target_query_time: "< 500ms for complex graph queries"
  
redis_performance:
  max_connections: 100
  connection_pool_size: 20
  socket_timeout: 30
  cache_ttl: 3600
  memory_usage_limit: "2GB"
```

### **API Performance Targets**

```yaml
performance_targets:
  endpoint_response_times:
    simple_get: "< 100ms"
    complex_query: "< 500ms"
    graph_analysis: "< 1000ms"
    authentication: "< 200ms"
  
  throughput:
    concurrent_users: 1000
    requests_per_second: 2000
    peak_load_handling: "5x normal load"
  
  availability:
    uptime_target: "99.9%"
    recovery_time: "< 5 minutes"
    data_durability: "99.999%"
```

## 🔒 **Security Specifications**

### **Authentication Implementation**

```python
# app/core/security.py
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class SecurityConfig:
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

def create_access_token(
    data: dict, 
    expires_delta: Optional[timedelta] = None
) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=SecurityConfig.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(
        to_encode, 
        SecurityConfig.SECRET_KEY, 
        algorithm=SecurityConfig.ALGORITHM
    )
    return encoded_jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
```

### **Input Validation Specifications**

```python
# app/core/validation.py
from pydantic import BaseModel, Field, validator
import re
from typing import List, Optional

class SecurityValidation:
    @staticmethod
    def validate_password(password: str) -> str:
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not re.search(r"[A-Z]", password):
            raise ValueError("Password must contain uppercase letter")
        if not re.search(r"[a-z]", password):
            raise ValueError("Password must contain lowercase letter")
        if not re.search(r"\d", password):
            raise ValueError("Password must contain digit")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            raise ValueError("Password must contain special character")
        return password
    
    @staticmethod
    def validate_username(username: str) -> str:
        if not re.match(r"^[a-zA-Z0-9_]{3,50}$", username):
            raise ValueError("Username must be 3-50 alphanumeric characters")
        return username
    
    @staticmethod
    def sanitize_html(content: str) -> str:
        # Remove potentially dangerous HTML tags
        import html
        return html.escape(content)
```

## 🚀 **Deployment Specifications**

### **Container Configuration**

```dockerfile
# Dockerfile - Multi-stage build
FROM python:3.11-slim as builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Production stage
FROM python:3.11-slim

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder /root/.local /root/.local

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser

# Copy application code
COPY . .
RUN chown -R appuser:appuser /app

USER appuser

# Set environment variables
ENV PATH=/root/.local/bin:$PATH
ENV PYTHONPATH=/app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

EXPOSE 8000

CMD ["gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

### **Kubernetes Deployment**

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fastapi-app
  labels:
    app: fastapi-app
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: fastapi-app
  template:
    metadata:
      labels:
        app: fastapi-app
        version: v1
    spec:
      containers:
      - name: fastapi-app
        image: your-registry/fastapi-app:latest
        ports:
        - containerPort: 8000
        env:
        - name: ENVIRONMENT
          value: "production"
        - name: MYSQL_DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-secrets
              key: mysql-url
        - name: NEO4J_URI
          valueFrom:
            secretKeyRef:
              name: database-secrets
              key: neo4j-uri
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: database-secrets
              key: redis-url
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /ready
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
```

## 📊 **Monitoring and Observability**

### **Metrics Collection**

```python
# app/core/metrics.py
from prometheus_client import Counter, Histogram, Gauge, Info
import time
from functools import wraps

# Define metrics
REQUEST_COUNT = Counter(
    'fastapi_requests_total',
    'Total number of requests',
    ['method', 'endpoint', 'status_code']
)

REQUEST_DURATION = Histogram(
    'fastapi_request_duration_seconds',
    'Request duration in seconds',
    ['method', 'endpoint']
)

DATABASE_CONNECTIONS = Gauge(
    'database_connections_active',
    'Active database connections',
    ['database_type']
)

MCP_REQUESTS = Counter(
    'mcp_requests_total',
    'Total MCP requests',
    ['operation', 'status']
)

APP_INFO = Info('fastapi_app_info', 'Application information')

def monitor_endpoint(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        start_time = time.time()
        status_code = 200
        
        try:
            result = await func(*args, **kwargs)
            return result
        except Exception as e:
            status_code = 500
            raise
        finally:
            duration = time.time() - start_time
            REQUEST_DURATION.labels(
                method=request.method,
                endpoint=request.url.path
            ).observe(duration)
            
            REQUEST_COUNT.labels(
                method=request.method,
                endpoint=request.url.path,
                status_code=status_code
            ).inc()
    
    return wrapper
```

### **Health Check Implementation**

```python
# app/api/v1/endpoints/health.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db_session
from app.graph.models import GraphDatabase
from typing import Dict, Any
import aioredis
from datetime import datetime

router = APIRouter()

@router.get("/health", response_model=Dict[str, Any])
async def health_check(
    db: AsyncSession = Depends(get_db_session)
) -> Dict[str, Any]:
    """Comprehensive health check"""
    health_status = {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
        "services": {}
    }
    
    # Check MySQL
    try:
        result = await db.execute("SELECT 1")
        health_status["services"]["mysql"] = {
            "status": "healthy",
            "response_time_ms": 10  # actual timing would be measured
        }
    except Exception as e:
        health_status["services"]["mysql"] = {
            "status": "unhealthy",
            "error": str(e)
        }
        health_status["status"] = "degraded"
    
    # Check Neo4j
    try:
        graph_db = GraphDatabase()
        graph_db.graph.run("RETURN 1")
        health_status["services"]["neo4j"] = {
            "status": "healthy",
            "response_time_ms": 15
        }
    except Exception as e:
        health_status["services"]["neo4j"] = {
            "status": "unhealthy",
            "error": str(e)
        }
        health_status["status"] = "degraded"
    
    # Check Redis
    try:
        redis = aioredis.from_url("redis://localhost:6379")
        await redis.ping()
        health_status["services"]["redis"] = {
            "status": "healthy",
            "response_time_ms": 5
        }
        await redis.close()
    except Exception as e:
        health_status["services"]["redis"] = {
            "status": "unhealthy",
            "error": str(e)
        }
        health_status["status"] = "degraded"
    
    if health_status["status"] == "degraded":
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=health_status
        )
    
    return health_status

@router.get("/ready")
async def readiness_check():
    """Kubernetes readiness probe"""
    return {"status": "ready"}
```

## 📊 **Testing Specifications**

### **Test Coverage Requirements**

```yaml
testing_requirements:
  unit_tests:
    coverage_target: "> 90%"
    frameworks: ["pytest", "pytest-asyncio"]
    mock_strategy: "unittest.mock for external dependencies"
  
  integration_tests:
    database_tests: "TestClient with test databases"
    api_tests: "Full request/response cycle testing"
    graph_tests: "Neo4j test database with fixtures"
  
  performance_tests:
    load_testing: "locust for API load testing"
    database_performance: "Query execution time validation"
    memory_profiling: "Memory usage monitoring"
  
  security_tests:
    authentication: "JWT token validation"
    authorization: "Role-based access control"
    input_validation: "SQL injection and XSS prevention"
```

### **Test Configuration**

```python
# tests/conftest.py
import pytest
import asyncio
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.core.database import get_db_session
from app.models.base import Base

# Test database URL
TEST_DATABASE_URL = "sqlite+aiosqlite:///./test.db"

@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture
async def async_client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.fixture
async def db_session():
    engine = create_async_engine(TEST_DATABASE_URL)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    
    async with async_session() as session:
        yield session
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
```

---

## 🎯 **Implementation Status**

This technical specification provides the complete blueprint for implementing a FastAPI application with hybrid database architecture. All components are designed to work together seamlessly while maintaining high performance, security, and scalability.

### **Next Steps**

1. **Database Setup**: Configure MySQL, Neo4j, and Redis instances
2. **Application Development**: Implement models, services, and API endpoints
3. **Testing Implementation**: Develop comprehensive test suite
4. **Deployment Configuration**: Setup containerization and orchestration
5. **Monitoring Setup**: Configure metrics, logging, and alerting
6. **Performance Optimization**: Tune database queries and caching

**This specification ensures a production-ready FastAPI application that leverages the full power of hybrid database architecture with modern development practices.**
'''
    
    # Write templates to files
    templates_dir = Path('methodology/templates')
    templates_dir.mkdir(parents=True, exist_ok=True)
    
    (templates_dir / 'CLAUDE.template.md').write_text(claude_template, encoding='utf-8')
    (templates_dir / 'AGENTS.template.md').write_text(agents_template, encoding='utf-8')
    (templates_dir / 'FRS.template.md').write_text(frs_template, encoding='utf-8')

def generate_initial_docs(force: bool):
    """Generate initial RDS.md if it doesn't exist"""
    rds_path = Path('docs/RDS.md')
    
    if not rds_path.exists() or force:
        rds_content = get_fastapi_rds_template()
        rds_path.write_text(rds_content, encoding='utf-8')
        click.echo('📄 Generated initial docs/RDS.md')

def get_fastapi_rds_template() -> str:
    """Get FastAPI-specific RDS template"""
    return f'''# Requirements Document Specification (RDS)
## FastAPI + Neo4j + MySQL Application

**Version**: 1.0.0  
**Date**: {datetime.now().strftime("%Y-%m-%d")}  
**Project**: FastAPI Application  
**Technology**: Python FastAPI + Neo4j + MySQL + FastAPI-MCP

## Project Overview

This document outlines the functional requirements for a modern FastAPI application with hybrid database architecture (Neo4j graph database and MySQL relational database) and MCP integration.

### Primary Objectives

1. **Modern API Development**: Create a high-performance API using FastAPI
2. **Hybrid Database Integration**: Leverage both graph and relational databases
3. **MCP Integration**: Implement Model Context Protocol for enhanced AI capabilities
4. **Real-time Features**: Enable real-time data processing and notifications
5. **Scalable Architecture**: Design for horizontal scaling and high availability

### User Personas

#### **API Consumers**
- **Role**: Frontend developers and third-party integrators
- **Needs**: Well-documented, reliable API endpoints with fast response times
- **Goals**: Integrate seamlessly with the API for various applications

#### **Data Analysts**
- **Role**: Business intelligence and data science teams
- **Needs**: Access to both structured and graph data for analysis
- **Goals**: Extract insights from complex relationships and patterns

#### **System Administrators**
- **Role**: DevOps and infrastructure teams
- **Needs**: Monitoring, logging, and deployment automation
- **Goals**: Maintain system health and ensure high availability

#### **Developers**
- **Role**: Backend development team members
- **Needs**: Clear documentation, testing tools, development workflows
- **Goals**: Implement features efficiently while maintaining code quality

### Functional Requirements

#### **API Endpoints**
- RESTful API design with OpenAPI documentation
- JWT-based authentication and authorization
- Rate limiting and API versioning
- Real-time WebSocket support
- Comprehensive error handling

#### **Database Operations**
- CRUD operations for relational data (MySQL)
- Graph queries and relationship analysis (Neo4j)
- Cross-database transaction coordination
- Data synchronization between databases
- Backup and recovery procedures

#### **MCP Integration**
- Model Context Protocol implementation
- AI-powered content analysis
- Intelligent recommendation systems
- Natural language processing capabilities
- Context-aware responses

#### **Performance Features**
- Async/await throughout the application
- Connection pooling for databases
- Redis caching layer
- Background task processing
- Response compression and optimization

### Non-Functional Requirements

#### **Performance**
- API response time < 200ms for simple queries
- Graph query optimization for complex relationships
- Efficient database connection management
- Horizontal scaling capability

#### **Security**
- JWT token-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- SQL injection and NoSQL injection prevention
- Rate limiting and DDoS protection

#### **Reliability**
- 99.9% uptime availability
- Graceful error handling and recovery
- Database failover capabilities
- Comprehensive logging and monitoring
- Automated testing at all levels

### Success Criteria

- Application deploys successfully with all database connections
- All functional requirements implemented and tested
- Performance benchmarks met under load
- Security requirements validated through testing
- Documentation complete and accessible
- MCP integration functioning correctly
'''

def setup_fastapi_configurations():
    """Setup FastAPI-specific configuration files"""
    # Create requirements.txt
    requirements_content = '''fastapi>=0.104.1
uvicorn[standard]>=0.24.0
sqlalchemy>=2.0.0
alembic>=1.12.0
aioredis>=2.0.0
py2neo>=2021.2.3
neo4j>=5.14.0
fastapi-mcp>=0.1.0
asyncmy>=0.2.8
pydantic>=2.5.0
pydantic-settings>=2.1.0
python-jose[cryptography]>=3.3.0
passlib[bcrypt]>=1.7.4
python-multipart>=0.0.6
requests>=2.31.0
celery>=5.3.0
redis>=5.0.0
gunicorn>=21.2.0
click>=8.1.0
structlog>=23.2.0
opentelemetry-api>=1.21.0
opentelemetry-sdk>=1.21.0
opentelemetry-instrumentation-fastapi>=0.42b0
prometheus-client>=0.19.0
prometheus-fastapi-instrumentator>=6.1.0
pytest>=7.4.0
pytest-asyncio>=0.21.0
httpx>=0.25.0
factory-boy>=3.3.0
pytest-cov>=4.1.0
safety>=2.3.0
bandit>=1.7.0
black>=23.0.0
isort>=5.12.0
flake8>=6.0.0
mypy>=1.3.0
pre-commit>=3.3.0
'''
    
    Path('requirements.txt').write_text(requirements_content.strip(), encoding='utf-8')
    click.echo('📄 Created requirements.txt')
    
    # Create .env.example
    env_example_content = '''# FastAPI Configuration
APP_NAME="FastAPI Application"
APP_VERSION="1.0.0"
ENVIRONMENT="development"
DEBUG=true
API_V1_STR="/api/v1"
SECRET_KEY="your-secret-key-change-in-production"
ACCESS_TOKEN_EXPIRE_MINUTES=30

# MySQL Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=your_database
MYSQL_USERNAME=your_username
MYSQL_PASSWORD=your_password
MYSQL_DATABASE_URL=mysql+asyncmy://${MYSQL_USERNAME}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}

# Neo4j Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your_neo4j_password
NEO4J_DATABASE=neo4j

# Redis Configuration
REDIS_URL=redis://localhost:6379/0

# FastAPI-MCP Configuration
MCP_SERVER_URL=http://localhost:8001
MCP_API_KEY=your-mcp-api-key
MCP_TIMEOUT=30

# CORS Configuration
BACKEND_CORS_ORIGINS=["http://localhost:3000"]

# Logging Configuration
LOG_LEVEL=INFO
LOG_FORMAT=json
'''
    
    Path('.env.example').write_text(env_example_content.strip(), encoding='utf-8')
    click.echo('📄 Created .env.example')

def create_development_scripts():
    """Create development helper scripts"""
    
    # Create app/main.py
    main_py_content = '''#!/usr/bin/env python3
"""
FastAPI Application Entry Point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api import api_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="FastAPI application with hybrid database architecture",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
)

# CORS middleware
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": settings.APP_NAME}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
'''
    
    Path('app/__init__.py').write_text('', encoding='utf-8')
    Path('app/main.py').write_text(main_py_content, encoding='utf-8')
    click.echo('📄 Created app/main.py')
    
    # Create basic config
    config_py_content = '''#!/usr/bin/env python3
"""
Application Configuration
"""

from pydantic_settings import BaseSettings
from typing import List, Optional

class Settings(BaseSettings):
    APP_NAME: str = "FastAPI Application"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # MySQL
    MYSQL_HOST: str = "localhost"
    MYSQL_PORT: int = 3306
    MYSQL_DATABASE: str
    MYSQL_USERNAME: str
    MYSQL_PASSWORD: str
    MYSQL_DATABASE_URL: Optional[str] = None
    
    # Neo4j
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USERNAME: str = "neo4j"
    NEO4J_PASSWORD: str
    NEO4J_DATABASE: str = "neo4j"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # MCP
    MCP_SERVER_URL: str = "http://localhost:8001"
    MCP_API_KEY: str
    MCP_TIMEOUT: int = 30
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = []
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "json"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
'''
    
    Path('app/core/__init__.py').write_text('', encoding='utf-8')
    Path('app/core/config.py').write_text(config_py_content, encoding='utf-8')
    click.echo('📄 Created app/core/config.py')

def display_next_steps():
    """Display next steps for the user"""
    click.echo('\n🎯 Next steps:')
    click.echo('1. Copy .env.example to .env and update configuration')
    click.echo('2. Install dependencies: pip install -r requirements.txt')
    click.echo('3. Update docs/RDS.md with your specific requirements')
    click.echo('4. Run: python -m methodology.generate_claude')
    click.echo('5. Run: python -m methodology.generate_agents')
    click.echo('6. Run: python -m methodology.generate_frs')
    click.echo('7. Start development: uvicorn app.main:app --reload')
    click.echo('8. API docs available at: http://localhost:8000/api/v1/docs')

@methodology.command()
def generate_claude():
    """Generate CLAUDE.md from RDS.md"""
    click.echo('🏗️ Generating CLAUDE.md from RDS.md...')
    
    # Check if RDS.md exists
    rds_path = Path('docs/RDS.md')
    if not rds_path.exists():
        click.echo('❌ docs/RDS.md not found. Run setup first.', err=True)
        return 1
    
    # For now, create a basic CLAUDE.md
    claude_content = '''# CLAUDE.md - FastAPI Architecture Specification
## Generated from RDS.md

This file will be automatically generated based on your RDS.md requirements.

Please use the full methodology generator once implemented.
'''
    
    Path('CLAUDE.md').write_text(claude_content, encoding='utf-8')
    click.echo('✅ CLAUDE.md generated successfully!')
    return 0

@methodology.command()
def generate_agents():
    """Generate AGENTS.md from CLAUDE.md"""
    click.echo('🤖 Generating AGENTS.md from CLAUDE.md...')
    
    # Check if CLAUDE.md exists
    claude_path = Path('CLAUDE.md')
    if not claude_path.exists():
        click.echo('❌ CLAUDE.md not found. Run generate_claude first.', err=True)
        return 1
    
    # For now, create a basic AGENTS.md
    agents_content = '''# AGENTS.md - FastAPI Implementation Guide
## Generated from CLAUDE.md

This file will be automatically generated based on your CLAUDE.md architecture.

Please use the full methodology generator once implemented.
'''
    
    Path('AGENTS.md').write_text(agents_content, encoding='utf-8')
    click.echo('✅ AGENTS.md generated successfully!')
    return 0

@methodology.command()
def generate_frs():
    """Generate FRS.md from implementation analysis"""
    click.echo('📋 Generating FRS.md from implementation analysis...')
    
    # Check if AGENTS.md exists
    agents_path = Path('AGENTS.md')
    if not agents_path.exists():
        click.echo('❌ AGENTS.md not found. Run generate_agents first.', err=True)
        return 1
    
    # For now, create a basic FRS.md
    frs_content = '''# FRS.md - FastAPI Technical Specifications
## Generated from Implementation Analysis

This file will be automatically generated based on your implementation.

Please use the full methodology generator once implemented.
'''
    
    Path('docs/FRS.md').write_text(frs_content, encoding='utf-8')
    click.echo('✅ docs/FRS.md generated successfully!')
    return 0

@methodology.command()
def validate():
    """Validate methodology setup and configuration"""
    click.echo('🔍 Validating methodology setup...')
    
    validation_results = []
    
    # Check required files
    required_files = [
        'docs/RDS.md',
        'CLAUDE.md',
        'AGENTS.md',
        'docs/FRS.md',
        'requirements.txt',
        '.env.example',
        'app/main.py',
        'app/core/config.py'
    ]
    
    for file_path in required_files:
        if Path(file_path).exists():
            validation_results.append(f'✅ {file_path} exists')
        else:
            validation_results.append(f'❌ {file_path} missing')
    
    # Check directory structure
    required_dirs = [
        'app/models',
        'app/schemas', 
        'app/services',
        'app/api/v1/endpoints',
        'app/graph',
        'tests',
        'methodology/templates'
    ]
    
    for dir_path in required_dirs:
        if Path(dir_path).exists():
            validation_results.append(f'✅ {dir_path}/ directory exists')
        else:
            validation_results.append(f'❌ {dir_path}/ directory missing')
    
    # Display results
    for result in validation_results:
        click.echo(result)
    
    # Summary
    failed_checks = [r for r in validation_results if r.startswith('❌')]
    if failed_checks:
        click.echo(f'\n⚠️  {len(failed_checks)} validation(s) failed')
        click.echo('Run "python -m methodology.setup --force" to fix issues')
        return 1
    else:
        click.echo('\n🎉 All validations passed!')
        click.echo('Your FastAPI project is ready for development!')
        return 0

if __name__ == '__main__':
    methodology()
