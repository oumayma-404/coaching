/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Trophy, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import BeforeAfterCard from "@/components/ui/before-after-card"
import Link from "next/link";

export default function ResultsSection() {
    return (
        <section id="results" className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-flex items-center rounded-full border border-[#003942]/20 bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                            <Trophy className="mr-1 h-4 w-4" />
                            Real Results
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#003942]">
                            Transformations That Speak For Themselves
                        </h2>
                        <p className="max-w-[900px] text-[#003942]/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            See the incredible journeys of our clients who committed to the process and achieved amazing results.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                    <BeforeAfterCard
                        name="John D."
                        duration="12 weeks"
                        beforeImage="/placeholder.svg?height=400&width=300"
                        afterImage="/placeholder.svg?height=400&width=300"
                        testimonial="Lost 30lbs and gained confidence. The program was challenging but worth every drop of sweat!"
                    />
                    <BeforeAfterCard
                        name="Sarah M."
                        duration="16 weeks"
                        beforeImage="/placeholder.svg?height=400&width=300"
                        afterImage="/placeholder.svg?height=400&width=300"
                        testimonial="Transformed my body after pregnancy. I've never felt stronger or more capable!"
                    />
                    <BeforeAfterCard
                        name="Mike T."
                        duration="8 weeks"
                        beforeImage="/placeholder.svg?height=400&width=300"
                        afterImage="/placeholder.svg?height=400&width=300"
                        testimonial="Gained 15lbs of muscle and improved all my lifts. Best investment I've ever made."
                    />
                </div>
                <div className="flex justify-center">
                    <Link href="/results">

                    <Button variant="outline" size="lg" className="border-[#003942] text-[#003942] hover:bg-[#003942]/10">
                        View More Success Stories
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
