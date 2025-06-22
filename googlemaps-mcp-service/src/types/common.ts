/**
 * Common type definitions used across the Google Maps MCP service
 */

export interface BaseResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> extends BaseResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface BoundingBox {
  northeast: Coordinates;
  southwest: Coordinates;
}

export interface Location extends Coordinates {
  address?: string;
  placeId?: string;
  name?: string;
}

export interface Distance {
  value: number; // in meters
  text: string; // human readable
}

export interface Duration {
  value: number; // in seconds
  text: string; // human readable
}

export interface Money {
  currency: string;
  amount: number;
}

export interface OpeningHours {
  openNow: boolean;
  periods?: OpeningPeriod[];
  weekdayText?: string[];
}

export interface OpeningPeriod {
  open: OpeningTime;
  close?: OpeningTime;
}

export interface OpeningTime {
  day: number; // 0-6 (Sunday to Saturday)
  time: string; // HHMM format
}

export interface Photo {
  photoReference: string;
  height: number;
  width: number;
  htmlAttributions: string[];
}

export interface Review {
  authorName: string;
  authorUrl?: string;
  language: string;
  profilePhotoUrl?: string;
  rating: number;
  relativeTimeDescription: string;
  text: string;
  time: number;
}

export interface PlusCode {
  globalCode: string;
  compoundCode?: string;
}

export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'verbose';

export interface ErrorContext {
  service: string;
  method: string;
  params?: Record<string, unknown>;
  userId?: string;
  requestId?: string;
}

export class ServiceError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly context?: ErrorContext;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    statusCode: number = 500,
    context?: ErrorContext
  ) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.statusCode = statusCode;
    this.context = context;
  }
}

export interface ServiceMetrics {
  requests: number;
  errors: number;
  averageResponseTime: number;
  cacheHits: number;
  cacheMisses: number;
  lastUpdated: string;
}

export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  services: {
    redis: boolean;
    googleMaps: boolean;
    database?: boolean;
  };
  metrics: ServiceMetrics;
  timestamp: string;
}

export type Environment = 'development' | 'test' | 'staging' | 'production';