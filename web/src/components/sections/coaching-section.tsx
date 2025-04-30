/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { ChevronRight, Dumbbell, Star} from "lucide-react"
import { Button } from "@/components/ui/button"
import CenteredContainer from "@/layout/centered-container";
import {CoachingPlanCard} from "@/components/ui/Coaching-plan-card";

export default function CoachingSection() {
    return (
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
                    Personalized Coaching Programs
                </h2>
                <p className="max-w-[800px] text-[#003942]/70 text-lg">
                    Choose the coaching program that fits your goals, lifestyle, and budget. All programs
                    include personalized
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
                <div
                    className="inline-flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-[#003942]/10 mb-6">
                    <Star className="h-5 w-5 text-yellow-500 mr-2"/>
                    <p className="text-[#003942] font-medium">
                        Not sure which plan is right for you? Schedule a free consultation call.
                    </p>
                </div>
                <a href={"https://wa.me/+21620491086"}>
                    <Button variant="outline" size="lg"
                            className="border-[#003942] text-[#003942] hover:bg-[#003942]/10">
                        Contact me via Whatsapp
                        <ChevronRight className="ml-2 h-4 w-4"/>
                    </Button>
                </a>
            </div>
        </CenteredContainer>
    </section>
    )
}


