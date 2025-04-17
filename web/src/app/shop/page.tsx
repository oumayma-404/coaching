/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Search, Filter, ChevronRight, ChevronDown, Star } from "lucide-react"
import CenteredContainer from "@/layout/centered-container"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
// Product type definition
type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    bestseller: boolean;
};

// Type for products grouped by category
type ProductsByCategory = {
    supplements: Product[];
    equipment: Product[];
    apparel: Product[];
};

// Product data
const products: ProductsByCategory = {
    supplements: [
        {
            id: "s1",
            name: "Premium Protein Powder",
            price: 49.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Supplements",
            rating: 4.8,
            reviews: 124,
            bestseller: true,
        },
        {
            id: "s2",
            name: "Pre-Workout Formula",
            price: 39.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Supplements",
            rating: 4.6,
            reviews: 98,
            bestseller: false,
        },
        {
            id: "s3",
            name: "BCAA Recovery Drink",
            price: 36.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Supplements",
            rating: 4.5,
            reviews: 76,
            bestseller: false,
        },
        {
            id: "s4",
            name: "Multivitamin Complex",
            price: 29.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Supplements",
            rating: 4.7,
            reviews: 112,
            bestseller: false,
        },
        {
            id: "s5",
            name: "Creatine Monohydrate",
            price: 34.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Supplements",
            rating: 4.9,
            reviews: 156,
            bestseller: true,
        },
        {
            id: "s6",
            name: "Omega-3 Fish Oil",
            price: 24.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Supplements",
            rating: 4.4,
            reviews: 87,
            bestseller: false,
        },
    ],
    equipment: [
        {
            id: "e1",
            name: "Resistance Bands Set",
            price: 29.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Equipment",
            rating: 4.7,
            reviews: 143,
            bestseller: true,
        },
        {
            id: "e2",
            name: "Adjustable Dumbbell Set",
            price: 199.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Equipment",
            rating: 4.9,
            reviews: 78,
            bestseller: false,
        },
        {
            id: "e3",
            name: "Fitness Tracker Watch",
            price: 129.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Equipment",
            rating: 4.6,
            reviews: 92,
            bestseller: false,
        },
        {
            id: "e4",
            name: "Yoga Mat Premium",
            price: 49.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Equipment",
            rating: 4.8,
            reviews: 105,
            bestseller: false,
        },
        {
            id: "e5",
            name: "Kettlebell Set",
            price: 149.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Equipment",
            rating: 4.7,
            reviews: 67,
            bestseller: true,
        },
        {
            id: "e6",
            name: "Foam Roller",
            price: 34.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Equipment",
            rating: 4.5,
            reviews: 89,
            bestseller: false,
        },
    ],
    apparel: [
        {
            id: "a1",
            name: "Performance T-Shirt",
            price: 34.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Apparel",
            rating: 4.6,
            reviews: 118,
            bestseller: true,
        },
        {
            id: "a2",
            name: "Compression Leggings",
            price: 59.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Apparel",
            rating: 4.8,
            reviews: 132,
            bestseller: false,
        },
        {
            id: "a3",
            name: "Training Shorts",
            price: 39.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Apparel",
            rating: 4.7,
            reviews: 94,
            bestseller: false,
        },
        {
            id: "a4",
            name: "Workout Hoodie",
            price: 64.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Apparel",
            rating: 4.9,
            reviews: 76,
            bestseller: false,
        },
        {
            id: "a5",
            name: "Athletic Socks (3-Pack)",
            price: 19.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Apparel",
            rating: 4.5,
            reviews: 108,
            bestseller: true,
        },
        {
            id: "a6",
            name: "Workout Gloves",
            price: 24.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Apparel",
            rating: 4.4,
            reviews: 82,
            bestseller: false,
        },
    ],
}

// Combine all products for the "all" tab
const allProducts: Product[] = [...products.supplements, ...products.equipment, ...products.apparel]

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [sortBy, setSortBy] = useState<string>("featured")
    const [showFilters, setShowFilters] = useState<boolean>(false)
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 200 })
    const { addItem } = useCart()
    const { toast } = useToast()

    // Filter products based on search query and price range
    const filterProducts = (productList: Product[]): Product[] => {
        return productList.filter(
            (product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                product.price >= priceRange.min &&
                product.price <= priceRange.max,
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
                return [...productList].sort((a, b) => (a.bestseller === b.bestseller ? 0 : a.bestseller ? -1 : 1))
        }
    }

    // Get the current products based on active category, search, and filters
    const getCurrentProducts = (): Product[] => {
        let currentProducts: Product[] = []

        if (activeCategory === "all") {
            currentProducts = allProducts
        } else {
            currentProducts = products[activeCategory as keyof ProductsByCategory]
        }

        return sortProducts(filterProducts(currentProducts))
    }

    // Handle adding item to cart
    const handleAddToCart = (product: Product) => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
        })

        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
            duration: 3000,
        })
    }


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
                        <div
                            className="relative overflow-hidden rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer"
                            onClick={() => setActiveCategory("supplements")}
                        >
                            <Image
                                src="/placeholder.svg?height=300&width=600"
                                alt="Supplements"
                                width={600}
                                height={300}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#003942]/70 to-transparent flex items-end">
                                <div className="p-6 text-white">
                                    <h3 className="text-xl font-bold">Supplements</h3>
                                    <p className="text-sm opacity-90">Fuel your workouts and recovery</p>
                                    <div className="mt-2 inline-flex items-center text-[#f4efe8] text-sm">
                                        Shop Now <ChevronRight className="ml-1 h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="relative overflow-hidden rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer"
                            onClick={() => setActiveCategory("equipment")}
                        >
                            <Image
                                src="/placeholder.svg?height=300&width=600"
                                alt="Equipment"
                                width={600}
                                height={300}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#003942]/70 to-transparent flex items-end">
                                <div className="p-6 text-white">
                                    <h3 className="text-xl font-bold">Equipment</h3>
                                    <p className="text-sm opacity-90">Tools for effective training</p>
                                    <div className="mt-2 inline-flex items-center text-[#f4efe8] text-sm">
                                        Shop Now <ChevronRight className="ml-1 h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="relative overflow-hidden rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer"
                            onClick={() => setActiveCategory("apparel")}
                        >
                            <Image
                                src="/placeholder.svg?height=300&width=600"
                                alt="Apparel"
                                width={600}
                                height={300}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#003942]/70 to-transparent flex items-end">
                                <div className="p-6 text-white">
                                    <h3 className="text-xl font-bold">Apparel</h3>
                                    <p className="text-sm opacity-90">Perform in comfort and style</p>
                                    <div className="mt-2 inline-flex items-center text-[#f4efe8] text-sm">
                                        Shop Now <ChevronRight className="ml-1 h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="mobile-all"
                                                        name="mobile-category"
                                                        checked={activeCategory === "all"}
                                                        onChange={() => setActiveCategory("all")}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor="mobile-all" className="text-[#003942]/70">
                                                        All Products
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="mobile-supplements"
                                                        name="mobile-category"
                                                        checked={activeCategory === "supplements"}
                                                        onChange={() => setActiveCategory("supplements")}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor="mobile-supplements" className="text-[#003942]/70">
                                                        Supplements
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="mobile-equipment"
                                                        name="mobile-category"
                                                        checked={activeCategory === "equipment"}
                                                        onChange={() => setActiveCategory("equipment")}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor="mobile-equipment" className="text-[#003942]/70">
                                                        Equipment
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="mobile-apparel"
                                                        name="mobile-category"
                                                        checked={activeCategory === "apparel"}
                                                        onChange={() => setActiveCategory("apparel")}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor="mobile-apparel" className="text-[#003942]/70">
                                                        Apparel
                                                    </label>
                                                </div>
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
                                        <div
                                            className={`px-3 py-2 rounded-md cursor-pointer ${activeCategory === "all" ? "bg-[#003942]/10 text-[#003942] font-medium" : "hover:bg-[#003942]/5 text-[#003942]/70"}`}
                                            onClick={() => setActiveCategory("all")}
                                        >
                                            All Products
                                        </div>
                                        <div
                                            className={`px-3 py-2 rounded-md cursor-pointer ${activeCategory === "supplements" ? "bg-[#003942]/10 text-[#003942] font-medium" : "hover:bg-[#003942]/5 text-[#003942]/70"}`}
                                            onClick={() => setActiveCategory("supplements")}
                                        >
                                            Supplements
                                        </div>
                                        <div
                                            className={`px-3 py-2 rounded-md cursor-pointer ${activeCategory === "equipment" ? "bg-[#003942]/10 text-[#003942] font-medium" : "hover:bg-[#003942]/5 text-[#003942]/70"}`}
                                            onClick={() => setActiveCategory("equipment")}
                                        >
                                            Equipment
                                        </div>
                                        <div
                                            className={`px-3 py-2 rounded-md cursor-pointer ${activeCategory === "apparel" ? "bg-[#003942]/10 text-[#003942] font-medium" : "hover:bg-[#003942]/5 text-[#003942]/70"}`}
                                            onClick={() => setActiveCategory("apparel")}
                                        >
                                            Apparel
                                        </div>
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
                                        className="bg-white rounded-lg border border-[#003942]/10 overflow-hidden transition-all hover:shadow-md"
                                    >
                                        <div className="relative">
                                            <Image
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                width={300}
                                                height={300}
                                                className="w-full h-64 object-cover"
                                            />
                                            {product.bestseller && (
                                                <div className="absolute top-2 left-2 bg-[#003942] text-white text-xs font-bold px-2 py-1 rounded">
                                                    BESTSELLER
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="text-sm text-[#003942]/50 mb-1">{product.category}</div>
                                            <h3 className="font-medium text-lg mb-1 text-[#003942]">{product.name}</h3>
                                            <div className="flex items-center mb-2">
                                                <div className="flex items-center text-[#003942] mr-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "fill-none"}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-[#003942]/50">
                          {product.rating} ({product.reviews})
                        </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-lg text-[#003942]">${product.price.toFixed(2)}</span>
                                                <Button
                                                    size="sm"
                                                    className="bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]"
                                                    onClick={() => handleAddToCart(product)}
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
        </div>
    )

}