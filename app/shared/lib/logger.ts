/**
 * Central Logger Abstraction
 * 
 * Provides a unified logging interface that can be easily swapped
 * with different logging services (e.g., Sentry, LogRocket, console)
 * without changing application code.
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogContext {
  [key: string]: unknown;
}

export interface Logger {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, error?: Error | unknown, context?: LogContext): void;
}

class ConsoleLogger implements Logger {
  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  debug(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    console.info(this.formatMessage(LogLevel.INFO, message, context));
  }

  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage(LogLevel.WARN, message, context));
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext = {
      ...context,
      error: error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : error,
    };
    console.error(this.formatMessage(LogLevel.ERROR, message, errorContext));
  }
}

// Singleton logger instance
let loggerInstance: Logger = new ConsoleLogger();

/**
 * Set a custom logger implementation
 * Useful for swapping with production logging services
 */
export function setLogger(logger: Logger): void {
  loggerInstance = logger;
}

/**
 * Get the current logger instance
 */
export function getLogger(): Logger {
  return loggerInstance;
}

/**
 * Default logger export for convenience
 */
export const logger: Logger = {
  debug: (message: string, context?: LogContext) => loggerInstance.debug(message, context),
  info: (message: string, context?: LogContext) => loggerInstance.info(message, context),
  warn: (message: string, context?: LogContext) => loggerInstance.warn(message, context),
  error: (message: string, error?: Error | unknown, context?: LogContext) =>
    loggerInstance.error(message, error, context),
};
