"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext, type ReactNode } from "react"

// Define the CartItem type
export interface CartItem {
    id: string
    name: string
    price: number
    imageUrl: string
    quantity?: number
}

// Define the CartContextType interface
interface CartContextType {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (itemId: string) => void
    updateItemQuantity: (itemId: string, quantity: number) => void
    clearCart: () => void
}

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined)

// Create a CartProvider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([])
    const [itemCount, setItemCount] = useState(0)


    useEffect(() => {
        // Load cart items from local storage on component mount
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
            setItems(JSON.parse(storedCart))
        }
    }, [])

    useEffect(() => {
        // Save cart items to local storage whenever the cart changes
        localStorage.setItem("cart", JSON.stringify(items))
        const count = items.reduce((total, item) => total + item.quantity, 0)
        setItemCount(count)
    }, [items])

    // Add item to cart
    const addItem = (item: CartItem) => {
        const existingItemIndex = items.findIndex((i) => i.id === item.id)

        if (existingItemIndex !== -1) {
            // If item already exists, update the quantity
            const updatedItems = [...items]
            updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity: updatedItems[existingItemIndex].quantity + (item.quantity || 1),
            }
            setItems(updatedItems)
        } else {
            // If item doesn't exist, add it to the cart
            setItems([...items, { ...item, quantity: item.quantity || 1 }])
        }
    }

    // Remove item from cart
    const removeItem = (itemId: string) => {
        setItems(items.filter((item) => item.id !== itemId))
    }

    // Update item quantity in cart
    const updateItemQuantity = (itemId: string, quantity: number) => {
        const updatedItems = items.map((item) => (item.id === itemId ? { ...item, quantity } : item))
        setItems(updatedItems)
    }

    // Clear cart
    const clearCart = () => {
        setItems([])
    }

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateItemQuantity, clearCart, itemCount }}>
            {children}
        </CartContext.Provider>
    )
}

// Create a custom hook to use the cart context
export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
