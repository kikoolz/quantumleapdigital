# Rate Limiting Improvements

## Current Implementation
The current rate limiting uses an in-memory Map, which works for:
- Development environments
- Single-instance deployments
- Low traffic scenarios

## Limitations
- **No persistence**: Rate limit data is lost on server restart
- **No scaling**: Doesn't work across multiple server instances
- **No distributed support**: Each instance maintains its own rate limit state

## Recommended Upgrades

### Option 1: Redis (Recommended for Production)
Install Redis client:
```bash
npm install ioredis
```

Update rate limiting in API routes:
```typescript
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

async function checkRateLimit(ip: string, limit: number = 10, window: number = 60) {
  const key = `ratelimit:${ip}`;
  const current = await redis.incr(key);
  
  if (current === 1) {
    await redis.expire(key, window);
  }
  
  return current <= limit;
}
```

### Option 2: Upstash Redis (Serverless-friendly)
```bash
npm install @upstash/redis
```

### Option 3: Database-backed Rate Limiting
Use the existing Neon database to store rate limit data in a dedicated table.

## Configuration Required
- Add REDIS_URL to environment variables
- Set up Redis instance (Redis Cloud, Upstash, or self-hosted)
- Update all API routes to use the new rate limiting function

## Priority
This is a **low priority** improvement. The current in-memory implementation is sufficient for:
- Development and testing
- Small-scale deployments
- Single-instance Vercel deployments

Upgrade to Redis when:
- Deploying to multiple regions
- Experiencing high traffic (1000+ requests/minute)
- Need consistent rate limiting across instances
