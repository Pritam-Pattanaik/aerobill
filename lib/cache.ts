import { unstable_cache } from 'next/cache'

// Cache tags for granular invalidation
export const CacheTags = {
    SYSTEM_STATS: 'system-stats',
    RESTAURANT_STATS: 'restaurant-stats',
    RESTAURANTS_LIST: 'restaurants-list',
    SUBSCRIPTIONS: 'subscriptions',
    ORDERS: 'orders',
} as const

// Cache configuration presets
export const CacheConfig = {
    systemStats: {
        tags: [CacheTags.SYSTEM_STATS] as string[],
        revalidate: 60, // 1 minute
    },
    restaurantStats: {
        tags: [CacheTags.RESTAURANT_STATS] as string[],
        revalidate: 30, // 30 seconds
    },
    restaurantsList: {
        tags: [CacheTags.RESTAURANTS_LIST] as string[],
        revalidate: 120, // 2 minutes
    },
}

// Export unstable_cache directly for use with configs
export { unstable_cache }

