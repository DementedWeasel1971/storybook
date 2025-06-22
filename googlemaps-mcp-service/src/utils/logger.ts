import winston from 'winston';
import { appConfig } from './config';
import { LogLevel, ErrorContext } from '@/types';

/**
 * Custom log format for structured logging
 */
const createLogFormat = (isJson: boolean) => {
  const formats = [
    winston.format.timestamp(),
    winston.format.errors({ stack: true })
  ];

  if (isJson) {
    formats.push(winston.format.json());
  } else {
    formats.push(
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
        return `${timestamp} [${level}]: ${message} ${metaStr}`;
      })
    );
  }

  return winston.format.combine(...formats);
};

/**
 * Create winston logger instance
 */
const createLogger = () => {
  const transports: winston.transport[] = [];

  // Console transport
  if (appConfig.logging.console) {
    transports.push(
      new winston.transports.Console({
        level: appConfig.logging.level,
        format: createLogFormat(false)
      })
    );
  }

  // File transport
  if (appConfig.logging.file) {
    transports.push(
      new winston.transports.File({
        level: appConfig.logging.level,
        filename: appConfig.logging.file.path,
        maxFiles: appConfig.logging.file.maxFiles,
        maxsize: appConfig.logging.file.maxSize,
        format: createLogFormat(true)
      })
    );
  }

  return winston.createLogger({
    level: appConfig.logging.level,
    format: createLogFormat(appConfig.logging.format === 'json'),
    transports,
    defaultMeta: {
      service: appConfig.mcpServer.name,
      version: appConfig.mcpServer.version,
      environment: appConfig.environment
    },
    exitOnError: false
  });
};

/**
 * Enhanced logger with service-specific methods
 */
class Logger {
  private winston: winston.Logger;

  constructor() {
    this.winston = createLogger();
  }

  /**
   * Log error with context
   */
  error(message: string, error?: Error, context?: ErrorContext) {
    this.winston.error(message, {
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : undefined,
      context
    });
  }

  /**
   * Log warning
   */
  warn(message: string, meta?: Record<string, unknown>) {
    this.winston.warn(message, meta);
  }

  /**
   * Log info
   */
  info(message: string, meta?: Record<string, unknown>) {
    this.winston.info(message, meta);
  }

  /**
   * Log debug information
   */
  debug(message: string, meta?: Record<string, unknown>) {
    this.winston.debug(message, meta);
  }

  /**
   * Log verbose information
   */
  verbose(message: string, meta?: Record<string, unknown>) {
    this.winston.verbose(message, meta);
  }

  /**
   * Log API request
   */
  logRequest(method: string, url: string, params?: Record<string, unknown>, userId?: string) {
    this.info('API Request', {
      type: 'api_request',
      method,
      url,
      params,
      userId,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log API response
   */
  logResponse(
    method: string,
    url: string,
    statusCode: number,
    responseTime: number,
    userId?: string
  ) {
    this.info('API Response', {
      type: 'api_response',
      method,
      url,
      statusCode,
      responseTime,
      userId,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log cache operation
   */
  logCache(operation: 'hit' | 'miss' | 'set' | 'del', key: string, ttl?: number) {
    this.debug('Cache Operation', {
      type: 'cache_operation',
      operation,
      key,
      ttl,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log performance metrics
   */
  logPerformance(
    operation: string,
    duration: number,
    success: boolean,
    additionalMetrics?: Record<string, unknown>
  ) {
    this.info('Performance Metric', {
      type: 'performance',
      operation,
      duration,
      success,
      ...additionalMetrics,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log security event
   */
  logSecurity(event: string, severity: 'low' | 'medium' | 'high', details?: Record<string, unknown>) {
    this.warn('Security Event', {
      type: 'security',
      event,
      severity,
      details,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log business metric
   */
  logMetric(name: string, value: number, unit?: string, tags?: Record<string, string>) {
    this.info('Business Metric', {
      type: 'metric',
      name,
      value,
      unit,
      tags,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Create child logger with additional context
   */
  child(context: Record<string, unknown>) {
    return {
      error: (message: string, error?: Error, additionalContext?: ErrorContext) =>
        this.error(message, error, { ...context, ...additionalContext } as ErrorContext),
      warn: (message: string, meta?: Record<string, unknown>) =>
        this.warn(message, { ...context, ...meta }),
      info: (message: string, meta?: Record<string, unknown>) =>
        this.info(message, { ...context, ...meta }),
      debug: (message: string, meta?: Record<string, unknown>) =>
        this.debug(message, { ...context, ...meta }),
      verbose: (message: string, meta?: Record<string, unknown>) =>
        this.verbose(message, { ...context, ...meta })
    };
  }

  /**
   * Get underlying winston instance
   */
  getWinstonLogger() {
    return this.winston;
  }

  /**
   * Update log level dynamically
   */
  setLogLevel(level: LogLevel) {
    this.winston.level = level;
    this.winston.transports.forEach(transport => {
      transport.level = level;
    });
  }

  /**
   * Close logger and flush any pending logs
   */
  async close(): Promise<void> {
    return new Promise((resolve) => {
      this.winston.end(() => {
        resolve();
      });
    });
  }
}

// Export singleton instance
export const logger = new Logger();

/**
 * Express middleware for request logging
 */
export const requestLogger = (req: any, res: any, next: any) => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  
  // Add request ID to request object
  req.requestId = requestId;
  
  logger.logRequest(req.method, req.url, {
    query: req.query,
    body: req.method !== 'GET' ? req.body : undefined,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    requestId
  });

  // Log response when finished
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    logger.logResponse(req.method, req.url, res.statusCode, responseTime, requestId);
  });

  next();
};

/**
 * Async error handler with logging
 */
export const asyncErrorHandler = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch((error: Error) => {
      logger.error('Async operation failed', error, {
        service: 'express',
        method: req.method,
        url: req.url,
        requestId: req.requestId
      });
      next(error);
    });
  };
};