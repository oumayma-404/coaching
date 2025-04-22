/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function HeroSection() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <section className="relative w-full overflow-hidden min-h-[70vh] md:min-h-screen flex items-center">
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <div
                    className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out transform ${
                        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                >
                    <Image
                        src="/images/coach.jpg"
                        alt="Hero Background"
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                        quality={90}
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-[#003942]/60 via-[#003942]/40 to-[#003942]/20"></div>
                </div>
            </div>


            {/* Decorative elements */}
            {/* Content - Positioned lower on the page, especially on mobile */}
            <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full mt-32 sm:mt-28 md:mt-24">
                <div className="max-w-2xl md:ml-12 lg:ml-16 xl:ml-24">
                    <div
                        className={`space-y-4 transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                    >
                        <div className="inline-flex items-center rounded-full border border-[#f4efe8]/20 bg-[#f4efe8]/10 px-3 py-1 text-sm font-medium text-[#f4efe8]">
                            Expert Fitness Coaching
                        </div>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#f4efe8] drop-shadow-md">
                            Transform Your Body, Transform Your <span className="text-[#f4efe8]">Life</span>
                        </h1>
                        <p className="max-w-[600px] text-[#f4efe8]/90 md:text-xl drop-shadow">
                            Expert coaching, personalized plans, and proven results. Start your fitness journey today and become the
                            best version of yourself.
                        </p>
                    </div>
                    <div
                        className={`flex flex-col gap-3 min-[400px]:flex-row mt-8 transition-all duration-700 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                    >
                        <Button
                            className="bg-[#f4efe8] text-[#003942] hover:bg-white shadow-md hover:shadow-lg transition-all"
                            size="lg"
                        >
                            Start Your Journey
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

        </section>
    )
}
