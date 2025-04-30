import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Check} from "lucide-react";
import {Button} from "@/components/ui/button";

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
                <div
                    className="absolute top-0 left-0 right-0 bg-[#003942] text-white text-center text-sm font-medium py-1">
                    Most Popular
                </div>
            )}
            <CardHeader className={highlighted ? "pt-8" : ""}>
                <CardTitle className="text-[#003942]">{title}</CardTitle>
                <CardDescription className="text-[#003942]/70">{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-4xl font-bold text-[#003942]">
                    {price}TND
                    <span className="text-sm font-normal text-[#003942]/50">/month</span>
                </div>
                <ul className="space-y-2 text-sm">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center text-[#003942]/80">
                            <Check className="mr-2 h-4 w-4 text-[#003942]"/>
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

export {CoachingPlanCard}