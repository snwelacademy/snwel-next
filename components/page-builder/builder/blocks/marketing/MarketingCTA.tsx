import { ComponentConfig } from "@measured/puck";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export type MarketingCTAProps = {
    variant: 'modern' | 'dark' | 'corporate' | 'creative' | 'minimal-dark';
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    price?: string;
    originalPrice?: string;
};

const ModernCTA = (props: MarketingCTAProps) => (
    <section className="py-24 bg-white font-sans">
        <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-bold mb-8">{props.title}</h2>
                    <p className="text-slate-600 mb-8">{props.subtitle}</p>
                </div>
                <div className="lg:w-1/2 bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Ready to start?</h3>
                        <p className="text-slate-300 mb-8">Get lifetime access to all course materials and updates.</p>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-5xl font-bold">{props.price}</span>
                            {props.originalPrice && <span className="text-slate-400 line-through text-xl">{props.originalPrice}</span>}
                        </div>
                        <Link href={props.buttonLink}>
                            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                                {props.buttonText}
                            </Button>
                        </Link>
                        <p className="text-center text-xs text-slate-400 mt-4">30-day money-back guarantee</p>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20" />
                </div>
            </div>
        </div>
    </section>
);

const DarkCTA = (props: MarketingCTAProps) => (
    <section className="py-32 relative overflow-hidden border-t border-slate-800 bg-black text-white font-mono">
        <div className="absolute inset-0 bg-cyan-900/5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl font-bold mb-6">{props.title}</h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto">{props.subtitle}</p>
            <div className="inline-block p-[1px] rounded-none bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500">
                <div className="bg-black p-8 sm:p-12">
                    <div className="text-5xl font-bold text-white mb-2">{props.price}</div>
                    <div className="text-cyan-400 mb-8">Lifetime Access</div>
                    <Link href={props.buttonLink}>
                        <Button className="w-full sm:w-auto h-12 px-10 bg-white text-black hover:bg-slate-200 font-bold rounded-none">
                            {props.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
);

const CorporateCTA = (props: MarketingCTAProps) => (
    <section className="py-20 bg-blue-900 text-white text-center font-sans">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">{props.title}</h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">{props.subtitle}</p>
            <Link href={props.buttonLink}>
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-10 h-14 rounded-md">
                    {props.buttonText}
                </Button>
            </Link>
        </div>
    </section>
);

const CreativeCTA = (props: MarketingCTAProps) => (
    <section className="py-32 relative overflow-hidden text-center bg-[#f8f5f2] text-[#2d2a26] font-sans">
        <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold mb-8">{props.title}</h2>
            <p className="text-xl text-[#666] mb-8">{props.subtitle}</p>
            <Link href={props.buttonLink}>
                <Button size="lg" className="h-20 px-12 text-2xl bg-[#2d2a26] text-white rounded-full hover:scale-105 transition-transform shadow-2xl">
                    {props.buttonText} <ArrowUpRight className="ml-2 h-6 w-6" />
                </Button>
            </Link>
        </div>
    </section>
);

const MinimalDarkCTA = (props: MarketingCTAProps) => (
    <section className="py-24 bg-white text-[#1a1a1a] font-sans text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl lg:text-5xl font-serif mb-12">{props.title}</h2>
            <Link href={props.buttonLink}>
                <Button size="lg" className="h-16 px-12 text-lg bg-[#81e6d9] hover:bg-[#4fd1c5] text-[#1a202c] rounded-none uppercase tracking-widest font-bold">
                    {props.buttonText}
                </Button>
            </Link>
        </div>
    </section>
);

export const MarketingCTA: ComponentConfig<MarketingCTAProps> = {
    fields: {
        variant: {
            type: "select",
            options: [
                { label: "Modern Minimalist", value: "modern" },
                { label: "Dark Mode Tech", value: "dark" },
                { label: "Corporate Professional", value: "corporate" },
                { label: "Creative Artistic", value: "creative" },
                { label: "Minimal Dark (Design 101)", value: "minimal-dark" },
            ],
        },
        title: { type: "text" },
        subtitle: { type: "textarea" },
        buttonText: { type: "text" },
        buttonLink: { type: "text" },
        price: { type: "text" },
        originalPrice: { type: "text" },
    },
    defaultProps: {
        variant: "modern",
        title: "Ready to start?",
        subtitle: "Get lifetime access to all course materials and updates.",
        buttonText: "Enroll Now",
        buttonLink: "#",
        price: "$99",
        originalPrice: "$199",
    },
    render: (props) => {
        switch (props.variant) {
            case "dark":
                return <DarkCTA {...props} />;
            case "corporate":
                return <CorporateCTA {...props} />;
            case "creative":
                return <CreativeCTA {...props} />;
            case "minimal-dark":
                return <MinimalDarkCTA {...props} />;
            case "modern":
            default:
                return <ModernCTA {...props} />;
        }
    },
};
