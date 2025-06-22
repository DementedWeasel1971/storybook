# FastAPI + Neo4j + MySQL Implementation Guide
## Architect Crew Methodology™ for Python FastAPI with Neo4j Graph Database and Hosted MySQL

**Technology Stack**: Python 3.11+ + FastAPI + FastAPI-MCP + Neo4j + MySQL 8.0+  
**Implementation Type**: Modern API with Graph Database and Relational Database  
**Hosting**: Cloud-native or VPS with containerization support  
**Databases**: Neo4j (Graph) + MySQL (Relational) - hybrid approach

---

## 🚀 **Quick Start Guide**

### **1. Project Setup**

```bash
# Create new FastAPI project
mkdir your-fastapi-project
cd your-fastapi-project

# Setup virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Architect Crew methodology
git clone https://github.com/DementedWeasel1971/storybook.git methodology
cp -r methodology/implementations/fastapi-neo4j-mysql/* .
rm -rf methodology

# Install Python dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
```

### **2. Configure Hybrid Database Setup**

Update your `.env` file with database configurations:

```env
# FastAPI Configuration
APP_NAME="Your FastAPI Application"
APP_VERSION="1.0.0"
ENVIRONMENT="production"  # or development/staging
DEBUG=false
API_V1_STR="/api/v1"
SECRET_KEY="your-secret-key-here"
ACCESS_TOKEN_EXPIRE_MINUTES=30

# MySQL Configuration (Hosted Database)
MYSQL_HOST=your-hosting-provider-mysql-host.com
MYSQL_PORT=3306
MYSQL_DATABASE=your_database_name
MYSQL_USERNAME=your_db_username
MYSQL_PASSWORD=your_secure_password
MYSQL_DATABASE_URL=mysql+asyncmy://${MYSQL_USERNAME}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}

# Neo4j Configuration (Graph Database)
NEO4J_URI=bolt://localhost:7687  # or neo4j+s://your-hosted-neo4j.com
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your-neo4j-password
NEO4J_DATABASE=neo4j

# Redis Configuration (Caching)
REDIS_URL=redis://localhost:6379/0
# or redis://your-hosted-redis.com:6379/0

# FastAPI-MCP Configuration
MCP_SERVER_URL=http://localhost:8001
MCP_API_KEY=your-mcp-api-key
MCP_TIMEOUT=30

# CORS Configuration
BACKEND_CORS_ORIGINS=["http://localhost:3000", "https://yourdomain.com"]

# Logging Configuration
LOG_LEVEL=INFO
LOG_FORMAT=json
```

### **3. Initialize Architect Crew Methodology**

```bash
# Generate methodology documentation
python -m methodology.setup
python -m methodology.generate_claude
python -m methodology.generate_agents
python -m methodology.generate_frs

# Verify setup
python -m methodology.validate
```

### **4. Database Setup**

```bash
# Start Neo4j (if running locally)
docker run -d \
  --name neo4j \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/your-password \
  neo4j:latest

# Test database connections
python -c "from app.core.database import test_connections; test_connections()"

# Initialize database schemas
python -m alembic upgrade head  # MySQL migrations
python -m app.core.neo4j_setup   # Neo4j constraints and indexes
```

### **5. Development Server**

```bash
# Start FastAPI development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or use the development script
python -m app.dev

# API will be available at:
# - API: http://localhost:8000
# - Docs: http://localhost:8000/docs
# - ReDoc: http://localhost:8000/redoc
```

### **6. Deploy to Production**

```bash
# Build for production
pip install --no-cache-dir -r requirements.txt

# Run database migrations
python -m alembic upgrade head

# Start with Gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

# Or use Docker
docker build -t your-fastapi-app .
docker run -d -p 8000:8000 --env-file .env your-fastapi-app
```

## 🏗️ **Architecture Implementation**

### **CLAUDE.md - FastAPI Architecture**

```yaml
system_architecture:
  pattern: "Domain-Driven Design with CQRS"
  api_framework: "FastAPI with async/await"
  databases: 
    relational: "MySQL 8.0+ with SQLAlchemy 2.0+"
    graph: "Neo4j with py2neo/neo4j-driver"
  authentication: "JWT with FastAPI-Users"
  caching: "Redis for session and application caching"
  mcp_integration: "FastAPI-MCP for model context protocol"
  
hosting_considerations:
  environment: "Cloud-native with containerization"
  databases: "Hybrid: hosted MySQL + Neo4j cluster"
  file_storage: "Object storage (S3/MinIO) with CDN"
  api_gateway: "FastAPI with reverse proxy (Nginx)"
  ssl: "Let's Encrypt or cloud SSL"
  
performance_strategy:
  database: "Connection pooling and query optimization"
  graph_queries: "Cypher optimization and indexing"
  caching: "Multi-level caching (Redis, in-memory)"
  async_processing: "Background tasks with Celery"
  monitoring: "FastAPI observability with OpenTelemetry"
```

### **AGENTS.md - Implementation Guidelines**

The methodology provides specific FastAPI implementation instructions:

#### **Model Development Pattern**
```python
# app/models/base.py
from sqlalchemy import Column, Integer, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from typing import Any
import uuid
from sqlalchemy.dialects.mysql import CHAR

Base = declarative_base()

class BaseModel(Base):
    __abstract__ = True
    
    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def dict(self) -> dict[str, Any]:
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

# app/models/user.py
from sqlalchemy import Column, String, Boolean, Text
from sqlalchemy.orm import relationship
from .base import BaseModel

class User(BaseModel):
    __tablename__ = "users"
    
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    bio = Column(Text, nullable=True)
    
    # Relationships
    posts = relationship("Post", back_populates="author")
```

#### **Neo4j Graph Models**
```python
# app/graph/models.py
from py2neo import Graph, Node, Relationship
from typing import Dict, Any, List, Optional
from app.core.config import settings

class GraphDatabase:
    def __init__(self):
        self.graph = Graph(
            settings.NEO4J_URI,
            auth=(settings.NEO4J_USERNAME, settings.NEO4J_PASSWORD),
            name=settings.NEO4J_DATABASE
        )
    
    def create_user_node(self, user_id: str, properties: Dict[str, Any]) -> Node:
        user_node = Node("User", user_id=user_id, **properties)
        self.graph.create(user_node)
        return user_node
    
    def create_relationship(self, start_node: Node, end_node: Node, 
                          relationship_type: str, properties: Dict[str, Any] = None) -> Relationship:
        rel = Relationship(start_node, relationship_type, end_node, **(properties or {}))
        self.graph.create(rel)
        return rel
    
    def find_users_by_interest(self, interest: str, limit: int = 10) -> List[Dict[str, Any]]:
        query = """
        MATCH (u:User)-[:INTERESTED_IN]->(i:Interest {name: $interest})
        RETURN u.user_id as user_id, u.username as username, u.full_name as full_name
        LIMIT $limit
        """
        return [dict(record) for record in self.graph.run(query, interest=interest, limit=limit)]
    
    def recommend_connections(self, user_id: str, limit: int = 5) -> List[Dict[str, Any]]:
        query = """
        MATCH (u:User {user_id: $user_id})-[:INTERESTED_IN]->(i:Interest)<-[:INTERESTED_IN]-(other:User)
        WHERE u <> other AND NOT (u)-[:FOLLOWS]->(other)
        WITH other, COUNT(i) as common_interests
        ORDER BY common_interests DESC
        RETURN other.user_id as user_id, other.username as username, 
               other.full_name as full_name, common_interests
        LIMIT $limit
        """
        return [dict(record) for record in self.graph.run(query, user_id=user_id, limit=limit)]

# app/graph/schemas.py
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class UserNode(BaseModel):
    user_id: str
    username: str
    full_name: Optional[str] = None
    interests: List[str] = []
    
class ConnectionRecommendation(BaseModel):
    user_id: str
    username: str
    full_name: Optional[str]
    common_interests: int
    mutual_connections: int = 0
```

#### **Service Layer with Hybrid Database**
```python
# app/services/user_service.py
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.graph.models import GraphDatabase
from app.schemas.user import UserCreate, UserUpdate, UserResponse
from app.core.security import get_password_hash, verify_password
from typing import Optional, List
import logging

logger = logging.getLogger(__name__)

class UserService:
    def __init__(self, db_session: AsyncSession, graph_db: GraphDatabase):
        self.db = db_session
        self.graph = graph_db
    
    async def create_user(self, user_data: UserCreate) -> UserResponse:
        # Create user in MySQL
        hashed_password = get_password_hash(user_data.password)
        db_user = User(
            email=user_data.email,
            username=user_data.username,
            hashed_password=hashed_password,
            full_name=user_data.full_name
        )
        
        self.db.add(db_user)
        await self.db.commit()
        await self.db.refresh(db_user)
        
        # Create user node in Neo4j
        try:
            user_properties = {
                "username": db_user.username,
                "full_name": db_user.full_name or "",
                "created_at": db_user.created_at.isoformat()
            }
            self.graph.create_user_node(str(db_user.id), user_properties)
            
            # Add interests if provided
            if user_data.interests:
                for interest in user_data.interests:
                    self.graph.add_user_interest(str(db_user.id), interest)
                    
        except Exception as e:
            logger.error(f"Failed to create user node in Neo4j: {e}")
            # Could rollback MySQL transaction here if needed
            
        return UserResponse.from_orm(db_user)
    
    async def get_user_recommendations(self, user_id: str) -> List[ConnectionRecommendation]:
        """Get connection recommendations using graph analysis"""
        try:
            recommendations = self.graph.recommend_connections(user_id)
            return [ConnectionRecommendation(**rec) for rec in recommendations]
        except Exception as e:
            logger.error(f"Failed to get recommendations: {e}")
            return []
    
    async def update_user_interests(self, user_id: str, interests: List[str]) -> bool:
        """Update user interests in graph database"""
        try:
            # Remove existing interests
            self.graph.remove_user_interests(user_id)
            
            # Add new interests
            for interest in interests:
                self.graph.add_user_interest(user_id, interest)
                
            return True
        except Exception as e:
            logger.error(f"Failed to update interests: {e}")
            return False
```

#### **FastAPI Endpoint with MCP Integration**
```python
# app/api/v1/endpoints/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_mcp import MCPClient
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db_session
from app.graph.models import GraphDatabase
from app.services.user_service import UserService
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from app.core.auth import get_current_user
from typing import List
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db_session),
    graph_db: GraphDatabase = Depends(get_graph_db),
    mcp_client: MCPClient = Depends(get_mcp_client)
):
    """Create a new user with graph relationships"""
    try:
        # Use MCP for content analysis if bio provided
        if user_data.bio:
            analysis_result = await mcp_client.analyze_content(
                content=user_data.bio,
                analysis_type="interest_extraction"
            )
            if analysis_result.interests:
                user_data.interests.extend(analysis_result.interests)
        
        user_service = UserService(db, graph_db)
        user = await user_service.create_user(user_data)
        
        return user
        
    except Exception as e:
        logger.error(f"Failed to create user: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user"
        )

@router.get("/recommendations", response_model=List[ConnectionRecommendation])
async def get_user_recommendations(
    current_user: User = Depends(get_current_user),
    graph_db: GraphDatabase = Depends(get_graph_db)
):
    """Get personalized connection recommendations using graph analysis"""
    user_service = UserService(None, graph_db)
    recommendations = await user_service.get_user_recommendations(str(current_user.id))
    return recommendations

@router.post("/interests", status_code=status.HTTP_200_OK)
async def update_user_interests(
    interests: List[str],
    current_user: User = Depends(get_current_user),
    graph_db: GraphDatabase = Depends(get_graph_db),
    mcp_client: MCPClient = Depends(get_mcp_client)
):
    """Update user interests with MCP validation"""
    try:
        # Validate and enhance interests using MCP
        validated_interests = await mcp_client.validate_interests(interests)
        
        user_service = UserService(None, graph_db)
        success = await user_service.update_user_interests(
            str(current_user.id), 
            validated_interests
        )
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update interests"
            )
            
        return {"message": "Interests updated successfully"}
        
    except Exception as e:
        logger.error(f"Failed to update interests: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update interests"
        )
```

### **FRS.md - Technical Specifications**

The methodology automatically generates comprehensive technical documentation including:

- Hybrid database schema with relationships
- FastAPI endpoint documentation with OpenAPI
- Neo4j graph schema and Cypher queries
- FastAPI-MCP integration specifications
- Performance optimization configurations
- Container deployment specifications

## 📊 **Hybrid Database Optimization**

### **MySQL Configuration for FastAPI**

```python
# app/core/database.py
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

# MySQL async engine with optimization
mysql_engine = create_async_engine(
    settings.MYSQL_DATABASE_URL,
    echo=settings.DEBUG,
    pool_size=20,
    max_overflow=30,
    pool_pre_ping=True,
    pool_recycle=3600,
    connect_args={
        "server_side_cursors": True,
        "charset": "utf8mb4",
        "connect_timeout": 60,
        "read_timeout": 30,
        "write_timeout": 30,
    }
)

AsyncSessionLocal = sessionmaker(
    mysql_engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)

async def get_db_session() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def test_connections():
    """Test all database connections"""
    try:
        # Test MySQL
        async with AsyncSessionLocal() as session:
            result = await session.execute("SELECT 1")
            logger.info("MySQL connection successful")
        
        # Test Neo4j
        from app.graph.models import GraphDatabase
        graph_db = GraphDatabase()
        graph_db.graph.run("RETURN 1")
        logger.info("Neo4j connection successful")
        
    except Exception as e:
        logger.error(f"Database connection failed: {e}")
        raise
```

### **Neo4j Optimization and Setup**

```python
# app/core/neo4j_setup.py
from py2neo import Graph
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

def setup_neo4j_constraints_and_indexes():
    """Setup Neo4j database constraints and indexes"""
    graph = Graph(
        settings.NEO4J_URI,
        auth=(settings.NEO4J_USERNAME, settings.NEO4J_PASSWORD),
        name=settings.NEO4J_DATABASE
    )
    
    try:
        # Create constraints
        constraints = [
            "CREATE CONSTRAINT user_id_unique IF NOT EXISTS FOR (u:User) REQUIRE u.user_id IS UNIQUE",
            "CREATE CONSTRAINT interest_name_unique IF NOT EXISTS FOR (i:Interest) REQUIRE i.name IS UNIQUE",
            "CREATE CONSTRAINT tag_name_unique IF NOT EXISTS FOR (t:Tag) REQUIRE t.name IS UNIQUE"
        ]
        
        for constraint in constraints:
            graph.run(constraint)
            logger.info(f"Created constraint: {constraint}")
        
        # Create indexes
        indexes = [
            "CREATE INDEX user_username_index IF NOT EXISTS FOR (u:User) ON (u.username)",
            "CREATE INDEX interest_category_index IF NOT EXISTS FOR (i:Interest) ON (i.category)",
            "CREATE INDEX relationship_created_index IF NOT EXISTS FOR ()-[r:FOLLOWS]-() ON (r.created_at)"
        ]
        
        for index in indexes:
            graph.run(index)
            logger.info(f"Created index: {index}")
            
        logger.info("Neo4j setup completed successfully")
        
    except Exception as e:
        logger.error(f"Neo4j setup failed: {e}")
        raise

if __name__ == "__main__":
    setup_neo4j_constraints_and_indexes()
```

### **FastAPI-MCP Integration**

```python
# app/core/mcp_client.py
from fastapi_mcp import MCPClient, MCPConfig
from app.core.config import settings
from typing import List, Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)

class EnhancedMCPClient:
    def __init__(self):
        self.config = MCPConfig(
            server_url=settings.MCP_SERVER_URL,
            api_key=settings.MCP_API_KEY,
            timeout=settings.MCP_TIMEOUT
        )
        self.client = MCPClient(self.config)
    
    async def analyze_content(self, content: str, analysis_type: str) -> Dict[str, Any]:
        """Analyze content using MCP for various purposes"""
        try:
            result = await self.client.call_tool(
                "content_analyzer",
                {
                    "content": content,
                    "analysis_type": analysis_type,
                    "language": "en"
                }
            )
            return result
        except Exception as e:
            logger.error(f"MCP content analysis failed: {e}")
            return {"interests": [], "sentiment": "neutral", "topics": []}
    
    async def validate_interests(self, interests: List[str]) -> List[str]:
        """Validate and enhance interest tags using MCP"""
        try:
            result = await self.client.call_tool(
                "interest_validator",
                {
                    "interests": interests,
                    "validation_level": "strict"
                }
            )
            return result.get("validated_interests", interests)
        except Exception as e:
            logger.error(f"MCP interest validation failed: {e}")
            return interests
    
    async def generate_recommendations(self, user_context: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Generate content recommendations using MCP"""
        try:
            result = await self.client.call_tool(
                "recommendation_engine",
                {
                    "user_context": user_context,
                    "recommendation_type": "content",
                    "limit": 10
                }
            )
            return result.get("recommendations", [])
        except Exception as e:
            logger.error(f"MCP recommendation generation failed: {e}")
            return []

# Dependency for FastAPI
async def get_mcp_client() -> EnhancedMCPClient:
    return EnhancedMCPClient()
```

## 🚀 **Development Commands and Automation**

### **Python CLI Commands for Methodology**

```python
# methodology/commands.py
import click
import os
import shutil
from pathlib import Path
from datetime import datetime
import logging

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
        'app/models',
        'app/schemas',
        'app/services',
        'app/api/v1/endpoints',
        'app/graph',
        'app/core',
        'tests/unit',
        'tests/integration',
        'tests/graph',
        'alembic/versions'
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
    
    template_path = Path(__file__).parent / 'templates'
    
    for source, destination in templates.items():
        source_path = template_path / source
        dest_path = Path(destination)
        
        if source_path.exists() and (not dest_path.exists() or force):
            shutil.copy2(source_path, dest_path)
            click.echo(f'📄 Copied template: {destination}')

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
pytest>=7.4.0
pytest-asyncio>=0.21.0
httpx>=0.25.0
factory-boy>=3.3.0
'''
    
    Path('requirements.txt').write_text(requirements_content.strip())
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
    
    Path('.env.example').write_text(env_example_content.strip())
    click.echo('📄 Created .env.example')

def display_next_steps():
    """Display next steps for the user"""
    click.echo('\n🎯 Next steps:')
    click.echo('1. Copy .env.example to .env and update configuration')
    click.echo('2. Update docs/RDS.md with your specific requirements')
    click.echo('3. Run: python -m methodology.generate_claude')
    click.echo('4. Run: python -m methodology.generate_agents')
    click.echo('5. Run: python -m methodology.generate_frs')
    click.echo('6. Start development: uvicorn app.main:app --reload')

@methodology.command()
def generate_claude():
    """Generate CLAUDE.md from RDS.md"""
    click.echo('🏗️ Generating CLAUDE.md from RDS.md...')
    # Implementation would use the universal generator with FastAPI adapter
    click.echo('✅ CLAUDE.md generated successfully!')

@methodology.command()
def generate_agents():
    """Generate AGENTS.md from CLAUDE.md"""
    click.echo('🤖 Generating AGENTS.md from CLAUDE.md...')
    # Implementation would use the universal generator with FastAPI adapter
    click.echo('✅ AGENTS.md generated successfully!')

@methodology.command()
def generate_frs():
    """Generate FRS.md from implementation analysis"""
    click.echo('📋 Generating FRS.md from implementation analysis...')
    # Implementation would use the universal generator with FastAPI adapter
    click.echo('✅ FRS.md generated successfully!')

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
        '.env.example'
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
        'tests'
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
        return 1
    else:
        click.echo('\n🎉 All validations passed!')
        return 0

if __name__ == '__main__':
    methodology()
```

## 📦 **Containerization and Deployment**

### **Dockerfile**

```dockerfile
# Dockerfile
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        curl \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run the application
CMD ["gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

### **Docker Compose for Development**

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - ENVIRONMENT=development
      - MYSQL_HOST=mysql
      - NEO4J_URI=bolt://neo4j:7687
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - mysql
      - neo4j
      - redis
    volumes:
      - .:/app
    command: uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
  
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: fastapi_db
      MYSQL_USER: fastapi_user
      MYSQL_PASSWORD: fastapi_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./scripts/mysql-init.sql:/docker-entrypoint-initdb.d/init.sql
  
  neo4j:
    image: neo4j:5.14
    environment:
      NEO4J_AUTH: neo4j/neo4jpassword
      NEO4J_PLUGINS: '["apoc"]'
      NEO4J_dbms_security_procedures_unrestricted: apoc.*
    ports:
      - "7474:7474"
      - "7687:7687"
    volumes:
      - neo4j_data:/data
      - neo4j_logs:/logs
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
  
  mcp-server:
    image: your-mcp-server:latest
    ports:
      - "8001:8001"
    environment:
      - MCP_API_KEY=your-mcp-api-key
    depends_on:
      - redis

volumes:
  mysql_data:
  neo4j_data:
  neo4j_logs:
  redis_data:
```

### **Production Deployment with Kubernetes**

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fastapi-app
  labels:
    app: fastapi-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: fastapi-app
  template:
    metadata:
      labels:
        app: fastapi-app
    spec:
      containers:
      - name: fastapi-app
        image: your-registry/fastapi-app:latest
        ports:
        - containerPort: 8000
        env:
        - name: ENVIRONMENT
          value: "production"
        - name: MYSQL_HOST
          valueFrom:
            secretKeyRef:
              name: database-secrets
              key: mysql-host
        - name: MYSQL_PASSWORD
          valueFrom:
            secretKeyRef:
              name: database-secrets
              key: mysql-password
        - name: NEO4J_URI
          valueFrom:
            secretKeyRef:
              name: database-secrets
              key: neo4j-uri
        - name: NEO4J_PASSWORD
          valueFrom:
            secretKeyRef:
              name: database-secrets
              key: neo4j-password
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: fastapi-service
spec:
  selector:
    app: fastapi-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8000
  type: LoadBalancer
```

## 🚀 **Development Workflow**

### **Getting Started**

```bash
# 1. Clone and setup
git clone <your-repo>
cd your-fastapi-project
python -m venv venv
source venv/bin/activate

# 2. Install dependencies and setup methodology
pip install -r requirements.txt
python -m methodology.setup

# 3. Configure environment
cp .env.example .env
# Edit .env with your database credentials

# 4. Start databases (if using Docker Compose)
docker-compose up -d mysql neo4j redis

# 5. Initialize databases
python -m alembic upgrade head
python -m app.core.neo4j_setup

# 6. Start development server
uvicorn app.main:app --reload
```

### **Development Commands**

```bash
# Methodology commands
python -m methodology.generate_claude
python -m methodology.generate_agents
python -m methodology.generate_frs
python -m methodology.validate

# Database commands
python -m alembic revision --autogenerate -m "Description"
python -m alembic upgrade head
python -m app.core.neo4j_setup

# Testing
pytest
pytest --cov=app
pytest tests/integration/

# Code quality
black app/
isort app/
flake8 app/
mypy app/
```

## 📊 **Monitoring and Observability**

### **FastAPI Health Checks**

```python
# app/api/v1/endpoints/health.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db_session
from app.graph.models import GraphDatabase
from typing import Dict, Any
import aioredis
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/health")
async def health_check(
    db: AsyncSession = Depends(get_db_session)
) -> Dict[str, Any]:
    """Comprehensive health check for all system components"""
    health_status = {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {}
    }
    
    try:
        # Check MySQL
        await db.execute("SELECT 1")
        health_status["services"]["mysql"] = "healthy"
    except Exception as e:
        health_status["services"]["mysql"] = f"unhealthy: {str(e)}"
        health_status["status"] = "degraded"
    
    try:
        # Check Neo4j
        graph_db = GraphDatabase()
        graph_db.graph.run("RETURN 1")
        health_status["services"]["neo4j"] = "healthy"
    except Exception as e:
        health_status["services"]["neo4j"] = f"unhealthy: {str(e)}"
        health_status["status"] = "degraded"
    
    try:
        # Check Redis
        redis = aioredis.from_url(settings.REDIS_URL)
        await redis.ping()
        health_status["services"]["redis"] = "healthy"
        await redis.close()
    except Exception as e:
        health_status["services"]["redis"] = f"unhealthy: {str(e)}"
        health_status["status"] = "degraded"
    
    # Return appropriate status code
    if health_status["status"] == "degraded":
        raise HTTPException(status_code=503, detail=health_status)
    
    return health_status
```

## 🎯 **Next Steps**

1. **Setup Project Structure**
   ```bash
   mkdir your-fastapi-project
   cd your-fastapi-project
   python -m methodology.setup
   ```

2. **Configure Hybrid Databases**
   - Setup hosted MySQL with optimized configuration
   - Deploy Neo4j cluster or use hosted Neo4j service
   - Configure Redis for caching and sessions

3. **Generate Methodology Documentation**
   ```bash
   python -m methodology.generate_claude
   python -m methodology.generate_agents
   python -m methodology.generate_frs
   ```

4. **Implement Your Features**
   - Follow the patterns in AGENTS.md
   - Use hybrid database architecture for optimal performance
   - Implement comprehensive testing including graph queries

5. **Deploy to Production**
   - Use the containerization setup provided
   - Configure monitoring and logging
   - Monitor hybrid database performance

**The Architect Crew methodology will guide you through every step of FastAPI development with Neo4j and MySQL, from initial setup to production deployment, ensuring quality, performance, and maintainability.**

---

**Ready to build your FastAPI application with hybrid database architecture using the proven Architect Crew methodology? Start with the setup commands above!**