---
template: agents-python.md
version: {{agentsVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/python/AGENTS.python.md
generatedBy: executor-crew
technology: Python
generationTriggers: 
  - CLAUDE.md architecture changes
  - Python implementation requirements updates
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
---

# AGENTS.md: AI Agent Constitution for Python Application Development

**Version**: {{agentsVersion}}  
**Generated from**: CLAUDE.md architectural specification  
**Date**: {{date}}  
**Technology**: Python

This document provides the **official guidelines and mandatory protocols** for any AI agent contributing to this Python project. **You MUST adhere to all instructions herein.**

## Project Overview

{{pythonProjectOverview}}

**Crucially, all AI agents MUST implement the Python architecture defined in `CLAUDE.md` and document technical specifications in `docs/FRS.md` as implementation proceeds.**

## Python Implementation Requirements

Based on the architecture defined in CLAUDE.md, the following Python implementation requirements are mandatory:

{{pythonImplementationRequirements}}

### Python Standards and Best Practices

1. **Code Style**
   - Follow PEP 8 style guide strictly
   - Use type hints for all function parameters and returns
   - Maximum line length: 88 characters (Black formatter compatible)
   - Use descriptive variable and function names

2. **Project Structure**
   ```
   project_root/
   ├── src/
   │   ├── __init__.py
   │   ├── core/           # Core business logic
   │   ├── utils/          # Utility functions
   │   ├── models/         # Data models
   │   └── services/       # Service layer
   ├── tests/
   │   ├── unit/
   │   ├── integration/
   │   └── fixtures/
   ├── docs/
   ├── requirements/
   │   ├── base.txt
   │   ├── dev.txt
   │   └── prod.txt
   ├── setup.py
   ├── pyproject.toml
   └── README.md
   ```

3. **Dependency Management**
   - Use virtual environments (venv or poetry)
   - Pin all dependencies with exact versions
   - Separate development and production requirements
   - Use `pyproject.toml` for modern Python packaging

### Type Safety and Documentation

{{typeSafetyDocumentation}}

1. **Type Annotations**
   ```python
   from typing import List, Dict, Optional, Union, Tuple
   
   def process_data(
       input_data: List[Dict[str, Any]], 
       config: Optional[Dict[str, str]] = None
   ) -> Tuple[bool, Union[str, Dict[str, Any]]]:
       """
       Process input data according to configuration.
       
       Args:
           input_data: List of data dictionaries
           config: Optional configuration parameters
           
       Returns:
           Tuple of (success, result)
       """
   ```

2. **Docstring Standards**
   - Use Google-style docstrings
   - Include type information in docstrings
   - Document all public functions and classes
   - Include usage examples for complex functions

### Testing Requirements

{{testingRequirements}}

1. **Testing Framework**
   - Use pytest as the primary testing framework
   - Minimum 80% code coverage
   - Use pytest fixtures for test data
   - Mock external dependencies

2. **Test Structure**
   ```python
   # test_module.py
   import pytest
   from unittest.mock import Mock, patch
   
   class TestFeature:
       @pytest.fixture
       def sample_data(self):
           return {"key": "value"}
       
       def test_feature_success(self, sample_data):
           # Test implementation
           assert result == expected
       
       @pytest.mark.parametrize("input,expected", [
           (1, 2),
           (2, 4),
       ])
       def test_feature_parametrized(self, input, expected):
           assert function(input) == expected
   ```

### Error Handling and Logging

{{errorHandlingLogging}}

1. **Exception Handling**
   ```python
   import logging
   from typing import Optional
   
   logger = logging.getLogger(__name__)
   
   class CustomError(Exception):
       """Custom exception for specific errors."""
       pass
   
   def safe_operation(data: dict) -> Optional[str]:
       try:
           result = risky_operation(data)
       except SpecificError as e:
           logger.error(f"Operation failed: {e}")
           raise CustomError(f"Failed to process: {e}") from e
       except Exception as e:
           logger.exception("Unexpected error")
           raise
       else:
           logger.info("Operation completed successfully")
           return result
   ```

2. **Logging Configuration**
   - Use structured logging (structlog or python-json-logger)
   - Log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL
   - Include context in log messages
   - Rotate log files in production

### Performance and Optimization

{{performanceOptimization}}

1. **Code Optimization**
   - Profile before optimizing
   - Use generators for large datasets
   - Implement caching where appropriate
   - Consider async/await for I/O operations

2. **Memory Management**
   - Use context managers for resource handling
   - Implement __slots__ for memory-efficient classes
   - Clean up large objects explicitly
   - Monitor memory usage in production

## Implementation Workflow

**Refer to `CLAUDE.md` for architectural guidance and document all technical decisions in `docs/FRS.md`.**

### Python Development Process

1. **Environment Setup**
   ```bash
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # or
   venv\Scripts\activate  # Windows
   
   # Install dependencies
   pip install -r requirements/dev.txt
   
   # Install pre-commit hooks
   pre-commit install
   ```

2. **Development Workflow**
   - Write tests first (TDD approach)
   - Run tests locally before committing
   - Use pre-commit hooks for code quality
   - Document as you code

3. **Code Quality Tools**
   ```yaml
   # .pre-commit-config.yaml
   repos:
     - repo: https://github.com/psf/black
       rev: 23.1.0
       hooks:
         - id: black
     - repo: https://github.com/PyCQA/flake8
       rev: 6.0.0
       hooks:
         - id: flake8
     - repo: https://github.com/pre-commit/mirrors-mypy
       rev: v1.0.0
       hooks:
         - id: mypy
   ```

### Package Management

{{packageManagement}}

1. **Using Poetry**
   ```toml
   # pyproject.toml
   [tool.poetry]
   name = "project-name"
   version = "0.1.0"
   description = "Project description"
   authors = ["Your Name <email@example.com>"]
   
   [tool.poetry.dependencies]
   python = "^3.9"
   
   [tool.poetry.dev-dependencies]
   pytest = "^7.0"
   black = "^23.0"
   mypy = "^1.0"
   ```

2. **Using setuptools**
   ```python
   # setup.py
   from setuptools import setup, find_packages
   
   setup(
       name="project-name",
       version="0.1.0",
       packages=find_packages(where="src"),
       package_dir={"": "src"},
       python_requires=">=3.9",
   )
   ```

## Security Considerations

{{securityConsiderations}}

1. **Input Validation**
   - Validate all external inputs
   - Use parameterized queries for databases
   - Sanitize user-provided data
   - Implement rate limiting

2. **Secrets Management**
   - Never commit secrets to version control
   - Use environment variables or secret managers
   - Rotate credentials regularly
   - Audit access to sensitive data

## Performance Monitoring

{{performanceMonitoring}}

1. **Metrics Collection**
   - Use prometheus_client for metrics
   - Monitor response times
   - Track error rates
   - Measure resource usage

2. **Profiling Tools**
   - cProfile for CPU profiling
   - memory_profiler for memory analysis
   - py-spy for production profiling
   - line_profiler for line-by-line analysis

## CI/CD Pipeline

{{cicdPipeline}}

```yaml
# .github/workflows/python.yml
name: Python CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.9, 3.10, 3.11]
    
    steps:
    - uses: actions/checkout@v3
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements/dev.txt
    - name: Run tests
      run: |
        pytest --cov=src --cov-report=xml
    - name: Upload coverage
      uses: codecov/codecov-action@v3
```

## Documentation Standards

{{documentationStandards}}

1. **API Documentation**
   - Use Sphinx for documentation generation
   - Write comprehensive README files
   - Include code examples
   - Maintain changelog

2. **Code Comments**
   - Explain why, not what
   - Keep comments up to date
   - Use inline comments sparingly
   - Document complex algorithms

## Deployment Guidelines

{{deploymentGuidelines}}

1. **Container Support**
   ```dockerfile
   # Dockerfile
   FROM python:3.11-slim
   
   WORKDIR /app
   
   COPY requirements/prod.txt .
   RUN pip install --no-cache-dir -r prod.txt
   
   COPY src/ ./src/
   
   CMD ["python", "-m", "src.main"]
   ```

2. **Environment Configuration**
   - Use python-dotenv for environment variables
   - Separate configs for dev/staging/prod
   - Validate configuration on startup
   - Log configuration (without secrets)

## Common Pitfalls to Avoid

1. **Import Issues**
   - Avoid circular imports
   - Use absolute imports
   - Keep __init__.py files minimal
   - Don't use star imports

2. **Memory Leaks**
   - Close file handles properly
   - Clear large data structures
   - Be careful with global variables
   - Monitor long-running processes

3. **Performance Issues**
   - Don't optimize prematurely
   - Profile before optimizing
   - Use appropriate data structures
   - Consider async for I/O-bound tasks

## Agent Collaboration

All agents working on this Python project must:

1. Follow the established project structure
2. Write comprehensive tests for new features
3. Update documentation as code changes
4. Run all quality checks before committing
5. Coordinate through pull requests
6. Document architectural decisions

## Quality Gates

Before any code is merged:

1. All tests must pass
2. Code coverage must meet minimum threshold
3. No linting errors
4. Type checking must pass
5. Documentation must be updated
6. Code review must be completed

---

**Remember**: This document is your contract. Violating these guidelines may result in rejected contributions. Always refer to CLAUDE.md for architectural decisions and update FRS.md with implementation details.