/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Dumbbell, ChevronRight, Users, Calendar, BarChart3, Clock } from "lucide-react"
import CenteredContainer from "@/layout/centered-container"

export default function CoachingPage() {
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

            {/* Philosophy Section */}
            <section className="py-16 bg-white">
                <CenteredContainer>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center rounded-full bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                                Our Approach
                            </div>
                            <h2 className="text-3xl font-bold text-[#003942]">More Than Just Workouts</h2>
                            <p className="text-[#003942]/70">
                                At Transform Fitness, we believe that successful coaching goes beyond just prescribing exercises. Our
                                holistic approach addresses all aspects of fitness and wellness, including nutrition, recovery, mindset,
                                and lifestyle factors.
                            </p>
                            <p className="text-[#003942]/70">
                                We understand that everyone's journey is unique, which is why our coaching programs are fully customized
                                to your specific goals, preferences, and limitations. Whether you're looking to lose weight, build
                                muscle, improve athletic performance, or simply lead a healthier lifestyle, we have the expertise to
                                guide you.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="flex items-start">
                                    <div className="mr-4 bg-[#003942]/10 p-3 rounded-full">
                                        <Users className="h-5 w-5 text-[#003942]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#003942]">Personalized</h3>
                                        <p className="text-sm text-[#003942]/50">Tailored to your unique needs</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mr-4 bg-[#003942]/10 p-3 rounded-full">
                                        <Calendar className="h-5 w-5 text-[#003942]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#003942]">Consistent</h3>
                                        <p className="text-sm text-[#003942]/50">Regular check-ins and adjustments</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mr-4 bg-[#003942]/10 p-3 rounded-full">
                                        <BarChart3 className="h-5 w-5 text-[#003942]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#003942]">Data-Driven</h3>
                                        <p className="text-sm text-[#003942]/50">Based on proven methods</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mr-4 bg-[#003942]/10 p-3 rounded-full">
                                        <Clock className="h-5 w-5 text-[#003942]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#003942]">Sustainable</h3>
                                        <p className="text-sm text-[#003942]/50">Long-term results that last</p>
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
                                        <p className="font-medium text-[#003942]">500+ Clients</p>
                                        <p className="text-[#003942]/50">Transformed</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm">
                                    <div className="flex text-[#003942] mr-2">
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
                                    <p className="text-[#003942]/70">4.9 average rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CenteredContainer>
            </section>

            {/* Coaching Plans Section */}
            <section className="py-16 bg-[#f4efe8]">
                <CenteredContainer>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <div className="inline-flex items-center rounded-full bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                            <Dumbbell className="mr-1 h-4 w-4" />
                            Coaching Programs
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-[#003942]">Choose Your Path to Success</h2>
                        <p className="max-w-[900px] text-[#003942]/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
                            accentColor="teal"
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
                            accentColor="teal"
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
                            accentColor="teal"
                        />
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-[#003942]/70 mb-4">
                            Not sure which plan is right for you? Schedule a free consultation call.
                        </p>
                        <Button variant="outline" size="lg" className="border-[#003942] text-[#003942] hover:bg-[#003942]/10">
                            Book Free Consultation
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CenteredContainer>
            </section>

            {/* Meet the Coaches Section */}
            <section className="py-16 bg-white">
                <CenteredContainer>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <div className="inline-flex items-center rounded-full bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                            <Users className="mr-1 h-4 w-4" />
                            Expert Team
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-[#003942]">Meet Your Coaches</h2>
                        <p className="max-w-[900px] text-[#003942]/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our team of certified coaches brings years of experience and specialized knowledge to help you achieve
                            your fitness goals.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-[#f4efe8] rounded-xl overflow-hidden">
                            <div className="aspect-[3/4] relative">
                                <Image
                                    src="/placeholder.svg?height=400&width=300"
                                    alt="Coach Alex"
                                    width={300}
                                    height={400}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#003942]">Alex Johnson</h3>
                                <p className="text-[#003942] mb-3">Head Coach, Strength Specialist</p>
                                <p className="text-[#003942]/70 mb-4">
                                    With 10+ years of experience in strength training and nutrition, Alex has helped hundreds of clients
                                    transform their bodies and lives.
                                </p>
                                <div className="flex space-x-2">
                                    <div className="px-3 py-1 bg-[#003942]/10 rounded-full text-xs text-[#003942]">CSCS</div>
                                    <div className="px-3 py-1 bg-[#003942]/10 rounded-full text-xs text-[#003942]">PN Level 2</div>
                                    <div className="px-3 py-1 bg-[#003942]/10 rounded-full text-xs text-[#003942]">FMS</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f4efe8] rounded-xl overflow-hidden">
                            <div className="aspect-[3/4] relative">
                                <Image
                                    src="/placeholder.svg?height=400&width=300"
                                    alt="Coach Sarah"
                                    width={300}
                                    height={400}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#003942]">Sarah Martinez</h3>
                                <p className="text-[#003942] mb-3">Nutrition Coach, Weight Loss Expert</p>
                                <p className="text-[#003942]/70 mb-4">
                                    Sarah specializes in nutrition strategies for sustainable weight loss and body composition
                                    improvement, with a focus on habit-based approaches.
                                </p>
                                <div className="flex space-x-2">
                                    <div className="px-3 py-1 bg-[#003942]/10 rounded-full text-xs text-[#003942]">PN Level 2</div>
                                    <div className="px-3 py-1 bg-[#003942]/10 rounded-full text-xs text-[#003942]">NASM-CNC</div>
                                    <div className="px-3 py-1 bg-[#003942]/10 rounded-full text-xs text-[#003942]">ACE-CPT</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f4efe8] rounded-xl overflow-hidden">
                            <div className="aspect-[3/4] relative">
                                <Image
                                    src="/placeholder.svg?height=400&width=300"
                                    alt="Coach Mike"
                                    width={300}
                                    height={400}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#003942]">Mike Chen</h3>
                                <p className="text-[#003942] mb-3">Performance Coach, Mobility Specialist</p>
                                <p className="text-[#003942]/70 mb-4">
                                    Mike focuses on athletic performance, injury prevention, and mobility. His background in physical
                                    therapy gives him unique insights into movement patterns.
                                </p>
                                <div className="flex space-x-2">
                                    <div className="px-3 py-1 bg-[#003942]/10 rounded-full text-xs text-[#003942]">CSCS</div>
                                    <div className="px-3 py-1 bg-[#003942]/10 rounded-full text-xs text-[#003942]">DPT</div>
                                    <div className="px-3 py-1 bg-[#003942]/10 rounded-full text-xs text-[#003942]">FRC</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CenteredContainer>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-[#f4efe8]">
                <CenteredContainer>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <div className="inline-flex items-center rounded-full bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                            Success Stories
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-[#003942]">What Our Clients Say</h2>
                        <p className="max-w-[900px] text-[#003942]/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Real feedback from real people who have transformed their lives through our coaching programs.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#003942]/10">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                                    <Image
                                        src="/placeholder.svg?height=48&width=48"
                                        alt="Client"
                                        width={48}
                                        height={48}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-[#003942]">James Wilson</p>
                                    <p className="text-sm text-[#003942]/50">Premium Plan • 6 months</p>
                                </div>
                            </div>
                            <p className="text-[#003942]/70 italic mb-4">
                                "The personalized approach made all the difference. My coach understood my busy schedule and created a
                                plan that actually worked for my lifestyle. Down 30lbs and feeling better than ever!"
                            </p>
                            <div className="flex text-[#003942]">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#003942]/10">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                                    <Image
                                        src="/placeholder.svg?height=48&width=48"
                                        alt="Client"
                                        width={48}
                                        height={48}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-[#003942]">Emily Rodriguez</p>
                                    <p className="text-sm text-[#003942]/50">Elite Plan • 3 months</p>
                                </div>
                            </div>
                            <p className="text-[#003942]/70 italic mb-4">
                                "As a busy mom of three, I never thought I'd find time to work out. My coach helped me find pockets of
                                time and efficient workouts that fit my chaotic schedule. The nutrition guidance was life-changing!"
                            </p>
                            <div className="flex text-[#003942]">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#003942]/10">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                                    <Image
                                        src="/placeholder.svg?height=48&width=48"
                                        alt="Client"
                                        width={48}
                                        height={48}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-[#003942]">David Thompson</p>
                                    <p className="text-sm text-[#003942]/50">Basic Plan • 12 months</p>
                                </div>
                            </div>
                            <p className="text-[#003942]/70 italic mb-4">
                                "I started with the Basic Plan as a complete fitness novice. The structured approach and regular
                                check-ins kept me accountable. I've since upgraded to Premium and continue to see amazing progress."
                            </p>
                            <div className="flex text-[#003942]">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className={`w-5 h-5 ${i === 4 ? "text-[#003942]/20" : ""}`}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                </CenteredContainer>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <CenteredContainer>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <div className="inline-flex items-center rounded-full bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                            Common Questions
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-[#003942]">Frequently Asked Questions</h2>
                        <p className="max-w-[900px] text-[#003942]/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Find answers to common questions about our coaching programs.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="p-6 bg-[#f4efe8] rounded-xl border-l-4 border-[#003942]">
                            <h3 className="font-bold text-lg mb-2 text-[#003942]">How do the coaching programs work?</h3>
                            <p className="text-[#003942]/70">
                                After signing up, you'll complete a comprehensive assessment of your goals, experience, preferences, and
                                limitations. Your coach will then create a personalized plan and guide you through implementation with
                                regular check-ins and adjustments based on your progress.
                            </p>
                        </div>

                        <div className="p-6 bg-[#f4efe8] rounded-xl border-l-4 border-[#003942]">
                            <h3 className="font-bold text-lg mb-2 text-[#003942]">How long until I see results?</h3>
                            <p className="text-[#003942]/70">
                                Most clients begin to notice changes within 2-4 weeks, with more significant results visible by 8-12
                                weeks. However, this varies based on individual factors, consistency, and starting point. We focus on
                                sustainable, long-term results rather than quick fixes.
                            </p>
                        </div>

                        <div className="p-6 bg-[#f4efe8] rounded-xl border-l-4 border-[#003942]">
                            <h3 className="font-bold text-lg mb-2 text-[#003942]">Do I need a gym membership?</h3>
                            <p className="text-[#003942]/70">
                                Not necessarily. We can design programs for home workouts, gym settings, or a combination of both.
                                During your initial assessment, we'll discuss your available equipment and preferences to create a plan
                                that works for your situation.
                            </p>
                        </div>

                        <div className="p-6 bg-[#f4efe8] rounded-xl border-l-4 border-[#003942]">
                            <h3 className="font-bold text-lg mb-2 text-[#003942]">Can I switch plans or cancel if needed?</h3>
                            <p className="text-[#003942]/70">
                                Yes, you can upgrade or downgrade your plan at any time. We offer flexible month-to-month coaching with
                                no long-term contracts. If you need to cancel, simply let us know before your next billing cycle.
                            </p>
                        </div>

                        <div className="p-6 bg-[#f4efe8] rounded-xl border-l-4 border-[#003942]">
                            <h3 className="font-bold text-lg mb-2 text-[#003942]">
                                What if I have dietary restrictions or injuries?
                            </h3>
                            <p className="text-[#003942]/70">
                                Our coaches are experienced in working with various dietary needs and physical limitations. We'll
                                customize your plan to accommodate any special requirements, medical conditions, or injuries you may
                                have.
                            </p>
                        </div>

                        <div className="p-6 bg-[#f4efe8] rounded-xl border-l-4 border-[#003942]">
                            <h3 className="font-bold text-lg mb-2 text-[#003942]">
                                How is this different from following a generic program?
                            </h3>
                            <p className="text-[#003942]/70">
                                Generic programs aren't tailored to your specific needs, goals, and limitations. Our coaching provides
                                personalized plans, expert guidance, accountability, and ongoing adjustments based on your progress and
                                feedback—elements that are crucial for long-term success.
                            </p>
                        </div>
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
                            <Button size="lg" className="bg-[#f4efe8] text-[#003942] hover:bg-white">
                                Get Started Now
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-[#f4efe8] border-[#f4efe8] hover:bg-[#f4efe8]/10">
                                Book Free Consultation
                            </Button>
                        </div>
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
    accentColor?: "teal"
}

function CoachingPlanCard({
                              title,
                              description,
                              price,
                              features,
                              highlighted = false,
                              accentColor = "teal",
                          }: CoachingPlanCardProps) {
    const accentClasses = {
        teal: "from-[#003942] to-[#004e5a]",
    }

    return (
        <Card
            className={`relative overflow-hidden transition-all ${
                highlighted
                    ? "border-2 border-[#003942] shadow-lg scale-105 z-10"
                    : "border border-[#003942]/20 hover:border-[#003942]/40 hover:shadow"
            }`}
        >
            {highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-[#003942] text-white text-center text-sm font-medium py-1">
                    Most Popular
                </div>
            )}
            <CardHeader className={highlighted ? "pt-8" : ""}>
                <CardTitle className="text-[#003942]">{title}</CardTitle>
                <CardDescription className="text-[#003942]/70">{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-4xl font-bold text-[#003942]">
                    ${price}
                    <span className="text-sm font-normal text-[#003942]/50">/month</span>
                </div>
                <ul className="space-y-2 text-sm">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center text-[#003942]/80">
                            <Check className="mr-2 h-4 w-4 text-[#003942]" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button className={`w-full bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]`}>Get Started</Button>
            </CardFooter>
        </Card>
    )
}
