import type { ErrorCode, ErrorContext, ErrorMetadata } from './types';
import { ErrorCodes, ErrorCategory, ErrorSeverity } from './types';

/**
 * Base application error
 */
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly category: ErrorCategory;
  public readonly severity: ErrorSeverity;
  public readonly userMessage: string;
  public readonly context?: ErrorContext;
  public readonly retryable: boolean;
  public readonly statusCode?: number;
  public readonly timestamp: string;

  constructor(metadata: Partial<ErrorMetadata> & { message: string }) {
    super(metadata.message);
    this.name = 'AppError';
    this.code = metadata.code || ErrorCodes.UNKNOWN_ERROR;
    this.category = metadata.category || ErrorCategory.UNKNOWN;
    this.severity = metadata.severity || ErrorSeverity.MEDIUM;
    this.userMessage = metadata.userMessage || 'An unexpected error occurred';
    this.context = metadata.context;
    this.retryable = metadata.retryable ?? false;
    this.statusCode = metadata.statusCode;
    this.timestamp = new Date().toISOString();

    if (metadata.cause) {
      this.cause = metadata.cause;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      category: this.category,
      severity: this.severity,
      userMessage: this.userMessage,
      context: this.context,
      retryable: this.retryable,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

/**
 * Network errors
 */
export class NetworkError extends AppError {
  constructor(message: string, context?: ErrorContext, cause?: Error) {
    super({
      message,
      code: ErrorCodes.NETWORK_ERROR,
      category: ErrorCategory.NETWORK,
      severity: ErrorSeverity.HIGH,
      userMessage: 'Unable to connect. Please check your internet connection.',
      context,
      cause,
      retryable: true,
    });
    this.name = 'NetworkError';
  }
}

/**
 * Validation errors
 */
export class ValidationError extends AppError {
  public readonly fields?: Record<string, string[]>;

  constructor(
    message: string,
    fields?: Record<string, string[]>,
    context?: ErrorContext
  ) {
    super({
      message,
      code: ErrorCodes.VALIDATION_ERROR,
      category: ErrorCategory.VALIDATION,
      severity: ErrorSeverity.LOW,
      userMessage: 'Please check your input and try again.',
      context,
      retryable: false,
      statusCode: 400,
    });
    this.name = 'ValidationError';
    this.fields = fields;
  }
}

/**
 * Authentication errors
 */
export class AuthenticationError extends AppError {
  constructor(message: string, context?: ErrorContext, cause?: Error) {
    super({
      message,
      code: ErrorCodes.UNAUTHORIZED,
      category: ErrorCategory.AUTHENTICATION,
      severity: ErrorSeverity.HIGH,
      userMessage: 'You need to sign in to continue.',
      context,
      cause,
      retryable: false,
      statusCode: 401,
    });
    this.name = 'AuthenticationError';
  }
}

/**
 * Authorization errors
 */
export class AuthorizationError extends AppError {
  constructor(message: string, context?: ErrorContext) {
    super({
      message,
      code: ErrorCodes.FORBIDDEN,
      category: ErrorCategory.AUTHORIZATION,
      severity: ErrorSeverity.HIGH,
      userMessage: "You don't have permission to perform this action.",
      context,
      retryable: false,
      statusCode: 403,
    });
    this.name = 'AuthorizationError';
  }
}

/**
 * Not found errors
 */
export class NotFoundError extends AppError {
  constructor(resource: string, context?: ErrorContext) {
    super({
      message: `${resource} not found`,
      code: ErrorCodes.NOT_FOUND,
      category: ErrorCategory.NOT_FOUND,
      severity: ErrorSeverity.LOW,
      userMessage: 'The requested resource was not found.',
      context,
      retryable: false,
      statusCode: 404,
    });
    this.name = 'NotFoundError';
  }
}

/**
 * Server errors
 */
export class ServerError extends AppError {
  constructor(message: string, context?: ErrorContext, cause?: Error) {
    super({
      message,
      code: ErrorCodes.INTERNAL_ERROR,
      category: ErrorCategory.SERVER,
      severity: ErrorSeverity.CRITICAL,
      userMessage: 'Something went wrong on our end. Please try again later.',
      context,
      cause,
      retryable: true,
      statusCode: 500,
    });
    this.name = 'ServerError';
  }
}
