import Link from "next/link"
import { Dumbbell } from "lucide-react"

export default function Footer() {
    return (
        <footer className="w-full border-t bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <Dumbbell className="h-6 w-6" />
                    <p className="text-center text-sm leading-loose md:text-left">
                        &copy; {new Date().getFullYear()} FitCoach. All rights reserved.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link href="#" className="text-sm underline underline-offset-4">
                        Terms of Service
                    </Link>
                    <Link href="#" className="text-sm underline underline-offset-4">
                        Privacy
                    </Link>
                </div>
            </div>
        </footer>
    )
}
