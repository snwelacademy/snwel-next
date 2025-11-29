'use client'

import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

// Helper to render dynamic icons
const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
    // @ts-ignore
    const Icon = LucideIcons[name];
    if (!Icon) return <LucideIcons.Star className={className} />;
    return <Icon className={className} />;
};

export type FeatureItem = {
    title: string;
    description: string;
    icon: string;
};

export type FeatureGridProps = {
    features: FeatureItem[];
    columns: "2" | "3" | "4";
    title?: string;
    subtitle?: string;
};

export const FeatureGrid: ComponentConfig<FeatureGridProps> = {
    fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        columns: {
            type: "select",
            options: [
                { label: "2 Columns", value: "2" },
                { label: "3 Columns", value: "3" },
                { label: "4 Columns", value: "4" },
            ]
        },
        features: {
            type: "array",
            arrayFields: {
                title: { type: "text" },
                description: { type: "textarea" },
                icon: {
                    type: "select",
                    options: [
                        { label: "Star", value: "Star" },
                        { label: "Zap", value: "Zap" },
                        { label: "Shield", value: "Shield" },
                        { label: "Users", value: "Users" },
                        { label: "BarChart", value: "BarChart" },
                        { label: "Globe", value: "Globe" },
                        { label: "Smartphone", value: "Smartphone" },
                        { label: "Code", value: "Code" },
                        { label: "Heart", value: "Heart" },
                        { label: "Lightbulb", value: "Lightbulb" },
                    ]
                }
            },
            getItemSummary: (item) => item.title || "Feature",
        }
    },
    defaultProps: {
        title: "Our Features",
        subtitle: "Everything you need to succeed.",
        columns: "3",
        features: [
            { title: "Fast Performance", description: "Optimized for speed and efficiency.", icon: "Zap" },
            { title: "Secure Data", description: "Your data is safe with us.", icon: "Shield" },
            { title: "24/7 Support", description: "We are here to help anytime.", icon: "Users" },
        ]
    },
    render: ({ title, subtitle, features, columns }) => {
        return (
            <div className="container mx-auto px-4 py-16">
                {(title || subtitle) && (
                    <div className="text-center mb-12 max-w-2xl mx-auto">
                        {title && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h2>}
                        {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
                    </div>
                )}

                <div className={cn("grid gap-8", {
                    "grid-cols-1 md:grid-cols-2": columns === "2",
                    "grid-cols-1 md:grid-cols-3": columns === "3",
                    "grid-cols-1 md:grid-cols-2 lg:grid-cols-4": columns === "4",
                })}>
                    {features.map((feature, i) => (
                        <div key={i} className="flex flex-col items-start p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
                                <DynamicIcon name={feature.icon} className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
};
