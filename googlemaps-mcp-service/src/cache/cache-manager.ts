import crypto from 'crypto';
import { CacheManager, CacheOptions, CacheStrategy, CacheStats } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Abstract base class for cache implementations
 */
export abstract class BaseCacheManager implements CacheManager {
  protected strategies: Map<string, CacheStrategy> = new Map();
  protected stats: CacheStats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    errors: 0,
    totalKeys: 0,
    hitRate: 0,
    averageResponseTime: 0
  };

  abstract get<T>(key: string): Promise<T | null>;
  abstract set<T>(key: string, value: T, options?: CacheOptions): Promise<boolean>;
  abstract del(key: string): Promise<boolean>;
  abstract exists(key: string): Promise<boolean>;
  abstract clear(pattern?: string): Promise<number>;
  abstract ttl(key: string): Promise<number>;
  abstract expire(key: string, ttl: number): Promise<boolean>;
  abstract invalidateByTags(tags: string[]): Promise<number>;
  abstract close(): Promise<void>;

  /**
   * Register a caching strategy
   */
  registerStrategy(name: string, strategy: CacheStrategy): void {
    this.strategies.set(name, strategy);
    logger.debug(`Registered cache strategy: ${name}`);
  }

  /**
   * Get caching strategy by name
   */
  getStrategy(name: string): CacheStrategy | undefined {
    return this.strategies.get(name);
  }

  /**
   * Generate cache key using strategy
   */
  generateKey(
    service: string,
    method: string,
    params: Record<string, unknown>,
    strategyName?: string
  ): string {
    const strategy = strategyName ? this.getStrategy(strategyName) : this.getDefaultStrategy();
    if (strategy) {
      return strategy.getKey(service, method, params);
    }
    
    // Fallback to default key generation
    return this.defaultKeyGeneration(service, method, params);
  }

  /**
   * Default key generation method
   */
  private defaultKeyGeneration(
    service: string,
    method: string,
    params: Record<string, unknown>
  ): string {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = params[key];
        return sorted;
      }, {} as Record<string, unknown>);

    const paramString = JSON.stringify(sortedParams);
    const hash = crypto.createHash('md5').update(paramString).digest('hex');
    
    return `${service}:${method}:${hash}`;
  }

  /**
   * Get default caching strategy
   */
  private getDefaultStrategy(): CacheStrategy | undefined {
    return this.strategies.get('default');
  }

  /**
   * Update cache statistics
   */
  protected updateStats(operation: 'hit' | 'miss' | 'set' | 'del' | 'error', duration?: number): void {
    switch (operation) {
      case 'hit':
        this.stats.hits++;
        break;
      case 'miss':
        this.stats.misses++;
        break;
      case 'set':
        this.stats.sets++;
        break;
      case 'del':
        this.stats.deletes++;
        break;
      case 'error':
        this.stats.errors++;
        break;
    }

    // Calculate hit rate
    const totalRequests = this.stats.hits + this.stats.misses;
    this.stats.hitRate = totalRequests > 0 ? (this.stats.hits / totalRequests) * 100 : 0;

    // Update average response time
    if (duration !== undefined) {
      const totalOperations = this.stats.hits + this.stats.misses + this.stats.sets + this.stats.deletes;
      if (totalOperations > 0) {
        this.stats.averageResponseTime = 
          (this.stats.averageResponseTime * (totalOperations - 1) + duration) / totalOperations;
      }
    }

    // Log performance metrics
    logger.logPerformance(`cache_${operation}`, duration || 0, operation !== 'error', {
      hitRate: this.stats.hitRate,
      totalKeys: this.stats.totalKeys
    });
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<CacheStats> {
    return { ...this.stats };
  }

  /**
   * Check if caching should be applied based on strategy
   */
  protected shouldCache(
    key: string,
    data: unknown,
    strategyName?: string
  ): boolean {
    const strategy = strategyName ? this.getStrategy(strategyName) : this.getDefaultStrategy();
    return strategy ? strategy.shouldCache(key, data) : true;
  }

  /**
   * Get TTL based on strategy
   */
  protected getTTLFromStrategy(
    key: string,
    data: unknown,
    strategyName?: string
  ): number {
    const strategy = strategyName ? this.getStrategy(strategyName) : this.getDefaultStrategy();
    return strategy ? strategy.getTTL(key, data) : 3600; // Default 1 hour
  }

  /**
   * Wrapper method for get operations with stats tracking
   */
  protected async getWithStats<T>(
    key: string,
    getter: () => Promise<T | null>
  ): Promise<T | null> {
    const startTime = Date.now();
    
    try {
      const result = await getter();
      const duration = Date.now() - startTime;
      
      if (result !== null) {
        this.updateStats('hit', duration);
        logger.logCache('hit', key);
      } else {
        this.updateStats('miss', duration);
        logger.logCache('miss', key);
      }
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.updateStats('error', duration);
      logger.error('Cache get operation failed', error as Error, {
        service: 'cache',
        method: 'get',
        params: { key }
      });
      throw error;
    }
  }

  /**
   * Wrapper method for set operations with stats tracking
   */
  protected async setWithStats<T>(
    key: string,
    value: T,
    setter: () => Promise<boolean>,
    ttl?: number
  ): Promise<boolean> {
    const startTime = Date.now();
    
    try {
      const result = await setter();
      const duration = Date.now() - startTime;
      
      this.updateStats('set', duration);
      logger.logCache('set', key, ttl);
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.updateStats('error', duration);
      logger.error('Cache set operation failed', error as Error, {
        service: 'cache',
        method: 'set',
        params: { key, ttl }
      });
      throw error;
    }
  }

  /**
   * Wrapper method for delete operations with stats tracking
   */
  protected async delWithStats(
    key: string,
    deleter: () => Promise<boolean>
  ): Promise<boolean> {
    const startTime = Date.now();
    
    try {
      const result = await deleter();
      const duration = Date.now() - startTime;
      
      this.updateStats('del', duration);
      logger.logCache('del', key);
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.updateStats('error', duration);
      logger.error('Cache delete operation failed', error as Error, {
        service: 'cache',
        method: 'del',
        params: { key }
      });
      throw error;
    }
  }
}

/**
 * Factory function to create cache manager instances
 */
export interface CacheManagerFactory {
  createCacheManager(type: 'redis' | 'memory', config?: any): Promise<CacheManager>;
}

/**
 * Cache manager registry for managing multiple cache instances
 */
export class CacheRegistry {
  private managers: Map<string, CacheManager> = new Map();

  /**
   * Register a cache manager
   */
  register(name: string, manager: CacheManager): void {
    this.managers.set(name, manager);
    logger.info(`Registered cache manager: ${name}`);
  }

  /**
   * Get cache manager by name
   */
  get(name: string): CacheManager | undefined {
    return this.managers.get(name);
  }

  /**
   * Get all registered cache managers
   */
  getAll(): Map<string, CacheManager> {
    return new Map(this.managers);
  }

  /**
   * Remove cache manager
   */
  unregister(name: string): boolean {
    const removed = this.managers.delete(name);
    if (removed) {
      logger.info(`Unregistered cache manager: ${name}`);
    }
    return removed;
  }

  /**
   * Close all cache managers
   */
  async closeAll(): Promise<void> {
    const promises = Array.from(this.managers.values()).map(manager => 
      manager.close().catch(error => 
        logger.error('Failed to close cache manager', error)
      )
    );
    
    await Promise.all(promises);
    this.managers.clear();
    logger.info('All cache managers closed');
  }
}

// Export singleton registry
export const cacheRegistry = new CacheRegistry();