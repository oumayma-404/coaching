/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, ChevronRight, Send, Instagram, Facebook, Twitter } from "lucide-react"
import CenteredContainer from "@/layout/centered-container"

export default function ContactPage() {
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormStatus("submitting")

        // Simulate form submission
        setTimeout(() => {
            setFormStatus("success")
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="w-full py-16 md:py-24 bg-gradient-to-r from-[#f4efe8] to-[#e9e2d8]">
                <CenteredContainer>
                    <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                        <div className="inline-block px-3 py-1 rounded-full bg-[#003942]/10 text-[#003942] text-sm font-medium mb-2">
                            Get In Touch
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#003942]">
                            We're Here to <span className="text-[#003942]">Support</span> Your Journey
                        </h1>
                        <p className="text-xl text-[#003942]/70 max-w-[700px]">
                            Have questions about our coaching programs? Ready to start your transformation? Our team is here to help
                            you every step of the way.
                        </p>
                    </div>
                </CenteredContainer>
            </section>

            {/* Contact Information & Form Section */}
            <section className="py-16 bg-white">
                <CenteredContainer>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-6 text-[#003942]">Contact Information</h2>
                                <p className="text-[#003942]/70 mb-8">
                                    Reach out to us through any of these channels. We aim to respond to all inquiries within 24 hours.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#003942]/10 p-3 rounded-full">
                                        <Phone className="h-6 w-6 text-[#003942]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg text-[#003942]">Phone</h3>
                                        <p className="text-[#003942]/70">(555) 123-4567</p>
                                        <p className="text-sm text-[#003942]/50 mt-1">Monday to Friday, 9am to 6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#003942]/10 p-3 rounded-full">
                                        <Mail className="h-6 w-6 text-[#003942]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg text-[#003942]">Email</h3>
                                        <p className="text-[#003942]/70">info@transformfitness.com</p>
                                        <p className="text-sm text-[#003942]/50 mt-1">We'll respond as quickly as possible</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#003942]/10 p-3 rounded-full">
                                        <MapPin className="h-6 w-6 text-[#003942]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg text-[#003942]">Location</h3>
                                        <p className="text-[#003942]/70">123 Fitness Street, Wellness City, WC 12345</p>
                                        <p className="text-sm text-[#003942]/50 mt-1">Come visit our studio</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#003942]/10 p-3 rounded-full">
                                        <Clock className="h-6 w-6 text-[#003942]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg text-[#003942]">Hours</h3>
                                        <p className="text-[#003942]/70">Monday - Friday: 6am - 9pm</p>
                                        <p className="text-[#003942]/70">Saturday: 8am - 6pm</p>
                                        <p className="text-[#003942]/70">Sunday: 8am - 2pm</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <h3 className="font-medium text-lg mb-4 text-[#003942]">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="bg-[#f4efe8] p-3 rounded-full hover:bg-[#003942]/10 transition-colors">
                                        <Instagram className="h-5 w-5 text-[#003942]/70 hover:text-[#003942]" />
                                    </a>
                                    <a href="#" className="bg-[#f4efe8] p-3 rounded-full hover:bg-[#003942]/10 transition-colors">
                                        <Facebook className="h-5 w-5 text-[#003942]/70 hover:text-[#003942]" />
                                    </a>
                                    <a href="#" className="bg-[#f4efe8] p-3 rounded-full hover:bg-[#003942]/10 transition-colors">
                                        <Twitter className="h-5 w-5 text-[#003942]/70 hover:text-[#003942]" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-[#f4efe8] p-8 rounded-xl border border-[#003942]/10 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 text-[#003942]">Send Us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-sm font-medium text-[#003942]">
                                            First Name
                                        </label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            placeholder="John"
                                            required
                                            disabled={formStatus === "submitting"}
                                            className="border-[#003942]/20 focus:border-[#003942] focus:ring-[#003942]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-sm font-medium text-[#003942]">
                                            Last Name
                                        </label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Doe"
                                            required
                                            disabled={formStatus === "submitting"}
                                            className="border-[#003942]/20 focus:border-[#003942] focus:ring-[#003942]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-[#003942]">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john.doe@example.com"
                                        required
                                        disabled={formStatus === "submitting"}
                                        className="border-[#003942]/20 focus:border-[#003942] focus:ring-[#003942]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-[#003942]">
                                        Phone (Optional)
                                    </label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="(555) 123-4567"
                                        disabled={formStatus === "submitting"}
                                        className="border-[#003942]/20 focus:border-[#003942] focus:ring-[#003942]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-[#003942]">
                                        Subject
                                    </label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        placeholder="How can we help you?"
                                        required
                                        disabled={formStatus === "submitting"}
                                        className="border-[#003942]/20 focus:border-[#003942] focus:ring-[#003942]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-[#003942]">
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell us more about your fitness goals..."
                                        rows={5}
                                        required
                                        disabled={formStatus === "submitting"}
                                        className="border-[#003942]/20 focus:border-[#003942] focus:ring-[#003942]"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]"
                                    disabled={formStatus === "submitting"}
                                >
                                    {formStatus === "submitting" ? "Sending..." : "Send Message"}
                                    <Send className="ml-2 h-4 w-4" />
                                </Button>

                                {formStatus === "success" && (
                                    <div className="p-4 bg-green-50 text-green-700 rounded-md">
                                        Thank you for your message! We'll get back to you soon.
                                    </div>
                                )}

                                {formStatus === "error" && (
                                    <div className="p-4 bg-red-50 text-red-700 rounded-md">
                                        There was an error sending your message. Please try again.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </CenteredContainer>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-[#f4efe8]">
                <CenteredContainer>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#003942]">Find Us</h2>
                        <p className="text-[#003942]/70 mt-2">Visit our studio and meet our team of expert coaches</p>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-lg h-[400px] relative">
                        {/* Placeholder for map - in a real app, you'd use Google Maps or similar */}
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                            <Image
                                src="/placeholder.svg?height=400&width=1200"
                                alt="Map location"
                                width={1200}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
                                    <h3 className="font-bold text-lg text-[#003942]">Transform Fitness Studio</h3>
                                    <p className="text-[#003942]/70">123 Fitness Street, Wellness City, WC 12345</p>
                                    <Button className="mt-4 bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]">Get Directions</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CenteredContainer>
            </section>

            {/* FAQ Section */}
            {/*<section className="py-16 bg-white">
                <CenteredContainer>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#003942]">Frequently Asked Questions</h2>
                        <p className="text-[#003942]/70 mt-2">Find answers to common questions about our coaching services</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
                        <div className="space-y-6">
                            <div className="p-6 bg-[#f4efe8] rounded-xl border-l-4 border-[#003942]">
                                <h3 className="font-bold text-lg mb-2 text-[#003942]">How do I get started?</h3>
                                <p className="text-[#003942]/70">
                                    Getting started is easy! Simply fill out our contact form or give us a call. We'll schedule a free
                                    consultation to discuss your goals and create a personalized plan.
                                </p>
                            </div>

                            <div className="p-6 bg-[#f4efe8] rounded-xl border-l-4 border-[#003942]">
                                <h3 className="font-bold text-lg mb-2 text-[#003942]">What's included in the coaching program?</h3>
                                <p className="text-[#003942]/70">
                                    Our coaching programs include personalized workout plans, nutrition guidance, regular check-ins,
                                    progress tracking, and unlimited support from your dedicated coach.
                                </p>
                            </div>

                            <div className="p-6 bg-[#f4efe8] rounded-xl border-l-4 border-[#003942]">
                                <h3 className="font-bold text-lg mb-2 text-[#003942]">How long until I see results?</h3>
                                <p className="text-[#003942]/70">
                                    Most clients begin to see noticeable changes within 4-6 weeks. However, this varies based on
                                    individual factors and consistency with the program.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 bg-[#f4efe8] rounded-xl border-l-4 border-[#003942]">
                                <h3 className="font-bold text-lg mb-2 text-[#003942]">
                                    Do I need to have previous fitness experience?
                                </h3>
                                <p className="text-[#003942]/70">
                                    Not at all! Our programs are designed for all fitness levels, from complete beginners to advanced
                                    athletes. We'll meet you where you are.
                                </p>
                            </div>

                            <div className="p-6 bg-[#f4efe8] rounded-xl border-l-4 border-[#003942]">
                                <h3 className="font-bold text-lg mb-2 text-[#003942]">
                                    Can I train remotely or do I need to come to your studio?
                                </h3>
                                <p className="text-[#003942]/70">
                                    We offer both in-person and remote coaching options. Many of our clients achieve amazing results with
                                    our online coaching programs.
                                </p>
                            </div>

                            <div className="p-6 bg-[#f4efe8] rounded-xl border-l-4 border-[#003942]">
                                <h3 className="font-bold text-lg mb-2 text-[#003942]">
                                    What if I have dietary restrictions or injuries?
                                </h3>
                                <p className="text-[#003942]/70">
                                    Our coaches are experienced in working with various dietary needs and physical limitations. We'll
                                    customize your plan to accommodate any special requirements.
                                </p>
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
                            Take the first step towards a healthier, stronger you. Contact us today to schedule your free
                            consultation.
                        </p>
                        <Button size="lg" className="bg-[#f4efe8] text-[#003942] hover:bg-white">
                            Start Your Journey
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CenteredContainer>
            </section>
        </div>
    )
}
