import type React from "react"
import { cn } from "@/lib/utils"

interface CenteredContainerProps {
    children: React.ReactNode
    className?: string
}

export default function CenteredContainer({ children, className }: CenteredContainerProps) {
    return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
}
