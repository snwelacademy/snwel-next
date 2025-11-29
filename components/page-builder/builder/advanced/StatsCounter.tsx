'use client'

import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";

export type StatItem = {
    number: string;
    label: string;
    suffix?: string;
};

export type StatsCounterProps = {
    stats: StatItem[];
    background: "white" | "muted" | "primary";
};

export const StatsCounter: ComponentConfig<StatsCounterProps> = {
    fields: {
        background: {
            type: "select",
            options: [
                { label: "White", value: "white" },
                { label: "Muted (Gray)", value: "muted" },
                { label: "Primary Color", value: "primary" },
            ]
        },
        stats: {
            type: "array",
            arrayFields: {
                number: { type: "text" },
                suffix: { type: "text" },
                label: { type: "text" },
            },
            getItemSummary: (item) => item.label || "Stat",
        }
    },
    defaultProps: {
        background: "primary",
        stats: [
            { number: "10", suffix: "k+", label: "Active Users" },
            { number: "500", suffix: "+", label: "Components" },
            { number: "99", suffix: "%", label: "Satisfaction" },
            { number: "24", suffix: "/7", label: "Support" },
        ]
    },
    render: ({ stats, background }) => {
        return (
            <div className={cn("py-16", {
                "bg-background": background === "white",
                "bg-muted": background === "muted",
                "bg-primary text-primary-foreground": background === "primary",
            })}>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="text-4xl md:text-5xl font-extrabold mb-2">
                                    {stat.number}<span className="text-3xl md:text-4xl opacity-80">{stat.suffix}</span>
                                </div>
                                <div className={cn("text-sm uppercase tracking-wider font-medium", {
                                    "text-muted-foreground": background !== "primary",
                                    "text-primary-foreground/80": background === "primary",
                                })}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
};
