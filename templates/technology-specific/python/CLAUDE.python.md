---
template: claude-python.md
version: {{claudeVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/python/CLAUDE.python.md
generatedBy: architect-crew
technology: Python
generationTriggers:
  - RDS.md changes
  - Python architectural requirements
chainedGeneration:
  - AGENTS.md (from CLAUDE.md architecture)
  - FRS.md (from AGENTS.md implementation)
---

# CLAUDE.md - Python Architecture Definition & AI Collaboration Guide

**Version**: {{claudeVersion}}  
**Date**: {{date}}  
**Generated from**: RDS.md requirements analysis  
**Technology Stack**: Python

This file defines the comprehensive architecture of the Python solution. It aligns with the Architect Crew methodology, where:
- **`docs/RDS.md`** outlines the **functional requirements** and user needs.
- **`docs/FRS.md`** provides the **detailed technical specifications**, including all UML diagrams (Mermaid) and specific implementation blueprints.
- **`CLAUDE.md`** (this file) instructs Claude (and similar AI) on how to interpret these documents, contribute to the architecture, and ensure `AGENTS.md` is correctly aligned.
- **`AGENTS.md`** provides specific, actionable instructions for AI agents performing implementation tasks.

## 1. From RDS → FRS Validation

**Source**: `docs/RDS.md` (What & Why)  
**Ensure**: Every RDS requirement appears in FRS diagrams/contracts.

{{rdsToFrsValidation}}

## 2. Architectural Overview

{{architecturalOverview}}

### Core Architectural Principles

1. **Clean Architecture**
   - Separation of concerns
   - Dependency inversion
   - Domain-driven design
   - Testability first

2. **Python-Specific Patterns**
   - Duck typing advantages
   - Protocol-based interfaces
   - Composition over inheritance
   - Functional programming where appropriate

3. **Scalability Considerations**
   - Horizontal scaling capability
   - Stateless service design
   - Caching strategies
   - Async support for I/O operations

## 3. System Architecture Layers

```mermaid
graph TB
    subgraph "Presentation Layer"
        A[API Gateway] --> B[REST API]
        A --> C[GraphQL API]
        A --> D[CLI Interface]
    end
    
    subgraph "Application Layer"
        B --> E[Controllers]
        C --> E
        D --> F[Commands]
        E --> G[Use Cases]
        F --> G
    end
    
    subgraph "Domain Layer"
        G --> H[Domain Services]
        H --> I[Domain Models]
        H --> J[Domain Events]
        I --> K[Value Objects]
    end
    
    subgraph "Infrastructure Layer"
        H --> L[Repositories]
        L --> M[Database Adapters]
        L --> N[Cache Adapters]
        H --> O[External Services]
        O --> P[API Clients]
    end
```

## 4. Component & Module Breakdown

{{componentModuleBreakdown}}

### Core Modules

1. **Domain Module**
   ```python
   src/
   ├── domain/
   │   ├── __init__.py
   │   ├── models/
   │   │   ├── __init__.py
   │   │   ├── base.py
   │   │   └── {entity}.py
   │   ├── services/
   │   │   ├── __init__.py
   │   │   └── {service}.py
   │   ├── events/
   │   │   ├── __init__.py
   │   │   └── {event}.py
   │   └── exceptions.py
   ```

2. **Application Module**
   ```python
   src/
   ├── application/
   │   ├── __init__.py
   │   ├── use_cases/
   │   │   ├── __init__.py
   │   │   └── {use_case}.py
   │   ├── dto/
   │   │   ├── __init__.py
   │   │   └── {dto}.py
   │   └── interfaces/
   │       ├── __init__.py
   │       └── {interface}.py
   ```

3. **Infrastructure Module**
   ```python
   src/
   ├── infrastructure/
   │   ├── __init__.py
   │   ├── persistence/
   │   │   ├── __init__.py
   │   │   ├── sqlalchemy/
   │   │   └── mongodb/
   │   ├── cache/
   │   │   ├── __init__.py
   │   │   └── redis/
   │   └── external/
   │       ├── __init__.py
   │       └── {service}/
   ```

## 5. Technology Stack

{{technologyStack}}

### Core Technologies

1. **Python Version**: 3.9+ (minimum), 3.11+ (recommended)
2. **Type Checking**: mypy with strict mode
3. **Testing**: pytest with coverage
4. **Linting**: Black, Flake8, isort
5. **Documentation**: Sphinx with autodoc

### Framework Selection

Based on project requirements:

1. **Web Framework Options**
   - FastAPI (high performance, async, automatic OpenAPI)
   - Flask (lightweight, flexible)
   - Django (batteries included, rapid development)

2. **Database Options**
   - SQLAlchemy (SQL databases)
   - Motor (async MongoDB)
   - Redis-py (caching)

3. **Task Queue Options**
   - Celery (distributed tasks)
   - RQ (simple Redis queue)
   - asyncio (lightweight async tasks)

## 6. Design Patterns

{{designPatterns}}

### Creational Patterns

1. **Factory Pattern**
   ```python
   from abc import ABC, abstractmethod
   from typing import Type, Dict
   
   class ServiceFactory:
       _services: Dict[str, Type[Service]] = {}
       
       @classmethod
       def register(cls, name: str, service: Type[Service]):
           cls._services[name] = service
       
       @classmethod
       def create(cls, name: str, **kwargs) -> Service:
           service_class = cls._services.get(name)
           if not service_class:
               raise ValueError(f"Service {name} not registered")
           return service_class(**kwargs)
   ```

2. **Singleton Pattern**
   ```python
   class Singleton:
       _instance = None
       
       def __new__(cls):
           if cls._instance is None:
               cls._instance = super().__new__(cls)
           return cls._instance
   ```

### Structural Patterns

1. **Repository Pattern**
   ```python
   from abc import ABC, abstractmethod
   from typing import List, Optional, Generic, TypeVar
   
   T = TypeVar('T')
   
   class Repository(ABC, Generic[T]):
       @abstractmethod
       async def find_by_id(self, id: str) -> Optional[T]:
           pass
       
       @abstractmethod
       async def find_all(self) -> List[T]:
           pass
       
       @abstractmethod
       async def save(self, entity: T) -> T:
           pass
       
       @abstractmethod
       async def delete(self, id: str) -> bool:
           pass
   ```

2. **Adapter Pattern**
   ```python
   class ExternalServiceAdapter:
       def __init__(self, external_service):
           self._service = external_service
       
       async def perform_operation(self, data: dict) -> dict:
           # Adapt internal format to external
           external_data = self._transform_to_external(data)
           result = await self._service.call(external_data)
           # Adapt external format to internal
           return self._transform_to_internal(result)
   ```

### Behavioral Patterns

1. **Strategy Pattern**
   ```python
   from abc import ABC, abstractmethod
   
   class ProcessingStrategy(ABC):
       @abstractmethod
       def process(self, data: dict) -> dict:
           pass
   
   class Context:
       def __init__(self, strategy: ProcessingStrategy):
           self._strategy = strategy
       
       def execute(self, data: dict) -> dict:
           return self._strategy.process(data)
   ```

## 7. Data Flow Architecture

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant UseCase
    participant Service
    participant Repository
    participant Database
    
    Client->>API: HTTP Request
    API->>UseCase: Execute Command
    UseCase->>Service: Business Logic
    Service->>Repository: Data Operation
    Repository->>Database: SQL/NoSQL Query
    Database-->>Repository: Result
    Repository-->>Service: Domain Object
    Service-->>UseCase: Processed Result
    UseCase-->>API: DTO Response
    API-->>Client: HTTP Response
```

## 8. Error Handling Architecture

{{errorHandlingArchitecture}}

### Exception Hierarchy

```python
class DomainException(Exception):
    """Base exception for domain errors"""
    pass

class ValidationError(DomainException):
    """Raised when validation fails"""
    pass

class NotFoundError(DomainException):
    """Raised when entity not found"""
    pass

class BusinessRuleViolation(DomainException):
    """Raised when business rule is violated"""
    pass

class InfrastructureException(Exception):
    """Base exception for infrastructure errors"""
    pass

class DatabaseException(InfrastructureException):
    """Raised on database errors"""
    pass

class ExternalServiceException(InfrastructureException):
    """Raised on external service errors"""
    pass
```

### Error Response Format

```python
from typing import Optional, List, Dict, Any
from pydantic import BaseModel

class ErrorDetail(BaseModel):
    field: Optional[str] = None
    message: str
    code: str

class ErrorResponse(BaseModel):
    error: str
    message: str
    details: List[ErrorDetail] = []
    trace_id: str
    timestamp: str
```

## 9. Security Architecture

{{securityArchitecture}}

### Authentication & Authorization

1. **JWT-based Authentication**
   ```python
   from typing import Optional
   from datetime import datetime, timedelta
   import jwt
   
   class JWTService:
       def __init__(self, secret: str, algorithm: str = "HS256"):
           self._secret = secret
           self._algorithm = algorithm
       
       def create_token(self, user_id: str, expiry: timedelta) -> str:
           payload = {
               "sub": user_id,
               "exp": datetime.utcnow() + expiry,
               "iat": datetime.utcnow()
           }
           return jwt.encode(payload, self._secret, self._algorithm)
       
       def verify_token(self, token: str) -> Optional[dict]:
           try:
               return jwt.decode(token, self._secret, [self._algorithm])
           except jwt.InvalidTokenError:
               return None
   ```

2. **Permission System**
   ```python
   from enum import Enum
   from typing import Set
   
   class Permission(Enum):
       READ = "read"
       WRITE = "write"
       DELETE = "delete"
       ADMIN = "admin"
   
   class Role:
       def __init__(self, name: str, permissions: Set[Permission]):
           self.name = name
           self.permissions = permissions
       
       def has_permission(self, permission: Permission) -> bool:
           return permission in self.permissions
   ```

### Input Validation

```python
from pydantic import BaseModel, validator
from typing import Optional

class UserCreateDTO(BaseModel):
    username: str
    email: str
    password: str
    
    @validator('username')
    def validate_username(cls, v):
        if len(v) < 3:
            raise ValueError('Username must be at least 3 characters')
        return v
    
    @validator('email')
    def validate_email(cls, v):
        # Email validation logic
        return v
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        return v
```

## 10. Performance Architecture

{{performanceArchitecture}}

### Caching Strategy

```python
from typing import Optional, Callable, Any
from functools import wraps
import asyncio

class CacheService:
    def __init__(self, ttl: int = 300):
        self._cache = {}
        self._ttl = ttl
    
    def cache_key(self, prefix: str, *args, **kwargs) -> str:
        return f"{prefix}:{':'.join(map(str, args))}"
    
    def cached(self, prefix: str):
        def decorator(func: Callable) -> Callable:
            @wraps(func)
            async def wrapper(*args, **kwargs) -> Any:
                key = self.cache_key(prefix, *args)
                
                # Check cache
                if key in self._cache:
                    return self._cache[key]
                
                # Execute function
                result = await func(*args, **kwargs)
                
                # Store in cache
                self._cache[key] = result
                
                # Set TTL
                asyncio.create_task(self._expire_key(key))
                
                return result
            return wrapper
        return decorator
    
    async def _expire_key(self, key: str):
        await asyncio.sleep(self._ttl)
        self._cache.pop(key, None)
```

### Database Query Optimization

```python
from sqlalchemy.orm import selectinload, joinedload
from typing import List

class OptimizedRepository:
    async def find_with_relations(self, id: str) -> Optional[Entity]:
        # Use eager loading to prevent N+1 queries
        query = select(Entity).options(
            selectinload(Entity.related_items),
            joinedload(Entity.category)
        ).where(Entity.id == id)
        
        result = await self._session.execute(query)
        return result.scalar_one_or_none()
    
    async def find_paginated(self, page: int, size: int) -> List[Entity]:
        # Implement pagination for large datasets
        offset = (page - 1) * size
        query = select(Entity).offset(offset).limit(size)
        
        result = await self._session.execute(query)
        return result.scalars().all()
```

## 11. Testing Architecture

{{testingArchitecture}}

### Test Structure

```
tests/
├── unit/
│   ├── domain/
│   ├── application/
│   └── infrastructure/
├── integration/
│   ├── api/
│   ├── database/
│   └── external/
├── e2e/
│   └── scenarios/
├── fixtures/
├── factories/
└── conftest.py
```

### Test Patterns

```python
import pytest
from unittest.mock import Mock, AsyncMock

class TestUserService:
    @pytest.fixture
    def mock_repository(self):
        return AsyncMock()
    
    @pytest.fixture
    def user_service(self, mock_repository):
        return UserService(mock_repository)
    
    @pytest.mark.asyncio
    async def test_create_user_success(self, user_service, mock_repository):
        # Arrange
        user_data = {"username": "test", "email": "test@example.com"}
        mock_repository.save.return_value = User(**user_data)
        
        # Act
        result = await user_service.create_user(user_data)
        
        # Assert
        assert result.username == "test"
        mock_repository.save.assert_called_once()
```

## 12. Deployment Architecture

{{deploymentArchitecture}}

### Container Strategy

```dockerfile
# Multi-stage build
FROM python:3.11-slim as builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.11-slim

WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .

ENV PATH=/root/.local/bin:$PATH

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: python-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: python-app
  template:
    metadata:
      labels:
        app: python-app
    spec:
      containers:
      - name: app
        image: python-app:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

## 13. Monitoring & Observability

{{monitoringObservability}}

### Structured Logging

```python
import structlog
from typing import Any, Dict

logger = structlog.get_logger()

class LoggingMiddleware:
    async def __call__(self, request, call_next):
        request_id = str(uuid.uuid4())
        
        with structlog.contextvars.bind_contextvars(
            request_id=request_id,
            path=request.url.path,
            method=request.method
        ):
            logger.info("request_started")
            
            try:
                response = await call_next(request)
                logger.info("request_completed", status_code=response.status_code)
                return response
            except Exception as e:
                logger.error("request_failed", error=str(e))
                raise
```

### Metrics Collection

```python
from prometheus_client import Counter, Histogram, Gauge

# Define metrics
request_count = Counter('app_requests_total', 'Total requests', ['method', 'endpoint', 'status'])
request_duration = Histogram('app_request_duration_seconds', 'Request duration', ['method', 'endpoint'])
active_connections = Gauge('app_active_connections', 'Active connections')

# Use in application
@request_duration.time()
async def handle_request(request):
    # Process request
    pass
```

## 14. CI/CD Pipeline

{{cicdPipeline}}

### GitHub Actions Workflow

```yaml
name: Python CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Cache dependencies
      uses: actions/cache@v3
      with:
        path: ~/.cache/pip
        key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements/dev.txt
    
    - name: Run linting
      run: |
        black --check src tests
        flake8 src tests
        mypy src
    
    - name: Run tests
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost/test_db
      run: |
        pytest --cov=src --cov-report=xml --cov-report=html
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage.xml
```

## 15. API Documentation

{{apiDocumentation}}

### OpenAPI Integration

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="Python API",
    description="API documentation for Python application",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

class APIResponse(BaseModel):
    """Standard API response model"""
    success: bool
    data: Optional[Any] = None
    error: Optional[str] = None
    
    class Config:
        schema_extra = {
            "example": {
                "success": True,
                "data": {"id": "123", "name": "Example"},
                "error": None
            }
        }
```

## 16. Development Guidelines

### Code Review Checklist

1. **Architecture Compliance**
   - Follows clean architecture principles
   - Respects layer boundaries
   - Uses dependency injection

2. **Code Quality**
   - Type hints present and correct
   - Comprehensive docstrings
   - No code duplication
   - Follows PEP 8

3. **Testing**
   - Unit tests for business logic
   - Integration tests for external dependencies
   - Test coverage > 80%
   - Tests are readable and maintainable

4. **Security**
   - Input validation implemented
   - No hardcoded secrets
   - SQL injection prevention
   - Proper error handling

5. **Performance**
   - No N+1 queries
   - Appropriate use of caching
   - Async where beneficial
   - Resource cleanup

## 17. Migration Strategy

{{migrationStrategy}}

### Database Migrations

```python
# Using Alembic for database migrations
"""create_users_table

Revision ID: 001
Create Date: 2024-01-20
"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.String, primary_key=True),
        sa.Column('username', sa.String(50), nullable=False, unique=True),
        sa.Column('email', sa.String(100), nullable=False, unique=True),
        sa.Column('created_at', sa.DateTime, nullable=False),
        sa.Column('updated_at', sa.DateTime, nullable=False)
    )
    
    op.create_index('idx_users_email', 'users', ['email'])

def downgrade():
    op.drop_index('idx_users_email')
    op.drop_table('users')
```

## Agent Collaboration Instructions

1. **Before Implementation**
   - Review this architecture document thoroughly
   - Check RDS.md for business requirements
   - Verify component boundaries and interfaces

2. **During Implementation**
   - Follow the established patterns
   - Update FRS.md with implementation details
   - Write tests alongside code
   - Document architectural decisions

3. **After Implementation**
   - Ensure all tests pass
   - Update documentation
   - Verify performance requirements
   - Check security compliance

## Success Criteria

1. **Technical Excellence**
   - Clean, maintainable code
   - Comprehensive test coverage
   - Excellent documentation
   - High performance

2. **Architectural Integrity**
   - Follows established patterns
   - Maintains separation of concerns
   - Scalable and extensible
   - Secure by design

3. **Operational Readiness**
   - Easy to deploy
   - Observable and monitorable
   - Graceful error handling
   - Production-ready

---

**Remember**: This architecture is designed for maintainability, scalability, and developer productivity. Every decision should align with these goals while meeting the business requirements defined in RDS.md.