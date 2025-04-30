/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import { Dumbbell, Instagram, Facebook, Twitter, Youtube, ArrowRight } from "lucide-react"
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full border-t bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Motivational Quote Section */}
                <div className="py-8 border-b">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="max-w-md">
                            <h3 className="text-lg font-bold mb-2 text-[#003942]">Ready to transform your life?</h3>
                            <p className="text-[#003942]/70">
                                Every journey begins with a single step. Take yours today and become the best version of yourself.
                            </p>
                        </div>
                        <Link
                            href="/coaching"
                            className="group flex items-center text-sm font-medium text-[#003942] hover:text-[#004e5a] transition-colors"
                        >
                            Start Your Journey
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="py-10 flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col items-center md:items-start gap-4 mb-6 md:mb-0">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="flex items-center">
                                <Image src="/images/logo.png" alt="FitWay Logo" width={120} height={40}
                                       className="h-10 w-auto" priority/>
                            </Link>
                        </div>
                        <p className="text-center md:text-left text-sm text-[#003942]/70 max-w-xs">
                            Empowering individuals to achieve their fitness goals through expert coaching and
                            personalized programs.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-medium mb-3 text-[#003942]">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/" className="text-[#003942]/70 hover:text-[#003942] transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/results" className="text-[#003942]/70 hover:text-[#003942] transition-colors">
                                        Results
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/coaching" className="text-[#003942]/70 hover:text-[#003942] transition-colors">
                                        Coaching
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/shop" className="text-[#003942]/70 hover:text-[#003942] transition-colors">
                                        Shop
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-[#003942]/70 hover:text-[#003942] transition-colors">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        

                        <div className="col-span-2 md:col-span-1">
                            <h4 className="font-medium mb-3 text-[#003942]">Connect With Us</h4>
                            <div className="flex space-x-4 mb-4">
                                <Link
                                    href="#"
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f4efe8] text-[#003942] hover:bg-[#003942]/10 transition-colors"
                                >
                                    <Instagram className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f4efe8] text-[#003942] hover:bg-[#003942]/10 transition-colors"
                                >
                                    <Facebook className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f4efe8] text-[#003942] hover:bg-[#003942]/10 transition-colors"
                                >
                                    <Twitter className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f4efe8] text-[#003942] hover:bg-[#003942]/10 transition-colors"
                                >
                                    <Youtube className="h-5 w-5" />
                                </Link>
                            </div>
                            <p className="text-sm text-[#003942]/70">Follow us for tips, inspiration, and success stories.</p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="py-6 border-t flex flex-col md:flex-row items-center justify-between text-sm text-[#003942]/70">
                    <p>&copy; {new Date().getFullYear()} FitWay. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Made with passion for a healthier world.</p>
                </div>
            </div>
        </footer>
    )
}
