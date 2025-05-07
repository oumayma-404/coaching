/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Dumbbell, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import CenteredContainer from "@/layout/centered-container"
import { CoachingPlanCard } from "@/components/ui/Coaching-plan-card"

interface CoachingProduct {
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

export default function CoachingSection() {
    const [coachingProducts, setCoachingProducts] = useState<CoachingProduct[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCoachingProducts = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/Products?category=coaching&sort=featured&page=1&pageSize=10`,
                )

                if (!response.ok) {
                    throw new Error(`Error fetching coaching products: ${response.status}`)
                }

                const data = await response.json()
                setCoachingProducts(data)
            } catch (err) {
                console.error("Failed to fetch coaching products:", err)
                setError("Failed to load coaching products. Using fallback data.")
                // Fallback data if API fails
                setCoachingProducts([
                    {
                        id: 8,
                        name: "video and nutrition plan",
                        description:
                            "Personalized nutrition plan based on your goal.Training videos sent via WhatsApp. Weekly Check-in through message or call",
                        price: 450,
                        imageUrl: "https://res.cloudinary.com/dnifutxfx/image/upload/v1746624286/products/aqemgxujseoaob5q68b3.png",
                        category: "coaching",
                        rating: 0,
                        reviews: 0,
                        isBestSeller: true,
                        createdAt: "2025-05-07T13:24:48.046903Z",
                        updatedAt: null,
                    },
                    {
                        id: 9,
                        name: "Premium Plan",
                        description:
                            "Advanced workout programming. Detailed nutrition plan. Bi-Weekly video calls. 24/7 messaging support. Form check videos",
                        price: 700,
                        imageUrl: "https://res.cloudinary.com/dnifutxfx/image/upload/v1746624375/products/azatoq5cbvolitogwgtq.png",
                        category: "coaching",
                        rating: 0,
                        reviews: 0,
                        isBestSeller: true,
                        createdAt: "2025-05-07T13:26:16.481233Z",
                        updatedAt: null,
                    },
                    {
                        id: 10,
                        name: "All-inclusive Plan",
                        description:
                            "Personalized nutrition program. Weekly training videos. Exclusive motivational content. WhatsApp follow-up",
                        price: 600,
                        imageUrl: "https://res.cloudinary.com/dnifutxfx/image/upload/v1746624457/products/qw962obkz17ukiyzfsap.png",
                        category: "coaching",
                        rating: 0,
                        reviews: 0,
                        isBestSeller: true,
                        createdAt: "2025-05-07T13:27:37.709017Z",
                        updatedAt: null,
                    },
                ])
            } finally {
                setIsLoading(false)
            }
        }

        fetchCoachingProducts()
    }, [])

    // Map product IDs to their respective plan types
    const getProductByName = (name: string) => {
        const normalizedName = name.toLowerCase().trim()
        return coachingProducts.find(
            (product) =>
                product.name.toLowerCase().includes(normalizedName) || normalizedName.includes(product.name.toLowerCase()),
        )
    }

    const videoNutritionProduct = getProductByName("video and nutrition plan") || coachingProducts[0]
    const premiumProduct = getProductByName("premium plan") || coachingProducts[1]
    const allInclusiveProduct = getProductByName("all-inclusive plan") || coachingProducts[2]

    return (
        <section id="coaching-plans" className="py-20 bg-[#f4efe8] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#003942]/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#003942]/5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

            <CenteredContainer>
                <div className="relative flex flex-col items-center justify-center space-y-6 text-center mb-16">
                    <div className="inline-flex items-center rounded-full bg-[#003942]/10 px-3 py-1.5 text-sm font-semibold text-[#003942]">
                        <Dumbbell className="mr-2 h-4 w-4" />
                        Coaching Programs
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#003942]">
                        Personalized Coaching Programs
                    </h2>
                    <p className="max-w-[800px] text-[#003942]/70 text-lg">
                        Choose the coaching program that fits your goals, lifestyle, and budget. All programs include personalized
                        attention and proven methods.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003942]"></div>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {videoNutritionProduct && (
                            <CoachingPlanCard
                                title="Video + Nutrition Plan"
                                description="For those who train on their own but need guidance"
                                price={videoNutritionProduct.price}
                                features={[
                                    "Personalized nutrition plan based on your goal",
                                    "Training videos sent via WhatsApp",
                                    "Weekly Check-in through message or call",
                                ]}
                                accentColor="teal"
                                productId={videoNutritionProduct.id}
                                imageUrl={videoNutritionProduct.imageUrl}
                            />
                        )}

                        {premiumProduct && (
                            <CoachingPlanCard
                                title="Premium Plan"
                                description="Most popular choice"
                                price={premiumProduct.price}
                                features={[
                                    "Advanced workout programming",
                                    "Detailed nutrition plan",
                                    "Bi-Weekly video calls",
                                    "24/7 messaging support",
                                    "Form check videos",
                                ]}
                                highlighted={true}
                                accentColor="teal"
                                productId={premiumProduct.id}
                                imageUrl={premiumProduct.imageUrl}
                            />
                        )}

                        {allInclusiveProduct && (
                            <CoachingPlanCard
                                title="All-inclusive Plan"
                                description="For those who want the maximum results"
                                price={allInclusiveProduct.price}
                                features={[
                                    "Personalized nutrition program",
                                    "Weekly training videos",
                                    "Exclusive motivational content",
                                    "WhatsApp follow-up",
                                ]}
                                accentColor="teal"
                                productId={allInclusiveProduct.id}
                                imageUrl={allInclusiveProduct.imageUrl}
                            />
                        )}
                    </div>
                )}

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-[#003942]/10 mb-6">
                        <Star className="h-5 w-5 text-yellow-500 mr-2" />
                        <p className="text-[#003942] font-medium">
                            Not sure which plan is right for you? Schedule a free consultation call.
                        </p>
                    </div>
                    <a href="https://wa.me/+21620491086">
                        <Button variant="outline" size="lg" className="border-[#003942] text-[#003942] hover:bg-[#003942]/10">
                            Contact me via Whatsapp
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                </div>
            </CenteredContainer>
        </section>
    )
}
