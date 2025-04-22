/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Dumbbell, ShoppingBag, Menu} from "lucide-react"
import {useCart} from "@/context/cart-context"
import {useState} from "react"

export default function Header() {
    const {itemCount} = useCart()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header
            className="sticky top-0 z-50 w-full border-b border-[#003942]/10 bg-[#f4efe8]/80 backdrop-blur-sm supports-[backdrop-filter]:bg-[#f4efe8]/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <Link href="/" className="flex items-center gap-2">
                        <Dumbbell className="h-6 w-6 text-[#003942]"/>
                        <span className="text-[#003942]">FitCoach</span>
                    </Link>
                </div>

                <nav className="hidden md:flex gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-[#003942]">
                        Home
                    </Link>
                    <Link href="/results" className="text-sm font-medium transition-colors hover:text-[#003942]">
                        Results
                    </Link>
                    <Link href="/coaching" className="text-sm font-medium transition-colors hover:text-[#003942]">
                        Coaching
                    </Link>
                    <Link href="/shop" className="text-sm font-medium transition-colors hover:text-[#003942]">
                        Shop
                    </Link>
                    <Link href="/contact" className="text-sm font-medium transition-colors hover:text-[#003942]">
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/basket" className="relative">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingBag className="h-5 w-5 text-[#003942]"/>
                            {itemCount > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#003942] text-xs text-white">
                  {itemCount}
                </span>
                            )}
                            <span className="sr-only">Shopping cart</span>
                        </Button>
                    </Link>

                    <Button variant="ghost" size="icon" className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <Menu className="h-6 w-6 text-[#003942]"/>
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                    <Link href="/coaching#coaching-plans">
                        <Button className="hidden md:inline-flex bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]">Get
                            Started</Button>
                    </Link>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-[#f4efe8]/95 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col space-y-4">
                        <Link
                            href="/"
                            className="text-sm font-medium py-2 transition-colors hover:text-[#003942]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/results"
                            className="text-sm font-medium py-2 transition-colors hover:text-[#003942]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Results
                        </Link>
                        <Link
                            href="/coaching"
                            className="text-sm font-medium py-2 transition-colors hover:text-[#003942]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Coaching
                        </Link>
                        <Link
                            href="/shop"
                            className="text-sm font-medium py-2 transition-colors hover:text-[#003942]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium py-2 transition-colors hover:text-[#003942]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Button className="w-full bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]">Get Started</Button>
                    </div>
                </div>
            )}
        </header>
    )
}
