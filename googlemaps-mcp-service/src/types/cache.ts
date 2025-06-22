/**
 * Cache-related type definitions for the Google Maps MCP service
 */

export interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
  ttl: number;
  key: string;
}

export interface CacheStats {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  errors: number;
  totalKeys: number;
  memoryUsage?: number;
  hitRate: number;
  averageResponseTime: number;
}

export interface CacheOptions {
  ttl?: number;
  compress?: boolean;
  namespace?: string;
  tags?: string[];
}

export interface CacheKey {
  service: string;
  method: string;
  params: string; // hash of parameters
  version?: string;
}

export interface CacheManager {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, options?: CacheOptions): Promise<boolean>;
  del(key: string): Promise<boolean>;
  exists(key: string): Promise<boolean>;
  clear(pattern?: string): Promise<number>;
  ttl(key: string): Promise<number>;
  expire(key: string, ttl: number): Promise<boolean>;
  getStats(): Promise<CacheStats>;
  invalidateByTags(tags: string[]): Promise<number>;
  close(): Promise<void>;
}

export interface CacheStrategy {
  name: string;
  shouldCache(key: string, data: unknown): boolean;
  getTTL(key: string, data: unknown): number;
  getKey(service: string, method: string, params: Record<string, unknown>): string;
}

export interface CacheConfig {
  enabled: boolean;
  defaultTTL: number;
  maxSize: number;
  compression: boolean;
  keyPrefix: string;
  strategies: Record<string, CacheStrategy>;
}

export interface CacheMetrics {
  operations: {
    get: number;
    set: number;
    del: number;
    clear: number;
  };
  performance: {
    avgGetTime: number;
    avgSetTime: number;
    avgDelTime: number;
  };
  memory: {
    used: number;
    available: number;
    percentage: number;
  };
  health: {
    connected: boolean;
    lastError?: string;
    lastHealthCheck: string;
  };
}

export type CacheEventType = 'hit' | 'miss' | 'set' | 'del' | 'clear' | 'error' | 'connect' | 'disconnect';

export interface CacheEvent {
  type: CacheEventType;
  key?: string;
  data?: unknown;
  error?: Error;
  timestamp: number;
  duration?: number;
}

export interface CacheListener {
  (event: CacheEvent): void;
}

export interface DistributedCacheManager extends CacheManager {
  subscribe(pattern: string, callback: (key: string, value: unknown) => void): Promise<void>;
  unsubscribe(pattern: string): Promise<void>;
  publish(channel: string, message: unknown): Promise<number>;
  lock(key: string, ttl: number): Promise<boolean>;
  unlock(key: string): Promise<boolean>;
  addListener(event: CacheEventType, listener: CacheListener): void;
  removeListener(event: CacheEventType, listener: CacheListener): void;
}

export interface CachePolicy {
  name: string;
  rules: {
    geocoding: { ttl: number; maxSize?: number };
    places: { ttl: number; maxSize?: number };
    directions: { ttl: number; maxSize?: number };
    traffic: { ttl: number; maxSize?: number };
    staticMaps: { ttl: number; maxSize?: number };
  };
  evictionStrategy: 'lru' | 'lfu' | 'ttl' | 'random';
  compressionThreshold: number;
}

export interface CacheWarming {
  enabled: boolean;
  strategies: {
    popular: boolean; // Warm popular queries
    predictive: boolean; // Warm predicted queries
    scheduled: boolean; // Warm on schedule
  };
  schedule?: string; // Cron expression
  batchSize: number;
  concurrency: number;
}