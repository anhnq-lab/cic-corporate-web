// ============================================
// CIC Corporate Web — Rate Limiter
// In-memory sliding window rate limiter
// ============================================

interface RateLimitEntry {
  timestamps: number[];
}

// In-memory store (resets on server restart)
const store = new Map<string, RateLimitEntry>();

export interface RateLimitOptions {
  /** Maximum requests allowed in the window */
  max: number;
  /** Window size in milliseconds */
  windowMs: number;
}

/**
 * Sliding window rate limiter
 * @param key - Unique identifier (e.g., IP address)
 * @param options - Rate limit configuration
 * @returns { allowed: boolean; remaining: number; reset: number }
 */
export function rateLimit(
  key: string,
  options: RateLimitOptions = { max: 10, windowMs: 60 * 1000 } // 10 requests per minute
): { allowed: boolean; remaining: number; reset: number; retryAfter?: number } {
  const now = Date.now();
  const { max, windowMs } = options;

  let entry = store.get(key);

  if (!entry) {
    entry = { timestamps: [] };
    store.set(key, entry);
  }

  // Remove timestamps outside the current window
  entry.timestamps = entry.timestamps.filter(
    (ts) => now - ts < windowMs
  );

  const remaining = Math.max(0, max - entry.timestamps.length);
  const reset = now + windowMs;

  if (entry.timestamps.length >= max) {
    // Calculate retry-after based on oldest timestamp in window
    const oldestInWindow = entry.timestamps[0];
    const retryAfter = Math.ceil((oldestInWindow + windowMs - now) / 1000);

    return { allowed: false, remaining: 0, reset, retryAfter };
  }

  // Add current request timestamp
  entry.timestamps.push(now);

  // Clean up old entries periodically (every 100 requests)
  if (store.size > 1000) {
    cleanup();
  }

  return { allowed: true, remaining: remaining - 1, reset };
}

/**
 * Remove expired entries from the store
 */
function cleanup() {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    entry.timestamps = entry.timestamps.filter((ts) => now - ts < 60000);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

/**
 * Get current rate limit status for a key
 */
export function getRateLimitStatus(
  key: string,
  options: RateLimitOptions = { max: 10, windowMs: 60 * 1000 }
): { remaining: number; limit: number; reset: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry) {
    return { remaining: options.max, limit: options.max, reset: now + options.windowMs };
  }

  const active = entry.timestamps.filter((ts) => now - ts < options.windowMs);
  return {
    remaining: Math.max(0, options.max - active.length),
    limit: options.max,
    reset: now + options.windowMs,
  };
}
