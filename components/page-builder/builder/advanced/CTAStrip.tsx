'use client'

import { ComponentConfig } from "@measured/puck";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type CTAStripProps = {
    headline: string;
    subheadline: string;
    buttonText: string;
    buttonLink: string;
    background: "primary" | "dark" | "white";
};

export const CTAStrip: ComponentConfig<CTAStripProps> = {
    fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        buttonText: { type: "text" },
        buttonLink: { type: "text" },
        background: {
            type: "select",
            options: [
                { label: "Primary Color", value: "primary" },
                { label: "Dark", value: "dark" },
                { label: "White", value: "white" },
            ]
        }
    },
    defaultProps: {
        headline: "Ready to get started?",
        subheadline: "Join thousands of satisfied customers today.",
        buttonText: "Sign Up Now",
        buttonLink: "#",
        background: "primary",
    },
    render: ({ headline, subheadline, buttonText, buttonLink, background }) => {
        return (
            <div className={cn("py-20", {
                "bg-primary text-primary-foreground": background === "primary",
                "bg-gray-900 text-white": background === "dark",
                "bg-white text-gray-900 border-y": background === "white",
            })}>
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{headline}</h2>
                    <p className={cn("text-lg mb-8 max-w-2xl mx-auto", {
                        "text-primary-foreground/80": background === "primary",
                        "text-gray-400": background === "dark",
                        "text-gray-600": background === "white",
                    })}>{subheadline}</p>
                    <Button asChild size="lg" variant={background === "white" ? "default" : "secondary"} className="text-lg px-8 py-6">
                        <Link href={buttonLink}>{buttonText}</Link>
                    </Button>
                </div>
            </div>
        );
    },
};
