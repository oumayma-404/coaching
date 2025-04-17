"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type CartItem = {
    id: string
    name: string
    price: number
    image: string
    category: string
    quantity: number
}

type CartContextType = {
    items: CartItem[]
    addItem: (item: Omit<CartItem, "quantity">) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [itemCount, setItemCount] = useState(0)

    // Load cart from localStorage on initial render
    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart)
                setItems(parsedCart)
            } catch (error) {
                console.error("Failed to parse cart from localStorage:", error)
            }
        }
    }, [])

    // Update localStorage and item count whenever cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items))
        const count = items.reduce((total, item) => total + item.quantity, 0)
        setItemCount(count)
    }, [items])

    const addItem = (newItem: Omit<CartItem, "quantity">) => {
        setItems((prevItems) => {
            // Check if item already exists in cart
            const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id)

            if (existingItemIndex >= 0) {
                // Item exists, increment quantity
                const updatedItems = [...prevItems]
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1,
                }
                return updatedItems
            } else {
                // Item doesn't exist, add new item with quantity 1
                return [...prevItems, { ...newItem, quantity: 1 }]
            }
        })
    }

    const removeItem = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return

        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
        )
    }

    const clearCart = () => {
        setItems([])
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
