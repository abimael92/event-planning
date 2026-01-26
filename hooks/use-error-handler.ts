"use client"

import { useCallback } from 'react'
import { useLogger } from './use-logger'
import {
  handleError,
  getUserFriendlyMessage,
  isOperationalError,
  type AppError,
} from '../app/shared/lib/errors'
import { toast } from 'sonner'

/**
 * React hook for consistent error handling
 * 
 * Provides a standardized way to handle errors in React components
 * with automatic logging and user notifications.
 * 
 * Usage:
 *   const handleError = useErrorHandler('ComponentName')
 *   
 *   try {
 *     await someAsyncOperation()
 *   } catch (error) {
 *     handleError(error, { showToast: true })
 *   }
 */
export function useErrorHandler(componentName?: string) {
  const log = useLogger(componentName)

  const handle = useCallback(
    (
      error: unknown,
      options?: {
        showToast?: boolean
        toastMessage?: string
        context?: Record<string, unknown>
        onError?: (error: AppError) => void
      }
    ): AppError => {
      // Normalize and handle the error
      const normalized = handleError(error, {
        ...(componentName && { component: componentName }),
        ...options?.context,
      })

      // Show user-friendly toast notification if requested
      if (options?.showToast !== false) {
        const message = options?.toastMessage || getUserFriendlyMessage(normalized)
        toast.error(message, {
          duration: normalized.isOperational ? 4000 : 6000,
        })
      }

      // Call custom error handler if provided
      if (options?.onError) {
        options.onError(normalized)
      }

      return normalized
    },
    [log, componentName]
  )

  return handle
}

/**
 * Hook for handling async operations with error handling
 * 
 * Usage:
 *   const executeWithErrorHandling = useAsyncErrorHandler('ComponentName')
 *   
 *   await executeWithErrorHandling(async () => {
 *     await someAsyncOperation()
 *   })
 */
export function useAsyncErrorHandler(componentName?: string) {
  const handleError = useErrorHandler(componentName)

  return useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      options?: {
        showToast?: boolean
        toastMessage?: string
        context?: Record<string, unknown>
        onError?: (error: AppError) => void
      }
    ): Promise<T | null> => {
      try {
        return await asyncFn()
      } catch (error) {
        handleError(error, options)
        return null
      }
    },
    [handleError]
  )
}
