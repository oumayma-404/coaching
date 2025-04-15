import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dumbbell } from "lucide-react"

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <Dumbbell className="h-6 w-6" />
                    <span>FitCoach</span>
                </div>
                <nav className="hidden md:flex gap-6">
                    <Link href="#" className="text-sm font-medium transition-colors hover:text-gray-900">
                        Home
                    </Link>
                    <Link href="#results" className="text-sm font-medium transition-colors hover:text-gray-900">
                        Results
                    </Link>
                    <Link href="#coaching" className="text-sm font-medium transition-colors hover:text-gray-900">
                        Coaching
                    </Link>
                    <Link href="#shop" className="text-sm font-medium transition-colors hover:text-gray-900">
                        Shop
                    </Link>
                    <Link href="#" className="text-sm font-medium transition-colors hover:text-gray-900">
                        About
                    </Link>
                    <Link href="#" className="text-sm font-medium transition-colors hover:text-gray-900">
                        Contact
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                    <Button>Get Started</Button>
                </div>
            </div>
        </header>
    )
}
