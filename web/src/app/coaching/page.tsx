/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Check, Dumbbell, ChevronRight, Users, Calendar, BarChart3, Clock, Star, Trophy } from "lucide-react"
import CenteredContainer from "@/layout/centered-container"
import {CoachingPlanCard} from "@/components/ui/Coaching-plan-card"

export default function CoachingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="w-full py-16 md:py-24 bg-gradient-to-r from-[#f4efe8] to-[#e9e2d8]">
                <CenteredContainer>
                    <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                        <div
                            className="inline-flex items-center rounded-full bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                            <Dumbbell className="mr-1 h-4 w-4"/>
                            Expert Coaching
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#003942]">
                            Transform Your <span className="text-[#003942]">Potential</span>
                        </h1>
                        <p className="text-xl text-[#003942]/70 max-w-[700px]">
                            Our personalized coaching programs are designed to help you achieve your fitness goals with
                            expert
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
            <section id={"coaching-plans"} className="py-20 bg-[#f4efe8] relative overflow-hidden">
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

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <CoachingPlanCard
                            title="Video + Nutrition Plan"
                            description="For those who train on their own but need guidance"
                            price={450}
                            features={[
                                "Personalized nutrition plan based on your goal",
                                "Training videos sent via WhatsApp",
                                "Weekly Check-in through message or call"
                            ]}
                            accentColor="teal"
                        />
                        <CoachingPlanCard
                            title="Premium Plan"
                            description="Most popular choice"
                            price={700}
                            features={[
                                "Advanced workout programming",
                                "Detailed nutrition plan",
                                "Bi-Weekly video calls",
                                "24/7 messaging support",
                                "Form check videos"
                            ]}
                            highlighted={true}
                            accentColor="teal"
                        />
                        <CoachingPlanCard
                            title="All-inclusive Plan"
                            description="For those who want the maximum results"
                            price={600}
                            features={[
                                "Personalized nutrition program",
                                "Weekly training videos",
                                "Exclusive motivational content",
                                "WhatsApp follow-up"
                            ]}
                            accentColor="teal"
                        />
                        
                    </div>

                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-[#003942]/10 mb-6">
                            <Star className="h-5 w-5 text-yellow-500 mr-2" />
                            <p className="text-[#003942] font-medium">
                                Not sure which plan is right for you? Schedule a free consultation call.
                            </p>
                        </div>
                        <Button variant="outline" size="lg" className="border-[#003942] text-[#003942] hover:bg-[#003942]/10">
                            Book Free Consultation
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CenteredContainer>
            </section>

            {/*{/* Meet the Coaches Section 
            <section className="py-16 bg-white">
                <CenteredContainer>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <div
                            className="inline-flex items-center rounded-full bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                            <Users className="mr-1 h-4 w-4"/>
                            Expert Team
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-[#003942]">Meet Your Coach</h2>
                        <p className="max-w-[900px] text-[#003942]/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our team of certified coaches brings years of experience and specialized knowledge to help
                            you achieve
                            your fitness goals.
                        </p>
                    </div>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <div
                            className="bg-[#f4efe8] border-2 border-[#003942] rounded-xl overflow-hidden max-w-xs w-full shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="aspect-[1] relative">
                                <Image
                                    src="/images/smallCoach.jpeg"
                                    alt="Coach Adnene"
                                    width={350}
                                    height={400}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-[#003942]">Adnene Hamdani</h3>
                                <p className="text-sm text-[#003942] mb-2">Head Coach, Strength Specialist</p>
                                <p className="text-sm text-[#003942]/70 mb-3">
                                    With 10+ years of experience in strength training and nutrition, Alex has helped
                                    hundreds of clients transform their bodies and lives.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <div
                                        className="px-2 py-0.5 bg-[#003942]/10 rounded-full text-xs text-[#003942]">CSCS
                                    </div>
                                    <div className="px-2 py-0.5 bg-[#003942]/10 rounded-full text-xs text-[#003942]">PN
                                        Level 2
                                    </div>
                                    <div
                                        className="px-2 py-0.5 bg-[#003942]/10 rounded-full text-xs text-[#003942]">FMS
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </CenteredContainer>
            </section>*/}

           
            {/* CTA Section */}
            <section className="py-16 bg-[#003942]">
                <CenteredContainer className="text-center">
                    <div className="max-w-2xl mx-auto text-[#f4efe8]">
                        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Life?</h2>
                        <p className="text-xl mb-8 text-[#f4efe8]/80">
                            Take the first step towards a healthier, stronger you. Choose the coaching plan that's right
                            for you and
                            start your transformation journey today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-[#f4efe8] text-[#003942] hover:bg-white">
                                Get Started Now
                                <ChevronRight className="ml-2 h-4 w-4"/>
                            </Button>
                            <Button size="lg" variant="outline"
                                    className="text-[#f4efe8] border-[#f4efe8] hover:bg-[#f4efe8]/10">
                                Book Free Consultation
                            </Button>
                        </div>
                    </div>
                </CenteredContainer>
            </section>
        </div>
    )
}
