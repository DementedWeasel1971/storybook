# Multi-stage Dockerfile for SimPy-Pyomo-MCP System

# Stage 1: Build stage with all build dependencies
FROM python:3.11-slim as builder

# Install system dependencies for building
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    libffi-dev \
    libssl-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy requirements and install Python dependencies
COPY requirements.txt /tmp/
RUN pip install --no-cache-dir --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r /tmp/requirements.txt

# Stage 2: Runtime stage with minimal dependencies
FROM python:3.11-slim

# Install runtime system dependencies
RUN apt-get update && apt-get install -y \
    glpk-utils \
    coinor-cbc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy virtual environment from builder stage
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Create app user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Set working directory
WORKDIR /app

# Copy application code
COPY src/ /app/src/
COPY config/ /app/config/
COPY pyproject.toml /app/
COPY README.md /app/

# Create necessary directories
RUN mkdir -p /app/logs /app/data /app/temp && \
    chown -R appuser:appuser /app

# Install the application in development mode
RUN pip install -e .

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Default command
CMD ["python", "-m", "simpy_pyomo_mcp.api.main"]

# Labels for metadata
LABEL name="simpy-pyomo-mcp-system"
LABEL version="1.0.0"
LABEL description="Discrete Event Simulation with Optimization and LLM Integration"
LABEL maintainer="Deon Bands <deon@example.com>"