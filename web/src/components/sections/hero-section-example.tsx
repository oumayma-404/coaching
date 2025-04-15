import CenteredContainer from "@/components/layout/centered-container"

export default function HeroSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
            <CenteredContainer>
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">{/* Content here */}</div>
            </CenteredContainer>
        </section>
    )
}
