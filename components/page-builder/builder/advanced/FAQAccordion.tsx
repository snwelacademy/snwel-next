'use client'

import { ComponentConfig } from "@measured/puck";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export type FAQItem = {
    question: string;
    answer: string;
};

export type FAQAccordionProps = {
    title: string;
    subtitle: string;
    items: FAQItem[];
};

export const FAQAccordion: ComponentConfig<FAQAccordionProps> = {
    fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        items: {
            type: "array",
            arrayFields: {
                question: { type: "text" },
                answer: { type: "textarea" },
            },
            getItemSummary: (item) => item.question || "Question",
        }
    },
    defaultProps: {
        title: "Frequently Asked Questions",
        subtitle: "Have questions? We're here to help.",
        items: [
            { question: "How do I get started?", answer: "Simply sign up for an account and you can start building your first project immediately." },
            { question: "Can I cancel anytime?", answer: "Yes, you can cancel your subscription at any time from your account settings." },
            { question: "Do you offer refunds?", answer: "We offer a 30-day money-back guarantee if you are not satisfied with our service." },
        ]
    },
    render: ({ title, subtitle, items }) => {
        return (
            <div className="container mx-auto px-4 py-20 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h2>
                    <p className="text-lg text-muted-foreground">{subtitle}</p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {items.map((item, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-left text-lg">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        );
    },
};
