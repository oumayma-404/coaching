"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft } from "lucide-react"
import CenteredContainer from "@/layout/centered-container"

export default function PaymentCancelledPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-[#f4efe8] py-12">
            <CenteredContainer>
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="h-10 w-10 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#003942] mb-2">Payment Cancelled</h1>
                        <p className="text-[#003942]/70 mb-6">
                            Your payment was cancelled. No charges have been made to your account.
                        </p>
                        <div className="bg-[#f4efe8] rounded-lg p-4 mb-6">
                            <p className="text-sm text-[#003942]/70">
                                If you experienced any issues during the payment process, please contact our support team.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="outline"
                                className="border-[#003942] text-[#003942] hover:bg-[#003942]/10"
                                onClick={() => router.push("/checkout")}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Return to Checkout
                            </Button>
                            <Button className="bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]" onClick={() => router.push("/shop")}>
                                Continue Shopping
                            </Button>
                        </div>
                    </div>
                </div>
            </CenteredContainer>
        </div>
    )
}
