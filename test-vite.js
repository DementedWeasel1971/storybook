console.log('Starting test...');
try {
  const vite = require('../design-system/node_modules/vite');
  console.log('Vite loaded successfully');
} catch (error) {
  console.error('Error loading Vite:', error.message);
}