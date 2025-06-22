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

---

**Built with ❤️ using the Architect Crew methodology**