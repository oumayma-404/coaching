/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Trash2, ChevronRight, ArrowLeft } from "lucide-react"
import CenteredContainer from "@/layout/centered-container"
import { useCart } from "@/context/cart-context"

export default function BasketPage() {
    const { items, removeItem, updateQuantity, clearCart } = useCart()

    // Calculate totals
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const shipping = subtotal > 100 ? 0 : 9.99 // Free shipping over $100
    const total = subtotal  +shipping

    // Apply promo code

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <section className="w-full py-12 md:py-16 bg-white border-b">
                <CenteredContainer>
                    <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                        <div className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-sm font-semibold text-orange-800">
                            <ShoppingBag className="mr-1 h-4 w-4" />
                            Your Cart
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
                            Shopping <span className="text-red-600">Basket</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-[700px]">
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
                                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <div className="p-6 border-b">
                                        <h2 className="text-xl font-bold">Cart Items ({items.length})</h2>
                                    </div>

                                    <div className="divide-y">
                                        {items.map((item) => (
                                            <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                                    <Image
                                                        src={item.image || "/placeholder.svg"}
                                                        alt={item.name}
                                                        width={80}
                                                        height={80}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <h3 className="font-medium">{item.name}</h3>
                                                    <p className="text-sm text-gray-500">{item.category}</p>
                                                    <p className="font-bold mt-1">${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="h-8 w-8 flex items-center justify-center rounded-l-md border border-r-0 bg-gray-50 hover:bg-gray-100"
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={item.quantity}
                                                            onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                                                            className="h-8 w-12 border text-center text-sm [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                        />
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="h-8 w-8 flex items-center justify-center rounded-r-md border border-l-0 bg-gray-50 hover:bg-gray-100"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-gray-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-6 bg-gray-50 flex justify-between items-center">
                                        <Link
                                            href="/shop"
                                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                                        >
                                            <ArrowLeft className="mr-1 h-4 w-4" />
                                            Continue Shopping
                                        </Link>
                                        <Button onClick={() => clearCart()} variant="outline" className="text-sm">
                                            Clear Cart
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4">
                                    <div className="p-6 border-b">
                                        <h2 className="text-xl font-bold">Order Summary</h2>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Shipping</span>
                                            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                        </div>
                                        

                                        <div className="pt-4 border-t">
                                            <div className="flex justify-between font-bold">
                                                <span>Total</span>
                                                <span>${total.toFixed(2)}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {shipping === 0 ? "Includes free shipping" : "Free shipping on orders over $100"}
                                            </p>
                                        </div>
                                        

                                        <Button
                                            className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 mt-6"
                                            size="lg"
                                        >
                                            Proceed to Checkout
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm p-12 text-center max-w-2xl mx-auto">
                            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 mb-6">
                                <ShoppingBag className="h-10 w-10 text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
                            <Link href="/shop">
                                <Button
                                    className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                                    size="lg"
                                >
                                    Browse Products
                                    <ChevronRight className="ml-1 h-4 w-4" />
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
                        <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="bg-gray-50 rounded-lg overflow-hidden border transition-all hover:shadow-md">
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
                                        <h3 className="font-medium">Recommended Product {item}</h3>
                                        <p className="text-sm text-gray-500">Category</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="font-bold">$29.99</span>
                                            <Button size="sm" variant="outline">
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
