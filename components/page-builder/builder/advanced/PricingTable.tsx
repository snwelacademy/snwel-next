'use client'

import { ComponentConfig } from "@measured/puck";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type PricingPlan = {
    name: string;
    price: string;
    frequency: string;
    description: string;
    features: string; // Newline separated
    buttonText: string;
    buttonLink: string;
    popular: boolean;
};

export type PricingTableProps = {
    title: string;
    subtitle: string;
    plans: PricingPlan[];
};

export const PricingTable: ComponentConfig<PricingTableProps> = {
    fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        plans: {
            type: "array",
            arrayFields: {
                name: { type: "text" },
                price: { type: "text" },
                frequency: { type: "text" },
                description: { type: "textarea" },
                features: { type: "textarea" },
                buttonText: { type: "text" },
                buttonLink: { type: "text" },
                popular: {
                    type: "radio",
                    options: [
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                    ]
                }
            },
            getItemSummary: (item) => item.name || "Plan",
        }
    },
    defaultProps: {
        title: "Simple, Transparent Pricing",
        subtitle: "Choose the plan that's right for you.",
        plans: [
            { name: "Starter", price: "$29", frequency: "/month", description: "Perfect for individuals.", features: "5 Projects\nBasic Analytics\nCommunity Support", buttonText: "Get Started", buttonLink: "#", popular: false },
            { name: "Pro", price: "$99", frequency: "/month", description: "For growing teams.", features: "Unlimited Projects\nAdvanced Analytics\nPriority Support\nCustom Domain", buttonText: "Get Started", buttonLink: "#", popular: true },
            { name: "Enterprise", price: "Custom", frequency: "", description: "For large organizations.", features: "Dedicated Account Manager\nSLA\nSSO Integration\nAudit Logs", buttonText: "Contact Sales", buttonLink: "#", popular: false },
        ]
    },
    render: ({ title, subtitle, plans }) => {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h2>
                    <p className="text-lg text-muted-foreground">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <div key={i} className={cn("relative flex flex-col p-8 bg-card rounded-2xl border shadow-sm", {
                            "border-primary shadow-lg scale-105 z-10": plan.popular,
                        })}>
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">{plan.frequency}</span>
                                </div>
                            </div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                {plan.features.split('\n').map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm">
                                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button asChild variant={plan.popular ? "default" : "outline"} className="w-full">
                                <Link href={plan.buttonLink}>{plan.buttonText}</Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
};
