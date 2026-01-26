/**
 * Feature Flag Utility
 * 
 * Provides a centralized way to enable/disable features without code changes.
 * All features are disabled by default for safety.
 * 
 * Usage:
 *   if (isFeatureEnabled('newCheckoutFlow')) {
 *     // Feature code
 *   }
 */

export type FeatureFlag = string;

/**
 * Feature flag definitions
 * Add new features here with default value (always false for safety)
 */
const FEATURE_FLAGS: Record<FeatureFlag, boolean> = {
  // Example flags (all disabled by default)
  // newCheckoutFlow: false,
  // advancedAnalytics: false,
  // realTimeNotifications: false,
};

/**
 * Environment-based feature flags
 * Can be overridden via environment variables: NEXT_PUBLIC_FEATURE_<FLAG_NAME>=true
 */
function getFeatureFlagsFromEnv(): Partial<Record<FeatureFlag, boolean>> {
  if (typeof window === 'undefined') {
    // Server-side: use process.env
    const flags: Partial<Record<FeatureFlag, boolean>> = {};
    Object.keys(FEATURE_FLAGS).forEach((flag) => {
      const envKey = `NEXT_PUBLIC_FEATURE_${flag.toUpperCase().replace(/-/g, '_')}`;
      const envValue = process.env[envKey];
      if (envValue === 'true' || envValue === '1') {
        flags[flag] = true;
      }
    });
    return flags;
  } else {
    // Client-side: feature flags are baked into the build
    // For dynamic client-side flags, you'd need a separate API
    return {};
  }
}

/**
 * Check if a feature is enabled
 * 
 * Priority:
 * 1. Environment variable override
 * 2. Default value from FEATURE_FLAGS
 * 3. false (safety default)
 */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
  const envFlags = getFeatureFlagsFromEnv();
  
  // Check environment override first
  if (envFlags[flag] !== undefined) {
    return envFlags[flag] === true;
  }
  
  // Fall back to default
  return FEATURE_FLAGS[flag] ?? false;
}

/**
 * Get all feature flags and their current state
 * Useful for debugging or admin panels
 */
export function getAllFeatureFlags(): Record<FeatureFlag, boolean> {
  const envFlags = getFeatureFlagsFromEnv();
  const result: Record<FeatureFlag, boolean> = { ...FEATURE_FLAGS };
  
  // Override with environment values
  Object.keys(envFlags).forEach((flag) => {
    result[flag] = envFlags[flag] ?? false;
  });
  
  return result;
}

/**
 * Register a new feature flag (for dynamic registration if needed)
 * Note: This doesn't persist across page reloads
 */
export function registerFeatureFlag(flag: FeatureFlag, defaultValue: boolean = false): void {
  if (!(flag in FEATURE_FLAGS)) {
    FEATURE_FLAGS[flag] = defaultValue;
  }
}
