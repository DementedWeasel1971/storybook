"""
SimPy-Pyomo-MCP Integration System

A comprehensive system that combines discrete event simulation (SimPy) with 
mathematical optimization (Pyomo) and exposes capabilities through the Model 
Context Protocol (MCP) using FastAPI-MCP, enabling Large Language Models to 
assist in planning and event simulation scenarios.
"""

__version__ = "1.0.0"
__author__ = "Deon Bands"
__email__ = "deon@example.com"
__description__ = "Discrete Event Simulation with Optimization and LLM Integration"

from .core.system_manager import SimPyPyomoMCPSystem, SystemConfiguration
from .simulation.core.environment import SimulationEnvironment, SimulationConfig
from .optimization.core.models import OptimizationModel, OptimizationResult
from .integration.bridge import SimulationOptimizationBridge
from .mcp.server import MCPServer

__all__ = [
    "SimPyPyomoMCPSystem",
    "SystemConfiguration", 
    "SimulationEnvironment",
    "SimulationConfig",
    "OptimizationModel",
    "OptimizationResult",
    "SimulationOptimizationBridge",
    "MCPServer",
]