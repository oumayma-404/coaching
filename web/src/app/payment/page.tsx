"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"
import { CheckCircle, ArrowLeft, ShoppingBag, Loader2, Package, Phone, Mail, MapPin, User } from "lucide-react"
import CenteredContainer from "@/layout/centered-container"
import { useToast } from "@/components/ui/use-toast"

interface UserInfo {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
}

interface FormErrors {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    address?: string
}

export default function CheckoutPage() {
    const router = useRouter()
    const { items, clearCart } = useCart()
    const { toast } = useToast()
    const [isProcessing, setIsProcessing] = useState(false)
    const [orderComplete, setOrderComplete] = useState(false)
    const [orderId, setOrderId] = useState<number | null>(null)
    const [userInfo, setUserInfo] = useState<UserInfo>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    })
    const [errors, setErrors] = useState<FormErrors>({})

    // Calculate totals
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const shipping = subtotal > 100 ? 0 : 7 // Free shipping over 100 DT
    const total = subtotal + shipping

    // Redirect if cart is empty and order is not complete
    useEffect(() => {
        if (items.length === 0 && !orderComplete) {
            router.push("/shop")
        }
    }, [items.length, router, orderComplete])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setUserInfo((prev) => ({ ...prev, [name]: value }))

        // Clear error when user types
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!userInfo.firstName.trim()) {
            newErrors.firstName = "First name is required"
        }

        if (!userInfo.lastName.trim()) {
            newErrors.lastName = "Last name is required"
        }

        if (!userInfo.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
            newErrors.email = "Please enter a valid email"
        }

        if (!userInfo.phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^[+]?[0-9\s-]{8,15}$/.test(userInfo.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Please enter a valid phone number"
        }

        if (!userInfo.address.trim()) {
            newErrors.address = "Delivery address is required"
        } else if (userInfo.address.trim().length < 10) {
            newErrors.address = "Please provide a complete address"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            toast({
                title: "Please check your information",
                description: "Some fields need your attention.",
                variant: "destructive",
            })
            return
        }

        setIsProcessing(true)

        try {
            const orderRequest = {
                email: userInfo.email,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                phone: userInfo.phone,
                shippingAddress: userInfo.address,
                items: items.map((item) => ({
                    productId: Number.parseInt(item.id),
                    quantity: item.quantity,
                })),
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderRequest),
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to place order")
            }

            // Order successful
            setOrderId(data.orderId)
            setOrderComplete(true)
            clearCart()

            toast({
                title: "Order Placed Successfully! 🎉",
                description: "You will receive a confirmation email shortly.",
            })
        } catch (error) {
            console.error("Error placing order:", error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to place your order. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsProcessing(false)
        }
    }

    // Order Complete View
    if (orderComplete) {
        return (
            <div className="min-h-screen bg-[#f4efe8] py-12">
                <CenteredContainer>
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Success Header */}
                            <div className="bg-gradient-to-r from-[#003942] to-[#004e5a] p-8 text-center">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="h-12 w-12 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
                                <p className="text-white/80">Thank you for your purchase</p>
                            </div>

                            {/* Order Details */}
                            <div className="p-8">
                                <div className="bg-[#f4efe8] rounded-xl p-6 mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[#003942]/70">Order Number</span>
                                        <span className="font-bold text-[#003942] text-xl">#{orderId}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#003942]/70">Total Amount</span>
                                        <span className="font-bold text-[#003942] text-xl">{total.toFixed(2)} DT</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <Mail className="h-5 w-5 text-[#003942] mt-0.5" />
                                        <div>
                                            <p className="font-medium text-[#003942]">Confirmation Email Sent</p>
                                            <p className="text-sm text-[#003942]/70">
                                                We&apos;ve sent order details to {userInfo.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="h-5 w-5 text-[#003942] mt-0.5" />
                                        <div>
                                            <p className="font-medium text-[#003942]">We&apos;ll Contact You</p>
                                            <p className="text-sm text-[#003942]/70">
                                                Our delivery team will call you at {userInfo.phone} to confirm delivery
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Package className="h-5 w-5 text-[#003942] mt-0.5" />
                                        <div>
                                            <p className="font-medium text-[#003942]">Payment on Delivery</p>
                                            <p className="text-sm text-[#003942]/70">
                                                Please have {total.toFixed(2)} DT ready when your order arrives
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-[#003942] text-[#003942] hover:bg-[#003942]/10"
                                        onClick={() => router.push("/")}
                                    >
                                        Return to Home
                                    </Button>
                                    <Button
                                        className="flex-1 bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]"
                                        onClick={() => router.push("/shop")}
                                    >
                                        Continue Shopping
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CenteredContainer>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f4efe8]">
            {/* Header */}
            <section className="w-full py-8 bg-white border-b border-[#003942]/10">
                <CenteredContainer>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center text-[#003942]/70 hover:text-[#003942] transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Cart
                        </button>
                        <div className="flex items-center gap-2 text-[#003942]">
                            <ShoppingBag className="h-5 w-5" />
                            <span className="font-medium">Checkout</span>
                        </div>
                    </div>
                </CenteredContainer>
            </section>

            {/* Main Content */}
            <section className="py-8">
                <CenteredContainer>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-[#003942]/10">
                                    <h2 className="text-xl font-bold text-[#003942]">Delivery Information</h2>
                                    <p className="text-sm text-[#003942]/60 mt-1">
                                        Fill in your details to complete your order
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                    {/* Personal Info */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-[#003942]">
                                            <User className="h-4 w-4" />
                                            <h3 className="font-medium">Personal Information</h3>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="firstName" className="block text-sm font-medium text-[#003942] mb-1">
                                                    First Name *
                                                </label>
                                                <Input
                                                    id="firstName"
                                                    name="firstName"
                                                    value={userInfo.firstName}
                                                    onChange={handleInputChange}
                                                    placeholder="Ahmed"
                                                    className={`border-[#003942]/20 focus:border-[#003942] ${errors.firstName ? "border-red-500" : ""}`}
                                                    disabled={isProcessing}
                                                />
                                                {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="lastName" className="block text-sm font-medium text-[#003942] mb-1">
                                                    Last Name *
                                                </label>
                                                <Input
                                                    id="lastName"
                                                    name="lastName"
                                                    value={userInfo.lastName}
                                                    onChange={handleInputChange}
                                                    placeholder="Ben Ali"
                                                    className={`border-[#003942]/20 focus:border-[#003942] ${errors.lastName ? "border-red-500" : ""}`}
                                                    disabled={isProcessing}
                                                />
                                                {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-[#003942]">
                                            <Phone className="h-4 w-4" />
                                            <h3 className="font-medium">Contact Information</h3>
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
                                                placeholder="ahmed@example.com"
                                                className={`border-[#003942]/20 focus:border-[#003942] ${errors.email ? "border-red-500" : ""}`}
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
                                                placeholder="+216 XX XXX XXX"
                                                className={`border-[#003942]/20 focus:border-[#003942] ${errors.phone ? "border-red-500" : ""}`}
                                                disabled={isProcessing}
                                            />
                                            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                                            <p className="mt-1 text-xs text-[#003942]/50">
                                                We&apos;ll contact you to confirm delivery
                                            </p>
                                        </div>
                                    </div>

                                    {/* Delivery Address */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-[#003942]">
                                            <MapPin className="h-4 w-4" />
                                            <h3 className="font-medium">Delivery Address</h3>
                                        </div>

                                        <div>
                                            <label htmlFor="address" className="block text-sm font-medium text-[#003942] mb-1">
                                                Full Address *
                                            </label>
                                            <Textarea
                                                id="address"
                                                name="address"
                                                value={userInfo.address}
                                                onChange={handleInputChange}
                                                placeholder="Street, Building, City, Governorate..."
                                                rows={3}
                                                className={`border-[#003942]/20 focus:border-[#003942] resize-none ${errors.address ? "border-red-500" : ""}`}
                                                disabled={isProcessing}
                                            />
                                            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                                        </div>
                                    </div>

                                    {/* Payment Info */}
                                    <div className="bg-[#f4efe8] rounded-xl p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#003942] rounded-full flex items-center justify-center">
                                                <Package className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-[#003942]">Payment on Delivery</p>
                                                <p className="text-sm text-[#003942]/70">
                                                    Pay when your order arrives
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="w-full bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a] py-6 text-lg"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Placing Order...
                                            </>
                                        ) : (
                                            <>Place Order - {total.toFixed(2)} DT</>
                                        )}
                                    </Button>

                                    <p className="text-xs text-center text-[#003942]/50">
                                        By placing your order, you agree to our Terms of Service
                                    </p>
                                </form>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-4">
                                <div className="p-6 border-b border-[#003942]/10">
                                    <h2 className="text-xl font-bold text-[#003942]">Order Summary</h2>
                                    <p className="text-sm text-[#003942]/60">{items.length} item{items.length > 1 ? "s" : ""}</p>
                                </div>

                                <div className="p-6">
                                    {/* Items */}
                                    <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-3">
                                                <div className="h-16 w-16 rounded-lg overflow-hidden bg-[#f4efe8] flex-shrink-0">
                                                    <Image
                                                        src={item.imageUrl || "/placeholder.svg"}
                                                        alt={item.name}
                                                        width={64}
                                                        height={64}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-grow min-w-0">
                                                    <h3 className="font-medium text-sm text-[#003942] truncate">{item.name}</h3>
                                                    <p className="text-xs text-[#003942]/50">{item.category}</p>
                                                    <div className="flex justify-between mt-1">
                                                        <span className="text-sm text-[#003942]/70">×{item.quantity}</span>
                                                        <span className="font-medium text-sm text-[#003942]">
                                                            {(item.price * item.quantity).toFixed(2)} DT
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Totals */}
                                    <div className="space-y-3 pt-4 border-t border-[#003942]/10">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#003942]/70">Subtotal</span>
                                            <span className="text-[#003942]">{subtotal.toFixed(2)} DT</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#003942]/70">Delivery</span>
                                            <span className="text-[#003942]">
                                                {shipping === 0 ? (
                                                    <span className="text-green-600">Free</span>
                                                ) : (
                                                    `${shipping.toFixed(2)} DT`
                                                )}
                                            </span>
                                        </div>
                                        {shipping > 0 && (
                                            <p className="text-xs text-[#003942]/50">
                                                Free delivery on orders over 100 DT
                                            </p>
                                        )}
                                        <div className="flex justify-between font-bold text-[#003942] pt-3 border-t border-[#003942]/10">
                                            <span>Total</span>
                                            <span className="text-xl">{total.toFixed(2)} DT</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Back to Cart Link */}
                            <div className="mt-4 text-center">
                                <Link
                                    href="/basket"
                                    className="text-sm text-[#003942]/70 hover:text-[#003942] transition-colors"
                                >
                                    ← Edit Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </CenteredContainer>
            </section>
        </div>
    )
}
