"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Palette, PenTool, Layout, MousePointer2, ArrowUpRight, User, HelpCircle } from "lucide-react"
import EnquiryForm from "@/components/forms/EnquiryForm"
import Link from "next/link"

export default function MarketingPage4() {
    return (
        <div className="min-h-screen bg-[#f8f5f2] text-[#2d2a26] font-sans overflow-hidden">
            {/* Decorative Blobs */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ffecd1] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#e0f4ff] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-[#ffe4e6] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-24 pb-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto text-center relative z-10">
                        <div className="inline-block mb-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                            <span className="bg-[#ff6b6b] text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg">
                                Creative Masterclass
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                            Design that <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b6b] to-[#4ecdc4]">Delights</span>
                        </h1>
                        <p className="text-2xl text-[#666] mb-12 max-w-2xl mx-auto font-light">
                            Master the art of UI/UX design. Learn to create interfaces that are not just functional, but emotionally resonant.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link href="/courses/ui-ux-design">
                                <Button size="lg" className="h-16 px-10 text-xl bg-[#2d2a26] text-white rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    Start Creating
                                </Button>
                            </Link>
                            <Link href="/courses/ui-ux-design">
                                <Button variant="outline" size="lg" className="h-16 px-10 text-xl border-2 border-[#2d2a26] text-[#2d2a26] bg-transparent rounded-2xl hover:bg-[#2d2a26] hover:text-white transition-colors">
                                    View Portfolio
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Floating Cards */}
                <div className="container mx-auto px-4 mt-20 relative h-[400px] hidden md:block">
                    <div className="absolute left-10 top-10 w-64 bg-white p-4 rounded-2xl shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-10">
                        <div className="h-32 bg-[#ffecd1] rounded-xl mb-4"></div>
                        <div className="h-4 w-3/4 bg-slate-100 rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                    </div>
                    <div className="absolute right-10 top-20 w-64 bg-white p-4 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
                        <div className="h-32 bg-[#e0f4ff] rounded-xl mb-4"></div>
                        <div className="h-4 w-3/4 bg-slate-100 rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                    </div>
                    <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-96 h-64 bg-white p-2 rounded-3xl shadow-2xl z-20">
                        <div className="w-full h-full rounded-2xl overflow-hidden relative bg-slate-200">
                            {/* Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                [ Creative Visual ]
                            </div>
                            <img
                                src="/artifacts/marketing_hero_4.png"
                                alt="Creative Design"
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.querySelector('div')!.style.display = 'flex';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <div className="bg-[#2d2a26] py-6 overflow-hidden transform -rotate-1">
                <div className="flex gap-12 text-white/50 text-2xl font-bold whitespace-nowrap animate-marquee">
                    <span>FIGMA</span> <span>ADOBE XD</span> <span>SKETCH</span> <span>FRAMER</span> <span>PRINCIPLE</span> <span>PROTOPIE</span> <span>WEBFLOW</span>
                    <span>FIGMA</span> <span>ADOBE XD</span> <span>SKETCH</span> <span>FRAMER</span> <span>PRINCIPLE</span> <span>PROTOPIE</span> <span>WEBFLOW</span>
                </div>
            </div>

            {/* Course Modules */}
            <section className="py-32">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-5xl font-bold mb-8 leading-tight">Crafting Digital <br /> Experiences</h2>
                            <p className="text-xl text-[#666] mb-8">
                                This isn't just about learning tools. It's about understanding human psychology, color theory, and interaction design.
                            </p>
                            <ul className="space-y-6">
                                {[
                                    { icon: Palette, text: "Advanced Color Theory & Typography" },
                                    { icon: Layout, text: "Grid Systems & Responsive Layouts" },
                                    { icon: MousePointer2, text: "Micro-interactions & Animation" },
                                    { icon: PenTool, text: "Design Systems & Component Libraries" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-lg font-medium">
                                        <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#ff6b6b]">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 mt-12">
                                <div className="bg-[#ff6b6b] h-48 rounded-3xl shadow-lg"></div>
                                <div className="bg-[#4ecdc4] h-64 rounded-3xl shadow-lg"></div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-[#ffe66d] h-64 rounded-3xl shadow-lg"></div>
                                <div className="bg-[#1a535c] h-48 rounded-3xl shadow-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Instructor Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="w-40 h-40 bg-[#ffecd1] rounded-full mx-auto mb-8 overflow-hidden border-4 border-white shadow-xl">
                            <User className="w-full h-full p-8 text-[#ff6b6b]" />
                        </div>
                        <h2 className="text-4xl font-bold mb-2">Mia Wong</h2>
                        <p className="text-[#ff6b6b] text-xl font-medium mb-6">Lead Product Designer @ CreativeStudio</p>
                        <p className="text-[#666] text-lg max-w-2xl mx-auto leading-relaxed">
                            "Design is not just what it looks like and feels like. Design is how it works." Mia brings her award-winning aesthetic and user-centric approach to help you find your unique style.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-4xl font-bold mb-12 text-center">Curious Minds Ask</h2>
                    <div className="space-y-6">
                        {[
                            { q: "Do I need to know how to code?", a: "No! This course focuses entirely on design tools and principles." },
                            { q: "Which software do we use?", a: "We primarily use Figma, but the concepts apply to any tool." },
                            { q: "Is there a portfolio review?", a: "Yes, the final project includes a 1-on-1 portfolio review session." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-xl mb-3 flex items-center gap-3">
                                    <HelpCircle className="h-6 w-6 text-[#4ecdc4]" />
                                    {faq.q}
                                </h3>
                                <p className="text-[#666] ml-9 text-lg">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enquiry Form */}
            <section className="py-24 bg-[#2d2a26] text-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-5xl font-bold mb-6">Let's Create Something Beautiful</h2>
                            <p className="text-white/70 text-xl mb-8">
                                Ready to transform your ideas into reality? Drop us a line or enroll today.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/courses/ui-ux-design">
                                    <Button className="h-14 px-8 bg-[#ff6b6b] hover:bg-blue-600 text-white rounded-xl text-lg font-bold">
                                        Enroll Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-8 text-[#2d2a26]">
                            <EnquiryForm type="general" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
