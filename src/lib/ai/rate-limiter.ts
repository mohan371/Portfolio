/**
 * Lightweight sliding window in-memory rate limiter.
 * Protects serverless AI endpoints from spam and denial-of-service.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipMap = new Map<string, RateLimitRecord>();

// Clean up stale IPs every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipMap.entries()) {
      if (record.resetAt < now) {
        ipMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

export function checkRateLimit(
  ip: string,
  limit = 20,
  windowMs = 60 * 1000
): { allowed: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const record = ipMap.get(ip);

  if (!record || record.resetAt < now) {
    ipMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, remaining: limit - 1, resetInSec: Math.ceil(windowMs / 1000) };
  }

  if (record.count >= limit) {
    const resetInSec = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, resetInSec };
  }

  record.count += 1;
  const resetInSec = Math.ceil((record.resetAt - now) / 1000);
  return { allowed: true, remaining: limit - record.count, resetInSec };
}
