import { LogLevel, Environment } from './common';

export interface GoogleMapsConfig {
  apiKey: string;
  region?: string;
  language?: string;
  units?: 'metric' | 'imperial';
  timeout?: number;
  retries?: number;
}

export interface RedisConfig {
  url: string;
  password?: string;
  db?: number;
  keyPrefix?: string;
  connectTimeout?: number;
  commandTimeout?: number;
  retryDelayOnFailover?: number;
  maxRetriesPerRequest?: number;
}

export interface CacheConfig {
  ttl: {
    geocoding: number;
    places: number;
    directions: number;
    traffic: number;
    staticMaps: number;
    default: number;
  };
  maxSize?: number;
  compression?: boolean;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipFailedRequests?: boolean;
  skipSuccessfulRequests?: boolean;
  keyGenerator?: (req: any) => string;
}

export interface LoggingConfig {
  level: LogLevel;
  format: 'json' | 'simple';
  file?: {
    path: string;
    maxFiles: number;
    maxSize: string;
  };
  console?: boolean;
}

export interface SecurityConfig {
  apiKeyHeader: string;
  cors: {
    origin: string | string[];
    credentials: boolean;
    methods?: string[];
    allowedHeaders?: string[];
  };
  helmet?: boolean;
}

export interface PerformanceConfig {
  requestTimeout: number;
  maxConcurrentRequests: number;
  keepAliveTimeout: number;
  compressionLevel?: number;
}

export interface MonitoringConfig {
  enabled: boolean;
  port?: number;
  healthCheckInterval: number;
  metricsCollection?: boolean;
}

export interface MCPServerConfig {
  name: string;
  version: string;
  port: number;
  host?: string;
  capabilities?: {
    logging?: boolean;
    resources?: boolean;
    tools?: boolean;
    prompts?: boolean;
  };
}

export interface DatabaseConfig {
  url?: string;
  maxConnections?: number;
  idleTimeout?: number;
  ssl?: boolean;
}

export interface AppConfig {
  environment: Environment;
  googleMaps: GoogleMapsConfig;
  redis: RedisConfig;
  cache: CacheConfig;
  rateLimit: RateLimitConfig;
  logging: LoggingConfig;
  security: SecurityConfig;
  performance: PerformanceConfig;
  monitoring: MonitoringConfig;
  mcpServer: MCPServerConfig;
  database?: DatabaseConfig;
}

export interface ConfigValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export type ConfigValidator = (config: Partial<AppConfig>) => ConfigValidationError[];