import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function HeroSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Transform Your Body, Transform Your Life
                            </h1>
                            <p className="max-w-[600px] text-gray-500 md:text-xl">
                                Expert coaching, personalized plans, and proven results. Start your fitness journey today.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button size="lg">
                                Start Your Journey
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="lg">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Image
                            src="/placeholder.svg?height=550&width=550"
                            width={550}
                            height={550}
                            alt="Hero Image"
                            className="rounded-xl object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
