"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Briefcase, BarChart3, Check, User, HelpCircle } from "lucide-react"
import EnquiryForm from "@/components/forms/EnquiryForm"
import Link from "next/link"

export default function MarketingPage3() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Top Bar */}
            <div className="bg-slate-900 text-slate-300 py-2 px-4 text-xs text-center">
                Trusted by Fortune 500 companies worldwide.
            </div>

            {/* Hero Section */}
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-20 lg:py-28">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-6">
                            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight">
                                Enterprise System <br /> <span className="text-blue-800">Architecture</span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Learn to design robust, scalable, and secure systems for large-scale organizations. A comprehensive curriculum for aspiring software architects.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Link href="/courses/enterprise-architecture">
                                    <Button size="lg" className="bg-blue-800 hover:bg-blue-900 text-white rounded-md px-8 h-12">
                                        Enroll Now
                                    </Button>
                                </Link>
                                <Link href="/courses/enterprise-architecture">
                                    <Button variant="outline" size="lg" className="border-blue-800 text-blue-800 hover:bg-blue-50 rounded-md px-8 h-12">
                                        View Course
                                    </Button>
                                </Link>
                            </div>
                            <div className="pt-8 border-t border-slate-100 flex gap-8">
                                <div>
                                    <div className="text-2xl font-bold text-slate-900">50+</div>
                                    <div className="text-sm text-slate-500">Modules</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-slate-900">120h</div>
                                    <div className="text-sm text-slate-500">Content</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-slate-900">Cert</div>
                                    <div className="text-sm text-slate-500">Included</div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative shadow-xl rounded-lg overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3]">
                                {/* Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200">
                                    Image: Enterprise Architecture
                                </div>
                                <img
                                    src="/artifacts/marketing_hero_3.png"
                                    alt="Enterprise Architecture"
                                    className="object-cover w-full h-full"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.querySelector('div')!.style.display = 'flex';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Audience */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Who is this for?</h2>
                        <p className="text-slate-600 mt-4">Designed for professionals looking to advance their career.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Building2, title: "Senior Developers", desc: "Transition from coding to high-level system design." },
                            { icon: Users, title: "Tech Leads", desc: "Make better architectural decisions for your team." },
                            { icon: Briefcase, title: "Solution Architects", desc: "Refine your skills with modern patterns and practices." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center hover:border-blue-300 transition-colors">
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-800">
                                    <item.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curriculum List */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-10 text-center">Curriculum Overview</h2>
                    <div className="space-y-4">
                        {[
                            "Microservices vs Monoliths",
                            "Event-Driven Architecture",
                            "Database Sharding & Replication",
                            "Cloud Native Patterns (AWS/Azure)",
                            "Security & Compliance (GDPR, SOC2)",
                            "System Observability & Monitoring"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-sm">{i + 1}</span>
                                    <span className="font-medium text-slate-800">{item}</span>
                                </div>
                                <Check className="h-5 w-5 text-green-600" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instructor Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-40 h-40 bg-slate-200 rounded-full flex-shrink-0 overflow-hidden">
                            <User className="w-full h-full p-8 text-slate-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 text-slate-900">Dr. Robert Ford</h2>
                            <p className="text-blue-800 font-medium mb-4">Chief Architect @ GlobalSystems</p>
                            <p className="text-slate-600">
                                With over 20 years of experience designing mission-critical systems for banking and healthcare sectors, Dr. Ford brings a wealth of practical knowledge to this course.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold mb-10 text-center text-slate-900">Common Questions</h2>
                    <div className="grid gap-6">
                        {[
                            { q: "Is this suitable for juniors?", a: "We recommend at least 3 years of development experience." },
                            { q: "What is the time commitment?", a: "Expect to spend 5-7 hours per week for 12 weeks." },
                            { q: "Is there a refund policy?", a: "Yes, we offer a 14-day money-back guarantee." }
                        ].map((faq, i) => (
                            <div key={i} className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                                <h3 className="font-bold text-lg mb-2 text-slate-800 flex items-center gap-2">
                                    <HelpCircle className="h-5 w-5 text-blue-800" />
                                    {faq.q}
                                </h3>
                                <p className="text-slate-600 ml-7">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-blue-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Invest in your career today.</h2>
                    <p className="text-blue-200 mb-8 max-w-2xl mx-auto">Join thousands of architects building the systems of tomorrow.</p>
                    <Link href="/courses/enterprise-architecture">
                        <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-10 h-14 rounded-md">
                            Enroll for $299
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Enquiry Form */}
            <section className="py-20 bg-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-900">Get in Touch</h2>
                        <p className="text-slate-600 mt-2">Need more details? Send us a message.</p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                        <EnquiryForm type="general" />
                    </div>
                </div>
            </section>
        </div>
    )
}
