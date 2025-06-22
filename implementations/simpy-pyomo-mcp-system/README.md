# SimPy-Pyomo-MCP Integration System

A comprehensive system that combines discrete event simulation (SimPy) with mathematical optimization (Pyomo) and exposes capabilities through the Model Context Protocol (MCP) using FastAPI-MCP, enabling Large Language Models to assist in planning and event simulation scenarios.

## 🎯 Overview

This system bridges the gap between discrete event simulation and optimization modeling, providing:

- **Discrete Event Simulation** with SimPy for modeling dynamic systems
- **Mathematical Optimization** with Pyomo for decision support
- **LLM Integration** via Model Context Protocol for natural language planning
- **Real-time Coordination** between simulation and optimization
- **Advanced Analytics** with multi-objective and stochastic optimization
- **Production-Ready Architecture** with scalability and reliability

## 🏗️ Architecture

```
SimPy-Pyomo-MCP System
├── LLM Interface (MCP Server)
├── Simulation Engine (SimPy)  
├── Optimization Engine (Pyomo)
├── Integration Bridge
└── Analytics & Reporting
```

### Key Components

- **Simulation Engine**: Advanced SimPy environment with monitoring and optimization triggers
- **Optimization Engine**: Pyomo-based mathematical models with multi-objective support
- **Integration Bridge**: Real-time coordination between simulation and optimization
- **MCP Server**: FastAPI-MCP server exposing planning tools for LLM interaction
- **Analytics**: Comprehensive analysis, reporting, and visualization capabilities

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Redis (for caching and task queues)
- Optional: Commercial solvers (Gurobi, CPLEX) for advanced optimization

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DementedWeasel1971/storybook.git
   cd storybook/implementations/simpy-pyomo-mcp-system
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   
   # For development
   pip install -r requirements-dev.txt
   ```

4. **Install solvers (optional):**
   ```bash
   # Install GLPK (open source)
   sudo apt-get install glpk-utils  # Ubuntu/Debian
   # Or: brew install glpk  # macOS
   
   # For commercial solvers, follow vendor instructions
   ```

### Running the System

1. **Start Redis:**
   ```bash
   redis-server
   ```

2. **Run the MCP Server:**
   ```bash
   python -m simpy_pyomo_mcp.api.main
   ```

3. **Access the API:**
   - FastAPI docs: http://localhost:8000/docs
   - Health check: http://localhost:8000/health

## 📋 Usage Examples

### Creating a Manufacturing Scenario

```python
from simpy_pyomo_mcp.mcp.tools.simulation_tools import create_advanced_scenario

# Define manufacturing scenario
scenario_config = {
    'scenario_name': 'production_line',
    'scenario_type': 'manufacturing',
    'duration': 480.0,  # 8 hours
    'entities': {
        'machines': [
            {'id': 'M1', 'capacity': 10, 'efficiency': 0.95},
            {'id': 'M2', 'capacity': 8, 'efficiency': 0.90}
        ],
        'products': [
            {'id': 'P1', 'demand': 100, 'priority': 1},
            {'id': 'P2', 'demand': 80, 'priority': 2}
        ]
    },
    'resources': {
        'machine_capacities': {'M1': 10, 'M2': 8},
        'processing_times': {
            ('P1', 'M1'): 2.0,
            ('P1', 'M2'): 2.5,
            ('P2', 'M1'): 1.5,
            ('P2', 'M2'): 2.0
        }
    },
    'optimization_config': {
        'objectives': ['minimize_cost', 'maximize_throughput'],
        'constraints': [
            {'type': 'capacity', 'resources': ['M1', 'M2']},
            {'type': 'demand', 'products': ['P1', 'P2']}
        ]
    }
}

# Create scenario
result = await create_advanced_scenario(**scenario_config)
scenario_id = result['scenario_id']
```

### Running Multi-Objective Optimization

```python
from simpy_pyomo_mcp.mcp.tools.optimization_tools import run_multi_objective_optimization

# Run multi-objective optimization
opt_result = await run_multi_objective_optimization(
    scenario_id=scenario_id,
    objectives=['minimize_cost', 'maximize_throughput'],
    weights={'minimize_cost': 0.6, 'maximize_throughput': 0.4},
    solver='glpk'
)

print(f"Optimization status: {opt_result['result']['status']}")
print(f"Objective value: {opt_result['result']['objective_value']}")
```

### Natural Language Planning via MCP

```json
{
  "tool": "create_simulation_scenario",
  "parameters": {
    "scenario_name": "Hospital Emergency Department",
    "scenario_type": "healthcare",
    "duration": 1440,
    "parameters": {
      "arrival_rate": 0.5,
      "service_rate": 0.7,
      "num_doctors": 3,
      "num_nurses": 5
    }
  }
}
```

## 🔧 Configuration

### System Configuration

```yaml
# config/production.yaml
system:
  max_concurrent_simulations: 10
  max_concurrent_optimizations: 20
  default_simulation_timeout: 3600
  default_optimization_timeout: 300
  
redis:
  url: "redis://localhost:6379"
  
logging:
  level: "INFO"
  format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
  
solvers:
  default: "glpk"
  available: ["glpk", "cbc", "gurobi", "cplex"]
  timeouts:
    glpk: 300
    cbc: 600
    gurobi: 1800
```

### Solver Configuration

```yaml
# config/solvers.yaml
solvers:
  glpk:
    executable: "glpsol"
    options:
      tmlim: 300
      mipgap: 0.01
      
  cbc:
    executable: "cbc"
    options:
      seconds: 600
      ratio: 0.01
      
  gurobi:
    options:
      TimeLimit: 1800
      MIPGap: 0.01
      Threads: 4
```

## 🧪 Testing

### Run Tests

```bash
# All tests
pytest

# Unit tests only
pytest tests/unit/

# Integration tests
pytest tests/integration/

# Performance benchmarks
pytest tests/ -m performance

# With coverage
pytest --cov=simpy_pyomo_mcp --cov-report=html
```

### Test Categories

- **Unit Tests**: Individual component testing
- **Integration Tests**: End-to-end workflow testing
- **Performance Tests**: Scalability and benchmark testing
- **Scenario Tests**: Real-world use case validation

## 📊 Features

### Simulation Capabilities

- **Advanced SimPy Environment** with monitoring and checkpointing
- **Resource Management** with utilization tracking
- **Process Modeling** with optimization integration points
- **Real-time Simulation** with wall-clock synchronization
- **Stochastic Modeling** with uncertainty handling

### Optimization Features

- **Multi-objective Optimization** with Pareto frontier generation
- **Stochastic Programming** with scenario-based approaches
- **Robust Optimization** for uncertainty management
- **Dynamic Optimization** with rolling horizon strategies
- **Sensitivity Analysis** for parameter evaluation

### MCP Integration

- **Natural Language Interface** for scenario creation
- **LLM-Assisted Planning** with intelligent recommendations
- **Real-time Analysis** with interactive optimization
- **Comprehensive Reporting** with visualization
- **Scenario Comparison** across multiple alternatives

### Analytics and Visualization

- **Performance Metrics** with real-time monitoring
- **Interactive Dashboards** with Plotly/Streamlit
- **Automated Reports** in multiple formats
- **Statistical Analysis** with confidence intervals
- **Optimization Insights** with sensitivity analysis

## 🏗️ Development

### Project Structure

```
src/simpy_pyomo_mcp/
├── simulation/          # SimPy simulation engine
│   ├── core/           # Core simulation components
│   ├── models/         # Simulation models
│   └── metrics/        # Performance metrics
├── optimization/       # Pyomo optimization engine
│   ├── core/          # Core optimization components
│   ├── problems/      # Problem-specific models
│   └── utils/         # Optimization utilities
├── integration/       # SimPy-Pyomo bridge
├── api/              # FastAPI endpoints
│   ├── routes/       # API routes
│   ├── models/       # Data models
│   └── middleware/   # Middleware components
├── mcp/              # MCP server implementation
│   ├── tools/        # MCP tool definitions
│   └── utils/        # MCP utilities
└── utils/            # General utilities
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run the test suite: `pytest`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Quality

```bash
# Format code
black src/ tests/

# Sort imports
isort src/ tests/

# Type checking
mypy src/

# Linting
flake8 src/ tests/

# Run all quality checks
pre-commit run --all-files
```

## 📚 Documentation

- **Architecture Guide**: [docs/architecture.md](docs/architecture.md)
- **API Reference**: [docs/api/](docs/api/)
- **Tutorial**: [docs/tutorials/](docs/tutorials/)
- **Examples**: [docs/examples/](docs/examples/)

## 🔒 Security

- **Authentication**: JWT-based authentication with role-based access
- **Authorization**: Fine-grained permissions for different user roles
- **Input Validation**: Comprehensive input sanitization and validation
- **Rate Limiting**: API rate limiting to prevent abuse
- **Audit Logging**: Complete audit trail for all operations

## 📈 Performance

### Benchmarks

- **Simulation**: 10,000+ entities efficiently processed
- **Optimization**: Sub-second solve times for small problems
- **Concurrent Processing**: 10+ simultaneous scenarios
- **Memory Usage**: Optimized for large-scale deployments
- **Response Times**: Sub-30s for most MCP tool calls

### Scalability

- **Horizontal Scaling**: Multi-instance deployment support
- **Caching**: Redis-based result caching
- **Load Balancing**: Multiple worker processes
- **Resource Management**: Automatic cleanup and monitoring

## 🐛 Troubleshooting

### Common Issues

1. **Solver Not Found**: Ensure GLPK or other solvers are installed
2. **Redis Connection**: Verify Redis server is running
3. **Memory Issues**: Adjust simulation parameters for large scenarios
4. **Permission Errors**: Check file permissions and user roles

### Debug Mode

```bash
# Enable debug logging
export LOG_LEVEL=DEBUG

# Run with detailed error information
python -m simpy_pyomo_mcp.api.main --debug
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SimPy Team** for the excellent discrete event simulation framework
- **Pyomo Team** for the comprehensive optimization modeling language
- **Anthropic** for the Model Context Protocol specification
- **FastAPI Community** for the modern web framework

## 📞 Support

- **Documentation**: [Project Wiki](https://github.com/DementedWeasel1971/storybook/wiki)
- **Issues**: [GitHub Issues](https://github.com/DementedWeasel1971/storybook/issues)
- **Discussions**: [GitHub Discussions](https://github.com/DementedWeasel1971/storybook/discussions)

---

**Built with ❤️ using the Architect Crew methodology**