export const ratelimit = {
    limit: async (identifier: string) => {
        // In a real app, use Redis (e.g., Upstash).
        // For this environment, we'll use a simple in-memory Map
        // reset every 10 seconds.

        const now = Date.now();
        const windowStart = Math.floor(now / 10000) * 10000;
        const key = `${identifier}:${windowStart}`;

        // Check if we hit the limit (e.g., 5 requests per 10s)
        if (memoryCache.has(key)) {
            const count = memoryCache.get(key) || 0;
            if (count >= 5) {
                return { success: false };
            }
            memoryCache.set(key, count + 1);
        } else {
            memoryCache.set(key, 1);
            // Cleanup old keys
            cleanUpCache(windowStart);
        }

        return { success: true };
    }
};

const memoryCache = new Map<string, number>();

function cleanUpCache(currentWindowStart: number) {
    for (const key of memoryCache.keys()) {
        const windowStart = parseInt(key.split(':')[1]);
        if (windowStart < currentWindowStart) {
            memoryCache.delete(key);
        }
    }
}
