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
        <section className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32 xl:py-48">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f4efe8] via-[#f4efe8] to-[#e9e2d8]"></div>

            {/* Decorative elements */}
            <div className="absolute top-20 right-[10%] h-64 w-64 rounded-full bg-[#003942]/10 opacity-30 blur-3xl"></div>
            <div className="absolute bottom-20 left-[10%] h-64 w-64 rounded-full bg-[#003942]/10 opacity-30 blur-3xl"></div>

            {/* Diagonal lines decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full bg-[linear-gradient(45deg,#003942_1px,transparent_1px),linear-gradient(-45deg,#003942_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                    <div className="flex flex-col justify-center space-y-6">
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
                            className={`flex flex-col gap-3 min-[400px]:flex-row transition-all duration-700 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
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

                    <div
                        className={`flex items-center justify-center transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                    >
                        <div className="relative">
                            {/* Image with styling */}
                            <div className="overflow-hidden rounded-2xl bg-[#003942] p-1 shadow-xl">
                                <Image
                                    src="/placeholder.svg?height=550&width=550"
                                    width={550}
                                    height={550}
                                    alt="Hero Image"
                                    className="rounded-xl object-cover"
                                    priority
                                />
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full border-8 border-white bg-[#f4efe8]"></div>
                            <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full border-8 border-white bg-[#003942]/20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
