/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ShoppingBag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

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

interface ProductDetailModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
    getImageUrl: (path: string) => string
}

export default function ProductDetailModal({ product, isOpen, onClose, getImageUrl }: ProductDetailModalProps) {
    const [quantity, setQuantity] = useState<number>(1)
    const [activeImage, setActiveImage] = useState<number>(0)
    const { addItem } = useCart()
    const { toast } = useToast()

    if (!isOpen || !product) return null

    // Handle adding item to cart
    const handleAddToCart = () => {
        addItem({
            id: product.id.toString(),
            name: product.name,
            price: product.price, // Convert cents to dollars
            image: getImageUrl(product.imageUrl),
            category: product.category,
            quantity: quantity,
        })

        toast({
            title: "Added to cart",
            description: `${quantity} ${quantity > 1 ? "items" : "item"} of ${product.name} added to your cart.`,
            duration: 3000,
        })
    }
    // Handle adding to wishlist
    const handleAddToWishlist = () => {
        toast({
            title: "Added to wishlist",
            description: `${product.name} has been added to your wishlist.`,
            duration: 3000,
        })
    }

    // Generate placeholder images for the gallery
    const images = [
        getImageUrl(product.imageUrl)
    ]

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
            <div
                className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b">
                    <h2 className="text-xl font-bold text-[#003942] truncate pr-4">{product.name}</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 p-6">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg border border-[#003942]/10">
                            <Image
                                src={images[activeImage] || "/placeholder.svg"}
                                alt={product.name}
                                width={600}
                                height={600}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    // Fallback to placeholder if image fails to load
                                    e.currentTarget.src = "/placeholder.svg?height=600&width=600"
                                }}
                            />
                        </div>

                        {/* Thumbnails */}
                        {/*<div className="grid grid-cols-4 gap-2">
                            {images.map((src, i) => (
                                <div
                                    key={i}
                                    className={`aspect-square overflow-hidden rounded-lg border cursor-pointer ${
                                        activeImage === i ? "border-[#003942] ring-2 ring-[#003942]/20" : "border-[#003942]/10"
                                    }`}
                                    onClick={() => setActiveImage(i)}
                                >
                                    <Image
                                        src={src || "/placeholder.svg"}
                                        alt={`${product.name} view ${i + 1}`}
                                        width={150}
                                        height={150}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>*/}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Product Title and Badges */}
                        <div>
                            <div className="text-sm text-[#003942]/60 mb-1">{product.category}</div>
                        </div>

                        {/* Rating */}
                       

                        {/* Price */}
                        <div className="text-3xl font-bold text-[#003942]">DT {(product.price ).toFixed(2)}</div>

                        {/* Quantity Selector */}
                        <div className="space-y-2">
                            <label htmlFor="quantity" className="block text-sm font-medium text-[#003942]">
                                Quantity
                            </label>
                            <div className="flex items-center">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-r-none"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </Button>
                                <div className="h-10 w-12 flex items-center justify-center border-y border-input">{quantity}</div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-l-none"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        {/* Add to Cart and Wishlist Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button className="bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a] flex-1" onClick={handleAddToCart}>
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                Add to Cart
                            </Button>
                        </div>

                        {/* Product Details Tabs */}
                        <div className="pt-4">
                            <Tabs defaultValue="description">
                                <TabsList className="w-full grid grid-cols-3">
                                    <TabsTrigger value="description">Description</TabsTrigger>
                                </TabsList>
                                <TabsContent value="description" className="pt-4">
                                    <div className="text-[#003942]/80 space-y-4">
                                        <p>{product.description}</p>
                                        <p>
                                            This premium product is designed to enhance your training experience and help you achieve your
                                            fitness goals faster. Made with high-quality materials for durability and performance.
                                        </p>
                                    </div>
                                </TabsContent>
                                {/*} <TabsContent value="details" className="pt-4">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="text-[#003942]/70">Category</div>
                                            <div className="font-medium text-[#003942]">{product.category}</div>

                                            <div className="text-[#003942]/70">Material</div>
                                            <div className="font-medium text-[#003942]">Premium Quality</div>

                                            <div className="text-[#003942]/70">Weight</div>
                                            <div className="font-medium text-[#003942]">0.5 kg</div>

                                            <div className="text-[#003942]/70">Dimensions</div>
                                            <div className="font-medium text-[#003942]">25 x 10 x 5 cm</div>

                                            <div className="text-[#003942]/70">SKU</div>
                                            <div className="font-medium text-[#003942]">PRD-{product.id}</div>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="reviews" className="pt-4">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium text-lg text-[#003942]">Customer Reviews</h3>
                                            <Button variant="outline" size="sm">
                                                Write a Review
                                            </Button>
                                        </div>

                                        {product.reviews > 0 ? (
                                            <div className="space-y-4">
                                                <div className="border-b border-[#003942]/10 pb-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div>
                                                            <div className="font-medium text-[#003942]">John D.</div>
                                                            <div className="text-xs text-[#003942]/50">Verified Purchase</div>
                                                        </div>
                                                        <div className="flex items-center text-[#003942]">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} className={`h-4 w-4 ${i < 5 ? "fill-current" : "fill-none"}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-[#003942]/70">
                                                        Great product! Exactly what I needed for my training routine. The quality is excellent and
                                                        it has helped me improve my performance.
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-[#003942]/50">
                                                No reviews yet. Be the first to review this product!
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>*/}
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
