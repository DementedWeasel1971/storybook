# Technology-Specific Templates

This directory contains complete Architect Crew methodology templates for different technology stacks. Each template provides the full documentation chain: CLAUDE.md → AGENTS.md → FRS.md.

## Available Templates

### 🐍 Python General Development
**Location**: `python/`
- **[CLAUDE.python.md](python/CLAUDE.python.md)** - Python architecture definition & AI collaboration guide
- **[AGENTS.python.md](python/AGENTS.python.md)** - AI agent constitution for Python development
- **[FRS.python.md](python/FRS.python.md)** - Functional requirements specification for Python projects

**Best for**: General Python applications, CLI tools, libraries, data processing

### 🌶️ Flask Web Framework
**Location**: `flask/`
- **[CLAUDE.flask.md](flask/CLAUDE.flask.md)** - Flask architecture definition & AI collaboration guide
- **[AGENTS.flask.md](flask/AGENTS.flask.md)** - AI agent constitution for Flask development
- **[FRS.flask.md](flask/FRS.flask.md)** - Functional requirements specification for Flask applications

**Best for**: Web applications, REST APIs, microservices, web dashboards

### 🤖 AutoGluon Machine Learning
**Location**: `autogluon/`
- **[CLAUDE.autogluon.md](autogluon/CLAUDE.autogluon.md)** - AutoGluon ML architecture definition & AI collaboration guide
- **[AGENTS.autogluon.md](autogluon/AGENTS.autogluon.md)** - AI agent constitution for AutoGluon ML development
- **[FRS.autogluon.md](autogluon/FRS.autogluon.md)** - Functional requirements specification for AutoGluon projects

**Best for**: AutoML pipelines, machine learning applications, data science projects, MLOps

### 🔬 SimPy-Pyomo-MCP Integration
**Location**: `simpy-pyomo-mcp/`
- **[CLAUDE.simpy-pyomo-mcp.md](simpy-pyomo-mcp/CLAUDE.simpy-pyomo-mcp.md)** - SimPy-Pyomo-MCP architecture definition & AI collaboration guide
- **[AGENTS.simpy-pyomo-mcp.md](simpy-pyomo-mcp/AGENTS.simpy-pyomo-mcp.md)** - AI agent constitution for simulation-optimization development
- **[FRS.simpy-pyomo-mcp.md](simpy-pyomo-mcp/FRS.simpy-pyomo-mcp.md)** - Functional requirements specification for integrated planning systems

**Best for**: Discrete event simulation with optimization, LLM-assisted planning, operations research, smart manufacturing

### 🗺️ Google Maps MCP Service
**Location**: `googlemaps-mcp/`
- **[CLAUDE.googlemaps-mcp.md](googlemaps-mcp/CLAUDE.googlemaps-mcp.md)** - Google Maps API MCP architecture definition & AI collaboration guide
- **[AGENTS.googlemaps-mcp.md](googlemaps-mcp/AGENTS.googlemaps-mcp.md)** - AI agent constitution for Google Maps MCP development
- **[FRS.googlemaps-mcp.md](googlemaps-mcp/FRS.googlemaps-mcp.md)** - Functional requirements specification for location services

**Best for**: Location-based services, mapping applications, geographic data processing, LLM-assisted location queries
**Implementation**: Complete Node.js/TypeScript implementation available in `/googlemaps-mcp-service/`

### 🤖 OpenAI Laravel MCP Service
**Location**: `openai-laravel-mcp/`
- **[CLAUDE.openai-laravel-mcp.md](openai-laravel-mcp/CLAUDE.openai-laravel-mcp.md)** - OpenAI Laravel MCP architecture definition & AI collaboration guide
- **[AGENTS.openai-laravel-mcp.md](openai-laravel-mcp/AGENTS.openai-laravel-mcp.md)** - AI agent constitution for OpenAI Laravel MCP development
- **FRS.openai-laravel-mcp.md** - Functional requirements specification for OpenAI integration (planned)

**Best for**: AI-powered Laravel applications, OpenAI API integration, chat applications, content generation, LLM services

### 🔗 Neo4j Graph Database Integration Templates

#### 🐍 Neo4j Python Integration
**Location**: `neo4j-python/`
- **[CLAUDE.neo4j-python.md](neo4j-python/CLAUDE.neo4j-python.md)** - Neo4j Python architecture definition & AI collaboration guide
- **[AGENTS.neo4j-python.md](neo4j-python/AGENTS.neo4j-python.md)** - AI agent constitution for Neo4j Python development
- **FRS.neo4j-python.md** - Functional requirements specification for graph applications (planned)

**Best for**: Graph-powered Python applications, social networks, recommendation systems, knowledge graphs, fraud detection

#### 🟨 Neo4j JavaScript/Node.js Integration  
**Location**: `neo4j-javascript/`
- **[CLAUDE.neo4j-javascript.md](neo4j-javascript/CLAUDE.neo4j-javascript.md)** - Neo4j JavaScript/Node.js architecture definition & AI collaboration guide
- **[AGENTS.neo4j-javascript.md](neo4j-javascript/AGENTS.neo4j-javascript.md)** - AI agent constitution for Neo4j JavaScript development
- **FRS.neo4j-javascript.md** - Functional requirements specification for graph web applications (planned)

**Best for**: Graph-powered web applications, real-time analytics, TypeScript graph services, GraphQL APIs, Node.js microservices

#### 🤖 Neo4j MCP Service Integration
**Location**: `neo4j-mcp/`
- **[CLAUDE.neo4j-mcp.md](neo4j-mcp/CLAUDE.neo4j-mcp.md)** - Neo4j MCP service architecture definition & AI collaboration guide
- **[AGENTS.neo4j-mcp.md](neo4j-mcp/AGENTS.neo4j-mcp.md)** - AI agent constitution for Neo4j MCP development
- **FRS.neo4j-mcp.md** - Functional requirements specification for LLM-graph integration (planned)

**Best for**: LLM-assisted graph exploration, conversational graph analytics, intelligent graph question-answering, knowledge graph reasoning

## How to Use These Templates

### 1. Choose Your Technology Stack
Select the template that matches your project's primary technology stack.

### 2. Copy Template Files
Copy the three template files (CLAUDE, AGENTS, FRS) to your project root:
```bash
# Example for Flask project
cp templates/technology-specific/flask/CLAUDE.flask.md ./CLAUDE.md
cp templates/technology-specific/flask/AGENTS.flask.md ./AGENTS.md
cp templates/technology-specific/flask/FRS.flask.md ./docs/FRS.md
```

### 3. Replace Template Placeholders
Each template contains placeholders like `{{projectName}}`, `{{date}}`, etc. Replace these with your project-specific values.

### 4. Create RDS.md
Create your requirements document specification in `docs/RDS.md` based on your project needs.

### 5. Follow the Methodology
Use the Architect Crew methodology chain: RDS → CLAUDE → AGENTS → FRS

## Template Features

Each technology-specific template includes:

✅ **Complete Architecture Patterns** - Technology-specific architectural decisions  
✅ **Framework Best Practices** - Industry-standard patterns and conventions  
✅ **Testing Strategies** - Comprehensive testing approaches for the technology  
✅ **Deployment Patterns** - Production-ready deployment configurations  
✅ **Security Guidelines** - Technology-specific security considerations  
✅ **Performance Optimization** - Framework-specific performance patterns  
✅ **CI/CD Integration** - Automated testing and deployment pipelines  
✅ **Cross-References** - Links to related implementations and examples

## Creating New Templates

To create a template for a new technology stack:

1. Study the existing templates to understand the pattern
2. Create three files: `CLAUDE.{tech}.md`, `AGENTS.{tech}.md`, `FRS.{tech}.md`
3. Include technology-specific architectural patterns
4. Add framework-specific best practices and standards
5. Document testing, deployment, and monitoring approaches
6. Update this README to include your new template

## Contributing

When adding new templates:
- Follow the established three-file pattern (CLAUDE, AGENTS, FRS)
- Include comprehensive technology-specific guidance
- Use placeholder variables for customization
- Test the template with a real project
- Update documentation and examples
- Add cross-references to related implementations

## Cross-References

### Related Implementations
- **[/implementations/](../../implementations/)** - Working implementations using these templates
- **[/googlemaps-mcp-service/](../../googlemaps-mcp-service/)** - Complete Google Maps MCP implementation
- **[/apps/design-system/](../../apps/design-system/)** - React Design System implementation

### Methodology Documentation
- **[METHODOLOGY.md](../../METHODOLOGY.md)** - Complete methodology framework
- **[UNIVERSAL-ADAPTATION-GUIDE.md](../UNIVERSAL-ADAPTATION-GUIDE.md)** - Technology adaptation guide
- **[LESSONS-LEARNED.md](../../LESSONS-LEARNED.md)** - Implementation insights

---

**Built with ❤️ using the Architect Crew methodology**