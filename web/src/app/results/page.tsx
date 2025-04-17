/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import CenteredContainer from "@/layout/centered-container"

export default function ResultsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="w-full py-16 md:py-24 bg-gradient-to-r from-[#f4efe8] to-[#e9e2d8]">
                <CenteredContainer>
                    <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                        <div className="inline-block px-3 py-1 rounded-full bg-[#003942]/10 text-[#003942] text-sm font-medium mb-2">
                            Real Results
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#003942]">
                            Transformations That Speak <span className="text-[#003942]">Louder</span> Than Words
                        </h1>
                        <p className="text-xl text-[#003942]/70 max-w-[700px]">
                            Our clients achieve remarkable results through dedication, expert coaching, and personalized plans. See
                            the proof for yourself.
                        </p>
                    </div>
                </CenteredContainer>
            </section>

            {/* Featured Transformation */}
            <section className="py-16 bg-white">
                <CenteredContainer>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 space-y-4">
                            <div className="inline-block px-3 py-1 rounded-full bg-[#003942]/10 text-[#003942] text-sm font-medium">
                                Featured Transformation
                            </div>
                            <h2 className="text-3xl font-bold text-[#003942]">John's 12-Week Journey</h2>
                            <p className="text-[#003942]/70">
                                "I never thought I could achieve this kind of transformation. The personalized coaching and
                                accountability made all the difference. I'm not just physically stronger, I'm mentally stronger too."
                            </p>
                            <div className="flex items-center space-x-2">
                                <div className="h-10 w-10 rounded-full overflow-hidden">
                                    <Image
                                        src="/placeholder.svg?height=40&width=40"
                                        alt="John"
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-[#003942]">John Doe</p>
                                    <p className="text-sm text-[#003942]/50">Lost 30lbs in 12 weeks</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="relative flex rounded-xl overflow-hidden shadow-xl">
                                <div className="w-1/2 relative">
                                    <Image
                                        src="/placeholder.svg?height=500&width=250"
                                        alt="Before transformation"
                                        width={250}
                                        height={500}
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white px-4 py-2 text-sm font-medium">
                                        Before
                                    </div>
                                </div>
                                <div className="w-1/2 relative">
                                    <Image
                                        src="/placeholder.svg?height=500&width=250"
                                        alt="After transformation"
                                        width={250}
                                        height={500}
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-[#003942] text-white px-4 py-2 text-sm font-medium">
                                        After
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-[#f4efe8] text-[#003942] px-4 py-2 rounded-lg font-bold shadow-lg">
                                12 Weeks
                            </div>
                        </div>
                    </div>
                </CenteredContainer>
            </section>

            {/* Transformation Grid */}
            <section className="py-16 bg-[#f4efe8]">
                <CenteredContainer>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#003942]">More Success Stories</h2>
                        <p className="text-[#003942]/70 mt-2">Real people, real transformations, real results</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Transformation Card 1 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                            <div className="flex">
                                <div className="w-1/2 relative">
                                    <Image
                                        src="/placeholder.svg?height=300&width=150"
                                        alt="Before transformation"
                                        width={150}
                                        height={300}
                                        className="object-cover h-full"
                                    />
                                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white px-2 py-1 text-xs">
                                        Before
                                    </div>
                                </div>
                                <div className="w-1/2 relative">
                                    <Image
                                        src="/placeholder.svg?height=300&width=150"
                                        alt="After transformation"
                                        width={150}
                                        height={300}
                                        className="object-cover h-full"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-[#003942] text-white px-2 py-1 text-xs">After</div>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-[#003942]">Sarah M.</h3>
                                    <span className="bg-[#003942]/10 text-[#003942] text-xs px-2 py-1 rounded-full">8 Weeks</span>
                                </div>
                                <p className="text-sm text-[#003942]/70">
                                    "Lost 20lbs and gained confidence. The program was challenging but worth every drop of sweat."
                                </p>
                            </div>
                        </div>

                        {/* Transformation Card 2 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                            <div className="flex">
                                <div className="w-1/2 relative">
                                    <Image
                                        src="/placeholder.svg?height=300&width=150"
                                        alt="Before transformation"
                                        width={150}
                                        height={300}
                                        className="object-cover h-full"
                                    />
                                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white px-2 py-1 text-xs">
                                        Before
                                    </div>
                                </div>
                                <div className="w-1/2 relative">
                                    <Image
                                        src="/placeholder.svg?height=300&width=150"
                                        alt="After transformation"
                                        width={150}
                                        height={300}
                                        className="object-cover h-full"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-[#003942] text-white px-2 py-1 text-xs">After</div>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-[#003942]">Mike T.</h3>
                                    <span className="bg-[#003942]/10 text-[#003942] text-xs px-2 py-1 rounded-full">16 Weeks</span>
                                </div>
                                <p className="text-sm text-[#003942]/70">
                                    "Gained 15lbs of muscle and completely transformed my physique. Best decision I ever made."
                                </p>
                            </div>
                        </div>

                        {/* Transformation Card 3 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                            <div className="flex">
                                <div className="w-1/2 relative">
                                    <Image
                                        src="/placeholder.svg?height=300&width=150"
                                        alt="Before transformation"
                                        width={150}
                                        height={300}
                                        className="object-cover h-full"
                                    />
                                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white px-2 py-1 text-xs">
                                        Before
                                    </div>
                                </div>
                                <div className="w-1/2 relative">
                                    <Image
                                        src="/placeholder.svg?height=300&width=150"
                                        alt="After transformation"
                                        width={150}
                                        height={300}
                                        className="object-cover h-full"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-[#003942] text-white px-2 py-1 text-xs">After</div>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-[#003942]">Lisa K.</h3>
                                    <span className="bg-[#003942]/10 text-[#003942] text-xs px-2 py-1 rounded-full">12 Weeks</span>
                                </div>
                                <p className="text-sm text-[#003942]/70">
                                    "After having two kids, I never thought I'd get my body back. This program proved me wrong!"
                                </p>
                            </div>
                        </div>
                    </div>
                </CenteredContainer>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-white">
                <CenteredContainer>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#003942]">What Our Clients Say</h2>
                        <p className="text-[#003942]/70 mt-2">
                            The results speak for themselves, but here's what our clients have to say
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-[#f4efe8] p-6 rounded-xl border-l-4 border-[#003942]">
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
                                    <p className="font-medium text-[#003942]">Robert J.</p>
                                    <p className="text-sm text-[#003942]/50">Lost 25lbs in 10 weeks</p>
                                </div>
                            </div>
                            <p className="text-[#003942]/70 italic">
                                "The personalized approach made all the difference. My coach understood my limitations and pushed me
                                just enough to see results without burning out."
                            </p>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-[#f4efe8] p-6 rounded-xl border-l-4 border-[#003942]">
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
                                    <p className="font-medium text-[#003942]">Jennifer P.</p>
                                    <p className="text-sm text-[#003942]/50">Lost 18lbs in 8 weeks</p>
                                </div>
                            </div>
                            <p className="text-[#003942]/70 italic">
                                "I've tried so many programs before, but this is the only one where I've maintained my results. The
                                focus on sustainable habits changed everything."
                            </p>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-[#f4efe8] p-6 rounded-xl border-l-4 border-[#003942]">
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
                                    <p className="font-medium text-[#003942]">David W.</p>
                                    <p className="text-sm text-[#003942]/50">Gained 12lbs muscle in 12 weeks</p>
                                </div>
                            </div>
                            <p className="text-[#003942]/70 italic">
                                "As someone who was always skinny, I never thought I could build significant muscle. This program proved
                                me wrong. The nutrition guidance was game-changing."
                            </p>
                        </div>
                    </div>
                </CenteredContainer>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-[#003942]">
                <CenteredContainer className="text-center">
                    <div className="max-w-2xl mx-auto text-white">
                        <h2 className="text-3xl font-bold mb-4 text-[#f4efe8]">Ready to Write Your Success Story?</h2>
                        <p className="text-xl mb-8 text-[#f4efe8]/80">
                            Join our community of transformation and become the next success story. Your journey begins with a single
                            step.
                        </p>
                        <Button size="lg" className="bg-[#f4efe8] text-[#003942] hover:bg-white">
                            Start Your Transformation
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CenteredContainer>
            </section>
        </div>
    )
}
