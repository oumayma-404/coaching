"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dumbbell, ShoppingBag, Menu } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useState } from "react"

export default function Header() {
    const { itemCount } = useCart()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <Link href="/" className="flex items-center gap-2">
                        <Dumbbell className="h-6 w-6 text-red-600" />
                        <span>FitCoach</span>
                    </Link>
                </div>

                <nav className="hidden md:flex gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-red-600">
                        Home
                    </Link>
                    <Link href="/results" className="text-sm font-medium transition-colors hover:text-red-600">
                        Results
                    </Link>
                    <Link href="/coaching" className="text-sm font-medium transition-colors hover:text-red-600">
                        Coaching
                    </Link>
                    <Link href="/shop" className="text-sm font-medium transition-colors hover:text-red-600">
                        Shop
                    </Link>
                    <Link href="/contact" className="text-sm font-medium transition-colors hover:text-red-600">
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/basket" className="relative">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingBag className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                  {itemCount}
                </span>
                            )}
                            <span className="sr-only">Shopping cart</span>
                        </Button>
                    </Link>

                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>

                    <Button className="hidden md:inline-flex bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                        Get Started
                    </Button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col space-y-4">
                        <Link
                            href="/"
                            className="text-sm font-medium py-2 transition-colors hover:text-red-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/results"
                            className="text-sm font-medium py-2 transition-colors hover:text-red-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Results
                        </Link>
                        <Link
                            href="/coaching"
                            className="text-sm font-medium py-2 transition-colors hover:text-red-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Coaching
                        </Link>
                        <Link
                            href="/shop"
                            className="text-sm font-medium py-2 transition-colors hover:text-red-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium py-2 transition-colors hover:text-red-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                            Get Started
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}
