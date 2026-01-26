/**
 * Global Error Handlers
 * 
 * Sets up global error handlers for unhandled errors and promise rejections.
 * These handlers ensure all errors are logged and visible, even if they
 * occur outside of React components.
 */

import { logger } from './logger'
import { normalizeError, handleError } from './errors'

/**
 * Initialize global error handlers
 * Should be called once when the app starts
 */
export function setupGlobalErrorHandlers(): void {
  // Handle unhandled JavaScript errors
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      const error = event.error || new Error(event.message || 'Unknown error')
      handleError(error, {
        globalError: true,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        source: 'window.onerror',
      })
    })

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason || new Error('Unhandled promise rejection')
      handleError(error, {
        globalError: true,
        source: 'unhandledrejection',
        promise: true,
      })
      
      // Prevent default browser console error (we've logged it)
      // In production, you might want to keep this to see errors in browser console
      if (process.env.NODE_ENV === 'development') {
        event.preventDefault()
      }
    })

    // Handle React errors that escape error boundaries
    // This is a fallback for errors that occur outside React components
    const originalConsoleError = console.error
    console.error = (...args: unknown[]) => {
      // Check if this looks like a React error
      const message = args.join(' ')
      if (
        message.includes('Error:') ||
        message.includes('Warning:') ||
        args.some((arg) => arg instanceof Error)
      ) {
        const error = args.find((arg) => arg instanceof Error) as Error | undefined
        if (error) {
          handleError(error, {
            globalError: true,
            source: 'console.error',
            reactError: true,
          })
        }
      }
      
      // Call original console.error
      originalConsoleError.apply(console, args)
    }
  }

  // Server-side error handling (if needed)
  if (typeof process !== 'undefined') {
    process.on('uncaughtException', (error: Error) => {
      handleError(error, {
        globalError: true,
        source: 'uncaughtException',
        serverSide: true,
      })
      
      // In production, you might want to exit the process
      // For now, we just log it
      if (process.env.NODE_ENV === 'production') {
        // Consider graceful shutdown here
        logger.error('Uncaught exception in production - consider restarting', error)
      }
    })

    process.on('unhandledRejection', (reason: unknown) => {
      handleError(reason, {
        globalError: true,
        source: 'unhandledRejection',
        serverSide: true,
        promise: true,
      })
    })
  }
}

/**
 * Cleanup global error handlers (useful for testing)
 */
export function cleanupGlobalErrorHandlers(): void {
  // Note: In a real app, you'd want to store the original handlers
  // and restore them. For simplicity, we'll just log that cleanup was called.
  logger.info('Global error handlers cleanup called')
}
