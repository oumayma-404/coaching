/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CoachingSection() {
    return (
        <section id="coaching" className="w-full py-12 md:py-24 lg:py-32 bg-[#f4efe8]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-flex items-center rounded-full border border-[#003942]/20 bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                            <Dumbbell className="mr-1 h-4 w-4" />
                            Expert Coaching
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#003942]">
                            Personalized Coaching Programs
                        </h2>
                        <p className="max-w-[900px] text-[#003942]/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Choose the coaching program that fits your goals, lifestyle, and budget. All programs include personalized
                            attention and proven methods.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
                    <CoachingPlanCard
                        title="Basic Plan"
                        description="Perfect for beginners"
                        price={99}
                        features={["Customized workout plan", "Basic nutrition guidance", "Weekly check-ins", "Email support"]}
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
                        ]}
                        highlighted={true}
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
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

interface CoachingPlanCardProps {
    title: string
    description: string
    price: number
    features: string[]
    highlighted?: boolean
}

function CoachingPlanCard({ title, description, price, features, highlighted = false }: CoachingPlanCardProps) {
    return (
        <Card className={highlighted ? "border-[#003942]" : ""}>
            <CardHeader>
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4 text-[#003942]"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]">Get Started</Button>
            </CardFooter>
        </Card>
    )
}
