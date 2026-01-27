/**
 * Error Handling Utilities
 *
 * Provides consistent error objects and error handling patterns
 * throughout the application.
 */

import { logger, type LogContext } from './logger';

/**
 * Standardized application error
 */
export class AppError extends Error {
	public readonly code: string;
	public readonly statusCode?: number;
	public readonly context?: LogContext;
	public readonly isOperational: boolean;

	constructor(
		message: string,
		code: string,
		options?: {
			statusCode?: number;
			context?: LogContext;
			isOperational?: boolean;
			cause?: Error;
		},
	) {
		super(message);
		this.name = 'AppError';
		this.code = code;
		this.statusCode = options?.statusCode;
		this.context = options?.context;
		this.isOperational = options?.isOperational ?? true;
		if (options?.cause) {
			this.cause = options.cause;
		}

		// Maintains proper stack trace for where our error was thrown
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AppError);
		}
	}

	/**
	 * Convert error to a safe object for logging/API responses
	 */
	toJSON(): Record<string, unknown> {
		const result: Record<string, unknown> = {
			name: this.name,
			message: this.message,
			code: this.code,
			statusCode: this.statusCode,
			context: this.context,
			isOperational: this.isOperational,
		};

		// Add cause if it exists (avoid spread type error)
		if (this.cause) {
			result.cause = this.cause instanceof Error
				? this.cause.message
				: String(this.cause);
		}

		return result;
	}
}

/**
 * Common error codes
 */
export const ErrorCodes = {
	// Network errors
	NETWORK_ERROR: 'NETWORK_ERROR',
	TIMEOUT_ERROR: 'TIMEOUT_ERROR',

	// Validation errors
	VALIDATION_ERROR: 'VALIDATION_ERROR',
	INVALID_INPUT: 'INVALID_INPUT',

	// Authentication errors
	UNAUTHORIZED: 'UNAUTHORIZED',
	FORBIDDEN: 'FORBIDDEN',
	SESSION_EXPIRED: 'SESSION_EXPIRED',

	// Resource errors
	NOT_FOUND: 'NOT_FOUND',
	CONFLICT: 'CONFLICT',

	// Server errors
	INTERNAL_ERROR: 'INTERNAL_ERROR',
	SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',

	// Unknown errors
	UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

/**
 * Create a standardized error from any error type
 */
export function normalizeError(error: unknown, context?: LogContext): AppError {
	if (error instanceof AppError) {
		return error;
	}

	if (error instanceof Error) {
		return new AppError(
			error.message || 'An unexpected error occurred',
			ErrorCodes.UNKNOWN_ERROR,
			{
				context: {
					...context,
					originalError: {
						name: error.name,
						message: error.message,
						stack: error.stack,
					},
				},
				isOperational: false,
				cause: error,
			},
		);
	}

	// Handle non-Error objects (strings, objects, etc.)
	const message =
		typeof error === 'string'
			? error
			: error && typeof error === 'object' && 'message' in error
				? String((error as { message: unknown }).message)
				: 'An unexpected error occurred';

	return new AppError(message, ErrorCodes.UNKNOWN_ERROR, {
		context: {
			...context,
			originalError: error,
		},
		isOperational: false,
	});
}

/**
 * Check if an error is operational (expected, can be handled)
 */
export function isOperationalError(error: unknown): boolean {
	if (error instanceof AppError) {
		return error.isOperational;
	}
	return false;
}

/**
 * Get user-friendly error message
 * Returns safe, non-technical messages for users
 */
export function getUserFriendlyMessage(error: unknown): string {
	const normalized = normalizeError(error);

	// Return user-friendly messages based on error code
	switch (normalized.code) {
		case ErrorCodes.NETWORK_ERROR:
			return 'Unable to connect. Please check your internet connection and try again.';
		case ErrorCodes.TIMEOUT_ERROR:
			return 'The request took too long. Please try again.';
		case ErrorCodes.VALIDATION_ERROR:
		case ErrorCodes.INVALID_INPUT:
			return 'Please check your input and try again.';
		case ErrorCodes.UNAUTHORIZED:
			return 'You need to sign in to continue.';
		case ErrorCodes.FORBIDDEN:
			return "You don't have permission to perform this action.";
		case ErrorCodes.SESSION_EXPIRED:
			return 'Your session has expired. Please sign in again.';
		case ErrorCodes.NOT_FOUND:
			return 'The requested resource was not found.';
		case ErrorCodes.CONFLICT:
			return 'This action conflicts with the current state. Please refresh and try again.';
		case ErrorCodes.SERVICE_UNAVAILABLE:
			return 'The service is temporarily unavailable. Please try again later.';
		case ErrorCodes.INTERNAL_ERROR:
		case ErrorCodes.UNKNOWN_ERROR:
		default:
			return 'Something went wrong. Please try again or contact support if the problem persists.';
	}
}

/**
 * Handle and log an error consistently
 */
export function handleError(error: unknown, context?: LogContext): AppError {
	const normalized = normalizeError(error, context);

	// Log the error
	logger.error(`Error handled: ${normalized.message}`, normalized, {
		...normalized.context,
		...context,
		errorCode: normalized.code,
		isOperational: normalized.isOperational,
	});

	return normalized;
}

/**
 * Create a safe error response for API/client communication
 * Strips sensitive information in production
 */
export function createSafeErrorResponse(
	error: unknown,
	includeDetails = false,
): {
	error: {
		message: string;
		code: string;
		details?: unknown;
	};
} {
	const normalized = normalizeError(error);
	const isDevelopment = process.env.NODE_ENV === 'development';

	const errorObj: {
		message: string;
		code: string;
		details?: unknown;
	} = {
		message: getUserFriendlyMessage(normalized),
		code: normalized.code,
	};

	if (includeDetails && isDevelopment) {
		errorObj.details = normalized.toJSON();
	}

	return { error: errorObj };
}
