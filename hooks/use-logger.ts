"use client"

import { useCallback } from 'react'
import { logger, type LogContext } from '../app/shared/lib/logger'

/**
 * React hook for logging
 * 
 * Provides a convenient way to log messages from React components
 * with automatic context (component name, props, etc.)
 * 
 * Usage:
 *   const log = useLogger('ComponentName')
 *   log.error('Something went wrong', error, { userId: 123 })
 */
export function useLogger(componentName?: string) {
  const createContext = useCallback(
    (additionalContext?: LogContext): LogContext => {
      return {
        ...(componentName && { component: componentName }),
        ...additionalContext,
      }
    },
    [componentName]
  )

  const logDebug = useCallback(
    (message: string, context?: LogContext) => {
      logger.debug(message, createContext(context))
    },
    [createContext]
  )

  const logInfo = useCallback(
    (message: string, context?: LogContext) => {
      logger.info(message, createContext(context))
    },
    [createContext]
  )

  const logWarn = useCallback(
    (message: string, context?: LogContext) => {
      logger.warn(message, createContext(context))
    },
    [createContext]
  )

  const logError = useCallback(
    (message: string, error?: Error | unknown, context?: LogContext) => {
      logger.error(message, error, createContext(context))
    },
    [createContext]
  )

  return {
    debug: logDebug,
    info: logInfo,
    warn: logWarn,
    error: logError,
  }
}
