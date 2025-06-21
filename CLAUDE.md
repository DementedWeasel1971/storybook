# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based Design System project that uses Storybook for component development and documentation. The main project is located at `/home/dbands/proj001/design-system/`, while this `storybook` directory appears to be intended for Storybook deployment or related purposes.

## Key Commands

### Development
```bash
# Install dependencies (run in design-system directory)
cd ../design-system && npm install

# Start Storybook development server (port 6006)
cd ../design-system && npm run dev

# Build component library
cd ../design-system && npm run build-lib

# Build Storybook static site
cd ../design-system && npm run build-storybook

# Build both library and Storybook
cd ../design-system && npm run build
```

## Architecture

### Component Structure
Components in `../design-system/src/components/` follow this pattern:
```
ComponentName/
├── ComponentName.tsx      # Component implementation
├── ComponentName.css      # Component styles
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts              # Export file
```

### Design System Layers
1. **Tokens** (`../design-system/src/tokens/`): Design tokens for colors, spacing, and typography
2. **Components** (`../design-system/src/components/`): React components (Button, Card, Input)
3. **Stories** (`../design-system/src/stories/`): Additional Storybook stories and examples
4. **Styles** (`../design-system/src/styles/`): Global styles and utilities

### Build Output
- **Library**: Outputs to `../design-system/dist/` with CommonJS, ESM, and TypeScript definitions
- **Storybook**: Builds to `../design-system/storybook-static/`

## Technology Stack
- React 18+
- TypeScript
- Storybook 8.3+
- Rollup (for library bundling)
- Vite (for Storybook dev server)
- CSS for styling

## Current State
This `storybook` directory is currently empty. If you need to:
- Deploy Storybook: Build it in the design-system directory first
- Initialize a new Storybook project here: Consider the relationship with the existing design-system project
- Move or copy built Storybook files: Use the storybook-static output from design-system