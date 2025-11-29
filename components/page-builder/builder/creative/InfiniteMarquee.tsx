'use client'

import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";

export type MarqueeItem = {
    text: string;
};

export type InfiniteMarqueeProps = {
    items: MarqueeItem[];
    direction: "left" | "right";
    speed: "slow" | "normal" | "fast";
    background: "white" | "black" | "primary";
};

export const InfiniteMarquee: ComponentConfig<InfiniteMarqueeProps> = {
    fields: {
        items: {
            type: "array",
            arrayFields: {
                text: { type: "text" },
            },
            getItemSummary: (item) => item.text || "Item",
        },
        direction: {
            type: "radio",
            options: [
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
            ]
        },
        speed: {
            type: "select",
            options: [
                { label: "Slow", value: "slow" },
                { label: "Normal", value: "normal" },
                { label: "Fast", value: "fast" },
            ]
        },
        background: {
            type: "select",
            options: [
                { label: "White", value: "white" },
                { label: "Black", value: "black" },
                { label: "Primary", value: "primary" },
            ]
        }
    },
    defaultProps: {
        items: [
            { text: "CREATIVITY" },
            { text: "INNOVATION" },
            { text: "DESIGN" },
            { text: "DEVELOPMENT" },
            { text: "STRATEGY" },
            { text: "MARKETING" },
        ],
        direction: "left",
        speed: "normal",
        background: "black",
    },
    render: ({ items, direction, speed, background }) => {
        const duration = {
            slow: "40s",
            normal: "20s",
            fast: "10s",
        }[speed];

        return (
            <div className={cn("py-12 overflow-hidden flex", {
                "bg-white text-black": background === "white",
                "bg-black text-white": background === "black",
                "bg-primary text-primary-foreground": background === "primary",
            })}>
                <div className="flex min-w-full shrink-0 gap-12 items-center justify-around animate-marquee" style={{
                    animationDuration: duration,
                    animationDirection: direction === "right" ? "reverse" : "normal",
                }}>
                    {items.map((item, i) => (
                        <span key={i} className="text-4xl md:text-6xl font-black uppercase tracking-widest whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity cursor-default">
                            {item.text}
                        </span>
                    ))}
                </div>
                <div className="flex min-w-full shrink-0 gap-12 items-center justify-around animate-marquee" aria-hidden="true" style={{
                    animationDuration: duration,
                    animationDirection: direction === "right" ? "reverse" : "normal",
                }}>
                    {items.map((item, i) => (
                        <span key={i} className="text-4xl md:text-6xl font-black uppercase tracking-widest whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity cursor-default">
                            {item.text}
                        </span>
                    ))}
                </div>
                <style>{`
                    @keyframes marquee {
                        from { transform: translateX(0); }
                        to { transform: translateX(-100%); }
                    }
                    .animate-marquee {
                        animation-name: marquee;
                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                    }
                `}</style>
            </div>
        );
    },
};
