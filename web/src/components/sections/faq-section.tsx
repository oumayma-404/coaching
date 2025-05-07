/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import CenteredContainer from "@/layout/centered-container"

// FAQ data with Arabic content
const faqData = [
    {
        question: "‎الكربوهيدرات و الميزان: هل يلزم نقصّو منها باش نضعفو؟",
        answer:
            "\n" +
            "‎برشا ناس يلومو الكربوهيدرات (كيف الخبز، المقرونة، البطاطا) على زيادة الوزن، أما الحقيقة أبسط من هكّا: الضعف يجي وقت اللي تصرف أكثر سعرات من اللي تدخلهم، موش على خاطر تاكل كربوهيدرات برك.\n" +
            "‎صحيح، الرجيمات اللي فيها كربوهيدرات قليلة تعطي نتيجة أسرع في الأول، أما على المدى البعيد الفرق ما هوش كبير. والمفتاح هو: تِاكل صحي، وتتحرّك، وتبقى ثابت.\n" +
            "‎نصيحة من Fit Way: ما تقطعش الكربوهيدرات، خيّر الأنواع الصحّية كيما الشوفان، الأرز الأسمر، والبطاطا، وبدّل حسب نشاطك وهدفك..",
    },
    {
        question: "وقتاش تاخو البروتين؟ وشنوّا أقل عمر؟",
        answer:
            "\n" +
            "البروتين مهم برشا للعضلات، خاصة بعد التمرين. الوقت المثالي باش تاخذو هو نص ساعة حتى ساعة بعد التمرين، وقتها الجسم يشدّو خير ويبني العضلات أسرع. أما تنجم زادة تاكل بروتين في فطور الصباح أو قبل النوم، حسب برنامجك.\n" +
            "شنوّا أقل عمر؟\n" +
            "بالنسبة للمكملات كيما واي بروتين، الأفضل من بعد 16 سنة، وبعد استشارة مدرب أو طبيب. أما البروتين الطبيعي من الماكلة (بيض، لحم، دجاج) ينجم ياكلو أي واحد في أي عمر.",
    },
    {
        question: "شنوّة الكرياتين؟ وهل ينجم يعاونك في التمرين؟",
        answer:
            "\n" +
            "الكرياتين هو مكمل طبيعي يلقاه الجسم في العضلات، ويساعدك باش تعطي أقصى طاقة في التمارين القوية والقصيرة كيما رفع الأثقال أو السبرينت. برشا دراسات أكّدت اللي الكرياتين يعاون في:\n" +
            "زيادة القوة والضخامة العضلية\n" +
            "تحسين الأداء الرياضي\n" +
            "تسريع الريكوفري بعد التمرين\n" +
            "كيفاش تاخدو؟\n" +
            "تنجم تبدأ بـ \"فترة تحميل\" (20غ في اليوم مقسّمة على 4 مرّات) لمدة 5 أيام، وبعدها تحافظ بـ 5غ يوميًا. أما تنجم زادة تمشي ديغري بـ 5غ مباشرة كل يوم.\n" +
            "وقتاش تاخدو؟\n" +
            "أفضل وقت يا إما بعد التمرين، ولا مع وجبة فيها كربوهيدرات وبروتين.\n" +
            "من عمر شحال؟\n" +
            "يُنصح بيه بعد 18 سنة، خاصة للناس اللي تتدرّب بجدية وتحت إشراف مدرب.",
    }
]

export default function FaqSection() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Check if we're on mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Handle slider navigation
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === faqData.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? faqData.length - 1 : prev - 1))
    }

    // Touch handlers for swipe gestures
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            // Swipe left
            nextSlide()
        }

        if (touchEnd - touchStart > 75) {
            // Swipe right
            prevSlide()
        }
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <CenteredContainer>
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-flex items-center rounded-full border border-[#003942]/20 bg-[#003942]/10 px-2.5 py-0.5 text-sm font-semibold text-[#003942]">
                        <HelpCircle className="mr-1 h-4 w-4" />
                        FAQ
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#003942]">
                        Frequently Asked <span className="text-[#003942]">Questions</span>
                    </h2>
                    <p className="max-w-[900px] text-[#003942]/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Find answers to common questions about our coaching services and programs.
                    </p>
                </div>

                {/* Mobile Slider */}
                <div className="md:hidden relative" ref={containerRef}>
                    <div
                        className="overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {faqData.map((faq, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-4">
                                    <div className="bg-[#f4efe8] p-6 rounded-xl shadow-sm border border-[#003942]/10 h-full">
                                        <h3 className="font-bold text-lg mb-3 text-[#003942] text-right">{faq.question}</h3>
                                        <p className="text-[#003942]/70 text-right" dir="rtl">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10"
                        aria-label="Previous question"
                    >
                        <ChevronLeft className="h-6 w-6 text-[#003942]" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10"
                        aria-label="Next question"
                    >
                        <ChevronRight className="h-6 w-6 text-[#003942]" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {faqData.map((_, index) => (
                            <button
                                key={`dot-${index}`}
                                className={`h-2 rounded-full transition-all ${
                                    currentSlide === index ? "w-6 bg-[#003942]" : "w-2 bg-[#003942]/30"
                                }`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to question ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-[#f4efe8] p-6 rounded-xl shadow-sm border border-[#003942]/10 hover:shadow-md transition-shadow"
                        >
                            <h3 className="font-bold text-lg mb-3 text-[#003942] text-right">{faq.question}</h3>
                            <p className="text-[#003942]/70 text-right" dir="rtl">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

               
            </CenteredContainer>
        </section>
    )
}
