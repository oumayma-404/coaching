/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dumbbell, ChevronRight, Users, Calendar, BarChart3, Clock, Star, Trophy } from "lucide-react"
import CenteredContainer from "@/layout/centered-container"
import { CoachingPlanCard } from "@/components/ui/Coaching-plan-card"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

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

export default function CoachingPage() {
    const [coachingProducts, setCoachingProducts] = useState<CoachingProduct[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { addItem } = useCart()
    const { toast } = useToast()

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

    // Function to add premium plan to cart (for CTA buttons)
    const addPremiumPlanToCart = () => {
        if (premiumProduct) {
            addItem({
                id: premiumProduct.id.toString(),
                name: "Premium Plan",
                price: premiumProduct.price , 
                imageUrl: premiumProduct.imageUrl,
                category: "coaching",
                quantity: 1
            })
            toast({
                title: "Added to cart",
                description: `Premium Plan has been added to your cart.`,
                duration: 3000,
            })
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="w-full py-16 md:py-24 bg-gradient-to-r from-[#f4efe8] to-[#e9e2d8]">
                <CenteredContainer>
                    <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                        <div className="inline-flex items-center rounded-full bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                            <Dumbbell className="mr-1 h-4 w-4" />
                            Expert Coaching
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#003942]">
                            Transform Your <span className="text-[#003942]">Potential</span>
                        </h1>
                        <p className="text-xl text-[#003942]/70 max-w-[700px]">
                            Our personalized coaching programs are designed to help you achieve your fitness goals with expert
                            guidance, accountability, and support every step of the way.
                        </p>
                    </div>
                </CenteredContainer>
            </section>

            {/* Philosophy Section - Redesigned with visual elements */}
            <section className="py-20 bg-white">
                <CenteredContainer>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 order-2 md:order-1">
                            <div className="inline-flex items-center rounded-full bg-[#003942]/10 px-3 py-1.5 text-sm font-semibold text-[#003942]">
                                Our Approach
                            </div>
                            <h2 className="text-3xl font-bold text-[#003942]">A Holistic Coaching Philosophy</h2>
                            <p className="text-[#003942]/70 text-lg">
                                At FitCoach, we believe in a comprehensive approach to fitness that addresses all aspects of your
                                well-being. Our methods are backed by science and proven through results.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="flex items-start">
                                    <div className="mr-4 bg-[#003942]/10 p-3 rounded-full">
                                        <Users className="h-5 w-5 text-[#003942]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#003942]">Personalized</h3>
                                        <p className="text-sm text-[#003942]/70">Tailored to your unique needs</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mr-4 bg-[#003942]/10 p-3 rounded-full">
                                        <Calendar className="h-5 w-5 text-[#003942]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#003942]">Consistent</h3>
                                        <p className="text-sm text-[#003942]/70">Regular check-ins and adjustments</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mr-4 bg-[#003942]/10 p-3 rounded-full">
                                        <BarChart3 className="h-5 w-5 text-[#003942]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#003942]">Data-Driven</h3>
                                        <p className="text-sm text-[#003942]/70">Based on proven methods</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mr-4 bg-[#003942]/10 p-3 rounded-full">
                                        <Clock className="h-5 w-5 text-[#003942]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#003942]">Sustainable</h3>
                                        <p className="text-sm text-[#003942]/70">Long-term results that last</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Added visual element */}
                        <div className="relative order-1 md:order-2">
                            <div className="aspect-square max-w-md mx-auto relative">
                                <div className="absolute inset-0 bg-[#003942]/5 rounded-full transform rotate-45"></div>
                                <div className="absolute inset-4 bg-[#003942]/10 rounded-full transform -rotate-12"></div>
                                <div className="absolute inset-8 bg-white rounded-full shadow-lg overflow-hidden border-4 border-[#f4efe8]">
                                    <Image
                                        src="/images/smallCoach.jpeg"
                                        alt="Coaching Philosophy"
                                        width={400}
                                        height={400}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-[#003942] text-white p-4 rounded-full shadow-lg">
                                    <Trophy className="h-8 w-8" />
                                </div>
                            </div>
                        </div>
                    </div>
                </CenteredContainer>
            </section>

            {/* Coaching Plans Section - Enhanced with visual elements */}
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
                            Choose Your Path to Success
                        </h2>
                        <p className="max-w-[800px] text-[#003942]/70 text-lg">
                            Select the coaching program that fits your goals, lifestyle, and budget. All programs include personalized
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

            {/* CTA Section */}
            <section className="py-16 bg-[#003942]">
                <CenteredContainer className="text-center">
                    <div className="max-w-2xl mx-auto text-[#f4efe8]">
                        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Life?</h2>
                        <p className="text-xl mb-8 text-[#f4efe8]/80">
                            Take the first step towards a healthier, stronger you. Choose the coaching plan that's right for you and
                            start your transformation journey today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-[#f4efe8] text-[#003942] hover:bg-white" onClick={addPremiumPlanToCart}>
                                Get Started Now
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                            <a href="https://wa.me/+21620491086">
                                <Button size="lg" variant="outline" className="text-[#f4efe8] border-[#f4efe8] hover:bg-[#f4efe8]/10">
                                    Book Free Consultation
                                </Button>
                            </a>
                        </div>
                    </div>
                </CenteredContainer>
            </section>
        </div>
    )
}
