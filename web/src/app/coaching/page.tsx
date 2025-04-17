/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Dumbbell, ChevronRight, Users, Calendar, BarChart3, Clock } from "lucide-react"
import CenteredContainer from "@/layout/centered-container"
import type React from "react";

export default function CoachingPage() {
    return (

        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="w-full py-16 md:py-24 bg-gradient-to-r from-gray-50 to-gray-100">
                <CenteredContainer>
                    <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                        <div className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-sm font-semibold text-orange-800">
                            <Dumbbell className="mr-1 h-4 w-4" />
                            Expert Coaching
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                            Transform Your <span className="text-red-600">Potential</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-[700px]">
                            Our personalized coaching programs are designed to help you achieve your fitness goals with expert
                            guidance, accountability, and support every step of the way.
                        </p>
                    </div>
                </CenteredContainer>
            </section>

            {/* Philosophy Section */}
            <section className="py-16 bg-white">
                <CenteredContainer>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-semibold text-red-800">
                                Our Approach
                            </div>
                            <h2 className="text-3xl font-bold">More Than Just Workouts</h2>
                            <p className="text-gray-600">
                                At Transform Fitness, we believe that successful coaching goes beyond just prescribing exercises. Our
                                holistic approach addresses all aspects of fitness and wellness, including nutrition, recovery, mindset,
                                and lifestyle factors.
                            </p>
                            <p className="text-gray-600">
                                We understand that everyone's journey is unique, which is why our coaching programs are fully customized
                                to your specific goals, preferences, and limitations. Whether you're looking to lose weight, build
                                muscle, improve athletic performance, or simply lead a healthier lifestyle, we have the expertise to
                                guide you.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="flex items-start">
                                    <div className="mr-4 bg-orange-100 p-3 rounded-full">
                                        <Users className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Personalized</h3>
                                        <p className="text-sm text-gray-500">Tailored to your unique needs</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mr-4 bg-red-100 p-3 rounded-full">
                                        <Calendar className="h-5 w-5 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Consistent</h3>
                                        <p className="text-sm text-gray-500">Regular check-ins and adjustments</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mr-4 bg-orange-100 p-3 rounded-full">
                                        <BarChart3 className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Data-Driven</h3>
                                        <p className="text-sm text-gray-500">Based on proven methods</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mr-4 bg-red-100 p-3 rounded-full">
                                        <Clock className="h-5 w-5 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Sustainable</h3>
                                        <p className="text-sm text-gray-500">Long-term results that last</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="rounded-xl overflow-hidden shadow-xl">
                                <Image
                                    src="/placeholder.svg?height=600&width=500"
                                    alt="Coach working with client"
                                    width={500}
                                    height={600}
                                    className="w-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg max-w-xs">
                                <div className="flex items-center mb-2">
                                    <div className="flex -space-x-2 mr-4">
                                        <Image
                                            src="/placeholder.svg?height=40&width=40"
                                            alt="Client"
                                            width={40}
                                            height={40}
                                            className="rounded-full border-2 border-white"
                                        />
                                        <Image
                                            src="/placeholder.svg?height=40&width=40"
                                            alt="Client"
                                            width={40}
                                            height={40}
                                            className="rounded-full border-2 border-white"
                                        />
                                        <Image
                                            src="/placeholder.svg?height=40&width=40"
                                            alt="Client"
                                            width={40}
                                            height={40}
                                            className="rounded-full border-2 border-white"
                                        />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-medium">500+ Clients</p>
                                        <p className="text-gray-500">Transformed</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm">
                                    <div className="flex text-yellow-400 mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                    <p>4.9 average rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CenteredContainer>
            </section>

            {/* Coaching Plans Section */}
            <section className="py-16 bg-gray-50">
                <CenteredContainer>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <div className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-semibold text-red-800">
                            <Dumbbell className="mr-1 h-4 w-4" />
                            Coaching Programs
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter">Choose Your Path to Success</h2>
                        <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Select the coaching program that fits your goals, lifestyle, and budget. All programs include personalized
                            attention and proven methods.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <CoachingPlanCard
                            title="Basic Plan"
                            description="Perfect for beginners"
                            price={99}
                            features={[
                                "Customized workout plan",
                                "Basic nutrition guidance",
                                "Weekly check-ins",
                                "Email support",
                                "Monthly plan adjustments",
                                "Access to training app",
                            ]}
                            accentColor="orange"
                        />
                        <CoachingPlanCard
                            title="Premium Plan"
                            description="Most popular choice"
                            price={199}
                            features={[
                                "Advanced workout programming",
                                "Detailed nutrition plan",
                                "Bi-weekly video calls",
                                "24/7 messaging support",
                                "Form check videos",
                                "Access to training app",
                                "Bi-weekly plan adjustments",
                                "Monthly progress reports",
                            ]}
                            highlighted={true}
                            accentColor="red"
                        />
                        <CoachingPlanCard
                            title="Elite Plan"
                            description="For serious athletes"
                            price={349}
                            features={[
                                "Elite performance programming",
                                "Custom meal plans with recipes",
                                "Weekly 1-on-1 video coaching",
                                "Priority 24/7 support",
                                "Advanced progress tracking",
                                "Supplement recommendations",
                                "Weekly plan adjustments",
                                "Recovery protocols",
                                "Lifestyle coaching",
                            ]}
                            accentColor="orange"
                        />
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-500 mb-4">
                            Not sure which plan is right for you? Schedule a free consultation call.
                        </p>
                        <Button variant="outline" size="lg">
                            Book Free Consultation
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CenteredContainer>
            </section>
            
        </div>
    )
}

interface CoachingPlanCardProps {
    title: string
    description: string
    price: number
    features: string[]
    highlighted?: boolean
    accentColor?: "red" | "orange"
}

function CoachingPlanCard({
                              title,
                              description,
                              price,
                              features,
                              highlighted = false,
                              accentColor = "red",
                          }: CoachingPlanCardProps) {
    const accentClasses = {
        red: "from-red-600 to-red-500",
        orange: "from-orange-600 to-orange-500",
    }

    return (
        <Card
            className={`relative overflow-hidden transition-all ${
                highlighted
                    ? "border-2 border-red-600 shadow-lg scale-105 z-10"
                    : "border border-gray-200 hover:border-gray-300 hover:shadow"
            }`}
        >
            {highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-500 text-white text-center text-sm font-medium py-1">
                    Most Popular
                </div>
            )}
            <CardHeader className={highlighted ? "pt-8" : ""}>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-4xl font-bold">
                    ${price}
                    <span className="text-sm font-normal text-gray-500">/month</span>
                </div>
                <ul className="space-y-2 text-sm">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <Check className={`mr-2 h-4 w-4 ${accentColor === "red" ? "text-red-600" : "text-orange-600"}`} />
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button className={`w-full bg-gradient-to-r hover:opacity-90 text-white ${accentClasses[accentColor]}`}>
                    Get Started
                </Button>
            </CardFooter>
        </Card>
    )
}
