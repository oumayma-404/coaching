"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import CenteredContainer from "@/layout/centered-container"

import { Phone, Mail, MapPin, Clock, ChevronRight, Send, Instagram, Facebook, Twitter } from "lucide-react"
import Header from "@/components/header";
import Footer from "@/components/footer";

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
                <section className="w-full py-16 md:py-24 bg-gradient-to-r from-gray-50 to-gray-100">
                    <CenteredContainer>
                        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                            <div
                                className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-2">
                                Get In Touch
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                                We're Here to <span className="text-red-600">Support</span> Your Journey
                            </h1>
                            <p className="text-xl text-gray-600 max-w-[700px]">
                                Have questions about our coaching programs? Ready to start your transformation? Our team
                                is here to help
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
                                    <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                                    <p className="text-gray-600 mb-8">
                                        Reach out to us through any of these channels. We aim to respond to all
                                        inquiries within 24 hours.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-red-100 p-3 rounded-full">
                                            <Phone className="h-6 w-6 text-red-600"/>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg">Phone</h3>
                                            <p className="text-gray-600">(555) 123-4567</p>
                                            <p className="text-sm text-gray-500 mt-1">Monday to Friday, 9am to 6pm</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-orange-100 p-3 rounded-full">
                                            <Mail className="h-6 w-6 text-orange-600"/>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg">Email</h3>
                                            <p className="text-gray-600">info@transformfitness.com</p>
                                            <p className="text-sm text-gray-500 mt-1">We'll respond as quickly as
                                                possible</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-red-100 p-3 rounded-full">
                                            <MapPin className="h-6 w-6 text-red-600"/>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg">Location</h3>
                                            <p className="text-gray-600">123 Fitness Street, Wellness City, WC 12345</p>
                                            <p className="text-sm text-gray-500 mt-1">Come visit our studio</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-orange-100 p-3 rounded-full">
                                            <Clock className="h-6 w-6 text-orange-600"/>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg">Hours</h3>
                                            <p className="text-gray-600">Monday - Friday: 6am - 9pm</p>
                                            <p className="text-gray-600">Saturday: 8am - 6pm</p>
                                            <p className="text-gray-600">Sunday: 8am - 2pm</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <h3 className="font-medium text-lg mb-4">Follow Us</h3>
                                    <div className="flex space-x-4">
                                        <a href="#"
                                           className="bg-gray-100 p-3 rounded-full hover:bg-red-100 transition-colors">
                                            <Instagram className="h-5 w-5 text-gray-600 hover:text-red-600"/>
                                        </a>
                                        <a href="#"
                                           className="bg-gray-100 p-3 rounded-full hover:bg-red-100 transition-colors">
                                            <Facebook className="h-5 w-5 text-gray-600 hover:text-red-600"/>
                                        </a>
                                        <a href="#"
                                           className="bg-gray-100 p-3 rounded-full hover:bg-orange-100 transition-colors">
                                            <Twitter className="h-5 w-5 text-gray-600 hover:text-orange-600"/>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm">
                                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="text-sm font-medium">
                                                First Name
                                            </label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                placeholder="John"
                                                required
                                                disabled={formStatus === "submitting"}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="text-sm font-medium">
                                                Last Name
                                            </label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Doe"
                                                required
                                                disabled={formStatus === "submitting"}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Email
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="john.doe@example.com"
                                            required
                                            disabled={formStatus === "submitting"}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium">
                                            Phone (Optional)
                                        </label>
                                        <Input id="phone" name="phone" placeholder="(555) 123-4567"
                                               disabled={formStatus === "submitting"}/>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium">
                                            Subject
                                        </label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            placeholder="How can we help you?"
                                            required
                                            disabled={formStatus === "submitting"}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">
                                            Message
                                        </label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us more about your fitness goals..."
                                            rows={5}
                                            required
                                            disabled={formStatus === "submitting"}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                                        disabled={formStatus === "submitting"}
                                    >
                                        {formStatus === "submitting" ? "Sending..." : "Send Message"}
                                        <Send className="ml-2 h-4 w-4"/>
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
                <section className="py-16 bg-gray-50">
                    <CenteredContainer>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold">Find Us</h2>
                            <p className="text-gray-600 mt-2">Visit our studio and meet our team of expert coaches</p>
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
                                        <h3 className="font-bold text-lg">Transform Fitness Studio</h3>
                                        <p className="text-gray-600">123 Fitness Street, Wellness City, WC 12345</p>
                                        <Button className="mt-4 bg-red-600 hover:bg-red-700">Get Directions</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CenteredContainer>
                </section>

        </div>
    )
}
