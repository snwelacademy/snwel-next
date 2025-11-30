import { ComponentConfig } from "@measured/puck";
import { Code2, Layers, Zap, Globe, Shield, Cpu, Terminal, Building2, Users, Briefcase, Palette, Layout, MousePointer2, PenTool } from "lucide-react";

export type FeatureItem = {
    title: string;
    description: string;
    icon: string;
};

export type MarketingFeaturesProps = {
    variant: 'modern' | 'dark' | 'corporate' | 'creative' | 'minimal-dark';
    title: string;
    description: string;
    features: FeatureItem[];
};

const iconMap: Record<string, any> = {
    Code2, Layers, Zap, Globe, Shield, Cpu, Terminal, Building2, Users, Briefcase, Palette, Layout, MousePointer2, PenTool
};

const Icon = ({ name, className }: { name: string, className?: string }) => {
    const IconComp = iconMap[name] || Code2;
    return <IconComp className={className} />;
};

const ModernFeatures = (props: MarketingFeaturesProps) => (
    <section className="py-24 bg-slate-50 text-slate-900 font-sans">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-4">{props.title}</h2>
                <p className="text-slate-600 text-lg">{props.description}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {props.features.map((feature, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                            <Icon name={feature.icon} className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-slate-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const DarkFeatures = (props: MarketingFeaturesProps) => (
    <section className="py-20 border-t border-slate-800 bg-slate-950/50 text-white font-mono">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{props.title}</h2>
                <p className="text-slate-400">{props.description}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {props.features.map((item, i) => (
                    <div key={i} className="p-6 border border-slate-800 bg-slate-900/50 hover:border-cyan-500/50 transition-colors group">
                        <Icon name={item.icon} className="h-8 w-8 mx-auto mb-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                        <h3 className="font-bold text-lg text-slate-300 group-hover:text-white">{item.title}</h3>
                        <p className="text-sm text-slate-500 mt-2">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CorporateFeatures = (props: MarketingFeaturesProps) => (
    <section className="py-20 bg-slate-50 text-slate-900 font-sans">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900">{props.title}</h2>
                <p className="text-slate-600 mt-4">{props.description}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {props.features.map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center hover:border-blue-300 transition-colors">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-800">
                            <Icon name={item.icon} className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                        <p className="text-slate-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CreativeFeatures = (props: MarketingFeaturesProps) => (
    <section className="py-32 bg-[#f8f5f2] text-[#2d2a26] font-sans">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-5xl font-bold mb-8 leading-tight" dangerouslySetInnerHTML={{ __html: props.title }} />
                    <p className="text-xl text-[#666] mb-8">
                        {props.description}
                    </p>
                    <ul className="space-y-6">
                        {props.features.map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-lg font-medium">
                                <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#ff6b6b]">
                                    <Icon name={item.icon} className="h-6 w-6" />
                                </div>
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4 mt-12">
                        <div className="bg-[#ff6b6b] h-48 rounded-3xl shadow-lg"></div>
                        <div className="bg-[#4ecdc4] h-64 rounded-3xl shadow-lg"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-[#ffe66d] h-64 rounded-3xl shadow-lg"></div>
                        <div className="bg-[#1a535c] h-48 rounded-3xl shadow-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const MinimalDarkFeatures = (props: MarketingFeaturesProps) => (
    <section className="py-20 bg-[#1a1a1a] text-white font-sans">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-serif text-center mb-16">{props.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {props.features.map((feature, i) => {
                    return (
                        <div key={i} className="bg-[#2a2a2a] p-8 flex flex-col items-center text-center hover:bg-[#333] transition-colors">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 text-[#1a1a1a]">
                                <Icon name={feature.icon} className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-wider mb-4">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

export const MarketingFeatures: ComponentConfig<MarketingFeaturesProps> = {
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
        description: { type: "textarea" },
        features: {
            type: "array",
            arrayFields: {
                title: { type: "text" },
                description: { type: "textarea" },
                icon: {
                    type: "select",
                    options: Object.keys(iconMap).map(key => ({ label: key, value: key }))
                }
            },
        },
    },
    defaultProps: {
        variant: "modern",
        title: "Why this course?",
        description: "We dive deep into the internal workings...",
        features: [
            { title: "Clean Code", description: "Write maintainable code.", icon: "Code2" },
            { title: "Scalable Architecture", description: "Structure your apps.", icon: "Layers" },
            { title: "High Performance", description: "Optimize rendering.", icon: "Zap" },
        ],
    },
    render: (props) => {
        switch (props.variant) {
            case "dark":
                return <DarkFeatures {...props} />;
            case "corporate":
                return <CorporateFeatures {...props} />;
            case "creative":
                return <CreativeFeatures {...props} />;
            case "minimal-dark":
                return <MinimalDarkFeatures {...props} />;
            case "modern":
            default:
                return <ModernFeatures {...props} />;
        }
    },
};
