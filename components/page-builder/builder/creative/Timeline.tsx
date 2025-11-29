'use client'

import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";

export type TimelineItem = {
    year: string;
    title: string;
    description: string;
};

export type TimelineProps = {
    title: string;
    items: TimelineItem[];
};

export const Timeline: ComponentConfig<TimelineProps> = {
    fields: {
        title: { type: "text" },
        items: {
            type: "array",
            arrayFields: {
                year: { type: "text" },
                title: { type: "text" },
                description: { type: "textarea" },
            },
            getItemSummary: (item) => item.year || "Year",
        }
    },
    defaultProps: {
        title: "Our Journey",
        items: [
            { year: "2020", title: "Inception", description: "The idea was born in a small garage." },
            { year: "2021", title: "Launch", description: "We released our first beta to the public." },
            { year: "2022", title: "Growth", description: "Reached 10,000 active users worldwide." },
            { year: "2023", title: "Expansion", description: "Opened offices in 3 new countries." },
        ]
    },
    render: ({ title, items }) => {
        return (
            <div className="py-20 container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">{title}</h2>
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

                    <div className="space-y-12">
                        {items.map((item, i) => (
                            <div key={i} className={cn("relative flex flex-col md:flex-row gap-8 md:gap-0", {
                                "md:flex-row-reverse": i % 2 !== 0,
                            })}>
                                {/* Content Side */}
                                <div className="flex-1 md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right">
                                    <div className={cn("bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow", {
                                        "md:ml-auto md:mr-0": i % 2 === 0,
                                        "md:mr-auto md:ml-0": i % 2 !== 0,
                                    })}>
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-2">
                                            {item.year}
                                        </span>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>

                                {/* Center Node */}
                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm z-10 mt-6" />

                                {/* Empty Side for spacing */}
                                <div className="hidden md:block flex-1 md:w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
};
