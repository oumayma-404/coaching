/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Search, Filter, ChevronRight, ChevronDown, Star, Loader2 } from "lucide-react"
import CenteredContainer from "@/layout/centered-container"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import ProductDetailModal from "@/components/ProductDetailsModal"

// Define the Product type based on the API response
interface Product {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    category: string
    rating: number
    reviews: number
    isBestSeller: boolean
    createdAt: string
    updatedAt: string | null
}

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [sortBy, setSortBy] = useState<string>("featured")
    const [showFilters, setShowFilters] = useState<boolean>(false)
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 200 })
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { addItem } = useCart()
    const { toast } = useToast()

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products?sort=featured&page=1&pageSize=50`)

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

    // Get products by category
    const getProductsByCategory = (category: string): Product[] => {
        if (category === "all") {
            return products
        }
        return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    }

    // Filter products based on search query and price range
    const filterProducts = (productList: Product[]): Product[] => {
        return productList.filter(
            (product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                product.price / 100 >= priceRange.min &&
                product.price / 100 <= priceRange.max,
        )
    }

    // Sort products based on selected option
    const sortProducts = (productList: Product[]): Product[] => {
        switch (sortBy) {
            case "price-low":
                return [...productList].sort((a, b) => a.price - b.price)
            case "price-high":
                return [...productList].sort((a, b) => b.price - a.price)
            case "rating":
                return [...productList].sort((a, b) => b.rating - a.rating)
            case "featured":
            default:
                return [...productList].sort((a, b) => (a.isBestSeller === b.isBestSeller ? 0 : a.isBestSeller ? -1 : 1))
        }
    }

    // Get the current products based on active category, search, and filters
    const getCurrentProducts = (): Product[] => {
        const categoryProducts = getProductsByCategory(activeCategory)
        return sortProducts(filterProducts(categoryProducts))
    }

    // Get unique categories from products
    const getUniqueCategories = (): string[] => {
        if (products.length === 0) return []
        return [...new Set(products.map((product) => product.category.toLowerCase()))]
    }

    // Get the base URL for images
    const getImageUrl = (path: string): string => {
        // If the path is already a full URL, return it as is
        if (path?.startsWith("http")) {
            return path
        }

        // Otherwise, prepend the API base URL
        return `${process.env.NEXT_PUBLIC_API_URL}${path}`
    }

    // Handle adding item to cart
    const handleAddToCart = (product: Product, event: React.MouseEvent) => {
        // Stop event propagation to prevent opening the modal when clicking the Add to Cart button
        event.stopPropagation()

        addItem({
            id: product.id.toString(),
            name: product.name,
            price: product.price, // Convert cents to dollars
            image: getImageUrl(product.imageUrl),
            category: product.category,
        })

        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
            duration: 3000,
        })
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
            <div className="min-h-screen bg-white">
                <section className="w-full py-12 md:py-16 bg-gradient-to-r from-[#f4efe8] to-[#e9e2d8]">
                    <CenteredContainer>
                        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                            <div className="inline-flex items-center rounded-full bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                                <ShoppingBag className="mr-1 h-4 w-4" />
                                Shop
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#003942]">
                                Training <span className="text-[#003942]">Essentials</span>
                            </h1>
                            <p className="text-xl text-[#003942]/70 max-w-[700px]">
                                Quality products hand-picked by our coaches to help you reach your fitness goals faster.
                            </p>
                        </div>
                    </CenteredContainer>
                </section>
                <div className="flex justify-center items-center py-32">
                    <Loader2 className="h-10 w-10 text-[#003942] animate-spin" />
                    <span className="ml-2 text-[#003942]">Loading products...</span>
                </div>
            </div>
        )
    }

    // Render error state
    if (error) {
        return (
            <div className="min-h-screen bg-white">
                <section className="w-full py-12 md:py-16 bg-gradient-to-r from-[#f4efe8] to-[#e9e2d8]">
                    <CenteredContainer>
                        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                            <div className="inline-flex items-center rounded-full bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                                <ShoppingBag className="mr-1 h-4 w-4" />
                                Shop
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#003942]">
                                Training <span className="text-[#003942]">Essentials</span>
                            </h1>
                            <p className="text-xl text-[#003942]/70 max-w-[700px]">
                                Quality products hand-picked by our coaches to help you reach your fitness goals faster.
                            </p>
                        </div>
                    </CenteredContainer>
                </section>
                <div className="flex flex-col items-center justify-center py-32">
                    <p className="text-red-500 mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()} className="bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]">
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    // Get unique categories
    const categories = ["all", ...getUniqueCategories()]

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="w-full py-12 md:py-16 bg-gradient-to-r from-[#f4efe8] to-[#e9e2d8]">
                <CenteredContainer>
                    <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                        <div className="inline-flex items-center rounded-full bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                            <ShoppingBag className="mr-1 h-4 w-4" />
                            Shop
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#003942]">
                            Training <span className="text-[#003942]">Essentials</span>
                        </h1>
                        <p className="text-xl text-[#003942]/70 max-w-[700px]">
                            Quality products hand-picked by our coaches to help you reach your fitness goals faster.
                        </p>
                    </div>
                </CenteredContainer>
            </section>

            {/* Categories Section */}
            <section className="py-12 bg-white">
                <CenteredContainer>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {categories.slice(1, 4).map((category, index) => (
                            <div
                                key={category}
                                className="relative overflow-hidden rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer"
                                onClick={() => setActiveCategory(category)}
                            >
                                <Image
                                    src="/placeholder.svg?height=300&width=600"
                                    alt={category}
                                    width={600}
                                    height={300}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#003942]/70 to-transparent flex items-end">
                                    <div className="p-6 text-white">
                                        <h3 className="text-xl font-bold">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                                        <p className="text-sm opacity-90">
                                            {index === 0
                                                ? "Fuel your workouts and recovery"
                                                : index === 1
                                                    ? "Tools for effective training"
                                                    : "Perform in comfort and style"}
                                        </p>
                                        <div className="mt-2 inline-flex items-center text-[#f4efe8] text-sm">
                                            Shop Now <ChevronRight className="ml-1 h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CenteredContainer>
            </section>

            {/* Shop Section */}
            <section className="py-12 bg-[#f4efe8]">
                <CenteredContainer>
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar Filters (Mobile Toggle) */}
                        <div className="md:hidden w-full mb-4">
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-between border-[#003942]/20 text-[#003942]"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                <span className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                            </Button>

                            {showFilters && (
                                <div className="mt-4 p-4 border border-[#003942]/20 rounded-lg bg-white">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium mb-2 text-[#003942]">Price Range</h3>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={priceRange.min}
                                                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                                    className="w-24 border-[#003942]/20"
                                                />
                                                <span className="text-[#003942]">to</span>
                                                <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={priceRange.max}
                                                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                                    className="w-24 border-[#003942]/20"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-medium mb-2 text-[#003942]">Categories</h3>
                                            <div className="space-y-2">
                                                {categories.map((category) => (
                                                    <div key={`mobile-${category}`} className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            id={`mobile-${category}`}
                                                            name="mobile-category"
                                                            checked={activeCategory === category}
                                                            onChange={() => setActiveCategory(category)}
                                                            className="mr-2"
                                                        />
                                                        <label htmlFor={`mobile-${category}`} className="text-[#003942]/70">
                                                            {category === "all"
                                                                ? "All Products"
                                                                : category.charAt(0).toUpperCase() + category.slice(1)}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Filters (Desktop) */}
                        <div className="hidden md:block w-64 shrink-0">
                            <div className="sticky top-4 space-y-6">
                                <div className="p-4 bg-white rounded-lg border border-[#003942]/20">
                                    <h3 className="font-medium text-lg mb-4 text-[#003942]">Categories</h3>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <div
                                                key={`desktop-${category}`}
                                                className={`px-3 py-2 rounded-md cursor-pointer ${
                                                    activeCategory === category
                                                        ? "bg-[#003942]/10 text-[#003942] font-medium"
                                                        : "hover:bg-[#003942]/5 text-[#003942]/70"
                                                }`}
                                                onClick={() => setActiveCategory(category)}
                                            >
                                                {category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 bg-white rounded-lg border border-[#003942]/20">
                                    <h3 className="font-medium text-lg mb-4 text-[#003942]">Price Range</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="number"
                                                placeholder="Min"
                                                value={priceRange.min}
                                                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                                className="w-24 border-[#003942]/20"
                                            />
                                            <span className="text-[#003942]">to</span>
                                            <Input
                                                type="number"
                                                placeholder="Max"
                                                value={priceRange.max}
                                                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                                className="w-24 border-[#003942]/20"
                                            />
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full border-[#003942]/20 text-[#003942] hover:bg-[#003942]/10"
                                            onClick={() => setPriceRange({ min: 0, max: 200 })}
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Search and Sort */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#003942]/40" />
                                    <Input
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 border-[#003942]/20"
                                    />
                                </div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-3 py-2 border border-[#003942]/20 rounded-md bg-white text-[#003942]"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {getCurrentProducts().map((product) => (
                                    <div
                                        key={product.id}
                                        className="group bg-white rounded-lg border border-[#003942]/10 overflow-hidden transition-all hover:shadow-md cursor-pointer"
                                        onClick={() => handleProductClick(product)}
                                    >
                                        <div className="relative aspect-square overflow-hidden group">
                                            <Image
                                                src={getImageUrl(product.imageUrl) || "/placeholder.svg"}
                                                alt={product.name}
                                                width={300}
                                                height={300}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                onError={(e) => {
                                                    // Fallback to placeholder if image fails to load
                                                    e.currentTarget.src = "/placeholder.svg?height=300&width=300"
                                                }}
                                            />
                                        </div>
                                        <div className="p-4">
                                            <div className="text-sm text-[#003942]/50 mb-1">{product.category}</div>
                                            <h3 className="font-medium text-lg mb-1 text-[#003942]">{product.name}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-lg text-[#003942]">DT {(product.price).toFixed(2)}</span>
                                                <Button
                                                    size="sm"
                                                    className="bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]"
                                                    onClick={(e) => handleAddToCart(product, e)}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Empty State */}
                            {getCurrentProducts().length === 0 && (
                                <div className="text-center py-12">
                                    <ShoppingBag className="mx-auto h-12 w-12 text-[#003942]/30 mb-4" />
                                    <h3 className="text-lg font-medium text-[#003942] mb-1">No products found</h3>
                                    <p className="text-[#003942]/50">Try adjusting your search or filter criteria</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CenteredContainer>
            </section>

            {/* Product Detail Modal */}
            <ProductDetailModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                getImageUrl={getImageUrl}
            />
        </div>
    )
}
