"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

const testimonials = [
    {
        name: "Rajesh Kumar",
        restaurant: "Spice Garden, Mumbai",
        image: "/testimonials/partner1.jpg",
        rating: 5,
        quote: "Aerobill has completely transformed how we manage orders. Our kitchen efficiency improved by 40%, and customers love the QR ordering. Best investment we made!",
    },
    {
        name: "Priya Sharma",
        restaurant: "Café Sunrise, Delhi",
        image: "/testimonials/partner2.jpg",
        rating: 5,
        quote: "The analytics dashboard helps me understand peak hours and bestsellers. We've increased our revenue by 25% since switching to Aerobill. Highly recommended!",
    },
    {
        name: "Mohammed Ali",
        restaurant: "Biryani House, Hyderabad",
        image: "/testimonials/partner3.jpg",
        rating: 5,
        quote: "No more order mix-ups! The kitchen display system changed everything. Our staff loves it, and order accuracy is now 99%. Thank you Aerobill team!",
    },
    {
        name: "Anita Patel",
        restaurant: "Gujarati Thali, Ahmedabad",
        image: "/testimonials/partner4.jpg",
        rating: 5,
        quote: "Managing 50+ tables was a nightmare before Aerobill. Now everything runs smoothly. The QR codes saved us so much time and reduced our staffing costs!",
    },
    {
        name: "Suresh Reddy",
        restaurant: "Coffee Culture, Bangalore",
        image: "/testimonials/partner5.jpg",
        rating: 5,
        quote: "As a café owner, speed is everything. Aerobill's instant order notification has cut our average serving time by 35%. Customers are happier than ever!",
    },
    {
        name: "Kavitha Nair",
        restaurant: "Kerala Kitchen, Chennai",
        image: "/testimonials/partner6.jpg",
        rating: 5,
        quote: "I was skeptical about digital menus, but Aerobill changed my mind. Easy setup, beautiful design, and my customers love browsing the menu on their phones.",
    },
]

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    // Calculate number of visible cards based on screen size
    const cardsToShow = 3

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, [])

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return
        const interval = setInterval(nextSlide, 4000)
        return () => clearInterval(interval)
    }, [isAutoPlaying, nextSlide])

    // Get visible testimonials (circular)
    const getVisibleTestimonials = () => {
        const visible = []
        for (let i = 0; i < cardsToShow; i++) {
            const index = (currentIndex + i) % testimonials.length
            visible.push({ ...testimonials[index], originalIndex: index })
        }
        return visible
    }

    return (
        <section className="py-20 px-4 bg-[#111827]/50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1.5 bg-[#ff6b35]/10 rounded-full text-[#ff6b35] text-sm font-medium mb-4">
                        ⭐ Trusted by 500+ Restaurants
                    </div>
                    <h2 className="text-3xl font-bold mb-4">What Our Partners Say</h2>
                    <p className="text-gray-400">Real reviews from restaurant owners who transformed their business with Aerobill</p>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-[#1a1a2e] border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#ff6b35]/20 hover:border-[#ff6b35]/50 transition-all shadow-lg"
                        aria-label="Previous testimonial"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-[#1a1a2e] border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#ff6b35]/20 hover:border-[#ff6b35]/50 transition-all shadow-lg"
                        aria-label="Next testimonial"
                    >
                        →
                    </button>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-6 px-8">
                        {getVisibleTestimonials().map((testimonial, idx) => (
                            <div
                                key={`${testimonial.originalIndex}-${idx}`}
                                className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/10 rounded-2xl p-6 hover:border-[#ff6b35]/30 transition-all duration-300 transform hover:scale-[1.02]"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            width={60}
                                            height={60}
                                            className="rounded-full object-cover border-2 border-[#ff6b35]/30"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs">
                                            ✓
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-400">{testimonial.restaurant}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mb-3">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-400">★</span>
                                    ))}
                                </div>
                                <p className="text-gray-300 leading-relaxed text-sm">
                                    &quot;{testimonial.quote}&quot;
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex
                                    ? "bg-[#ff6b35] w-8"
                                    : "bg-white/20 hover:bg-white/40"
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Trust badges */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 items-center">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-[#ff6b35]">500+</p>
                        <p className="text-sm text-gray-400">Active Restaurants</p>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden md:block" />
                    <div className="text-center">
                        <p className="text-3xl font-bold text-[#ff6b35]">50,000+</p>
                        <p className="text-sm text-gray-400">Orders Processed</p>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden md:block" />
                    <div className="text-center">
                        <p className="text-3xl font-bold text-[#ff6b35]">4.8★</p>
                        <p className="text-sm text-gray-400">Average Rating</p>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden md:block" />
                    <div className="text-center">
                        <p className="text-3xl font-bold text-[#ff6b35]">15+</p>
                        <p className="text-sm text-gray-400">Cities in India</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
