import { describe, it, expect, vi, beforeEach } from 'vitest'
import { logger, LogLevel, setLogger, getLogger, type Logger } from '../logger'

describe('Logger', () => {
  beforeEach(() => {
    // Reset to default logger before each test
    setLogger({
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    })
  })

  describe('logger instance', () => {
    it('should log debug messages', () => {
      const mockLogger = {
        debug: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
      }
      setLogger(mockLogger)

      logger.debug('Test debug message', { key: 'value' })

      expect(mockLogger.debug).toHaveBeenCalledWith('Test debug message', { key: 'value' })
    })

    it('should log info messages', () => {
      const mockLogger = {
        debug: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
      }
      setLogger(mockLogger)

      logger.info('Test info message', { key: 'value' })

      expect(mockLogger.info).toHaveBeenCalledWith('Test info message', { key: 'value' })
    })

    it('should log warn messages', () => {
      const mockLogger = {
        debug: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
      }
      setLogger(mockLogger)

      logger.warn('Test warn message', { key: 'value' })

      expect(mockLogger.warn).toHaveBeenCalledWith('Test warn message', { key: 'value' })
    })

    it('should log error messages with Error object', () => {
      const mockLogger = {
        debug: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
      }
      setLogger(mockLogger)

      const error = new Error('Test error')
      logger.error('Test error message', error, { key: 'value' })

      expect(mockLogger.error).toHaveBeenCalledWith('Test error message', error, { key: 'value' })
    })

    it('should log error messages without Error object', () => {
      const mockLogger = {
        debug: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
      }
      setLogger(mockLogger)

      logger.error('Test error message', undefined, { key: 'value' })

      expect(mockLogger.error).toHaveBeenCalledWith('Test error message', undefined, { key: 'value' })
    })
  })

  describe('logger management', () => {
    it('should allow setting a custom logger', () => {
      const customLogger: Logger = {
        debug: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
      }

      setLogger(customLogger)
      const retrieved = getLogger()

      expect(retrieved).toBe(customLogger)
    })
  })
})
