/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

interface ProductCardProps {
    id: string
    name: string
    price: number
    image: string
    category: string
}

export default function ProductCard({ id, name, price, image, category }: ProductCardProps) {
    const { addItem } = useCart()
    const { toast } = useToast()
    const [imageError, setImageError] = useState(false)

    // Add a fallback image URL
    const fallbackImage = "/placeholder.svg?height=300&width=300"

    const handleAddToCart = () => {
        addItem({
            id,
            name,
            price,
            image,
            category,
        })

        toast({
            title: "Added to cart",
            description: `${name} has been added to your cart.`,
            duration: 3000,
        })
    }

    const handleImageError = () => {
        setImageError(true)
    }

    return (
        <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={imageError ? fallbackImage : image}
                    alt={name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    onError={handleImageError}
                />
            </div>
            <div className="p-4">
                <div className="text-sm text-[#003942]/70">{category}</div>
                <h3 className="font-medium text-[#003942]">{name}</h3>
                <div className="mt-1 flex items-center justify-between">
                    <span className="font-bold text-[#003942]">${(price / 100).toFixed(2)}</span>
                    <Button size="sm" className="bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}
