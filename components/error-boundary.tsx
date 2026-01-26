"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"
import { logger } from "../app/shared/lib/logger"
import { normalizeError, getUserFriendlyMessage, type AppError } from "../app/shared/lib/errors"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  showDetails?: boolean // Only show technical details in development
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * Global Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 * 
 * Usage:
 *   <ErrorBoundary>
 *     <YourApp />
 *   </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Normalize the error for consistent handling
    const normalized = normalizeError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    })

    // Store error info for display
    this.setState({
      error: normalized,
      errorInfo,
    })

    // Log error to our centralized logger
    logger.error("ErrorBoundary caught an error", normalized, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
      errorCode: normalized.code,
      isOperational: normalized.isOperational,
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  private handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render custom fallback UI or default
      if (this.props.fallback) {
        return this.props.fallback
      }

      const normalized = this.state.error 
        ? normalizeError(this.state.error)
        : null
      
      const userMessage = normalized 
        ? getUserFriendlyMessage(normalized)
        : "We're sorry, but something unexpected happened. Please try refreshing the page."

      const showDetails = this.props.showDetails ?? (process.env.NODE_ENV === "development")
      const isDevelopment = process.env.NODE_ENV === "development"

      // Default error UI - user-safe, no technical details in production
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Something went wrong
              </h1>
              <p className="mb-6 text-gray-600">
                {userMessage}
              </p>
              {showDetails && normalized && (
                <div className="mb-6 rounded-lg bg-red-50 p-4 text-left">
                  <p className="mb-2 text-sm font-semibold text-red-800">Error Details:</p>
                  <div className="space-y-2 text-xs text-red-700">
                    <div>
                      <span className="font-semibold">Code:</span> {normalized.code}
                    </div>
                    {normalized.message && (
                      <div>
                        <span className="font-semibold">Message:</span> {normalized.message}
                      </div>
                    )}
                    {isDevelopment && this.state.error?.stack && (
                      <details className="mt-2">
                        <summary className="cursor-pointer font-semibold">Stack Trace</summary>
                        <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
                          {this.state.error.stack}
                        </pre>
                      </details>
                    )}
                    {isDevelopment && this.state.errorInfo?.componentStack && (
                      <details className="mt-2">
                        <summary className="cursor-pointer font-semibold">Component Stack</summary>
                        <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              )}
              <div className="flex gap-4">
                <button
                  onClick={this.handleReset}
                  className="flex-1 rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Try Again
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
