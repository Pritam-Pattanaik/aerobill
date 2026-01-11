'use client'

import { SWRConfig } from 'swr'
import { ReactNode } from 'react'

// Global SWR configuration for ultra-fast repeat navigation
const swrConfig = {
    // Keep data fresh for 60 seconds before revalidating
    dedupingInterval: 60000,
    // Revalidate on mount only if data is stale
    revalidateOnMount: true,
    // Revalidate when window gets focus (optional - can disable for less refetch)
    revalidateOnFocus: false,
    // Revalidate when reconnecting
    revalidateOnReconnect: true,
    // Keep previous data while revalidating (stale-while-revalidate)
    keepPreviousData: true,
    // Error retry
    errorRetryCount: 2,
    // Fetcher function
    fetcher: async (url: string) => {
        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
    },
}

export function SWRProvider({ children }: { children: ReactNode }) {
    return (
        <SWRConfig value={swrConfig}>
            {children}
        </SWRConfig>
    )
}
