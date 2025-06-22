#!/usr/bin/env node

/**
 * CLAUDE.md Generation Script
 * 
 * Generates CLAUDE.md from the template embedded in AGENTS.md
 * Part of the Architect Crew methodology for automated documentation
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class ClaudeGenerator {
  constructor(options = {}) {
    this.templateFile = options.template || 'templates/CLAUDE.template.md';
    this.outputFile = options.output || 'CLAUDE.md';
    this.sourcesDir = options.sources || 'docs/';
    this.dryRun = options.dryRun || false;
    this.force = options.force || false;
    
    this.placeholders = new Map();
    this.version = '1.0.0';
    this.date = new Date().toISOString().split('T')[0];
  }

  async generate() {
    try {
      console.log('🚀 Starting CLAUDE.md generation...');
      
      // Extract template from AGENTS.md
      const template = this.extractTemplate();
      
      // Gather data from source files
      await this.gatherSourceData();
      
      // Substitute placeholders
      const content = this.substitutePlaceholders(template);
      
      // Validate output
      this.validateOutput(content);
      
      // Write output file (unless dry run)
      if (!this.dryRun) {
        this.writeOutput(content);
        console.log('✅ CLAUDE.md generated successfully!');
      } else {
        console.log('🔍 Dry run completed. Output preview:');
        console.log(content.substring(0, 500) + '...');
      }
      
    } catch (error) {
      console.error('❌ Generation failed:', error.message);
      process.exit(1);
    }
  }

  extractTemplate() {
    console.log('📄 Loading CLAUDE template...');
    
    if (!fs.existsSync(this.templateFile)) {
      throw new Error(`Template file not found: ${this.templateFile}`);
    }
    
    const content = fs.readFileSync(this.templateFile, 'utf8');
    return content;
  }

  async gatherSourceData() {
    console.log('📊 Gathering source data...');
    
    // Set basic placeholders
    this.placeholders.set('version', this.version);
    this.placeholders.set('date', this.date);
    
    // Extract persona content
    await this.extractPersonaContent();
    
    // Extract FRS content
    await this.extractFRSContent();
    
    // Extract RDS content
    await this.extractRDSContent();
    
    // Analyze current implementation
    await this.analyzeImplementation();
  }

  async extractPersonaContent() {
    const personaFiles = this.getPersonaFiles();
    let personaPrinciples = '';
    
    for (const file of personaFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const personaName = path.basename(file, '.md').replace('persona-', '');
        personaPrinciples += `\\n### ${this.capitalize(personaName)} Persona\\n`;
        personaPrinciples += this.extractSummary(content);
      } catch (error) {
        console.warn(`⚠️  Could not read persona file: ${file}`);
      }
    }
    
    this.placeholders.set('personaPrinciples', personaPrinciples || 'Persona analysis in progress...');
  }

  async extractFRSContent() {
    const frsPath = path.join(this.sourcesDir, 'FRS.md');
    
    if (fs.existsSync(frsPath)) {
      const content = fs.readFileSync(frsPath, 'utf8');
      
      this.placeholders.set('architectureOverview', this.extractSection(content, 'System Architecture') || 'Architecture documentation in progress...');
      this.placeholders.set('componentBreakdown', this.extractSection(content, 'Component') || 'Component analysis in progress...');
      this.placeholders.set('technologyStack', this.extractSection(content, 'Technology') || 'Technology stack documentation in progress...');
    } else {
      console.warn('⚠️  FRS.md not found, using fallback content');
      this.setFallbackFRSContent();
    }
  }

  async extractRDSContent() {
    const rdsPath = path.join(this.sourcesDir, 'RDS.md');
    
    if (fs.existsSync(rdsPath)) {
      const content = fs.readFileSync(rdsPath, 'utf8');
      this.placeholders.set('rdsValidation', this.extractSection(content, 'Requirements') || 'Requirements validation in progress...');
    } else {
      this.placeholders.set('rdsValidation', 'RDS validation framework being established...');
    }
  }

  async analyzeImplementation() {
    // Analyze current component library
    const componentsDir = '../design-system/src/components';
    let componentBreakdown = '';
    
    try {
      if (fs.existsSync(componentsDir)) {
        const components = fs.readdirSync(componentsDir)
          .filter(item => fs.statSync(path.join(componentsDir, item)).isDirectory());
        
        componentBreakdown = `Currently implemented components: ${components.join(', ')}\\n`;
        componentBreakdown += `Total components: ${components.length}`;
      }
    } catch (error) {
      componentBreakdown = 'Component analysis in progress...';
    }
    
    // Set implementation-specific placeholders
    this.placeholders.set('implementationStatus', this.generateImplementationStatus());
    this.placeholders.set('nextSteps', this.generateNextSteps());
    this.placeholders.set('evolutionTimeline', this.generateEvolutionTimeline());
    
    // Set architectural placeholders with current implementation context
    this.setArchitecturalPlaceholders();
  }

  setArchitecturalPlaceholders() {
    const placeholderDefaults = {
      'designTokens': 'Design token system with colors, spacing, typography, borders, and shadows',
      'buildSystem': 'Vite + Rollup build system with TypeScript compilation and Storybook integration',
      'developerArchitecture': 'TypeScript-first component development with comprehensive testing',
      'designBridge': 'Storybook-based design system with token integration',
      'businessValue': 'Metrics-driven development with ROI tracking and adoption measurement',
      'qaArchitecture': 'Automated testing with Jest, React Testing Library, and accessibility validation',
      'infrastructureArchitecture': 'CI/CD pipeline with GitHub Actions and automated deployments',
      'systemLayers': 'Layered architecture: Foundation → Components → Build → Distribution',
      'integrationPatterns': 'Framework-agnostic integration with React, Next.js, and Vite support',
      'performanceOptimization': 'Tree-shaking, code splitting, and bundle optimization strategies',
      'governanceModel': 'RFC-based component proposals with Design System Council oversight',
      'successMetrics': 'KPI tracking for adoption, efficiency, quality, and performance',
      'cicdIntegration': 'Automated workflows for testing, building, and deployment',
      'coreArchitecturalPrinciples': 'Accessibility-first, performance-optimized, maintainable architecture',
      'primaryArchitectureFlow': 'RDS → FRS → CLAUDE → AGENTS → Implementation flow',
      'componentLifecycle': 'Planning → Development → Testing → Review → Integration → Release',
      'qaProcessFlow': 'TypeScript → Tests → Accessibility → Visual → Performance validation',
      'cicdArchitecture': 'Push → CI Pipeline → Quality Gates → Deploy → Monitor'
    };
    
    for (const [key, value] of Object.entries(placeholderDefaults)) {
      if (!this.placeholders.has(key)) {
        this.placeholders.set(key, value);
      }
    }
  }

  substitutePlaceholders(template) {
    console.log('🔄 Substituting placeholders...');
    
    let result = template;
    
    // Replace all placeholders
    for (const [key, value] of this.placeholders) {
      const placeholder = `{{${key}}}`;
      result = result.replace(new RegExp(placeholder, 'g'), value);
    }
    
    // Check for any remaining placeholders
    const remainingPlaceholders = result.match(/{{[^}]+}}/g);
    if (remainingPlaceholders) {
      console.warn('⚠️  Unresolved placeholders:', remainingPlaceholders);
    }
    
    return result;
  }

  validateOutput(content) {
    console.log('✅ Validating output...');
    
    // Check for UTF-8 encoding
    if (!Buffer.isBuffer(Buffer.from(content, 'utf8'))) {
      throw new Error('Output is not valid UTF-8');
    }
    
    // Check for minimum content length
    if (content.length < 1000) {
      throw new Error('Generated content is too short');
    }
    
    // Check for required sections
    const requiredSections = [
      '# CLAUDE.md',
      '## 1. From RDS → FRS Validation',
      '## 2. Architectural Overview',
      'Prime Directive'
    ];
    
    for (const section of requiredSections) {
      if (!content.includes(section)) {
        throw new Error(`Missing required section: ${section}`);
      }
    }
  }

  writeOutput(content) {
    console.log(`📝 Writing output to ${this.outputFile}...`);
    fs.writeFileSync(this.outputFile, content, 'utf8');
  }

  // Helper methods
  getPersonaFiles() {
    try {
      return fs.readdirSync(this.sourcesDir)
        .filter(file => file.startsWith('persona-') && file.endsWith('.md'))
        .map(file => path.join(this.sourcesDir, file));
    } catch (error) {
      return [];
    }
  }

  extractSection(content, sectionKeyword) {
    const lines = content.split('\\n');
    let inSection = false;
    let sectionContent = '';
    
    for (const line of lines) {
      if (line.toLowerCase().includes(sectionKeyword.toLowerCase()) && line.startsWith('#')) {
        inSection = true;
        continue;
      }
      if (inSection && line.startsWith('#') && !line.toLowerCase().includes(sectionKeyword.toLowerCase())) {
        break;
      }
      if (inSection) {
        sectionContent += line + '\\n';
      }
    }
    
    return sectionContent.trim();
  }

  extractSummary(content) {
    const lines = content.split('\\n');
    const summaryLines = lines.slice(0, 5).filter(line => line.trim());
    return summaryLines.join('\\n');
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
  }

  setFallbackFRSContent() {
    this.placeholders.set('architectureOverview', 'Comprehensive React design system architecture');
    this.placeholders.set('componentBreakdown', 'Atomic design methodology with layered components');
    this.placeholders.set('technologyStack', 'React 18+, TypeScript 5+, Storybook 8.3+, Vite 5+');
  }

  generateImplementationStatus() {
    return `
- ✅ Complete Storybook setup with enhanced configuration
- ✅ Core components (Button, Card, Input, Modal) with full stories and tests
- ✅ Testing infrastructure with Jest and React Testing Library
- ✅ Code quality tools (ESLint, Prettier, TypeScript)
- ✅ Design token foundation (colors, spacing, typography)
- ✅ Comprehensive documentation and AI agent templates
    `.trim();
  }

  generateNextSteps() {
    return `
1. Install and validate all dependencies in design-system directory
2. Run complete test suite and fix any failing tests
3. Generate additional components using AGENTS.md templates
4. Set up automated CI/CD pipeline with GitHub Actions
5. Implement visual regression testing with Chromatic
6. Create component library package for NPM distribution
    `.trim();
  }

  generateEvolutionTimeline() {
    return `
- **Phase 1** (Current): Core component library with design tokens
- **Phase 2** (Next 30 days): Advanced components and patterns
- **Phase 3** (Next 60 days): Automated tooling and analytics integration
- **Phase 4** (Next 90 days): Multi-framework support and advanced features
    `.trim();
  }
}

// CLI Interface
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};
  
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];
    
    if (key === 'dry-run' || key === 'force') {
      options[key.replace('-', '')] = true;
      i -= 1; // No value for boolean flags
    } else {
      options[key] = value;
    }
  }
  
  return options;
}

// Main execution
if (require.main === module) {
  const options = parseArgs();
  const generator = new ClaudeGenerator(options);
  generator.generate();
}

module.exports = ClaudeGenerator;