/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/components/ui/product-card"

export default function ShopSection() {
    const [activeTab, setActiveTab] = useState("all")
    const [currentSlide, setCurrentSlide] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const sliderRefs = {
        all: useRef<HTMLDivElement>(null),
        supplements: useRef<HTMLDivElement>(null),
        equipment: useRef<HTMLDivElement>(null),
        apparel: useRef<HTMLDivElement>(null),
    }

    // Check if we're on mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640)
            // Reset current slide when resizing
            setCurrentSlide(0)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Product data that could be fetched from an API
    const products = {
        supplements: [
            {
                id: "s1",
                name: "Premium Protein Powder",
                price: 49.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Supplements",
            },
            {
                id: "s2",
                name: "Pre-Workout Formula",
                price: 39.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Supplements",
            },
            {
                id: "s3",
                name: "BCAA Recovery Drink",
                price: 36.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Supplements",
            },
            {
                id: "s4",
                name: "Multivitamin Complex",
                price: 29.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Supplements",
            },
        ],
        equipment: [
            {
                id: "e1",
                name: "Resistance Bands Set",
                price: 29.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Equipment",
            },
            {
                id: "e2",
                name: "Adjustable Dumbbell Set",
                price: 199.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Equipment",
            },
            {
                id: "e3",
                name: "Fitness Tracker Watch",
                price: 129.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Equipment",
            },
            {
                id: "e4",
                name: "Yoga Mat Premium",
                price: 49.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Equipment",
            },
        ],
        apparel: [
            {
                id: "a1",
                name: "Performance T-Shirt",
                price: 34.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Apparel",
            },
            {
                id: "a2",
                name: "Compression Leggings",
                price: 59.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Apparel",
            },
            {
                id: "a3",
                name: "Training Shorts",
                price: 39.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Apparel",
            },
            {
                id: "a4",
                name: "Workout Hoodie",
                price: 64.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Apparel",
            },
        ],
    }

    // Combine all products for the "all" tab
    const allProducts = [
        ...products.supplements.slice(0, 2),
        ...products.equipment.slice(0, 2),
        ...products.apparel.slice(0, 2),
        ...products.supplements.slice(2, 3),
        ...products.equipment.slice(2, 3),
    ]

    // Get current products based on active tab
    const getCurrentProducts = () => {
        switch (activeTab) {
            case "supplements":
                return products.supplements
            case "equipment":
                return products.equipment
            case "apparel":
                return products.apparel
            default:
                return allProducts
        }
    }

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        setCurrentSlide(0) // Reset to first slide when changing tabs
    }

    // Handle slider navigation
    const nextSlide = () => {
        const currentProducts = getCurrentProducts()
        setCurrentSlide((prev) => (prev === currentProducts.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        const currentProducts = getCurrentProducts()
        setCurrentSlide((prev) => (prev === 0 ? currentProducts.length - 1 : prev - 1))
    }

    // Touch handlers for swipe gestures
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            // Swipe left
            nextSlide()
        }

        if (touchEnd - touchStart > 75) {
            // Swipe right
            prevSlide()
        }
    }

    return (
        <section id="shop" className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-flex items-center rounded-full border border-[#003942]/20 bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                            <ShoppingBag className="mr-1 h-4 w-4" />
                            Shop
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#003942]">
                            Training <span className="text-[#003942]">Essentials</span>
                        </h2>
                        <p className="max-w-[900px] text-[#003942]/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Quality products hand-picked by our coaches to help you reach your fitness goals faster.
                        </p>
                    </div>
                </div>
                <Tabs defaultValue="all" className="mt-8" onValueChange={handleTabChange}>
                    <div className="flex justify-center">
                        <TabsList className="bg-white border">
                            <TabsTrigger
                                value="all"
                                className={
                                    activeTab === "all" ? "data-[state=active]:bg-[#003942]/10 data-[state=active]:text-[#003942]" : ""
                                }
                            >
                                All Products
                            </TabsTrigger>
                            <TabsTrigger
                                value="supplements"
                                className={
                                    activeTab === "supplements"
                                        ? "data-[state=active]:bg-[#003942]/10 data-[state=active]:text-[#003942]"
                                        : ""
                                }
                            >
                                Supplements
                            </TabsTrigger>
                            <TabsTrigger
                                value="equipment"
                                className={
                                    activeTab === "equipment"
                                        ? "data-[state=active]:bg-[#003942]/10 data-[state=active]:text-[#003942]"
                                        : ""
                                }
                            >
                                Equipment
                            </TabsTrigger>
                            <TabsTrigger
                                value="apparel"
                                className={
                                    activeTab === "apparel"
                                        ? "data-[state=active]:bg-[#003942]/10 data-[state=active]:text-[#003942]"
                                        : ""
                                }
                            >
                                Apparel
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* All Products Tab */}
                    <TabsContent value="all" className="mt-6 relative">
                        {/* Mobile Slider */}
                        <div className="sm:hidden relative">
                            <div
                                className="overflow-hidden"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div
                                    className="flex transition-transform duration-300 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {allProducts.map((product, index) => (
                                        <div key={`all-mobile-${index}`} className="w-full flex-shrink-0 px-4">
                                            <ProductCard
                                                id={product.id}
                                                name={product.name}
                                                price={product.price}
                                                image={product.image}
                                                category={product.category}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10"
                                aria-label="Previous product"
                            >
                                <ChevronLeft className="h-6 w-6 text-[#003942]" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10"
                                aria-label="Next product"
                            >
                                <ChevronRight className="h-6 w-6 text-[#003942]" />
                            </button>

                            {/* Pagination Dots */}
                            <div className="flex justify-center mt-4 space-x-2">
                                {allProducts.map((_, index) => (
                                    <button
                                        key={`dot-all-${index}`}
                                        className={`h-2 rounded-full transition-all ${
                                            currentSlide === index ? "w-6 bg-[#003942]" : "w-2 bg-[#003942]/30"
                                        }`}
                                        onClick={() => setCurrentSlide(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Desktop Grid */}
                        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {allProducts.map((product, index) => (
                                <ProductCard
                                    key={`all-desktop-${index}`}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    {/* Supplements Tab */}
                    <TabsContent value="supplements" className="mt-6 relative">
                        {/* Mobile Slider */}
                        <div className="sm:hidden relative">
                            <div
                                className="overflow-hidden"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div
                                    className="flex transition-transform duration-300 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {products.supplements.map((product, index) => (
                                        <div key={`supplements-mobile-${index}`} className="w-full flex-shrink-0 px-4">
                                            <ProductCard
                                                id={product.id}
                                                name={product.name}
                                                price={product.price}
                                                image={product.image}
                                                category={product.category}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10"
                                aria-label="Previous product"
                            >
                                <ChevronLeft className="h-6 w-6 text-[#003942]" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10"
                                aria-label="Next product"
                            >
                                <ChevronRight className="h-6 w-6 text-[#003942]" />
                            </button>

                            {/* Pagination Dots */}
                            <div className="flex justify-center mt-4 space-x-2">
                                {products.supplements.map((_, index) => (
                                    <button
                                        key={`dot-supplements-${index}`}
                                        className={`h-2 rounded-full transition-all ${
                                            currentSlide === index ? "w-6 bg-[#003942]" : "w-2 bg-[#003942]/30"
                                        }`}
                                        onClick={() => setCurrentSlide(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Desktop Grid */}
                        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.supplements.map((product, index) => (
                                <ProductCard
                                    key={`supplements-desktop-${index}`}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    {/* Equipment Tab */}
                    <TabsContent value="equipment" className="mt-6 relative">
                        {/* Mobile Slider */}
                        <div className="sm:hidden relative">
                            <div
                                className="overflow-hidden"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div
                                    className="flex transition-transform duration-300 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {products.equipment.map((product, index) => (
                                        <div key={`equipment-mobile-${index}`} className="w-full flex-shrink-0 px-4">
                                            <ProductCard
                                                id={product.id}
                                                name={product.name}
                                                price={product.price}
                                                image={product.image}
                                                category={product.category}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10"
                                aria-label="Previous product"
                            >
                                <ChevronLeft className="h-6 w-6 text-[#003942]" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10"
                                aria-label="Next product"
                            >
                                <ChevronRight className="h-6 w-6 text-[#003942]" />
                            </button>

                            {/* Pagination Dots */}
                            <div className="flex justify-center mt-4 space-x-2">
                                {products.equipment.map((_, index) => (
                                    <button
                                        key={`dot-equipment-${index}`}
                                        className={`h-2 rounded-full transition-all ${
                                            currentSlide === index ? "w-6 bg-[#003942]" : "w-2 bg-[#003942]/30"
                                        }`}
                                        onClick={() => setCurrentSlide(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Desktop Grid */}
                        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.equipment.map((product, index) => (
                                <ProductCard
                                    key={`equipment-desktop-${index}`}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    {/* Apparel Tab */}
                    <TabsContent value="apparel" className="mt-6 relative">
                        {/* Mobile Slider */}
                        <div className="sm:hidden relative">
                            <div
                                className="overflow-hidden"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div
                                    className="flex transition-transform duration-300 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {products.apparel.map((product, index) => (
                                        <div key={`apparel-mobile-${index}`} className="w-full flex-shrink-0 px-4">
                                            <ProductCard
                                                id={product.id}
                                                name={product.name}
                                                price={product.price}
                                                image={product.image}
                                                category={product.category}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10"
                                aria-label="Previous product"
                            >
                                <ChevronLeft className="h-6 w-6 text-[#003942]" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10"
                                aria-label="Next product"
                            >
                                <ChevronRight className="h-6 w-6 text-[#003942]" />
                            </button>

                            {/* Pagination Dots */}
                            <div className="flex justify-center mt-4 space-x-2">
                                {products.apparel.map((_, index) => (
                                    <button
                                        key={`dot-apparel-${index}`}
                                        className={`h-2 rounded-full transition-all ${
                                            currentSlide === index ? "w-6 bg-[#003942]" : "w-2 bg-[#003942]/30"
                                        }`}
                                        onClick={() => setCurrentSlide(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Desktop Grid */}
                        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.apparel.map((product, index) => (
                                <ProductCard
                                    key={`apparel-desktop-${index}`}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="mt-12 flex justify-center">
                    <Link href="/shop">
                        <Button variant="outline" size="lg" className="border-[#003942] text-[#003942] hover:bg-[#003942]/10 group">
                            View All Products
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
