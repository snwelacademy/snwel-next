'use client'

import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";

export type BentoItem = {
    title: string;
    description: string;
    image?: string;
    span: "1" | "2";
};

export type BentoGridProps = {
    items: BentoItem[];
};

export const BentoGrid: ComponentConfig<BentoGridProps> = {
    fields: {
        items: {
            type: "array",
            arrayFields: {
                title: { type: "text" },
                description: { type: "textarea" },
                image: { type: "text" },
                span: {
                    type: "select",
                    options: [
                        { label: "Normal (1 col)", value: "1" },
                        { label: "Wide (2 cols)", value: "2" },
                    ]
                }
            },
            getItemSummary: (item) => item.title || "Grid Item",
        }
    },
    defaultProps: {
        items: [
            { title: "Seamless Integration", description: "Connects with your existing tools.", span: "2", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Real-time Analytics", description: "Track performance instantly.", span: "1", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Secure & Reliable", description: "Enterprise-grade security.", span: "1", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        ]
    },
    render: ({ items }) => {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={cn("relative group overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700", {
                                "md:col-span-2": item.span === "2",
                                "md:col-span-1": item.span === "1",
                            })}
                        >
                            {item.image && (
                                <div className="absolute inset-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-200 text-sm md:text-base line-clamp-2">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
};
