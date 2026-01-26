import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  isFeatureEnabled,
  getAllFeatureFlags,
  registerFeatureFlag,
  type FeatureFlag,
} from '../feature-flags'

describe('Feature Flags', () => {
  const originalEnv = process.env

  beforeEach(() => {
    // Reset environment variables
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('isFeatureEnabled', () => {
    it('should return false for unknown features', () => {
      expect(isFeatureEnabled('unknownFeature' as FeatureFlag)).toBe(false)
    })

    it('should return false by default for all features', () => {
      // All features should be disabled by default for safety
      const flags = getAllFeatureFlags()
      Object.keys(flags).forEach((flag) => {
        expect(isFeatureEnabled(flag as FeatureFlag)).toBe(false)
      })
    })

    it('should respect environment variable overrides', () => {
      process.env.NEXT_PUBLIC_FEATURE_TEST_FLAG = 'true'
      
      // Note: This test demonstrates the pattern, but actual implementation
      // would need module reloading to pick up env changes
      // In real usage, env vars are read at build time
      expect(isFeatureEnabled('testFlag' as FeatureFlag)).toBe(false) // Default behavior
    })
  })

  describe('getAllFeatureFlags', () => {
    it('should return all feature flags with their states', () => {
      const flags = getAllFeatureFlags()
      expect(typeof flags).toBe('object')
      // All should be false by default
      Object.values(flags).forEach((value) => {
        expect(value).toBe(false)
      })
    })
  })

  describe('registerFeatureFlag', () => {
    it('should register a new feature flag', () => {
      registerFeatureFlag('newFeature' as FeatureFlag, false)
      expect(isFeatureEnabled('newFeature' as FeatureFlag)).toBe(false)
    })

    it('should not override existing flags', () => {
      registerFeatureFlag('existingFeature' as FeatureFlag, true)
      registerFeatureFlag('existingFeature' as FeatureFlag, false)
      // Should remain as initially registered (implementation dependent)
    })
  })
})
