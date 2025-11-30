import { ComponentConfig } from "@measured/puck";
import { User } from "lucide-react";

export type MarketingInstructorProps = {
    variant: 'modern' | 'dark' | 'corporate' | 'creative';
    name: string;
    role: string;
    bio: string;
    imageSrc?: string;
};

const ModernInstructor = (props: MarketingInstructorProps) => (
    <section className="py-24 bg-slate-50 text-slate-900 font-sans">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12">Meet Your Instructor</h2>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8 text-left">
                    <div className="w-32 h-32 bg-slate-200 rounded-full flex-shrink-0 overflow-hidden">
                        {props.imageSrc ? (
                            <img src={props.imageSrc} alt={props.name} className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-full h-full p-6 text-slate-400" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">{props.name}</h3>
                        <p className="text-blue-600 font-medium mb-4">{props.role}</p>
                        <p className="text-slate-600">{props.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const DarkInstructor = (props: MarketingInstructorProps) => (
    <section className="py-24 border-t border-slate-800 bg-black text-white font-mono">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                <div className="w-48 h-48 bg-slate-800 rounded-none border-2 border-cyan-500/30 flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-500/10" />
                    {props.imageSrc ? (
                        <img src={props.imageSrc} alt={props.name} className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-full h-full p-8 text-cyan-500/50" />
                    )}
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-2 text-white">Instructed by <span className="text-cyan-400">{props.name}</span></h2>
                    <p className="text-slate-400 mb-6">{props.role}</p>
                    <p className="text-slate-300 leading-relaxed">{props.bio}</p>
                </div>
            </div>
        </div>
    </section>
);

const CorporateInstructor = (props: MarketingInstructorProps) => (
    <section className="py-20 bg-slate-50 text-slate-900 font-sans">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 bg-slate-200 rounded-full flex-shrink-0 overflow-hidden">
                    {props.imageSrc ? (
                        <img src={props.imageSrc} alt={props.name} className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-full h-full p-8 text-slate-400" />
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">{props.name}</h2>
                    <p className="text-blue-800 font-medium mb-4">{props.role}</p>
                    <p className="text-slate-600">{props.bio}</p>
                </div>
            </div>
        </div>
    </section>
);

const CreativeInstructor = (props: MarketingInstructorProps) => (
    <section className="py-24 bg-white text-[#2d2a26] font-sans">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="w-40 h-40 bg-[#ffecd1] rounded-full mx-auto mb-8 overflow-hidden border-4 border-white shadow-xl">
                    {props.imageSrc ? (
                        <img src={props.imageSrc} alt={props.name} className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-full h-full p-8 text-[#ff6b6b]" />
                    )}
                </div>
                <h2 className="text-4xl font-bold mb-2">{props.name}</h2>
                <p className="text-[#ff6b6b] text-xl font-medium mb-6">{props.role}</p>
                <p className="text-[#666] text-lg max-w-2xl mx-auto leading-relaxed">
                    "{props.bio}"
                </p>
            </div>
        </div>
    </section>
);

export const MarketingInstructor: ComponentConfig<MarketingInstructorProps> = {
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
        name: { type: "text" },
        role: { type: "text" },
        bio: { type: "textarea" },
        imageSrc: { type: "text" },
    },
    defaultProps: {
        variant: "modern",
        name: "Alex Johnson",
        role: "Senior Frontend Engineer",
        bio: "Alex has over 10 years of experience building scalable web applications.",
    },
    render: (props) => {
        switch (props.variant) {
            case "dark":
                return <DarkInstructor {...props} />;
            case "corporate":
                return <CorporateInstructor {...props} />;
            case "creative":
                return <CreativeInstructor {...props} />;
            case "modern":
            default:
                return <ModernInstructor {...props} />;
        }
    },
};
