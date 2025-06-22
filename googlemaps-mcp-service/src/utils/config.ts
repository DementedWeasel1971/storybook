import { config } from 'dotenv';
import { AppConfig, Environment, ConfigValidationError } from '@/types';

// Load environment variables
config();

/**
 * Parse environment variable as integer with default value
 */
const parseEnvInt = (value: string | undefined, defaultValue: number): number => {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Parse environment variable as boolean with default value
 */
const parseEnvBool = (value: string | undefined, defaultValue: boolean): boolean => {
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true';
};

/**
 * Get environment variable or throw error if required and missing
 */
const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
};

/**
 * Load and validate application configuration from environment variables
 */
export const loadConfig = (): AppConfig => {
  const environment = (process.env.NODE_ENV as Environment) || 'development';
  
  const appConfig: AppConfig = {
    environment,
    
    googleMaps: {
      apiKey: getRequiredEnv('GOOGLE_MAPS_API_KEY'),
      region: process.env.GOOGLE_MAPS_REGION || 'US',
      language: process.env.GOOGLE_MAPS_LANGUAGE || 'en',
      units: (process.env.GOOGLE_MAPS_UNITS as 'metric' | 'imperial') || 'metric',
      timeout: parseEnvInt(process.env.GOOGLE_MAPS_TIMEOUT, 30000),
      retries: parseEnvInt(process.env.GOOGLE_MAPS_RETRIES, 3)
    },
    
    redis: {
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      password: process.env.REDIS_PASSWORD,
      db: parseEnvInt(process.env.REDIS_DB, 0),
      keyPrefix: process.env.REDIS_KEY_PREFIX || 'googlemaps_mcp:',
      connectTimeout: parseEnvInt(process.env.REDIS_CONNECT_TIMEOUT, 10000),
      commandTimeout: parseEnvInt(process.env.REDIS_COMMAND_TIMEOUT, 5000),
      retryDelayOnFailover: parseEnvInt(process.env.REDIS_RETRY_DELAY, 100),
      maxRetriesPerRequest: parseEnvInt(process.env.REDIS_MAX_RETRIES, 3)
    },
    
    cache: {
      ttl: {
        geocoding: parseEnvInt(process.env.CACHE_TTL_GEOCODING, 86400),
        places: parseEnvInt(process.env.CACHE_TTL_PLACES, 43200),
        directions: parseEnvInt(process.env.CACHE_TTL_DIRECTIONS, 3600),
        traffic: parseEnvInt(process.env.CACHE_TTL_TRAFFIC, 900),
        staticMaps: parseEnvInt(process.env.CACHE_TTL_STATIC_MAPS, 604800),
        default: parseEnvInt(process.env.CACHE_TTL_DEFAULT, 3600)
      },
      maxSize: parseEnvInt(process.env.CACHE_MAX_SIZE, 1000),
      compression: parseEnvBool(process.env.CACHE_COMPRESSION, true)
    },
    
    rateLimit: {
      windowMs: parseEnvInt(process.env.RATE_LIMIT_WINDOW_MS, 60000),
      maxRequests: parseEnvInt(process.env.RATE_LIMIT_MAX_REQUESTS, 1000),
      skipFailedRequests: parseEnvBool(process.env.RATE_LIMIT_SKIP_FAILED_REQUESTS, true),
      skipSuccessfulRequests: parseEnvBool(process.env.RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS, false)
    },
    
    logging: {
      level: (process.env.LOG_LEVEL as any) || 'info',
      format: (process.env.LOG_FORMAT as 'json' | 'simple') || 'json',
      file: process.env.LOG_FILE_PATH ? {
        path: process.env.LOG_FILE_PATH,
        maxFiles: parseEnvInt(process.env.LOG_MAX_FILES, 10),
        maxSize: process.env.LOG_MAX_SIZE || '10m'
      } : undefined,
      console: parseEnvBool(process.env.LOG_CONSOLE, true)
    },
    
    security: {
      apiKeyHeader: process.env.API_KEY_HEADER || 'x-api-key',
      cors: {
        origin: process.env.CORS_ORIGIN || '*',
        credentials: parseEnvBool(process.env.CORS_CREDENTIALS, false),
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
      },
      helmet: parseEnvBool(process.env.SECURITY_HELMET, true)
    },
    
    performance: {
      requestTimeout: parseEnvInt(process.env.REQUEST_TIMEOUT, 30000),
      maxConcurrentRequests: parseEnvInt(process.env.MAX_CONCURRENT_REQUESTS, 100),
      keepAliveTimeout: parseEnvInt(process.env.KEEP_ALIVE_TIMEOUT, 5000),
      compressionLevel: parseEnvInt(process.env.COMPRESSION_LEVEL, 6)
    },
    
    monitoring: {
      enabled: parseEnvBool(process.env.METRICS_ENABLED, true),
      port: parseEnvInt(process.env.METRICS_PORT, 9090),
      healthCheckInterval: parseEnvInt(process.env.HEALTH_CHECK_INTERVAL, 30000),
      metricsCollection: parseEnvBool(process.env.METRICS_COLLECTION, true)
    },
    
    mcpServer: {
      name: process.env.MCP_SERVER_NAME || 'googlemaps-mcp-service',
      version: process.env.MCP_SERVER_VERSION || '1.0.0',
      port: parseEnvInt(process.env.MCP_SERVER_PORT, 3000),
      host: process.env.MCP_SERVER_HOST || '0.0.0.0',
      capabilities: {
        logging: true,
        resources: false,
        tools: true,
        prompts: false
      }
    }
  };

  // Add database config if URL is provided
  if (process.env.DATABASE_URL) {
    appConfig.database = {
      url: process.env.DATABASE_URL,
      maxConnections: parseEnvInt(process.env.DATABASE_MAX_CONNECTIONS, 10),
      idleTimeout: parseEnvInt(process.env.DATABASE_IDLE_TIMEOUT, 30000),
      ssl: parseEnvBool(process.env.DATABASE_SSL, false)
    };
  }

  // Validate configuration
  const errors = validateConfig(appConfig);
  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.map(e => `- ${e.field}: ${e.message}`).join('\n')}`);
  }

  return appConfig;
};

/**
 * Validate application configuration
 */
export const validateConfig = (config: AppConfig): ConfigValidationError[] => {
  const errors: ConfigValidationError[] = [];

  // Validate Google Maps API key
  if (!config.googleMaps.apiKey || config.googleMaps.apiKey.length < 10) {
    errors.push({
      field: 'googleMaps.apiKey',
      message: 'Google Maps API key is required and must be valid',
      value: config.googleMaps.apiKey
    });
  }

  // Validate Redis URL
  if (!config.redis.url || !config.redis.url.startsWith('redis://')) {
    errors.push({
      field: 'redis.url',
      message: 'Redis URL must be a valid redis:// URL',
      value: config.redis.url
    });
  }

  // Validate cache TTL values
  Object.entries(config.cache.ttl).forEach(([key, value]) => {
    if (value < 0) {
      errors.push({
        field: `cache.ttl.${key}`,
        message: 'Cache TTL must be non-negative',
        value
      });
    }
  });

  // Validate rate limiting
  if (config.rateLimit.windowMs <= 0) {
    errors.push({
      field: 'rateLimit.windowMs',
      message: 'Rate limit window must be positive',
      value: config.rateLimit.windowMs
    });
  }

  if (config.rateLimit.maxRequests <= 0) {
    errors.push({
      field: 'rateLimit.maxRequests',
      message: 'Rate limit max requests must be positive',
      value: config.rateLimit.maxRequests
    });
  }

  // Validate server configuration
  if (config.mcpServer.port < 1 || config.mcpServer.port > 65535) {
    errors.push({
      field: 'mcpServer.port',
      message: 'Server port must be between 1 and 65535',
      value: config.mcpServer.port
    });
  }

  return errors;
};

/**
 * Get configuration for specific environment
 */
export const getConfigForEnvironment = (env: Environment): Partial<AppConfig> => {
  const baseConfig = {
    development: {
      logging: { level: 'debug' as const, console: true },
      monitoring: { enabled: true }
    },
    test: {
      logging: { level: 'error' as const, console: false },
      monitoring: { enabled: false },
      cache: { ttl: { default: 60 } }
    },
    staging: {
      logging: { level: 'info' as const },
      monitoring: { enabled: true }
    },
    production: {
      logging: { level: 'warn' as const, console: false },
      monitoring: { enabled: true },
      security: { helmet: true }
    }
  };

  return baseConfig[env] || {};
};

// Export singleton instance
export const appConfig = loadConfig();