"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ArrowRight, Code2, Layers, Zap, User, HelpCircle } from "lucide-react"
import EnquiryForm from "@/components/forms/EnquiryForm"
import Link from "next/link"

export default function MarketingPage1() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2 space-y-8">
                            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-slate-100 text-slate-600 rounded-full">
                                Advanced Level Course
                            </Badge>
                            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-slate-900">
                                Master <span className="text-blue-600">React Patterns</span> like a Pro.
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                                Elevate your frontend skills with advanced design patterns, performance optimization techniques, and scalable architecture.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/courses/advanced-react-patterns">
                                    <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-slate-900 hover:bg-slate-800 text-white w-full sm:w-auto">
                                        Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link href="/courses/advanced-react-patterns">
                                    <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-slate-200 hover:bg-slate-50 w-full sm:w-auto">
                                        View Course
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-500 pt-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />
                                    ))}
                                </div>
                                <p>Joined by 2,000+ developers</p>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-100 aspect-video">
                                {/* Placeholder for generated image */}
                                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                                    Hero Image Loading...
                                </div>
                                <img
                                    src="/artifacts/marketing_hero_1.png"
                                    alt="React Patterns"
                                    className="object-cover w-full h-full"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.querySelector('div')!.style.display = 'flex';
                                    }}
                                />
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" />
                            <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why this course?</h2>
                        <p className="text-slate-600 text-lg">We dive deep into the internal workings of React to give you a complete understanding of how to build scalable applications.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Code2, title: "Clean Code", desc: "Write maintainable, readable, and reusable code." },
                            { icon: Layers, title: "Scalable Architecture", desc: "Structure your apps for long-term growth and team collaboration." },
                            { icon: Zap, title: "High Performance", desc: "Optimize rendering and state management for speed." }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-slate-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curriculum Preview */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-8">What you'll learn</h2>
                            <div className="space-y-4">
                                {[
                                    "Compound Components Pattern",
                                    "Control Props Pattern",
                                    "Custom Hooks & Logic Reuse",
                                    "React Context & State Management",
                                    "Performance Optimization (Memo, UseCallback)",
                                    "Testing React Applications"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="font-medium text-slate-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2">Ready to start?</h3>
                                <p className="text-slate-300 mb-8">Get lifetime access to all course materials and updates.</p>
                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-5xl font-bold">$99</span>
                                    <span className="text-slate-400 line-through text-xl">$199</span>
                                </div>
                                <Link href="/courses/advanced-react-patterns">
                                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                                        Get Instant Access
                                    </Button>
                                </Link>
                                <p className="text-center text-xs text-slate-400 mt-4">30-day money-back guarantee</p>
                            </div>
                            {/* Abstract bg */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Instructor Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-12">Meet Your Instructor</h2>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8 text-left">
                            <div className="w-32 h-32 bg-slate-200 rounded-full flex-shrink-0 overflow-hidden">
                                <User className="w-full h-full p-6 text-slate-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Alex Johnson</h3>
                                <p className="text-blue-600 font-medium mb-4">Senior Frontend Engineer @ TechCorp</p>
                                <p className="text-slate-600">
                                    Alex has over 10 years of experience building scalable web applications. He is a core contributor to several open-source React libraries and loves teaching complex concepts in simple terms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "Is this course for beginners?", a: "No, this course assumes you have a solid understanding of React basics (hooks, props, state)." },
                            { q: "Do I get a certificate?", a: "Yes, upon completion you will receive a verifiable certificate." },
                            { q: "What if I get stuck?", a: "You will have access to our private Discord community where you can ask questions." }
                        ].map((faq, i) => (
                            <div key={i} className="border border-slate-200 rounded-lg p-6">
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    <HelpCircle className="h-5 w-5 text-blue-600" />
                                    {faq.q}
                                </h3>
                                <p className="text-slate-600 ml-7">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enquiry Form Section */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Still have questions?</h2>
                            <p className="text-slate-300 text-lg mb-8">
                                Fill out the form and our team will get back to you within 24 hours. We're here to help you make the right decision for your career.
                            </p>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                    <span>Detailed course syllabus</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                    <span>Team training options</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                    <span>Payment plan information</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-2xl p-6 text-slate-900">
                            <EnquiryForm type="general" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
