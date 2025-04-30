/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {ShoppingBag, Trash2, ChevronRight, ArrowLeft} from "lucide-react"
import CenteredContainer from "@/layout/centered-container"
import {useCart} from "@/context/cart-context"

export default function BasketPage() {
    const {items, removeItem, updateItemQuantity, clearCart} = useCart()
    const [promoCode, setPromoCode] = useState("")
    const [promoApplied, setPromoApplied] = useState(false)

    // Calculate totals
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const discount = promoApplied ? subtotal * 0.1 : 0 // 10% discount
    const tax = (subtotal - discount) * 0.08 // 8% tax
    const shipping = subtotal > 100 ? 0 : 9.99 // Free shipping over $100
    const total = subtotal - discount + tax + shipping

    // Apply promo code
    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === "fitcoach10") {
            setPromoApplied(true)
        }
    }

    return (
        <div className="min-h-screen bg-[#f4efe8]">
            {/* Header Section */}
            <section className="w-full py-12 md:py-16 bg-white border-b border-[#003942]/10">
                <CenteredContainer>
                    <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                        <div
                            className="inline-flex items-center rounded-full bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                            <ShoppingBag className="mr-1 h-4 w-4"/>
                            Your Cart
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#003942]">
                            Shopping <span className="text-[#003942]">Basket</span>
                        </h1>
                        <p className="text-lg text-[#003942]/70 max-w-[700px]">
                            Review your items and proceed to checkout when you're ready.
                        </p>
                    </div>
                </CenteredContainer>
            </section>

            {/* Cart Content Section */}
            <section className="py-12">
                <CenteredContainer>
                    {items.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2">
                                <div
                                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#003942]/10">
                                    <div className="p-6 border-b border-[#003942]/10">
                                        <h2 className="text-xl font-bold text-[#003942]">Cart Items
                                            ({items.length})</h2>
                                    </div>

                                    <div className="divide-y divide-[#003942]/10">
                                        {items.map((item) => (
                                            <div key={item.id}
                                                 className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                <div
                                                    className="h-20 w-20 rounded-md overflow-hidden bg-[#f4efe8] flex-shrink-0">
                                                    <Image
                                                        src={item.imageUrl || "/placeholder.svg"}
                                                        alt={item.name}
                                                        width={80}
                                                        height={80}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <h3 className="font-medium text-[#003942]">{item.name}</h3>
                                                    <p className="text-sm text-[#003942]/50">{item.category}</p>
                                                    <p className="font-bold mt-1 text-[#003942]">${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                            className="h-8 w-8 flex items-center justify-center rounded-l-md border border-r-0 border-[#003942]/20 bg-[#f4efe8] hover:bg-[#003942]/10 text-[#003942]"
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={item.quantity}
                                                            onChange={(e) => updateItemQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                                                            className="h-8 w-12 border border-[#003942]/20 text-center text-sm text-[#003942] [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                        />
                                                        <button
                                                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                            className="h-8 w-8 flex items-center justify-center rounded-r-md border border-l-0 border-[#003942]/20 bg-[#f4efe8] hover:bg-[#003942]/10 text-[#003942]"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-[#003942]/40 hover:text-[#003942] transition-colors"
                                                    >
                                                        <Trash2 className="h-5 w-5"/>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-6 bg-[#f4efe8] flex justify-between items-center">
                                        <Link
                                            href="/shop"
                                            className="inline-flex items-center text-sm font-medium text-[#003942]/70 hover:text-[#003942] transition-colors"
                                        >
                                            <ArrowLeft className="mr-1 h-4 w-4"/>
                                            Continue Shopping
                                        </Link>
                                        <Button
                                            onClick={() => clearCart()}
                                            variant="outline"
                                            className="text-sm border-[#003942]/20 text-[#003942] hover:bg-[#003942]/10"
                                        >
                                            Clear Cart
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div
                                    className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4 border border-[#003942]/10">
                                    <div className="p-6 border-b border-[#003942]/10">
                                        <h2 className="text-xl font-bold text-[#003942]">Order Summary</h2>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#003942]/70">Subtotal</span>
                                            <span className="text-[#003942]">${subtotal.toFixed(2)}</span>
                                        </div>

                                        {promoApplied && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#003942]">Discount (10%)</span>
                                                <span className="text-[#003942]">-${discount.toFixed(2)}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#003942]/70">Shipping</span>
                                            <span
                                                className="text-[#003942]">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#003942]/70">Tax (8%)</span>
                                            <span className="text-[#003942]">${tax.toFixed(2)}</span>
                                        </div>

                                        <div className="pt-4 border-t border-[#003942]/10">
                                            <div className="flex justify-between font-bold text-[#003942]">
                                                <span>Total</span>
                                                <span>${total.toFixed(2)}</span>
                                            </div>
                                            <p className="text-xs text-[#003942]/50 mt-1">
                                                {shipping === 0 ? "Includes free shipping" : "Free shipping on orders over $100"}
                                            </p>
                                        </div>

                                        <div className="pt-4">
                                            <label htmlFor="promo"
                                                   className="block text-sm font-medium text-[#003942] mb-2">
                                                Promo Code
                                            </label>
                                            <div className="flex gap-2">
                                                <Input
                                                    id="promo"
                                                    placeholder="Enter code"
                                                    value={promoCode}
                                                    onChange={(e) => setPromoCode(e.target.value)}
                                                    className="flex-grow border-[#003942]/20"
                                                    disabled={promoApplied}
                                                />
                                                <Button
                                                    onClick={applyPromoCode}
                                                    variant="outline"
                                                    disabled={promoApplied || !promoCode}
                                                    className="border-[#003942]/20 text-[#003942] hover:bg-[#003942]/10"
                                                >
                                                    Apply
                                                </Button>
                                            </div>
                                            {promoApplied &&
                                                <p className="text-xs text-green-600 mt-1">Promo code applied
                                                    successfully!</p>}
                                            <p className="text-xs text-[#003942]/50 mt-1">Try "FITCOACH10" for 10%
                                                off</p>
                                        </div>
                                        <Link href={"/payment"}>
                                            <Button
                                                className="w-full bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a] mt-6"
                                                size="lg">
                                                Proceed to Checkout
                                                <ChevronRight className="ml-1 h-4 w-4"/>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="bg-white rounded-xl shadow-sm p-12 text-center max-w-2xl mx-auto border border-[#003942]/10">
                            <div
                                className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[#f4efe8] mb-6">
                                <ShoppingBag className="h-10 w-10 text-[#003942]/40"/>
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-[#003942]">Your cart is empty</h2>
                            <p className="text-[#003942]/70 mb-8">Looks like you haven't added any products to your cart
                                yet.</p>
                            <Link href="/shop">
                                <Button className="bg-[#003942] text-[#f4efe8] hover:bg-[#004e5a]" size="lg">
                                    Browse Products
                                    <ChevronRight className="ml-1 h-4 w-4"/>
                                </Button>
                            </Link>
                        </div>
                    )}
                </CenteredContainer>
            </section>

            {/* Product Recommendations */}
            {items.length > 0 && (
                <section className="py-12 bg-white">
                    <CenteredContainer>
                        <h2 className="text-2xl font-bold mb-8 text-[#003942]">You Might Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="bg-[#f4efe8] rounded-lg overflow-hidden border border-[#003942]/10 transition-all hover:shadow-md"
                                >
                                    <div className="aspect-square relative">
                                        <Image
                                            src={`/placeholder.svg?height=200&width=200`}
                                            alt="Product recommendation"
                                            width={200}
                                            height={200}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-medium text-[#003942]">Recommended Product {item}</h3>
                                        <p className="text-sm text-[#003942]/50">Category</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="font-bold text-[#003942]">$29.99</span>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-[#003942]/20 text-[#003942] hover:bg-[#003942]/10"
                                            >
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CenteredContainer>
                </section>
            )}
        </div>
    )
}
