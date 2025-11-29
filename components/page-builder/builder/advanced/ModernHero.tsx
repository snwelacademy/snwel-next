'use client'

import { ComponentConfig } from "@measured/puck";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ModernHeroProps = {
    headline: string;
    subheadline: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    backgroundImage?: string;
    align: "left" | "center";
    height: "small" | "medium" | "large" | "screen";
    overlayOpacity: number;
};

export const ModernHero: ComponentConfig<ModernHeroProps> = {
    fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        primaryButtonText: { type: "text" },
        primaryButtonLink: { type: "text" },
        secondaryButtonText: { type: "text" },
        secondaryButtonLink: { type: "text" },
        backgroundImage: { type: "text" },
        align: {
            type: "radio",
            options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
            ],
        },
        height: {
            type: "select",
            options: [
                { label: "Small (400px)", value: "small" },
                { label: "Medium (600px)", value: "medium" },
                { label: "Large (800px)", value: "large" },
                { label: "Full Screen", value: "screen" },
            ]
        },
        overlayOpacity: {
            type: "number",
            min: 0,
            max: 100,
        }
    },
    defaultProps: {
        headline: "Build Something Amazing",
        subheadline: "Launch your next project with a powerful, high-converting landing page.",
        primaryButtonText: "Get Started",
        primaryButtonLink: "#",
        align: "center",
        height: "medium",
        overlayOpacity: 50,
        backgroundImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    },
    render: ({ headline, subheadline, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink, backgroundImage, align, height, overlayOpacity }) => {

        const heightClasses = {
            small: "min-h-[400px]",
            medium: "min-h-[600px]",
            large: "min-h-[800px]",
            screen: "min-h-screen",
        };

        return (
            <div className={cn("relative flex items-center w-full bg-cover bg-center bg-no-repeat", heightClasses[height])}
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity / 100 }}></div>

                <div className="container relative z-10 px-4 mx-auto">
                    <div className={cn("max-w-3xl", {
                        "mx-auto text-center": align === "center",
                        "text-left": align === "left",
                    })}>
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                            {headline}
                        </h1>
                        <p className="mt-6 text-xl text-gray-200 sm:text-2xl max-w-2xl mx-auto">
                            {subheadline}
                        </p>
                        <div className={cn("mt-10 flex flex-col sm:flex-row gap-4", {
                            "justify-center": align === "center",
                            "justify-start": align === "left",
                        })}>
                            {primaryButtonText && (
                                <Button asChild size="lg" className="text-lg px-8 py-6">
                                    <Link href={primaryButtonLink || "#"}>{primaryButtonText}</Link>
                                </Button>
                            )}
                            {secondaryButtonText && (
                                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-white hover:text-black">
                                    <Link href={secondaryButtonLink || "#"}>{secondaryButtonText}</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};
