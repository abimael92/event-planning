/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export type ErrorSeverityValue = `${ErrorSeverity}`;

/**
 * Error categories
 */
export enum ErrorCategory {
  NETWORK = 'network',
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NOT_FOUND = 'not_found',
  SERVER = 'server',
  CLIENT = 'client',
  UNKNOWN = 'unknown',
}

export type ErrorCategoryValue = `${ErrorCategory}`;

/**
 * Standard error codes
 */
export const ErrorCodes = {
  // Network errors (1xxx)
  NETWORK_ERROR: 'ERR_1000',
  TIMEOUT: 'ERR_1001',
  CONNECTION_REFUSED: 'ERR_1002',
  
  // Validation errors (2xxx)
  VALIDATION_ERROR: 'ERR_2000',
  INVALID_INPUT: 'ERR_2001',
  MISSING_FIELD: 'ERR_2002',
  
  // Auth errors (3xxx)
  UNAUTHORIZED: 'ERR_3000',
  FORBIDDEN: 'ERR_3001',
  SESSION_EXPIRED: 'ERR_3002',
  INVALID_CREDENTIALS: 'ERR_3003',
  
  // Resource errors (4xxx)
  NOT_FOUND: 'ERR_4000',
  CONFLICT: 'ERR_4001',
  GONE: 'ERR_4002',
  
  // Server errors (5xxx)
  INTERNAL_ERROR: 'ERR_5000',
  SERVICE_UNAVAILABLE: 'ERR_5001',
  BAD_GATEWAY: 'ERR_5002',
  
  // Client errors (6xxx)
  UNKNOWN_ERROR: 'ERR_6000',
  COMPONENT_ERROR: 'ERR_6001',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];

/**
 * Error context for logging and debugging
 */
export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  timestamp?: string;
  url?: string;
  userAgent?: string;
  [key: string]: unknown;
}

/**
 * Error metadata
 */
export interface ErrorMetadata {
  code: ErrorCode;
  category: ErrorCategory;
  severity: ErrorSeverity;
  message: string;
  userMessage: string;
  context?: ErrorContext;
  stack?: string;
  cause?: Error;
  retryable: boolean;
  statusCode?: number;
}
