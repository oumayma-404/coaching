/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import type React from "react"

import {useState, useEffect} from "react"
import Link from "next/link"
import {ShoppingBag, ArrowRight, ChevronLeft, ChevronRight, Loader2} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import ProductCard from "@/components/ui/product-card"
import ProductDetailModal from "@/components/ProductDetailsModal";

// Define the Product type based on the API response
interface Product {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    category: string
    createdAt: string
    updatedAt: string | null
}

export default function ShopSection() {
    const [activeTab, setActiveTab] = useState("all")
    const [currentSlide, setCurrentSlide] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

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

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true)
            setError(null)

            try {
                // Update the fetch URL to use the environment variable
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products?sort=featured&page=1&pageSize=12`)

                if (!response.ok) {
                    throw new Error(`Error fetching products: ${response.status}`)
                }

                const data = await response.json()
                setProducts(data)
            } catch (err) {
                console.error("Failed to fetch products:", err)
                setError("Failed to load products. Please try again later.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [])

    // Filter products by category
    const getProductsByCategory = (category: string) => {
        if (category === "all") {
            return products
        }
        return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    }

    // Get current products based on active tab
    const getCurrentProducts = () => {
        return getProductsByCategory(activeTab)
    }

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        setCurrentSlide(0) // Reset to first slide when changing tabs
    }

    // Handle slider navigation
    const nextSlide = () => {
        const currentProducts = getCurrentProducts()
        if (currentProducts.length === 0) return

        setCurrentSlide((prev) => (prev === currentProducts.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        const currentProducts = getCurrentProducts()
        if (currentProducts.length === 0) return

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

    // Get the base URL for images
    const getImageUrl = (path: string) => {
        // If the path is already a full URL, return it as is
        if (path?.startsWith("http")) {
            return path
        }

        // Otherwise, prepend the API base URL
        return `${process.env.NEXT_PUBLIC_API_URL}${path}`
    }

    // Handle product click to open modal
    const handleProductClick = (product: Product) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }

    // Close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    // Render loading state
    if (isLoading) {
        return (
            <section id="shop" className="w-full py-12 md:py-24 lg:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div
                                className="inline-flex items-center rounded-full border border-[#003942]/20 bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                                <ShoppingBag className="mr-1 h-4 w-4"/>
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
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-10 w-10 text-[#003942] animate-spin"/>
                        <span className="ml-2 text-[#003942]">Loading products...</span>
                    </div>
                </div>
            </section>
        )
    }

    // Render error state
    if (error) {
        return (
            <section id="shop" className="w-full py-12 md:py-24 lg:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div
                                className="inline-flex items-center rounded-full border border-[#003942]/20 bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                                <ShoppingBag className="mr-1 h-4 w-4"/>
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
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-red-500 mb-4">{error}</p>
                        <Button onClick={() => window.location.reload()}
                                className="bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]">
                            Try Again
                        </Button>
                    </div>
                </div>
            </section>
        )
    }

    // Get unique categories from products
    const categories = ["all", ...new Set(products.map((product) => product.category.toLowerCase()))]

    return (
        <section id="shop" className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div
                            className="inline-flex items-center rounded-full border border-[#003942]/20 bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                            <ShoppingBag className="mr-1 h-4 w-4"/>
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
                            {categories.map((category) => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className={
                                        activeTab === category
                                            ? "data-[state=active]:bg-[#003942]/10 data-[state=active]:text-[#003942]"
                                            : ""
                                    }
                                >
                                    {category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {categories.map((category) => (
                        <TabsContent key={category} value={category} className="mt-6 relative">
                            {/* Mobile Slider */}
                            <div className="sm:hidden relative">
                                {getProductsByCategory(category).length > 0 ? (
                                    <>
                                        <div
                                            className="overflow-hidden"
                                            onTouchStart={handleTouchStart}
                                            onTouchMove={handleTouchMove}
                                            onTouchEnd={handleTouchEnd}
                                        >
                                            <div
                                                className="flex transition-transform duration-700 ease-in-out"
                                                style={{transform: `translateX(-${currentSlide * 100}%)`}}
                                            >
                                                {getProductsByCategory(category)?.map((product) => (
                                                    <div
                                                        key={`${category}-mobile-${product.id}`}
                                                        className="w-full flex-shrink-0 px-4 cursor-pointer transition-transform hover:scale-[1.02]"
                                                        role="button"
                                                        tabIndex={0}
                                                        aria-label={`View ${product.name} details`}
                                                    >
                                                        <ProductCard
                                                            id={product.id.toString()}
                                                            name={product.name}
                                                            price={product.price}
                                                            image={product.imageUrl ? getImageUrl(product.imageUrl) : '/placeholder-product.jpg'}
                                                            category={product.category}
                                                            onImageClick={() => handleProductClick(product)} // This will only be called on image/card click
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
                                            <ChevronLeft className="h-6 w-6 text-[#003942]"/>
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10"
                                            aria-label="Next product"
                                        >
                                            <ChevronRight className="h-6 w-6 text-[#003942]"/>
                                        </button>

                                        {/* Pagination Dots */}
                                        <div className="flex justify-center mt-4 space-x-2">
                                            {getProductsByCategory(category).map((_, index) => (
                                                <button
                                                    key={`dot-${category}-${index}`}
                                                    className={`h-2 rounded-full transition-all ${
                                                        currentSlide === index ? "w-6 bg-[#003942]" : "w-2 bg-[#003942]/30"
                                                    }`}
                                                    onClick={() => setCurrentSlide(index)}
                                                    aria-label={`Go to slide ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-[#003942]/70">No products found in this category.</p>
                                    </div>
                                )}
                            </div>

                            {/* Desktop Grid */}
                            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6"
                            >
                                {getProductsByCategory(category)?.map((product) => (
                                    <div key={`${category}-desktop-${product.id}`}>
                                        <ProductCard
                                            id={product.id.toString()}
                                            name={product.name}
                                            price={product.price}
                                            image={product.imageUrl ? getImageUrl(product.imageUrl) : '/placeholder-product.jpg'}
                                            category={product.category}
                                            onImageClick={() => handleProductClick(product)} // This will only be called on image/card click

                                        />
                                    </div>
                                )) }: (
                                    <div className="col-span-full text-center py-10">
                                        <p className="text-[#003942]/70">No products found in this category.</p>
                                    </div>
                                )
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

                <div className="mt-12 flex justify-center">
                    <Link href="/shop">
                        <Button variant="outline" size="lg"
                                className="border-[#003942] text-[#003942] hover:bg-[#003942]/10 group">
                            View All Products
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                        </Button>
                    </Link>
                </div>
            </div>
            {/* Product Detail Modal */}
            <ProductDetailModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                getImageUrl={getImageUrl}
            />
        </section>
    )
}
