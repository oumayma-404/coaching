import { ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/components/ui/product-card"

export default function ShopSection() {
    // Product data that could be fetched from an API
    const products = {
        supplements: [
            {
                name: "Premium Protein Powder",
                price: 49.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Supplements",
            },
            {
                name: "Pre-Workout Formula",
                price: 39.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Supplements",
            },
            {
                name: "BCAA Recovery Drink",
                price: 36.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Supplements",
            },
            {
                name: "Multivitamin Complex",
                price: 29.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Supplements",
            },
        ],
        equipment: [
            {
                name: "Resistance Bands Set",
                price: 29.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Equipment",
            },
            {
                name: "Adjustable Dumbbell Set",
                price: 199.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Equipment",
            },
            {
                name: "Fitness Tracker Watch",
                price: 129.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Equipment",
            },
            { name: "Yoga Mat Premium", price: 49.99, image: "/placeholder.svg?height=300&width=300", category: "Equipment" },
        ],
        apparel: [
            {
                name: "Performance T-Shirt",
                price: 34.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Apparel",
            },
            {
                name: "Compression Leggings",
                price: 59.99,
                image: "/placeholder.svg?height=300&width=300",
                category: "Apparel",
            },
            { name: "Training Shorts", price: 39.99, image: "/placeholder.svg?height=300&width=300", category: "Apparel" },
            { name: "Workout Hoodie", price: 64.99, image: "/placeholder.svg?height=300&width=300", category: "Apparel" },
        ],
    }

    // Combine all products for the "all" tab
    const allProducts = [
        ...products.supplements.slice(0, 2),
        ...products.equipment.slice(0, 2),
        ...products.apparel.slice(0, 2),
        ...products.supplements.slice(2, 3),
        ...products.equipment.slice(2, 3),
    ]

    return (
        <section id="shop" className="w-full py-12 md:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                            <ShoppingBag className="mr-1 h-4 w-4" />
                            Shop
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Training Essentials</h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Quality products hand-picked by our coaches to help you reach your fitness goals faster.
                        </p>
                    </div>
                </div>
                <Tabs defaultValue="all" className="mt-8">
                    <div className="flex justify-center">
                        <TabsList>
                            <TabsTrigger value="all">All Products</TabsTrigger>
                            <TabsTrigger value="supplements">Supplements</TabsTrigger>
                            <TabsTrigger value="equipment">Equipment</TabsTrigger>
                            <TabsTrigger value="apparel">Apparel</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {allProducts.map((product, index) => (
                                <ProductCard
                                    key={`all-${index}`}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="supplements" className="mt-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {products.supplements.map((product, index) => (
                                <ProductCard
                                    key={`supplement-${index}`}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="equipment" className="mt-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {products.equipment.map((product, index) => (
                                <ProductCard
                                    key={`equipment-${index}`}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="apparel" className="mt-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {products.apparel.map((product, index) => (
                                <ProductCard
                                    key={`apparel-${index}`}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
                <div className="mt-12 flex justify-center">
                    <Button variant="outline" size="lg">
                        View All Products
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
