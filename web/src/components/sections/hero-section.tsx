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
        <section className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32 xl:py-40 bg-[#f4efe8]">
            {/* Decorative elements */}
            <div className="absolute top-20 right-[10%] h-64 w-64 rounded-full bg-[#003942]/10 opacity-30 blur-3xl hidden md:block"></div>
            <div className="absolute bottom-20 left-[10%] h-64 w-64 rounded-full bg-[#003942]/10 opacity-30 blur-3xl hidden md:block"></div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
                <div className="flex flex-col md:block">
                    {/* Text content - always comes first in DOM */}
                    <div className="max-w-xl relative md:mb-0 mb-8">
                        <div
                            className={`space-y-4 transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                        >
                            <div className="inline-flex items-center rounded-full border border-[#003942]/20 bg-[#003942]/10 px-3 py-1 text-sm font-medium text-[#003942]">
                                Expert Fitness Coaching
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#003942]">
                                Transform Your Body, Transform Your <span className="text-[#003942]">Life</span>
                            </h1>
                            <p className="max-w-[600px] text-[#003942]/80 md:text-xl">
                                Expert coaching, personalized plans, and proven results. Start your fitness journey today and become the
                                best version of yourself.
                            </p>
                        </div>
                        <div
                            className={`flex flex-col gap-3 min-[400px]:flex-row mt-8 transition-all duration-700 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                        >
                            <Button
                                className="bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a] shadow-md hover:shadow-lg transition-all"
                                size="lg"
                            >
                                Start Your Journey
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-[#003942]/20 text-[#003942] hover:bg-[#003942]/10 transition-colors"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>

                    {/* Image section - comes after text in DOM but positioned differently on desktop */}
                    <div className="relative w-full h-64 md:hidden mb-8 rounded-lg overflow-hidden">
                        <Image
                            src="/images/coach.jpeg"
                            alt="Hero Image"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-[#003942]/20"></div>
                    </div>
                </div>
            </div>

            {/* Large image that overlaps from the right side - desktop only */}
            <div className="absolute top-0 right-0 w-[50%] h-full overflow-hidden z-0 hidden md:block">
                <div className="absolute -left-32 top-0 h-full w-32 bg-gradient-to-r from-[#f4efe8] to-transparent z-10"></div>
                <Image
                    src="/images/coach.jpeg"
                    alt="Hero Image"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#003942]/20"></div>
            </div>
        </section>
    )
}