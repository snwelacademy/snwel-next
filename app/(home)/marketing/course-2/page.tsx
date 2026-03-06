"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Terminal, Cpu, Globe, Shield, ArrowRight, User, HelpCircle, MessageSquare } from "lucide-react"
import EnquiryForm from "@/components/forms/EnquiryForm"
import Link from "next/link"

export default function MarketingPage2() {
    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500 selection:text-black">
            {/* Grid Background */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Hero Section */}
            <section className="relative pt-24 pb-32">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            New Course Available
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-500">
                            Full Stack <br /> Next.js Mastery
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Build production-ready applications with the App Router, Server Actions, and Edge Computing. The future of web development is here.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                            <Link href="/courses/full-stack-nextjs">
                                <Button size="lg" className="h-14 px-8 text-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-none border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition-all w-full sm:w-auto">
                                    Start Hacking <Terminal className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/courses/full-stack-nextjs">
                                <Button variant="outline" size="lg" className="h-14 px-8 text-lg bg-transparent text-cyan-400 border-cyan-500/50 hover:bg-cyan-950 rounded-none hover:text-cyan-300 w-full sm:w-auto">
                                    View Syllabus
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Hero Image / Graphic */}
                <div className="container mx-auto px-4 mt-16 relative z-10">
                    <div className="relative rounded-lg border border-slate-800 bg-slate-950/50 backdrop-blur-sm p-2 shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                        <div className="aspect-video bg-slate-900 rounded overflow-hidden relative group">
                            {/* Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-mono">
                                [ SYSTEM_IMAGE_LOADING... ]
                            </div>
                            <img
                                src="/artifacts/marketing_hero_2.png"
                                alt="Next.js Mastery"
                                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.querySelector('div')!.style.display = 'flex';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-20 border-t border-slate-800 bg-slate-950/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: Globe, label: "Edge Runtime" },
                            { icon: Shield, label: "NextAuth v5" },
                            { icon: Cpu, label: "Server Actions" },
                            { icon: Terminal, label: "TypeScript" }
                        ].map((item, i) => (
                            <div key={i} className="p-6 border border-slate-800 bg-slate-900/50 hover:border-cyan-500/50 transition-colors group">
                                <item.icon className="h-8 w-8 mx-auto mb-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                <h3 className="font-bold text-lg text-slate-300 group-hover:text-white">{item.label}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instructor Section */}
            <section className="py-24 border-t border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                        <div className="w-48 h-48 bg-slate-800 rounded-none border-2 border-cyan-500/30 flex-shrink-0 relative overflow-hidden">
                            <div className="absolute inset-0 bg-cyan-500/10" />
                            <User className="w-full h-full p-8 text-cyan-500/50" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-2 text-white">Instructed by <span className="text-cyan-400">Sarah Connor</span></h2>
                            <p className="text-slate-400 mb-6">Full Stack Architect & Open Source Contributor</p>
                            <p className="text-slate-300 leading-relaxed">
                                Sarah has been building with Next.js since version 1. She has helped scale applications for startups and Fortune 500 companies alike. Her teaching style focuses on practical, real-world scenarios and deep dives into the "why" behind the code.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 border-t border-slate-800 bg-slate-950/30">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold mb-12 text-center text-white">System <span className="text-cyan-400">FAQ</span></h2>
                    <div className="space-y-4">
                        {[
                            { q: "Is this course up to date?", a: "Yes, we cover the latest Next.js 14+ features including App Router and Server Actions." },
                            { q: "What prerequisites are needed?", a: "Solid knowledge of React and JavaScript/TypeScript is required." },
                            { q: "Do you offer team licenses?", a: "Absolutely. Contact us via the form below for enterprise pricing." }
                        ].map((faq, i) => (
                            <div key={i} className="border border-slate-800 bg-slate-900 p-6 hover:border-cyan-500/30 transition-colors">
                                <h3 className="font-bold text-lg mb-2 text-cyan-100 flex items-center gap-2">
                                    <span className="text-cyan-500">{">"}</span> {faq.q}
                                </h3>
                                <p className="text-slate-400 pl-5 font-mono text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing CTA */}
            <section className="py-32 relative overflow-hidden border-t border-slate-800">
                <div className="absolute inset-0 bg-cyan-900/5" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl font-bold mb-6">Initialize Your Journey</h2>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto">Join the elite circle of developers building the next generation of web apps.</p>
                    <div className="inline-block p-[1px] rounded-none bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500">
                        <div className="bg-black p-8 sm:p-12">
                            <div className="text-5xl font-bold text-white mb-2">$149</div>
                            <div className="text-cyan-400 mb-8">Lifetime Access</div>
                            <Link href="/courses/full-stack-nextjs">
                                <Button className="w-full sm:w-auto h-12 px-10 bg-white text-black hover:bg-slate-200 font-bold rounded-none">
                                    Get Access Now <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enquiry Form */}
            <section className="py-24 border-t border-slate-800 bg-slate-900">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Establish Connection</h2>
                        <p className="text-slate-400">Have questions about the stack? Ping us directly.</p>
                    </div>
                    <div className="bg-black border border-slate-800 p-8 shadow-2xl">
                        <EnquiryForm type="general" />
                    </div>
                </div>
            </section>
        </div>
    )
}
