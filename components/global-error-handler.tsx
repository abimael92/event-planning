"use client"

import { useEffect } from 'react'
import { setupGlobalErrorHandlers, cleanupGlobalErrorHandlers } from '../app/shared/lib/global-error-handler'

/**
 * Global Error Handler Component
 * 
 * Sets up global error handlers when the app mounts.
 * This component should be placed in the root layout.
 */
export function GlobalErrorHandler() {
  useEffect(() => {
    // Setup global error handlers when component mounts
    setupGlobalErrorHandlers()

    // Cleanup when component unmounts (though this shouldn't happen in root layout)
    return () => {
      cleanupGlobalErrorHandlers()
    }
  }, [])

  // This component doesn't render anything
  return null
}
