/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { CheckCircle, ArrowLeft, ShieldCheck, Lock } from "lucide-react"
import CenteredContainer from "@/layout/centered-container"
import { useToast } from "@/components/ui/use-toast"

interface UserInfo {
    first_name: string
    last_name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    postal_code: string
    country: string
}

export default function PaymentPage() {
    const router = useRouter()
    const { items, clearCart } = useCart()
    const { toast } = useToast()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [userInfo, setUserInfo] = useState<UserInfo>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
    })
    const [errors, setErrors] = useState<Partial<UserInfo>>({})

    // Calculate totals
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const tax = subtotal * 0.08 // 8% tax
    const shipping = subtotal > 100 ? 0 : 9.99 // Free shipping over $100
    const total = subtotal + tax + shipping

    // Redirect if cart is empty
    useEffect(() => {
        if (items.length === 0 && !isComplete) {
            router.push("/shop")
        }
    }, [items.length, router, isComplete])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserInfo((prev) => ({ ...prev, [name]: value }))

        // Clear error when user types
        if (errors[name as keyof UserInfo]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<UserInfo> = {}

        if (!userInfo.first_name.trim()) {
            newErrors.first_name = "First name is required"
        }

        if (!userInfo.last_name.trim()) {
            newErrors.last_name = "Last name is required"
        }

        if (!userInfo.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!userInfo.phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^\+?[0-9]{10,15}$/.test(userInfo.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Phone number is invalid"
        }

        if (!userInfo.address.trim()) {
            newErrors.address = "Street address is required"
        }

        if (!userInfo.city.trim()) {
            newErrors.city = "City is required"
        }

        if (!userInfo.state.trim()) {
            newErrors.state = "State/Province is required"
        }

        if (!userInfo.postal_code.trim()) {
            newErrors.postal_code = "Postal/ZIP code is required"
        }

        if (!userInfo.country.trim()) {
            newErrors.country = "Country is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsProcessing(true)

        // Simulate preparing order and redirecting to payment processor
        setTimeout(() => {
            // In a real application, you would:
            // 1. Send the order details to your backend
            // 2. Get a payment URL from your payment processor
            // 3. Redirect the user to that URL

            toast({
                title: "Redirecting to payment processor",
                description: "You will be redirected to complete your payment.",
                duration: 3000,
            })

            // Simulate redirect to payment processor
            window.location.href = `https://payment-processor.example.com/pay?amount=${total.toFixed(2)}&reference=ORDER-${Date.now()}`
        }, 1500)
    }

    if (isComplete) {
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
                                <p className="font-medium text-[#003942]">Order Total: ${total.toFixed(2)}</p>
                                <p className="text-sm text-[#003942]/70">A confirmation email has been sent to {userInfo.email}</p>
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

    return (
        <div className="min-h-screen bg-[#f4efe8] py-12">
            <CenteredContainer>
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center text-[#003942]/70 hover:text-[#003942] transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Cart
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="lg:col-span-1 order-2 lg:order-1">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4">
                            <div className="p-6 border-b border-[#003942]/10">
                                <h2 className="text-xl font-bold text-[#003942]">Order Summary</h2>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="h-16 w-16 rounded-md overflow-hidden bg-[#f4efe8] flex-shrink-0">
                                                <Image
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.name}
                                                    width={64}
                                                    height={64}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-medium text-sm text-[#003942]">{item.name}</h3>
                                                <p className="text-xs text-[#003942]/50">{item.category}</p>
                                                <div className="flex justify-between mt-1">
                                                    <p className="text-sm text-[#003942]/70">Qty: {item.quantity}</p>
                                                    <p className="font-medium text-sm text-[#003942]">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2 pt-4 border-t border-[#003942]/10">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#003942]/70">Subtotal</span>
                                        <span className="text-[#003942]">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#003942]/70">Shipping</span>
                                        <span className="text-[#003942]">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#003942]/70">Tax (8%)</span>
                                        <span className="text-[#003942]">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-[#003942] pt-2 border-t border-[#003942]/10 mt-2">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-center text-xs text-[#003942]/50">
                                    <Lock className="h-3 w-3 mr-1" />
                                    Secure Checkout
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="lg:col-span-2 order-1 lg:order-2">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-[#003942]/10">
                                <h2 className="text-xl font-bold text-[#003942]">Payment Details</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="font-medium text-[#003942]">Personal Information</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="first_name" className="block text-sm font-medium text-[#003942] mb-1">
                                                First Name *
                                            </label>
                                            <Input
                                                id="first_name"
                                                name="first_name"
                                                value={userInfo.first_name}
                                                onChange={handleInputChange}
                                                className={`border-[#003942]/20 ${errors.first_name ? "border-red-500" : ""}`}
                                                disabled={isProcessing}
                                            />
                                            {errors.first_name && <p className="mt-1 text-xs text-red-500">{errors.first_name}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="last_name" className="block text-sm font-medium text-[#003942] mb-1">
                                                Last Name *
                                            </label>
                                            <Input
                                                id="last_name"
                                                name="last_name"
                                                value={userInfo.last_name}
                                                onChange={handleInputChange}
                                                className={`border-[#003942]/20 ${errors.last_name ? "border-red-500" : ""}`}
                                                disabled={isProcessing}
                                            />
                                            {errors.last_name && <p className="mt-1 text-xs text-red-500">{errors.last_name}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-[#003942] mb-1">
                                            Email Address *
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={userInfo.email}
                                            onChange={handleInputChange}
                                            className={`border-[#003942]/20 ${errors.email ? "border-red-500" : ""}`}
                                            disabled={isProcessing}
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-[#003942] mb-1">
                                            Phone Number *
                                        </label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={userInfo.phone}
                                            onChange={handleInputChange}
                                            placeholder="+1 (123) 456-7890"
                                            className={`border-[#003942]/20 ${errors.phone ? "border-red-500" : ""}`}
                                            disabled={isProcessing}
                                        />
                                        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-medium text-[#003942]">Shipping Address</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="address" className="block text-sm font-medium text-[#003942] mb-1">
                                                Street Address *
                                            </label>
                                            <Input
                                                id="address"
                                                name="address"
                                                value={userInfo.address || ""}
                                                onChange={handleInputChange}
                                                className={`border-[#003942]/20 ${errors.address ? "border-red-500" : ""}`}
                                                disabled={isProcessing}
                                            />
                                            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-[#003942] mb-1">
                                                    City *
                                                </label>
                                                <Input
                                                    id="city"
                                                    name="city"
                                                    value={userInfo.city || ""}
                                                    onChange={handleInputChange}
                                                    className={`border-[#003942]/20 ${errors.city ? "border-red-500" : ""}`}
                                                    disabled={isProcessing}
                                                />
                                                {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="state" className="block text-sm font-medium text-[#003942] mb-1">
                                                    State/Province *
                                                </label>
                                                <Input
                                                    id="state"
                                                    name="state"
                                                    value={userInfo.state || ""}
                                                    onChange={handleInputChange}
                                                    className={`border-[#003942]/20 ${errors.state ? "border-red-500" : ""}`}
                                                    disabled={isProcessing}
                                                />
                                                {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="postal_code" className="block text-sm font-medium text-[#003942] mb-1">
                                                    Postal/ZIP Code *
                                                </label>
                                                <Input
                                                    id="postal_code"
                                                    name="postal_code"
                                                    value={userInfo.postal_code || ""}
                                                    onChange={handleInputChange}
                                                    className={`border-[#003942]/20 ${errors.postal_code ? "border-red-500" : ""}`}
                                                    disabled={isProcessing}
                                                />
                                                {errors.postal_code && <p className="mt-1 text-xs text-red-500">{errors.postal_code}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="country" className="block text-sm font-medium text-[#003942] mb-1">
                                                    Country *
                                                </label>
                                                <Input
                                                    id="country"
                                                    name="country"
                                                    value={userInfo.country || ""}
                                                    onChange={handleInputChange}
                                                    className={`border-[#003942]/20 ${errors.country ? "border-red-500" : ""}`}
                                                    disabled={isProcessing}
                                                />
                                                {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[#003942]/10">
                                    <div className="flex items-center mb-4">
                                        <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                                        <p className="text-sm text-[#003942]/70">
                                            You will be redirected to our secure payment processor to complete your purchase.
                                        </p>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a] py-6"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? "Processing..." : "Proceed to Payment"}
                                    </Button>

                                    <p className="text-xs text-center text-[#003942]/50 mt-4">
                                        By clicking the button above, you agree to our Terms of Service and Privacy Policy.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </CenteredContainer>
        </div>
    )
}
