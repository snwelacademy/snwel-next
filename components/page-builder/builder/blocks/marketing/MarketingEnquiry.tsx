import { ComponentConfig } from "@measured/puck";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type MarketingEnquiryProps = {
    variant: 'modern' | 'dark' | 'corporate' | 'creative';
    title: string;
    subtitle: string;
};

const ModernEnquiry = (props: MarketingEnquiryProps) => (
    <section className="py-24 bg-slate-900 text-white font-sans">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl font-bold mb-6">{props.title}</h2>
                    <p className="text-slate-300 text-lg mb-8">
                        {props.subtitle}
                    </p>
                    <ul className="space-y-4 text-slate-300">
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-blue-500" />
                            <span>Detailed course syllabus</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-blue-500" />
                            <span>Team training options</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-blue-500" />
                            <span>Payment plan information</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-white rounded-2xl p-6 text-slate-900">
                    <EnquiryForm type="general" />
                </div>
            </div>
        </div>
    </section>
);

const DarkEnquiry = (props: MarketingEnquiryProps) => (
    <section className="py-24 border-t border-slate-800 bg-slate-900 text-white font-mono">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{props.title}</h2>
                <p className="text-slate-400">{props.subtitle}</p>
            </div>
            <div className="bg-black border border-slate-800 p-8 shadow-2xl">
                <EnquiryForm type="general" />
            </div>
        </div>
    </section>
);

const CorporateEnquiry = (props: MarketingEnquiryProps) => (
    <section className="py-20 bg-slate-100 text-slate-900 font-sans">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900">{props.title}</h2>
                <p className="text-slate-600 mt-2">{props.subtitle}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                <EnquiryForm type="general" />
            </div>
        </div>
    </section>
);

const CreativeEnquiry = (props: MarketingEnquiryProps) => (
    <section className="py-24 bg-[#2d2a26] text-white font-sans">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
                <div className="flex flex-col justify-center">
                    <h2 className="text-5xl font-bold mb-6">{props.title}</h2>
                    <p className="text-white/70 text-xl mb-8">
                        {props.subtitle}
                    </p>
                    <div className="flex gap-4">
                        <Link href="#">
                            <Button className="h-14 px-8 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-xl text-lg font-bold">
                                Enroll Now
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="bg-white rounded-3xl p-8 text-[#2d2a26]">
                    <EnquiryForm type="general" />
                </div>
            </div>
        </div>
    </section>
);

export const MarketingEnquiry: ComponentConfig<MarketingEnquiryProps> = {
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
        subtitle: { type: "textarea" },
    },
    defaultProps: {
        variant: "modern",
        title: "Still have questions?",
        subtitle: "Fill out the form and our team will get back to you within 24 hours.",
    },
    render: (props) => {
        switch (props.variant) {
            case "dark":
                return <DarkEnquiry {...props} />;
            case "corporate":
                return <CorporateEnquiry {...props} />;
            case "creative":
                return <CreativeEnquiry {...props} />;
            case "modern":
            default:
                return <ModernEnquiry {...props} />;
        }
    },
};
