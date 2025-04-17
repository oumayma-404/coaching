/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

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

    return (
        <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <div className="text-sm text-gray-500">{category}</div>
                <h3 className="font-medium">{name}</h3>
                <div className="mt-1 flex items-center justify-between">
                    <span className="font-bold">${price.toFixed(2)}</span>
                    <Button
                        size="sm"
                        className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}
