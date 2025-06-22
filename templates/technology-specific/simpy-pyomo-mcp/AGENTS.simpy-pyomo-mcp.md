---
template: agents-simpy-pyomo-mcp.md
version: {{agentsVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/simpy-pyomo-mcp/AGENTS.simpy-pyomo-mcp.md
generatedBy: executor-crew
technology: SimPy-Pyomo-MCP
generationTriggers: 
  - CLAUDE.md architecture changes
  - SimPy-Pyomo-MCP implementation requirements updates
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
---

# AGENTS.md: AI Agent Constitution for SimPy-Pyomo-MCP Integration Development

**Version**: {{agentsVersion}}  
**Generated from**: CLAUDE.md architectural specification  
**Date**: {{date}}  
**Technology**: SimPy (Discrete Event Simulation) + Pyomo (Optimization) + MCP (Model Context Protocol)

This document provides the **official guidelines and mandatory protocols** for any AI agent contributing to this SimPy-Pyomo-MCP integration project. **You MUST adhere to all instructions herein.**

## Project Overview

{{simpyPyomoMcpProjectOverview}}

**Crucially, all AI agents MUST implement the SimPy-Pyomo-MCP integration architecture defined in `CLAUDE.md` and document technical specifications in `docs/FRS.md` as implementation proceeds.**

## SimPy-Pyomo-MCP Implementation Requirements

Based on the architecture defined in CLAUDE.md, the following implementation requirements are mandatory:

{{simpyPyomoMcpImplementationRequirements}}

### Project Structure Standards

1. **Mandatory Project Structure**
   ```
   simpy-pyomo-mcp-system/
   ├── src/
   │   ├── __init__.py
   │   ├── simulation/               # SimPy discrete event simulation
   │   │   ├── __init__.py
   │   │   ├── core/                 # Core simulation engine
   │   │   │   ├── __init__.py
   │   │   │   ├── environment.py    # SimPy environment management
   │   │   │   ├── process.py        # Process definitions
   │   │   │   └── resource.py       # Resource management
   │   │   ├── models/               # Simulation models
   │   │   │   ├── __init__.py
   │   │   │   ├── manufacturing.py  # Manufacturing scenarios
   │   │   │   ├── healthcare.py     # Healthcare scenarios
   │   │   │   └── logistics.py      # Logistics scenarios
   │   │   └── metrics/              # Performance metrics
   │   │       ├── __init__.py
   │   │       ├── collectors.py     # Data collection
   │   │       └── analyzers.py      # Analysis tools
   │   ├── optimization/             # Pyomo optimization models
   │   │   ├── __init__.py
   │   │   ├── core/                 # Core optimization engine
   │   │   │   ├── __init__.py
   │   │   │   ├── models.py         # Abstract model definitions
   │   │   │   ├── solvers.py        # Solver management
   │   │   │   └── constraints.py    # Constraint builders
   │   │   ├── problems/             # Problem-specific models
   │   │   │   ├── __init__.py
   │   │   │   ├── scheduling.py     # Scheduling problems
   │   │   │   ├── allocation.py     # Resource allocation
   │   │   │   └── routing.py        # Routing problems
   │   │   └── utils/                # Optimization utilities
   │   │       ├── __init__.py
   │   │       ├── parameters.py     # Parameter management
   │   │       └── results.py        # Result processing
   │   ├── integration/              # SimPy-Pyomo bridge
   │   │   ├── __init__.py
   │   │   ├── bridge.py             # Main integration bridge
   │   │   ├── coordinator.py        # Simulation-optimization coordinator
   │   │   ├── decision_points.py    # Decision point management
   │   │   └── data_exchange.py      # Data exchange protocols
   │   ├── api/                      # FastAPI endpoints
   │   │   ├── __init__.py
   │   │   ├── main.py               # FastAPI application
   │   │   ├── routes/               # API routes
   │   │   │   ├── __init__.py
   │   │   │   ├── simulation.py     # Simulation endpoints
   │   │   │   ├── optimization.py   # Optimization endpoints
   │   │   │   └── scenarios.py      # Scenario management
   │   │   ├── models/               # API data models
   │   │   │   ├── __init__.py
   │   │   │   ├── requests.py       # Request models
   │   │   │   └── responses.py      # Response models
   │   │   └── middleware/           # Middleware components
   │   │       ├── __init__.py
   │   │       ├── auth.py           # Authentication
   │   │       └── logging.py        # Request logging
   │   ├── mcp/                      # MCP server implementation
   │   │   ├── __init__.py
   │   │   ├── server.py             # MCP server main
   │   │   ├── tools/                # MCP tool definitions
   │   │   │   ├── __init__.py
   │   │   │   ├── simulation_tools.py   # Simulation tools
   │   │   │   ├── optimization_tools.py # Optimization tools
   │   │   │   └── analysis_tools.py     # Analysis tools
   │   │   └── utils/                # MCP utilities
   │   │       ├── __init__.py
   │   │       ├── parsers.py        # Natural language parsing
   │   │       └── formatters.py     # Response formatting
   │   └── utils/                    # General utilities
   │       ├── __init__.py
   │       ├── config.py             # Configuration management
   │       ├── logging.py            # Logging utilities
   │       └── exceptions.py         # Custom exceptions
   ├── models/                       # Predefined models
   │   ├── simulation/               # Simulation model templates
   │   ├── optimization/             # Optimization model templates
   │   └── scenarios/                # Complete scenario definitions
   ├── tests/                        # Test suite
   │   ├── unit/                     # Unit tests
   │   ├── integration/              # Integration tests
   │   └── scenarios/                # Scenario tests
   ├── docs/                         # Documentation
   │   ├── api/                      # API documentation
   │   ├── examples/                 # Usage examples
   │   └── tutorials/                # Tutorial guides
   ├── config/                       # Configuration files
   │   ├── development.yaml          # Development settings
   │   ├── production.yaml           # Production settings
   │   └── solvers.yaml              # Solver configurations
   ├── requirements.txt              # Python dependencies
   ├── pyproject.toml               # Project configuration
   └── docker-compose.yml           # Container orchestration
   ```

2. **Core Dependencies Management**
   ```python
   # requirements.txt - MANDATORY dependencies
   simpy>=4.1.0
   pyomo>=6.9.0
   fastapi>=0.100.0
   fastapi-mcp>=0.1.0
   uvicorn>=0.23.0
   pydantic>=2.0.0
   numpy>=1.24.0
   pandas>=2.0.0
   matplotlib>=3.7.0
   plotly>=5.15.0
   pyyaml>=6.0
   asyncio>=3.4.3
   typing-extensions>=4.7.0
   
   # Optional solvers (install separately)
   # glpk
   # cbc
   # ipopt
   # gurobi (commercial)
   # cplex (commercial)
   ```

### SimPy Simulation Framework Standards

{{simpySimulationFrameworkStandards}}

1. **Core Simulation Engine Implementation**
   ```python
   # src/simulation/core/environment.py
   import simpy
   import numpy as np
   from typing import Dict, Any, Optional, Callable, List
   from dataclasses import dataclass, field
   from enum import Enum
   import logging
   
   class SimulationState(Enum):
       IDLE = "idle"
       RUNNING = "running"
       PAUSED = "paused"
       COMPLETED = "completed"
       ERROR = "error"
   
   @dataclass
   class SimulationConfig:
       """Configuration for simulation environment."""
       name: str
       duration: float
       random_seed: Optional[int] = None
       real_time: bool = False
       logging_level: str = "INFO"
       metrics_collection: bool = True
       optimization_enabled: bool = True
       optimization_frequency: float = 1.0  # hours
       
   class SimulationEnvironment:
       """Enhanced SimPy environment with optimization integration."""
       
       def __init__(self, config: SimulationConfig):
           self.config = config
           self.env = simpy.Environment()
           self.state = SimulationState.IDLE
           self.metrics = {}
           self.resources = {}
           self.processes = {}
           self.optimization_events = []
           
           # Set random seed for reproducibility
           if config.random_seed:
               np.random.seed(config.random_seed)
           
           # Setup logging
           self.logger = logging.getLogger(f"simulation.{config.name}")
           self.logger.setLevel(getattr(logging, config.logging_level))
           
       def add_process(self, name: str, process_func: Callable, *args, **kwargs):
           """Add a process to the simulation."""
           if self.state != SimulationState.IDLE:
               raise ValueError("Cannot add processes to running simulation")
           
           process = self.env.process(process_func(self.env, *args, **kwargs))
           self.processes[name] = process
           self.logger.info(f"Added process: {name}")
           
       def add_resource(self, name: str, capacity: int, **kwargs):
           """Add a resource to the simulation."""
           resource = simpy.Resource(self.env, capacity=capacity, **kwargs)
           self.resources[name] = resource
           self.logger.info(f"Added resource: {name} (capacity: {capacity})")
           return resource
           
       def add_store(self, name: str, capacity: float = float('inf'), **kwargs):
           """Add a store to the simulation."""
           store = simpy.Store(self.env, capacity=capacity, **kwargs)
           self.resources[name] = store
           self.logger.info(f"Added store: {name} (capacity: {capacity})")
           return store
           
       def schedule_optimization(self, optimization_func: Callable, frequency: float):
           """Schedule periodic optimization calls."""
           def optimization_process():
               while True:
                   yield self.env.timeout(frequency)
                   try:
                       result = optimization_func(self.get_current_state())
                       self.apply_optimization_result(result)
                   except Exception as e:
                       self.logger.error(f"Optimization failed: {e}")
           
           if self.config.optimization_enabled:
               self.env.process(optimization_process())
           
       def get_current_state(self) -> Dict[str, Any]:
           """Get current simulation state for optimization."""
           state = {
               'time': self.env.now,
               'resources': {},
               'metrics': self.metrics.copy()
           }
           
           for name, resource in self.resources.items():
               if hasattr(resource, 'count'):
                   state['resources'][name] = {
                       'utilization': resource.count / resource.capacity,
                       'queue_length': len(resource.queue)
                   }
           
           return state
           
       def apply_optimization_result(self, result: Dict[str, Any]):
           """Apply optimization results to simulation."""
           # Implementation depends on specific optimization results
           # This is where Pyomo solutions get applied to SimPy processes
           self.logger.info(f"Applied optimization result: {result}")
           
       def run(self, until: Optional[float] = None) -> Dict[str, Any]:
           """Run the simulation."""
           try:
               self.state = SimulationState.RUNNING
               self.logger.info(f"Starting simulation: {self.config.name}")
               
               until = until or self.config.duration
               self.env.run(until=until)
               
               self.state = SimulationState.COMPLETED
               self.logger.info(f"Simulation completed at time: {self.env.now}")
               
               return self.get_final_results()
               
           except Exception as e:
               self.state = SimulationState.ERROR
               self.logger.error(f"Simulation failed: {e}")
               raise
           
       def get_final_results(self) -> Dict[str, Any]:
           """Get final simulation results."""
           return {
               'duration': self.env.now,
               'state': self.state.value,
               'metrics': self.metrics,
               'resource_utilization': self.get_resource_utilization()
           }
           
       def get_resource_utilization(self) -> Dict[str, float]:
           """Calculate resource utilization statistics."""
           utilization = {}
           for name, resource in self.resources.items():
               if hasattr(resource, 'count'):
                   utilization[name] = resource.count / resource.capacity
           return utilization
   ```

2. **Process Definition Standards**
   ```python
   # src/simulation/core/process.py
   import simpy
   from typing import Dict, Any, Generator, Optional
   from abc import ABC, abstractmethod
   import numpy as np
   
   class SimulationProcess(ABC):
       """Abstract base class for simulation processes."""
       
       def __init__(self, name: str, env: simpy.Environment):
           self.name = name
           self.env = env
           self.metrics = {}
           self.logger = logging.getLogger(f"process.{name}")
           
       @abstractmethod
       def run(self) -> Generator[simpy.Event, None, None]:
           """Main process logic - must be implemented by subclasses."""
           pass
           
       def log_metric(self, metric_name: str, value: Any):
           """Log a metric value with timestamp."""
           if metric_name not in self.metrics:
               self.metrics[metric_name] = []
           self.metrics[metric_name].append({
               'time': self.env.now,
               'value': value
           })
           
       def request_optimization(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
           """Request optimization from Pyomo engine."""
           # This will be implemented by the integration bridge
           pass
   
   class CustomerProcess(SimulationProcess):
       """Example customer process for service systems."""
       
       def __init__(self, name: str, env: simpy.Environment, 
                    arrival_rate: float, service_resource: simpy.Resource):
           super().__init__(name, env)
           self.arrival_rate = arrival_rate
           self.service_resource = service_resource
           self.customers_served = 0
           self.total_wait_time = 0
           
       def run(self) -> Generator[simpy.Event, None, None]:
           """Generate customers at specified arrival rate."""
           while True:
               # Inter-arrival time
               inter_arrival = np.random.exponential(1 / self.arrival_rate)
               yield self.env.timeout(inter_arrival)
               
               # Create customer
               customer_id = self.customers_served + 1
               self.env.process(self.serve_customer(customer_id))
               
       def serve_customer(self, customer_id: int) -> Generator[simpy.Event, None, None]:
           """Serve individual customer."""
           arrival_time = self.env.now
           
           # Request service resource
           with self.service_resource.request() as request:
               yield request
               
               wait_time = self.env.now - arrival_time
               self.total_wait_time += wait_time
               self.log_metric('wait_time', wait_time)
               
               # Service time
               service_time = np.random.exponential(2.0)  # 2 minutes average
               yield self.env.timeout(service_time)
               
               self.customers_served += 1
               self.log_metric('service_time', service_time)
               self.logger.debug(f"Customer {customer_id} served (wait: {wait_time:.2f})")
   
   class ProductionProcess(SimulationProcess):
       """Example production process for manufacturing."""
       
       def __init__(self, name: str, env: simpy.Environment,
                    machines: simpy.Resource, production_rate: float):
           super().__init__(name, env)
           self.machines = machines
           self.production_rate = production_rate
           self.units_produced = 0
           self.optimization_requests = 0
           
       def run(self) -> Generator[simpy.Event, None, None]:
           """Main production loop with optimization integration."""
           while True:
               # Request machine
               with self.machines.request() as request:
                   yield request
                   
                   # Check if optimization is needed
                   if self.env.now % 8.0 < 0.1:  # Every 8 hours
                       optimization_result = self.request_optimization({
                           'current_time': self.env.now,
                           'production_rate': self.production_rate,
                           'units_produced': self.units_produced
                       })
                       
                       if optimization_result:
                           self.apply_optimization(optimization_result)
                   
                   # Production time
                   production_time = np.random.exponential(1 / self.production_rate)
                   yield self.env.timeout(production_time)
                   
                   self.units_produced += 1
                   self.log_metric('production_rate', 1 / production_time)
                   
       def apply_optimization(self, result: Dict[str, Any]):
           """Apply optimization results to production process."""
           if 'new_production_rate' in result:
               old_rate = self.production_rate
               self.production_rate = result['new_production_rate']
               self.logger.info(f"Production rate optimized: {old_rate:.2f} -> {self.production_rate:.2f}")
   ```

### Pyomo Optimization Integration Standards

{{pyomoOptimizationIntegrationStandards}}

1. **Core Optimization Engine**
   ```python
   # src/optimization/core/models.py
   import pyomo.environ as pyo
   from typing import Dict, Any, Optional, List, Union
   from abc import ABC, abstractmethod
   from dataclasses import dataclass
   import numpy as np
   
   @dataclass
   class OptimizationResult:
       """Standardized optimization result structure."""
       status: str
       objective_value: Optional[float]
       variables: Dict[str, Any]
       solve_time: float
       solver_log: str
       
   class OptimizationModel(ABC):
       """Abstract base class for optimization models."""
       
       def __init__(self, name: str):
           self.name = name
           self.model = None
           self.solver = None
           self.result = None
           
       @abstractmethod
       def build_model(self, data: Dict[str, Any]) -> pyo.ConcreteModel:
           """Build the concrete optimization model."""
           pass
           
       @abstractmethod
       def extract_solution(self) -> Dict[str, Any]:
           """Extract solution variables from solved model."""
           pass
           
       def solve(self, data: Dict[str, Any], solver_name: str = 'glpk',
                time_limit: Optional[float] = None) -> OptimizationResult:
           """Solve the optimization problem."""
           import time
           start_time = time.time()
           
           try:
               # Build model
               self.model = self.build_model(data)
               
               # Create solver
               self.solver = pyo.SolverFactory(solver_name)
               if time_limit:
                   self.solver.options['tmlim'] = time_limit
               
               # Solve model
               self.result = self.solver.solve(self.model, tee=False)
               
               # Extract results
               solve_time = time.time() - start_time
               
               if self.result.solver.status == pyo.SolverStatus.ok:
                   if self.result.solver.termination_condition == pyo.TerminationCondition.optimal:
                       return OptimizationResult(
                           status='optimal',
                           objective_value=pyo.value(self.model.objective),
                           variables=self.extract_solution(),
                           solve_time=solve_time,
                           solver_log=str(self.result.solver)
                       )
                   else:
                       return OptimizationResult(
                           status='feasible',
                           objective_value=pyo.value(self.model.objective),
                           variables=self.extract_solution(),
                           solve_time=solve_time,
                           solver_log=str(self.result.solver)
                       )
               else:
                   return OptimizationResult(
                       status='infeasible',
                       objective_value=None,
                       variables={},
                       solve_time=solve_time,
                       solver_log=str(self.result.solver)
                   )
                   
           except Exception as e:
               return OptimizationResult(
                   status='error',
                   objective_value=None,
                   variables={},
                   solve_time=time.time() - start_time,
                   solver_log=str(e)
               )
   
   class ResourceAllocationModel(OptimizationModel):
       """Resource allocation optimization model."""
       
       def build_model(self, data: Dict[str, Any]) -> pyo.ConcreteModel:
           """Build resource allocation model."""
           model = pyo.ConcreteModel()
           
           # Extract data
           resources = data['resources']
           demands = data['demands']
           costs = data.get('costs', {})
           capacities = data.get('capacities', {})
           
           # Sets
           model.Resources = pyo.Set(initialize=resources)
           model.Demands = pyo.Set(initialize=demands)
           
           # Parameters
           model.Cost = pyo.Param(
               model.Resources, model.Demands,
               initialize=lambda model, r, d: costs.get((r, d), 1.0)
           )
           model.Capacity = pyo.Param(
               model.Resources,
               initialize=lambda model, r: capacities.get(r, float('inf'))
           )
           model.Demand = pyo.Param(
               model.Demands,
               initialize=lambda model, d: demands[d]
           )
           
           # Variables
           model.Allocation = pyo.Var(
               model.Resources, model.Demands,
               domain=pyo.NonNegativeReals
           )
           
           # Objective: minimize total cost
           model.objective = pyo.Objective(
               expr=sum(model.Cost[r, d] * model.Allocation[r, d]
                       for r in model.Resources for d in model.Demands),
               sense=pyo.minimize
           )
           
           # Constraints
           # Demand satisfaction
           model.demand_constraint = pyo.Constraint(
               model.Demands,
               rule=lambda model, d: sum(model.Allocation[r, d] 
                                       for r in model.Resources) >= model.Demand[d]
           )
           
           # Capacity constraints
           model.capacity_constraint = pyo.Constraint(
               model.Resources,
               rule=lambda model, r: sum(model.Allocation[r, d] 
                                       for d in model.Demands) <= model.Capacity[r]
           )
           
           return model
           
       def extract_solution(self) -> Dict[str, Any]:
           """Extract allocation solution."""
           if not self.model or not self.result:
               return {}
               
           allocation = {}
           for r in self.model.Resources:
               for d in self.model.Demands:
                   value = pyo.value(self.model.Allocation[r, d])
                   if value > 1e-6:  # Only include non-zero allocations
                       allocation[(r, d)] = value
                       
           return {
               'allocation': allocation,
               'total_cost': pyo.value(self.model.objective)
           }
   
   class SchedulingModel(OptimizationModel):
       """Production scheduling optimization model."""
       
       def build_model(self, data: Dict[str, Any]) -> pyo.ConcreteModel:
           """Build scheduling model."""
           model = pyo.ConcreteModel()
           
           # Extract data
           jobs = data['jobs']
           machines = data['machines']
           processing_times = data['processing_times']
           due_dates = data.get('due_dates', {})
           horizon = data.get('horizon', 100)
           
           # Sets
           model.Jobs = pyo.Set(initialize=jobs)
           model.Machines = pyo.Set(initialize=machines)
           model.TimeSlots = pyo.Set(initialize=range(horizon))
           
           # Parameters
           model.ProcessingTime = pyo.Param(
               model.Jobs, model.Machines,
               initialize=processing_times,
               default=0
           )
           model.DueDate = pyo.Param(
               model.Jobs,
               initialize=due_dates,
               default=horizon
           )
           
           # Variables
           model.Schedule = pyo.Var(
               model.Jobs, model.Machines, model.TimeSlots,
               domain=pyo.Binary
           )
           model.Completion = pyo.Var(
               model.Jobs,
               domain=pyo.NonNegativeReals
           )
           model.Tardiness = pyo.Var(
               model.Jobs,
               domain=pyo.NonNegativeReals
           )
           
           # Objective: minimize total tardiness
           model.objective = pyo.Objective(
               expr=sum(model.Tardiness[j] for j in model.Jobs),
               sense=pyo.minimize
           )
           
           # Constraints
           # Each job assigned to exactly one machine at one time
           model.assignment_constraint = pyo.Constraint(
               model.Jobs,
               rule=lambda model, j: sum(model.Schedule[j, m, t]
                                       for m in model.Machines 
                                       for t in model.TimeSlots) == 1
           )
           
           # Machine capacity (one job per machine per time slot)
           model.capacity_constraint = pyo.Constraint(
               model.Machines, model.TimeSlots,
               rule=lambda model, m, t: sum(model.Schedule[j, m, t]
                                           for j in model.Jobs) <= 1
           )
           
           # Completion time calculation
           model.completion_constraint = pyo.Constraint(
               model.Jobs,
               rule=lambda model, j: model.Completion[j] >= sum(
                   (t + model.ProcessingTime[j, m]) * model.Schedule[j, m, t]
                   for m in model.Machines for t in model.TimeSlots
               )
           )
           
           # Tardiness calculation
           model.tardiness_constraint = pyo.Constraint(
               model.Jobs,
               rule=lambda model, j: model.Tardiness[j] >= 
                   model.Completion[j] - model.DueDate[j]
           )
           
           return model
           
       def extract_solution(self) -> Dict[str, Any]:
           """Extract scheduling solution."""
           if not self.model or not self.result:
               return {}
               
           schedule = {}
           for j in self.model.Jobs:
               for m in self.model.Machines:
                   for t in self.model.TimeSlots:
                       if pyo.value(self.model.Schedule[j, m, t]) > 0.5:
                           schedule[j] = {
                               'machine': m,
                               'start_time': t,
                               'completion_time': pyo.value(self.model.Completion[j])
                           }
                           
           return {
               'schedule': schedule,
               'total_tardiness': pyo.value(self.model.objective)
           }
   ```

### Integration Bridge Standards

{{integrationBridgeStandards}}

1. **SimPy-Pyomo Coordination Bridge**
   ```python
   # src/integration/bridge.py
   import asyncio
   from typing import Dict, Any, Callable, Optional, List
   from dataclasses import dataclass
   import threading
   import queue
   import time
   from enum import Enum
   
   class DecisionType(Enum):
       RESOURCE_ALLOCATION = "resource_allocation"
       SCHEDULING = "scheduling"
       ROUTING = "routing"
       CAPACITY_PLANNING = "capacity_planning"
   
   @dataclass
   class OptimizationRequest:
       """Request for optimization decision."""
       request_id: str
       decision_type: DecisionType
       simulation_time: float
       data: Dict[str, Any]
       priority: int = 1
       timeout: Optional[float] = None
       
   @dataclass
   class OptimizationResponse:
       """Response from optimization engine."""
       request_id: str
       status: str
       solution: Dict[str, Any]
       solve_time: float
       
   class SimulationOptimizationBridge:
       """Bridge between SimPy simulation and Pyomo optimization."""
       
       def __init__(self, max_concurrent_optimizations: int = 5):
           self.optimization_models = {}
           self.request_queue = queue.PriorityQueue()
           self.response_cache = {}
           self.active_requests = {}
           self.max_concurrent = max_concurrent_optimizations
           self.worker_threads = []
           self.running = False
           
       def register_optimization_model(self, decision_type: DecisionType, 
                                     model_class: type):
           """Register an optimization model for a decision type."""
           self.optimization_models[decision_type] = model_class
           
       def start(self):
           """Start the optimization worker threads."""
           self.running = True
           for i in range(self.max_concurrent):
               worker = threading.Thread(target=self._optimization_worker, 
                                       name=f"OptWorker-{i}")
               worker.daemon = True
               worker.start()
               self.worker_threads.append(worker)
               
       def stop(self):
           """Stop all optimization workers."""
           self.running = False
           for worker in self.worker_threads:
               worker.join(timeout=5.0)
               
       def request_optimization(self, request: OptimizationRequest) -> str:
           """Submit optimization request (non-blocking)."""
           priority = request.priority
           self.request_queue.put((priority, time.time(), request))
           return request.request_id
           
       def get_optimization_result(self, request_id: str, 
                                 timeout: Optional[float] = None) -> Optional[OptimizationResponse]:
           """Get optimization result (blocking)."""
           start_time = time.time()
           while True:
               if request_id in self.response_cache:
                   response = self.response_cache.pop(request_id)
                   return response
                   
               if timeout and (time.time() - start_time) > timeout:
                   return None
                   
               time.sleep(0.1)  # Small delay to prevent busy waiting
               
       def _optimization_worker(self):
           """Worker thread for processing optimization requests."""
           while self.running:
               try:
                   # Get request from queue (blocking with timeout)
                   priority, timestamp, request = self.request_queue.get(timeout=1.0)
                   
                   # Process optimization request
                   response = self._process_optimization_request(request)
                   
                   # Store response
                   self.response_cache[request.request_id] = response
                   
                   # Mark task as done
                   self.request_queue.task_done()
                   
               except queue.Empty:
                   continue  # Timeout occurred, check if still running
               except Exception as e:
                   # Handle errors in optimization
                   response = OptimizationResponse(
                       request_id=request.request_id,
                       status='error',
                       solution={},
                       solve_time=0.0
                   )
                   self.response_cache[request.request_id] = response
                   
       def _process_optimization_request(self, request: OptimizationRequest) -> OptimizationResponse:
           """Process a single optimization request."""
           start_time = time.time()
           
           try:
               # Get optimization model
               if request.decision_type not in self.optimization_models:
                   return OptimizationResponse(
                       request_id=request.request_id,
                       status='error',
                       solution={'error': 'Unknown decision type'},
                       solve_time=time.time() - start_time
                   )
               
               model_class = self.optimization_models[request.decision_type]
               model = model_class(f"opt_{request.request_id}")
               
               # Solve optimization problem
               result = model.solve(request.data, time_limit=request.timeout)
               
               return OptimizationResponse(
                   request_id=request.request_id,
                   status=result.status,
                   solution=result.variables,
                   solve_time=result.solve_time
               )
               
           except Exception as e:
               return OptimizationResponse(
                   request_id=request.request_id,
                   status='error',
                   solution={'error': str(e)},
                   solve_time=time.time() - start_time
               )
   
   # Integration helper functions for SimPy processes
   def request_optimization_from_simulation(bridge: SimulationOptimizationBridge,
                                          decision_type: DecisionType,
                                          simulation_time: float,
                                          data: Dict[str, Any],
                                          timeout: float = 30.0) -> Dict[str, Any]:
       """Helper function for SimPy processes to request optimization."""
       import uuid
       
       request_id = str(uuid.uuid4())
       request = OptimizationRequest(
           request_id=request_id,
           decision_type=decision_type,
           simulation_time=simulation_time,
           data=data,
           timeout=timeout
       )
       
       # Submit request
       bridge.request_optimization(request)
       
       # Wait for result
       response = bridge.get_optimization_result(request_id, timeout=timeout)
       
       if response and response.status in ['optimal', 'feasible']:
           return response.solution
       else:
           return {}  # Return empty dict if optimization failed
   ```

### FastAPI-MCP Server Standards

{{fastapiMcpServerStandards}}

1. **Core FastAPI Application**
   ```python
   # src/api/main.py
   from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
   from fastapi.middleware.cors import CORSMiddleware
   from fastapi_mcp import FastApiMCP
   import uvicorn
   from typing import Dict, Any, Optional, List
   import asyncio
   import logging
   
   from ..simulation.core.environment import SimulationEnvironment, SimulationConfig
   from ..optimization.core.models import OptimizationModel
   from ..integration.bridge import SimulationOptimizationBridge
   from .models.requests import *
   from .models.responses import *
   
   # Initialize FastAPI application
   app = FastAPI(
       title="SimPy-Pyomo-MCP Planning System",
       description="Discrete Event Simulation with Optimization and LLM Integration",
       version="1.0.0"
   )
   
   # Add CORS middleware
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],  # Configure appropriately for production
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   
   # Initialize MCP integration
   mcp = FastApiMCP(app)
   
   # Global state management
   class ApplicationState:
       def __init__(self):
           self.simulations: Dict[str, SimulationEnvironment] = {}
           self.optimization_bridge = SimulationOptimizationBridge()
           self.active_scenarios: Dict[str, Dict[str, Any]] = {}
           
       def startup(self):
           """Initialize application state."""
           self.optimization_bridge.start()
           
       def shutdown(self):
           """Cleanup application state."""
           self.optimization_bridge.stop()
   
   app_state = ApplicationState()
   
   @app.on_event("startup")
   async def startup_event():
       app_state.startup()
       
   @app.on_event("shutdown")
   async def shutdown_event():
       app_state.shutdown()
   
   # Dependency injection
   def get_app_state() -> ApplicationState:
       return app_state
   
   # Health check endpoint
   @app.get("/health")
   async def health_check():
       return {"status": "healthy", "service": "simpy-pyomo-mcp"}
   
   # Include routers
   from .routes import simulation, optimization, scenarios
   app.include_router(simulation.router, prefix="/simulation", tags=["simulation"])
   app.include_router(optimization.router, prefix="/optimization", tags=["optimization"])
   app.include_router(scenarios.router, prefix="/scenarios", tags=["scenarios"])
   
   # Mount MCP server
   mcp.mount()
   
   if __name__ == "__main__":
       uvicorn.run(app, host="0.0.0.0", port=8000)
   ```

2. **MCP Tool Definitions**
   ```python
   # src/mcp/tools/simulation_tools.py
   from fastapi_mcp import MCPTool
   from typing import Dict, Any, Optional
   import uuid
   import asyncio
   
   @MCPTool(
       name="create_simulation_scenario",
       description="Create a new discrete event simulation scenario with specified parameters"
   )
   async def create_simulation_scenario(
       scenario_name: str,
       scenario_type: str,  # 'manufacturing', 'healthcare', 'logistics'
       duration: float,
       parameters: Dict[str, Any]
   ) -> Dict[str, Any]:
       """Create a new simulation scenario."""
       try:
           scenario_id = str(uuid.uuid4())
           
           # Validate scenario type
           valid_types = ['manufacturing', 'healthcare', 'logistics', 'service']
           if scenario_type not in valid_types:
               return {
                   "success": False,
                   "error": f"Invalid scenario type. Must be one of: {valid_types}"
               }
           
           # Create simulation configuration
           config = SimulationConfig(
               name=scenario_name,
               duration=duration,
               random_seed=parameters.get('random_seed', 42),
               optimization_enabled=parameters.get('optimization_enabled', True)
           )
           
           # Store scenario
           app_state.active_scenarios[scenario_id] = {
               'id': scenario_id,
               'name': scenario_name,
               'type': scenario_type,
               'config': config,
               'parameters': parameters,
               'status': 'created'
           }
           
           return {
               "success": True,
               "scenario_id": scenario_id,
               "message": f"Created {scenario_type} scenario '{scenario_name}' with duration {duration}"
           }
           
       except Exception as e:
           return {
               "success": False,
               "error": str(e)
           }
   
   @MCPTool(
       name="run_simulation",
       description="Execute a discrete event simulation scenario and return results"
   )
   async def run_simulation(
       scenario_id: str,
       real_time: bool = False,
       collect_detailed_metrics: bool = True
   ) -> Dict[str, Any]:
       """Run a simulation scenario."""
       try:
           # Check if scenario exists
           if scenario_id not in app_state.active_scenarios:
               return {
                   "success": False,
                   "error": f"Scenario {scenario_id} not found"
               }
           
           scenario = app_state.active_scenarios[scenario_id]
           
           # Create simulation environment
           from ...simulation.models.factory import create_simulation_by_type
           sim_env = create_simulation_by_type(
               scenario['type'], 
               scenario['config'], 
               scenario['parameters']
           )
           
           # Run simulation
           scenario['status'] = 'running'
           results = sim_env.run()
           scenario['status'] = 'completed'
           scenario['results'] = results
           
           return {
               "success": True,
               "scenario_id": scenario_id,
               "results": results,
               "message": f"Simulation completed in {results['duration']:.2f} time units"
           }
           
       except Exception as e:
           if scenario_id in app_state.active_scenarios:
               app_state.active_scenarios[scenario_id]['status'] = 'error'
           return {
               "success": False,
               "error": str(e)
           }
   
   @MCPTool(
       name="optimize_scenario_parameters",
       description="Use mathematical optimization to find optimal parameters for a scenario"
   )
   async def optimize_scenario_parameters(
       scenario_id: str,
       optimization_objective: str,  # 'minimize_cost', 'maximize_throughput', 'minimize_wait_time'
       constraints: Dict[str, Any],
       solver: str = 'glpk'
   ) -> Dict[str, Any]:
       """Optimize scenario parameters using Pyomo."""
       try:
           if scenario_id not in app_state.active_scenarios:
               return {
                   "success": False,
                   "error": f"Scenario {scenario_id} not found"
               }
           
           scenario = app_state.active_scenarios[scenario_id]
           
           # Create optimization model based on scenario type and objective
           from ...optimization.problems.scenario_optimization import ScenarioOptimizationModel
           
           model = ScenarioOptimizationModel(f"opt_{scenario_id}")
           optimization_data = {
               'scenario_type': scenario['type'],
               'objective': optimization_objective,
               'constraints': constraints,
               'current_parameters': scenario['parameters']
           }
           
           # Solve optimization
           result = model.solve(optimization_data, solver_name=solver)
           
           if result.status in ['optimal', 'feasible']:
               # Update scenario with optimized parameters
               scenario['parameters'].update(result.variables.get('optimized_parameters', {}))
               
               return {
                   "success": True,
                   "scenario_id": scenario_id,
                   "optimization_result": {
                       "status": result.status,
                       "objective_value": result.objective_value,
                       "optimized_parameters": result.variables,
                       "solve_time": result.solve_time
                   },
                   "message": f"Optimization completed with {result.status} solution"
               }
           else:
               return {
                   "success": False,
                   "error": f"Optimization failed with status: {result.status}"
               }
               
       except Exception as e:
           return {
               "success": False,
               "error": str(e)
           }
   
   @MCPTool(
       name="analyze_simulation_results",
       description="Analyze simulation results and provide insights and recommendations"
   )
   async def analyze_simulation_results(
       scenario_id: str,
       analysis_type: str = "comprehensive"  # 'comprehensive', 'performance', 'bottlenecks'
   ) -> Dict[str, Any]:
       """Analyze simulation results and generate insights."""
       try:
           if scenario_id not in app_state.active_scenarios:
               return {
                   "success": False,
                   "error": f"Scenario {scenario_id} not found"
               }
           
           scenario = app_state.active_scenarios[scenario_id]
           
           if 'results' not in scenario:
               return {
                   "success": False,
                   "error": "Scenario has not been run yet"
               }
           
           results = scenario['results']
           
           # Generate analysis based on type
           from ...utils.analysis import ResultsAnalyzer
           analyzer = ResultsAnalyzer(scenario['type'])
           analysis = analyzer.analyze(results, analysis_type)
           
           return {
               "success": True,
               "scenario_id": scenario_id,
               "analysis": analysis,
               "insights": analysis.get('insights', []),
               "recommendations": analysis.get('recommendations', [])
           }
           
       except Exception as e:
           return {
               "success": False,
               "error": str(e)
           }
   
   @MCPTool(
       name="compare_scenarios",
       description="Compare multiple simulation scenarios and identify best performing options"
   )
   async def compare_scenarios(
       scenario_ids: List[str],
       comparison_metrics: List[str],
       weights: Optional[Dict[str, float]] = None
   ) -> Dict[str, Any]:
       """Compare multiple scenarios across specified metrics."""
       try:
           if len(scenario_ids) < 2:
               return {
                   "success": False,
                   "error": "At least 2 scenarios required for comparison"
               }
           
           # Validate all scenarios exist and have results
           scenarios_data = {}
           for scenario_id in scenario_ids:
               if scenario_id not in app_state.active_scenarios:
                   return {
                       "success": False,
                       "error": f"Scenario {scenario_id} not found"
                   }
               
               scenario = app_state.active_scenarios[scenario_id]
               if 'results' not in scenario:
                   return {
                       "success": False,
                       "error": f"Scenario {scenario_id} has not been run yet"
                   }
               
               scenarios_data[scenario_id] = scenario
           
           # Perform comparison
           from ...utils.comparison import ScenarioComparator
           comparator = ScenarioComparator()
           comparison_result = comparator.compare(
               scenarios_data, 
               comparison_metrics, 
               weights or {}
           )
           
           return {
               "success": True,
               "comparison_result": comparison_result,
               "best_scenario": comparison_result.get('best_scenario'),
               "ranking": comparison_result.get('ranking', []),
               "detailed_metrics": comparison_result.get('detailed_metrics', {})
           }
           
       except Exception as e:
           return {
               "success": False,
               "error": str(e)
           }
   ```

### Testing Requirements

{{testingRequirements}}

1. **Comprehensive Testing Framework**
   ```python
   # tests/unit/test_simulation_environment.py
   import pytest
   import numpy as np
   from src.simulation.core.environment import SimulationEnvironment, SimulationConfig
   from src.simulation.core.process import CustomerProcess
   import simpy
   
   class TestSimulationEnvironment:
       """Test suite for simulation environment."""
       
       @pytest.fixture
       def basic_config(self):
           """Basic simulation configuration for testing."""
           return SimulationConfig(
               name="test_simulation",
               duration=100.0,
               random_seed=42,
               optimization_enabled=False
           )
       
       @pytest.fixture
       def sim_env(self, basic_config):
           """Create simulation environment for testing."""
           return SimulationEnvironment(basic_config)
       
       def test_environment_creation(self, sim_env):
           """Test environment is created correctly."""
           assert sim_env.config.name == "test_simulation"
           assert sim_env.state.value == "idle"
           assert sim_env.env.now == 0
           
       def test_add_resource(self, sim_env):
           """Test adding resources to simulation."""
           resource = sim_env.add_resource("server", capacity=3)
           assert "server" in sim_env.resources
           assert resource.capacity == 3
           
       def test_add_process(self, sim_env):
           """Test adding processes to simulation."""
           def test_process(env):
               yield env.timeout(10)
           
           sim_env.add_process("test_proc", test_process)
           assert "test_proc" in sim_env.processes
           
       def test_simulation_run(self, sim_env):
           """Test running a simple simulation."""
           resource = sim_env.add_resource("server", capacity=1)
           
           def simple_process(env):
               with resource.request() as req:
                   yield req
                   yield env.timeout(5)
           
           sim_env.add_process("simple", simple_process)
           results = sim_env.run(until=10)
           
           assert results['duration'] == 10
           assert results['state'] == 'completed'
   
   # tests/unit/test_optimization_models.py
   import pytest
   from src.optimization.core.models import ResourceAllocationModel, SchedulingModel
   
   class TestOptimizationModels:
       """Test suite for optimization models."""
       
       def test_resource_allocation_model(self):
           """Test resource allocation optimization."""
           model = ResourceAllocationModel("test_allocation")
           
           data = {
               'resources': ['R1', 'R2'],
               'demands': {'D1': 10, 'D2': 15},
               'costs': {('R1', 'D1'): 2, ('R1', 'D2'): 3, ('R2', 'D1'): 4, ('R2', 'D2'): 1},
               'capacities': {'R1': 20, 'R2': 20}
           }
           
           result = model.solve(data, solver_name='glpk')
           
           assert result.status in ['optimal', 'feasible']
           assert result.objective_value is not None
           assert 'allocation' in result.variables
           
       def test_scheduling_model(self):
           """Test scheduling optimization."""
           model = SchedulingModel("test_scheduling")
           
           data = {
               'jobs': ['J1', 'J2'],
               'machines': ['M1'],
               'processing_times': {('J1', 'M1'): 5, ('J2', 'M1'): 3},
               'due_dates': {'J1': 10, 'J2': 8},
               'horizon': 20
           }
           
           result = model.solve(data, solver_name='glpk')
           
           assert result.status in ['optimal', 'feasible']
           assert 'schedule' in result.variables
   
   # tests/integration/test_simulation_optimization_bridge.py
   import pytest
   import time
   from src.integration.bridge import (
       SimulationOptimizationBridge, 
       OptimizationRequest,
       DecisionType
   )
   from src.optimization.core.models import ResourceAllocationModel
   
   class TestSimulationOptimizationBridge:
       """Test suite for simulation-optimization integration."""
       
       @pytest.fixture
       def bridge(self):
           """Create bridge for testing."""
           bridge = SimulationOptimizationBridge(max_concurrent_optimizations=2)
           bridge.register_optimization_model(
               DecisionType.RESOURCE_ALLOCATION, 
               ResourceAllocationModel
           )
           bridge.start()
           yield bridge
           bridge.stop()
           
       def test_optimization_request(self, bridge):
           """Test optimization request processing."""
           request = OptimizationRequest(
               request_id="test_001",
               decision_type=DecisionType.RESOURCE_ALLOCATION,
               simulation_time=10.0,
               data={
                   'resources': ['R1'],
                   'demands': {'D1': 5},
                   'costs': {('R1', 'D1'): 1},
                   'capacities': {'R1': 10}
               }
           )
           
           # Submit request
           request_id = bridge.request_optimization(request)
           assert request_id == "test_001"
           
           # Get result
           response = bridge.get_optimization_result(request_id, timeout=30.0)
           
           assert response is not None
           assert response.status in ['optimal', 'feasible']
           assert 'allocation' in response.solution
   ```

## Error Handling and Logging

{{errorHandlingLogging}}

```python
# src/utils/logging.py
import logging
import logging.handlers
import sys
from typing import Optional
from pathlib import Path

class SimulationLogger:
    """Centralized logging for SimPy-Pyomo-MCP projects."""
    
    def __init__(self, name: str, level: str = "INFO", log_file: Optional[str] = None):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(getattr(logging, level))
        
        # Prevent duplicate handlers
        if not self.logger.handlers:
            # Console handler
            console_handler = logging.StreamHandler(sys.stdout)
            console_formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            console_handler.setFormatter(console_formatter)
            self.logger.addHandler(console_handler)
            
            # File handler with rotation
            if log_file:
                log_path = Path(log_file)
                log_path.parent.mkdir(parents=True, exist_ok=True)
                
                file_handler = logging.handlers.RotatingFileHandler(
                    log_file, maxBytes=10*1024*1024, backupCount=5
                )
                file_formatter = logging.Formatter(
                    '%(asctime)s - %(name)s - %(levelname)s - %(funcName)s:%(lineno)d - %(message)s'
                )
                file_handler.setFormatter(file_formatter)
                self.logger.addHandler(file_handler)
    
    def log_simulation_event(self, event_type: str, simulation_time: float, details: dict):
        """Log simulation-specific events."""
        self.logger.info(f"SIM_EVENT[{event_type}] at t={simulation_time:.2f}: {details}")
    
    def log_optimization_call(self, decision_type: str, solve_time: float, status: str):
        """Log optimization-specific events."""
        self.logger.info(f"OPT_CALL[{decision_type}] solved in {solve_time:.3f}s: {status}")

# src/utils/exceptions.py
class SimulationError(Exception):
    """Base exception for simulation errors."""
    pass

class OptimizationError(Exception):
    """Base exception for optimization errors."""
    pass

class IntegrationError(Exception):
    """Base exception for integration errors."""
    pass

class MCPError(Exception):
    """Base exception for MCP-related errors."""
    pass

def handle_exceptions(f):
    """Decorator for exception handling."""
    from functools import wraps
    
    @wraps(f)
    async def async_wrapper(*args, **kwargs):
        try:
            return await f(*args, **kwargs)
        except Exception as e:
            logger = logging.getLogger(__name__)
            logger.error(f"Error in {f.__name__}: {str(e)}")
            logger.error(f"Traceback: {traceback.format_exc()}")
            raise
    
    @wraps(f)
    def sync_wrapper(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            logger = logging.getLogger(__name__)
            logger.error(f"Error in {f.__name__}: {str(e)}")
            logger.error(f"Traceback: {traceback.format_exc()}")
            raise
    
    if asyncio.iscoroutinefunction(f):
        return async_wrapper
    else:
        return sync_wrapper
```

## Agent Collaboration Requirements

All agents working on this SimPy-Pyomo-MCP project must:

1. **Follow Integration Best Practices**
   - Implement proper SimPy-Pyomo coordination
   - Use standardized MCP tool definitions
   - Maintain thread-safe optimization bridges
   - Handle asynchronous operations correctly

2. **Implement Comprehensive Analysis**
   - Multi-objective optimization support
   - Sensitivity analysis capabilities
   - Scenario comparison frameworks
   - Performance bottleneck identification

3. **Ensure Production Readiness**
   - Scalable architecture patterns
   - Error handling and recovery
   - Resource management and cleanup
   - Security and authentication

4. **Maintain Code Quality**
   - Type hints and comprehensive documentation
   - Unit and integration testing
   - Performance benchmarking
   - Configuration management

## Quality Gates

Before any code is merged:

1. All tests must pass (>90% coverage)
2. Simulation models validated against known scenarios
3. Optimization models produce feasible solutions
4. MCP tools tested with actual LLM interactions
5. Performance benchmarks meet requirements
6. Documentation updated and complete
7. Security review completed

## Performance Requirements

1. **Simulation Performance**
   - Handle 10,000+ entities efficiently
   - Real-time simulation capability
   - Memory usage optimization
   - Parallel execution support

2. **Optimization Performance**
   - Solve small problems (<10s)
   - Handle medium problems (<60s)
   - Provide approximate solutions for large problems
   - Cache and reuse solutions

3. **MCP Response Times**
   - Tool calls respond within 30s
   - Simple queries respond within 5s
   - Complex analysis within 120s
   - Graceful timeout handling

---

**Remember**: This document is your contract for SimPy-Pyomo-MCP development. Violating these guidelines may result in rejected contributions. Always refer to CLAUDE.md for architectural decisions and update FRS.md with implementation details.