import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface BeforeAfterCardProps {
    name: string
    duration: string
    beforeImage: string
    afterImage: string
    testimonial: string
}

export default function BeforeAfterCard({
                                            name,
                                            duration,
                                            beforeImage,
                                            afterImage,
                                            testimonial,
                                        }: BeforeAfterCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{duration} transformation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <p className="text-xs text-center text-gray-500">Before</p>
                        <Image
                            src={beforeImage || "/placeholder.svg"}
                            width={300}
                            height={400}
                            alt={`${name} before transformation`}
                            className="rounded-md object-cover h-48 w-full"
                        />
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-center text-gray-500">After</p>
                        <Image
                            src={afterImage || "/placeholder.svg"}
                            width={300}
                            height={400}
                            alt={`${name} after transformation`}
                            className="rounded-md object-cover h-48 w-full"
                        />
                    </div>
                </div>
                <p className="text-sm italic">"{testimonial}"</p>
            </CardContent>
        </Card>
    )
}
