# AGENTS.md Configuration Guide

## Overview

The AGENTS.md generation system now supports both standard AGENTS.md format compliance and the custom Architect Crew methodology. This document explains how to configure the generation to maximize compatibility and customization.

## Standard AGENTS.md Format Compliance

The generated AGENTS.md now includes all required standard fields:

### YAML Front Matter (Standard Fields)
- `name`: Project name
- `description`: Brief project description  
- `category`: Project category (e.g., "Frontend Framework")
- `author`: Author name
- `authorUrl`: Author's GitHub or website URL (optional)
- `tags`: Array of technology tags
- `lastUpdated`: Last update date (YYYY-MM-DD format)

### Standard Content Sections
- Project Overview
- Tech Stack  
- Project Structure
- Development Guidelines
- Environment Setup
- Testing Strategy
- Deployment Guide
- Performance Optimization
- Security Considerations
- Monitoring and Logging
- Common Issues
- Reference Resources
- Changelog

## Configuration Options

### agents.config.json

Create an `agents.config.json` file to customize metadata and features:

```json
{
  "metadata": {
    "name": "Your Project Name",
    "description": "Your project description",
    "category": "Frontend Framework",
    "author": "Your Name",
    "authorUrl": "https://github.com/yourusername",
    "tags": ["react", "typescript", "storybook"]
  },
  "features": {
    "includeStandardSections": true,
    "includeAIAgentConstitution": true,
    "includeArchitectCrewMethodology": true,
    "generateTechStackFromPackageJson": true
  }
}
```

### Configuration Fields

#### Metadata Fields
- **name**: Override the default project name
- **description**: Customize project description
- **category**: Set project category (Frontend Framework, Backend Service, etc.)
- **author**: Set author name
- **authorUrl**: Set author URL (optional)
- **tags**: Array of technology tags

#### Feature Flags
- **includeStandardSections**: Include all standard AGENTS.md sections
- **includeAIAgentConstitution**: Include AI agent instructions and protocols
- **includeArchitectCrewMethodology**: Include Architect Crew workflow sections
- **generateTechStackFromPackageJson**: Auto-detect tech stack from package.json

## Generation Commands

```bash
# Generate with default configuration
npm run generate:agents

# Generate with custom config file
npm run generate:agents -- --config custom-agents.config.json

# Dry run to preview output
npm run generate:agents:dry-run

# Force regeneration (ignore version checks)
npm run generate:agents:force
```

## GitHub Action Integration

The GitHub Action now validates standard AGENTS.md format:

- **Required Fields**: Validates presence of standard YAML front matter fields
- **Section Validation**: Ensures all required standard sections are present
- **Format Validation**: Checks YAML format and UTF-8 encoding
- **Tag Format**: Validates tags are in JSON array format

## Backward Compatibility

The system maintains full backward compatibility:

- **Custom Fields**: All custom Architect Crew fields are preserved
- **Existing Workflow**: The RDS → CLAUDE → AGENTS → FRS chain continues to work
- **Legacy Support**: Existing templates and scripts continue to function

## Technology Auto-Detection

When `generateTechStackFromPackageJson` is enabled, the system automatically detects and adds technology tags based on dependencies in `../design-system/package.json`:

- React → adds "react" tag
- Storybook → adds "storybook" tag  
- TypeScript → adds "typescript" tag
- Vite → adds "vite" tag
- Jest → adds "jest" tag
- And more...

## Examples

### Minimal Configuration
```json
{
  "metadata": {
    "name": "My Design System",
    "author": "My Team"
  }
}
```

### Full Customization
```json
{
  "metadata": {
    "name": "Enterprise Component Library",
    "description": "Production-ready React components for enterprise applications",
    "category": "Component Library",
    "author": "UI Team",
    "authorUrl": "https://github.com/company/ui-team",
    "tags": ["react", "typescript", "enterprise", "accessible", "tested"]
  },
  "features": {
    "includeStandardSections": true,
    "includeAIAgentConstitution": false,
    "includeArchitectCrewMethodology": false,
    "generateTechStackFromPackageJson": true
  }
}
```

## Validation

The system validates:
- Required standard fields are present
- YAML front matter is properly formatted
- Tags are in valid JSON array format
- UTF-8 encoding is maintained
- All required sections are included

This ensures maximum compatibility with the standard AGENTS.md format while preserving the flexibility needed for the Architect Crew methodology.