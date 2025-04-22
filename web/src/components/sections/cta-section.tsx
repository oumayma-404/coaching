/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link";

export default function CtaSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#003942] text-[#f4efe8]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Transform Your Body?</h2>
                        <p className="max-w-[900px] text-[#f4efe8]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Join thousands of satisfied clients who have achieved their fitness goals with our expert coaching.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Link href="/coaching#coaching-plans">

                        <Button size="lg" className="bg-[#f4efe8] text-[#003942] hover:bg-white">
                            Start Your Journey
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="border-[#f4efe8] text-[#f4efe8] hover:bg-[#f4efe8]/10">
                            Book a Consultation
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
