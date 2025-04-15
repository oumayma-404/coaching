import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/sections/hero-section"
import ResultsSection from "@/components/sections/results-section"
import CoachingSection from "@/components/sections/coaching-section"
import ShopSection from "@/components/sections/shop-section"
import CtaSection from "@/components/sections/cta-section"

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <HeroSection />
                <ResultsSection />
                <CoachingSection />
                <ShopSection />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
