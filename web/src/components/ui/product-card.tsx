import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"

interface ProductCardProps {
    name: string
    price: number
    image: string
    category: string
}

export default function ProductCard({ name, price, image, category }: ProductCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="aspect-square relative">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                />
                <div className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">{category}</div>
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold">{name}</h3>
                <div className="flex items-center justify-between mt-2">
                    <p className="font-bold">${price.toFixed(2)}</p>
                    <Button size="sm" variant="outline">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
