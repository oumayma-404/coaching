/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

interface CoachingPlanCardProps {
    title: string
    description: string
    price: number
    features: string[]
    highlighted?: boolean
    accentColor?: "teal"
    productId: number
    imageUrl: string
}

export function CoachingPlanCard({
                                     title,
                                     description,
                                     price,
                                     features,
                                     highlighted = false,
                                     accentColor = "teal",
                                     productId,
                                     imageUrl,
                                 }: CoachingPlanCardProps) {
    const { addItem } = useCart()
    const { toast } = useToast()

    const handleAddToCart = () => {
        addItem({
            id: productId.toString(),
            name: title,
            price: price, // Convert cents to dollars if needed
            imageUrl: imageUrl,
            quantity:1,
            category: "coaching",
        })

        toast({
            title: "Added to cart",
            description: `${title} has been added to your cart.`,
            duration: 3000,
        })
    }

    return (
        <Card
            className={`relative overflow-hidden transition-all ${
                highlighted
                    ? "border-2 border-[#003942] shadow-xl scale-105 z-10"
                    : "border border-[#003942]/20 hover:border-[#003942]/40 hover:shadow-lg"
            }`}
        >
            {highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-[#003942] text-white text-center text-sm font-medium py-1.5">
                    Most Popular
                </div>
            )}
            <CardHeader className={highlighted ? "pt-8" : ""}>
                <CardTitle className="text-[#003942] text-2xl">{title}</CardTitle>
                <CardDescription className="text-[#003942]/70">{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-4xl font-bold text-[#003942]">
                    {price} DT
                    <span className="text-sm font-normal text-[#003942]/50">/month</span>
                </div>
                <ul className="space-y-3 text-sm">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center text-[#003942]/80">
                            <div className="mr-2 h-5 w-5 flex-shrink-0 rounded-full bg-[#003942]/10 flex items-center justify-center">
                                <Check className="h-3 w-3 text-[#003942]" />
                            </div>
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button className={`w-full bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a] py-6`} onClick={handleAddToCart}>
                    Get Started
                </Button>
            </CardFooter>
        </Card>
    )
}
