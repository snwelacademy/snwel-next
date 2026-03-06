import { ComponentConfig } from "@measured/puck";
import { HelpCircle } from "lucide-react";

export type FAQItem = {
    question: string;
    answer: string;
};

export type MarketingFAQProps = {
    variant: 'modern' | 'dark' | 'corporate' | 'creative';
    title: string;
    faqs: FAQItem[];
};

const ModernFAQ = (props: MarketingFAQProps) => (
    <section className="py-24 bg-white text-slate-900 font-sans">
        <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-12 text-center">{props.title}</h2>
            <div className="space-y-6">
                {props.faqs.map((faq, i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-6">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <HelpCircle className="h-5 w-5 text-blue-600" />
                            {faq.question}
                        </h3>
                        <p className="text-slate-600 ml-7">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const DarkFAQ = (props: MarketingFAQProps) => (
    <section className="py-24 border-t border-slate-800 bg-slate-950/30 text-white font-mono">
        <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-12 text-center" dangerouslySetInnerHTML={{ __html: props.title }} />
            <div className="space-y-4">
                {props.faqs.map((faq, i) => (
                    <div key={i} className="border border-slate-800 bg-slate-900 p-6 hover:border-cyan-500/30 transition-colors">
                        <h3 className="font-bold text-lg mb-2 text-cyan-100 flex items-center gap-2">
                            <span className="text-cyan-500">{">"}</span> {faq.question}
                        </h3>
                        <p className="text-slate-400 pl-5 font-mono text-sm">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CorporateFAQ = (props: MarketingFAQProps) => (
    <section className="py-20 bg-white text-slate-900 font-sans">
        <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-10 text-center">{props.title}</h2>
            <div className="grid gap-6">
                {props.faqs.map((faq, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                        <h3 className="font-bold text-lg mb-2 text-slate-800 flex items-center gap-2">
                            <HelpCircle className="h-5 w-5 text-blue-800" />
                            {faq.question}
                        </h3>
                        <p className="text-slate-600 ml-7">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CreativeFAQ = (props: MarketingFAQProps) => (
    <section className="py-24 bg-[#f8f5f2] text-[#2d2a26] font-sans">
        <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-4xl font-bold mb-12 text-center">{props.title}</h2>
            <div className="space-y-6">
                {props.faqs.map((faq, i) => (
                    <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-xl mb-3 flex items-center gap-3">
                            <HelpCircle className="h-6 w-6 text-[#4ecdc4]" />
                            {faq.question}
                        </h3>
                        <p className="text-[#666] ml-9 text-lg">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export const MarketingFAQ: ComponentConfig<MarketingFAQProps> = {
    fields: {
        variant: {
            type: "select",
            options: [
                { label: "Modern Minimalist", value: "modern" },
                { label: "Dark Mode Tech", value: "dark" },
                { label: "Corporate Professional", value: "corporate" },
                { label: "Creative Artistic", value: "creative" },
            ],
        },
        title: { type: "text" },
        faqs: {
            type: "array",
            arrayFields: {
                question: { type: "text" },
                answer: { type: "textarea" },
            },
        },
    },
    defaultProps: {
        variant: "modern",
        title: "Frequently Asked Questions",
        faqs: [
            { question: "Is this course for beginners?", answer: "No, this course assumes you have a solid understanding of React basics." },
            { question: "Do I get a certificate?", answer: "Yes, upon completion you will receive a verifiable certificate." },
        ],
    },
    render: (props) => {
        switch (props.variant) {
            case "dark":
                return <DarkFAQ {...props} />;
            case "corporate":
                return <CorporateFAQ {...props} />;
            case "creative":
                return <CreativeFAQ {...props} />;
            case "modern":
            default:
                return <ModernFAQ {...props} />;
        }
    },
};
