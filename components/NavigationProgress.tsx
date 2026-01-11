"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

/**
 * Navigation progress bar that shows during route transitions
 */
export default function NavigationProgress() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isNavigating, setIsNavigating] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Start animation when route changes
        setIsNavigating(true)
        setProgress(30)

        const timer1 = setTimeout(() => setProgress(60), 100)
        const timer2 = setTimeout(() => setProgress(80), 200)
        const timer3 = setTimeout(() => {
            setProgress(100)
            setTimeout(() => {
                setIsNavigating(false)
                setProgress(0)
            }, 200)
        }, 300)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
        }
    }, [pathname, searchParams])

    if (!isNavigating) return null

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-1">
            <div
                className="h-full bg-gradient-to-r from-[var(--primary)] via-[var(--warning)] to-[var(--primary)] transition-all duration-300 ease-out"
                style={{
                    width: `${progress}%`,
                    boxShadow: "0 0 10px var(--primary), 0 0 5px var(--primary)"
                }}
            />
        </div>
    )
}
