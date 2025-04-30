"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import CenteredContainer from "@/layout/centered-container"

export default function PaymentSuccessPage() {
    const router = useRouter()
    const [orderId, setOrderId] = useState<string | null>(null)

    useEffect(() => {
        // Get the order ID from localStorage if available
        const storedOrderId = localStorage.getItem("lastOrderId")
        if (storedOrderId) {
            setOrderId(storedOrderId)
        }

        // You could also get the order ID from URL parameters if passed by the payment provider
        // const params = new URLSearchParams(window.location.search)
        // const orderIdFromUrl = params.get('orderId')
        // if (orderIdFromUrl) setOrderId(orderIdFromUrl)
    }, [])

    return (
        <div className="min-h-screen bg-[#f4efe8] py-12">
            <CenteredContainer>
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#003942] mb-2">Payment Successful!</h1>
                        <p className="text-[#003942]/70 mb-6">
                            Thank you for your purchase. Your order has been placed successfully.
                        </p>
                        <div className="bg-[#f4efe8] rounded-lg p-4 mb-6">
                            {orderId && <p className="font-medium text-[#003942] mb-2">Order ID: {orderId}</p>}
                            <p className="text-sm text-[#003942]/70">
                                A confirmation email will be sent to you shortly with your order details.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="outline"
                                className="border-[#003942] text-[#003942] hover:bg-[#003942]/10"
                                onClick={() => router.push("/")}
                            >
                                Return to Home
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
