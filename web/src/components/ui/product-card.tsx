/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from "next/image"
import {Button} from "@/components/ui/button"
import {useCart} from "@/context/cart-context"
import {useToast} from "@/components/ui/use-toast"
import {useState} from "react"

interface ProductCardProps {
    id: string
    name: string
    price: number
    imageUrl: string
    category: string
    onImageClick?: () => void // Add this prop
}

export default function ProductCard({
                                        id,
                                        name,
                                        price,
                                        imageUrl,
                                        category,
                                        onImageClick
                                    }: ProductCardProps) {
    const {addItem} = useCart()
    const {toast} = useToast()
    const [imageError, setImageError] = useState(false)

    // Add a fallback image URL
    const fallbackImage = "/placeholder.svg?height=300&width=300"

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent event from bubbling up

        addItem({
            id,
            name,
            price,
            imageUrl,
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

    const handleImageClick = () => {
        if (onImageClick) {
            onImageClick()
        }
    }

    return (
        <div
            className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
            onClick={handleImageClick} // Whole card click triggers image click
        >
            <div className="relative aspect-square overflow-hidden cursor-pointer">
                <Image
                    src={imageError ? fallbackImage : imageUrl}
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
                    <span className="font-bold text-[#003942]">DT {price.toFixed(2)}</span>
                    <Button
                        size="sm"
                        className="bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}