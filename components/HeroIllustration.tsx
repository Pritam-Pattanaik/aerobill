"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "./HeroIllustration.module.css"

const featureCards = [
    { label: "QR Code Ordering", icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" },
    { label: "Smart Billing", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { label: "Kitchen Display", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { label: "Auto GST Calc", icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
    { label: "Analytics & Reporting", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
]

// Card positions - closer to the man
const cardPositions = [
    { x: -42, y: -28 },   // top-left
    { x: 42, y: -20 },    // top-right
    { x: -46, y: 18 },    // mid-left
    { x: 46, y: 22 },     // mid-right
    { x: 0, y: 48 },      // bottom-center
]

export default function HeroIllustration() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className={styles.wrap}>
            {/* Orbiting orange glow */}
            <div className={styles.orbitGlow} />
            <div className={styles.orbitGlow2} />

            {/* Background ambient glow */}
            <div className={styles.ambientGlow} />

            {/* Person image */}
            <div className={styles.person}>
                <Image
                    src="/hero-man-cutout.png"
                    alt="Indian restaurant owner using Aerobill dashboard on phone"
                    width={400}
                    height={500}
                    className={styles.personImg}
                    priority
                />
            </div>

            {/* Floating feature cards */}
            {featureCards.map((card, i) => (
                <div
                    key={i}
                    className={`${styles.featureCard} ${mounted ? styles.featureCardVisible : ""}`}
                    style={{
                        left: `calc(50% + ${cardPositions[i].x}%)`,
                        top: `calc(50% + ${cardPositions[i].y}%)`,
                        animationDelay: `${i * 0.8}s`,
                        transitionDelay: `${0.3 + i * 0.12}s`,
                    }}
                >
                    <div className={styles.cardIcon}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                        </svg>
                    </div>
                    <span className={styles.cardLabel}>{card.label}</span>
                </div>
            ))}
        </div>
    )
}
