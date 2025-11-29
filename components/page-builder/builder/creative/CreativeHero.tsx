'use client'

import { ComponentConfig } from "@measured/puck";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type CreativeHeroProps = {
    headline: string;
    subheadline: string;
    badgeText: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    imageSrc: string;
    align: "left" | "right";
};

export const CreativeHero: ComponentConfig<CreativeHeroProps> = {
    fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        badgeText: { type: "text" },
        primaryButtonText: { type: "text" },
        primaryButtonLink: { type: "text" },
        imageSrc: { type: "text" },
        align: {
            type: "radio",
            options: [
                { label: "Left Content", value: "left" },
                { label: "Right Content", value: "right" },
            ]
        }
    },
    defaultProps: {
        headline: "Design the Future",
        subheadline: "Experience a new era of digital creativity. We build tools that empower your imagination.",
        badgeText: "New Release v2.0",
        primaryButtonText: "Get Started",
        primaryButtonLink: "#",
        imageSrc: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        align: "left",
    },
    render: ({ headline, subheadline, badgeText, primaryButtonText, primaryButtonLink, imageSrc, align }) => {
        return (
            <div className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-background">
                {/* Background Shape */}
                <div className={cn("absolute top-0 w-2/3 h-full bg-primary/5 -skew-x-12 z-0", {
                    "left-0 -translate-x-1/4": align === "left",
                    "right-0 translate-x-1/4": align === "right",
                })} />

                <div className="container mx-auto px-4 relative z-10">
                    <div className={cn("flex flex-col lg:flex-row items-center gap-12 lg:gap-20", {
                        "lg:flex-row-reverse": align === "right",
                    })}>
                        {/* Content */}
                        <div className="flex-1 space-y-8">
                            {badgeText && (
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm tracking-wide">
                                    {badgeText}
                                </span>
                            )}
                            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.1]">
                                {headline}
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                                {subheadline}
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <Link href={primaryButtonLink}>{primaryButtonText}</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="flex-1 w-full relative">
                            <div className="relative aspect-square lg:aspect-[4/5] w-full max-w-lg mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-[2rem] rotate-6 opacity-20 blur-2xl" />
                                <img
                                    src={imageSrc}
                                    alt="Hero"
                                    className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl border-8 border-background"
                                />
                                {/* Floating Element */}
                                <div className="absolute -bottom-10 -left-10 bg-card p-6 rounded-2xl shadow-xl border animate-bounce duration-[3000ms]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
                                            A+
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">Top Rated</p>
                                            <p className="text-sm text-muted-foreground">By 500+ Clients</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};
