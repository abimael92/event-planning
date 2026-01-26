import { describe, it, expect } from 'vitest'
import {
  AppError,
  ErrorCodes,
  normalizeError,
  isOperationalError,
  getUserFriendlyMessage,
  handleError,
  createSafeErrorResponse,
} from '../errors'

describe('Error Utilities', () => {
  describe('AppError', () => {
    it('should create an AppError with all properties', () => {
      const error = new AppError('Test error', ErrorCodes.INTERNAL_ERROR, {
        statusCode: 500,
        context: { userId: 123 },
        isOperational: true,
      })

      expect(error.message).toBe('Test error')
      expect(error.code).toBe(ErrorCodes.INTERNAL_ERROR)
      expect(error.statusCode).toBe(500)
      expect(error.context).toEqual({ userId: 123 })
      expect(error.isOperational).toBe(true)
      expect(error.name).toBe('AppError')
    })

    it('should convert to JSON safely', () => {
      const error = new AppError('Test error', ErrorCodes.VALIDATION_ERROR, {
        statusCode: 400,
        context: { field: 'email' },
      })

      const json = error.toJSON()
      expect(json).toHaveProperty('name', 'AppError')
      expect(json).toHaveProperty('message', 'Test error')
      expect(json).toHaveProperty('code', ErrorCodes.VALIDATION_ERROR)
      expect(json).toHaveProperty('statusCode', 400)
      expect(json).toHaveProperty('context', { field: 'email' })
    })
  })

  describe('normalizeError', () => {
    it('should return AppError as-is', () => {
      const appError = new AppError('Test', ErrorCodes.INTERNAL_ERROR)
      const normalized = normalizeError(appError)
      expect(normalized).toBe(appError)
    })

    it('should convert Error to AppError', () => {
      const error = new Error('Test error')
      const normalized = normalizeError(error)
      
      expect(normalized).toBeInstanceOf(AppError)
      expect(normalized.message).toBe('Test error')
      expect(normalized.code).toBe(ErrorCodes.UNKNOWN_ERROR)
      expect(normalized.isOperational).toBe(false)
    })

    it('should handle string errors', () => {
      const normalized = normalizeError('String error')
      
      expect(normalized).toBeInstanceOf(AppError)
      expect(normalized.message).toBe('String error')
    })

    it('should handle unknown error types', () => {
      const normalized = normalizeError({ message: 'Object error' })
      
      expect(normalized).toBeInstanceOf(AppError)
      expect(normalized.message).toBe('Object error')
    })
  })

  describe('isOperationalError', () => {
    it('should return true for operational AppError', () => {
      const error = new AppError('Test', ErrorCodes.VALIDATION_ERROR, {
        isOperational: true,
      })
      expect(isOperationalError(error)).toBe(true)
    })

    it('should return false for non-operational AppError', () => {
      const error = new AppError('Test', ErrorCodes.UNKNOWN_ERROR, {
        isOperational: false,
      })
      expect(isOperationalError(error)).toBe(false)
    })

    it('should return false for non-AppError', () => {
      expect(isOperationalError(new Error('Test'))).toBe(false)
    })
  })

  describe('getUserFriendlyMessage', () => {
    it('should return user-friendly message for network error', () => {
      const error = new AppError('Network failed', ErrorCodes.NETWORK_ERROR)
      const message = getUserFriendlyMessage(error)
      expect(message).toContain('internet connection')
    })

    it('should return user-friendly message for validation error', () => {
      const error = new AppError('Invalid input', ErrorCodes.VALIDATION_ERROR)
      const message = getUserFriendlyMessage(error)
      expect(message).toContain('check your input')
    })

    it('should return generic message for unknown errors', () => {
      const error = new Error('Unknown error')
      const message = getUserFriendlyMessage(error)
      expect(message).toContain('Something went wrong')
    })
  })

  describe('createSafeErrorResponse', () => {
    it('should create safe error response', () => {
      const error = new AppError('Test error', ErrorCodes.INTERNAL_ERROR)
      const response = createSafeErrorResponse(error)
      
      expect(response).toHaveProperty('error')
      expect(response.error).toHaveProperty('message')
      expect(response.error).toHaveProperty('code', ErrorCodes.INTERNAL_ERROR)
    })

    it('should include details in development', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'
      
      const error = new AppError('Test error', ErrorCodes.INTERNAL_ERROR)
      const response = createSafeErrorResponse(error, true)
      
      expect(response.error).toHaveProperty('details')
      
      process.env.NODE_ENV = originalEnv
    })
  })
})
