import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useLogger } from '../use-logger'

// Mock the logger - must be defined inside factory for hoisting
vi.mock('../../app/shared/lib/logger', () => {
  const mockLogger = {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }
  return {
    logger: mockLogger,
  }
})

// Import after mock to get the mocked version
import { logger } from '../../app/shared/lib/logger'

describe('useLogger', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should provide logging methods', () => {
    const { result } = renderHook(() => useLogger())
    
    expect(result.current.debug).toBeDefined()
    expect(result.current.info).toBeDefined()
    expect(result.current.warn).toBeDefined()
    expect(result.current.error).toBeDefined()
  })

  it('should log with component name context', () => {
    const { result } = renderHook(() => useLogger('TestComponent'))
    
    result.current.info('Test message', { userId: 123 })
    
    expect(logger.info).toHaveBeenCalledWith('Test message', {
      component: 'TestComponent',
      userId: 123,
    })
  })

  it('should log without component name', () => {
    const { result } = renderHook(() => useLogger())
    
    const testError = new Error('Error')
    result.current.error('Test error', testError, { context: 'value' })
    
    expect(logger.error).toHaveBeenCalledWith(
      'Test error',
      testError,
      { context: 'value' }
    )
  })
})
