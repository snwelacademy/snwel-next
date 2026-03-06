import { ComponentConfig } from "@measured/puck";
import { Star, Quote } from "lucide-react";

export type TestimonialItem = {
    quote: string;
    author: string;
    role: string;
    imageSrc?: string;
    rating?: number;
};

export type MarketingTestimonialProps = {
    variant: 'modern' | 'dark' | 'corporate' | 'creative' | 'minimal-dark';
    title: string;
    items: TestimonialItem[];
};

const MinimalDarkTestimonial = (props: MarketingTestimonialProps) => (
    <section className="py-20 bg-[#1a1a1a] text-white font-sans">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-serif text-center mb-16">{props.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {props.items.map((item, i) => (
                    <div key={i} className="bg-[#2a2a2a] p-8 flex flex-col h-full">
                        <div className="flex gap-1 mb-6 text-white">
                            {[...Array(item.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                        </div>
                        <p className="text-lg leading-relaxed mb-8 flex-grow">"{item.quote}"</p>
                        <div className="flex items-center gap-4 mt-auto">
                            {item.imageSrc && (
                                <img src={item.imageSrc} alt={item.author} className="w-12 h-12 rounded-full object-cover grayscale" />
                            )}
                            <div>
                                <div className="font-bold uppercase tracking-wider text-sm">{item.author}</div>
                                <div className="text-xs text-gray-400 mt-1">{item.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ModernTestimonial = (props: MarketingTestimonialProps) => (
    <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{props.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {props.items.map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
                        <Quote className="w-10 h-10 text-blue-100 mb-4" />
                        <p className="text-slate-600 mb-6">{item.quote}</p>
                        <div className="font-bold">{item.author}</div>
                        <div className="text-sm text-slate-500">{item.role}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
)

export const MarketingTestimonial: ComponentConfig<MarketingTestimonialProps> = {
    fields: {
        variant: {
            type: "select",
            options: [
                { label: "Modern Minimalist", value: "modern" },
                { label: "Minimal Dark (Design 101)", value: "minimal-dark" },
            ],
        },
        title: { type: "text" },
        items: {
            type: "array",
            arrayFields: {
                quote: { type: "textarea" },
                author: { type: "text" },
                role: { type: "text" },
                imageSrc: { type: "text" },
                rating: { type: "number", min: 1, max: 5 },
            },
        },
    },
    defaultProps: {
        variant: "minimal-dark",
        title: "See what past attendees have to say:",
        items: [
            {
                quote: "WOW. I got the best web design & hosting advice from Traci, literally life changing. You have to give this course a try!",
                author: "MAGGIE",
                role: "Completed her website in 3 days",
                rating: 5
            },
            {
                quote: "Despite being an avid designer, I learned SO MUCH from this course. My web design skills have never been better.",
                author: "GRACE",
                role: "Completed her website in 4 days",
                rating: 5
            },
            {
                quote: "If you have been doing this by yourself, you don't know what you're missing. Traci will impress you with her web design knowledge.",
                author: "GREG",
                role: "Completed his website in 5 days",
                rating: 5
            },
        ],
    },
    render: (props) => {
        switch (props.variant) {
            case "minimal-dark":
                return <MinimalDarkTestimonial {...props} />;
            case "modern":
            default:
                return <ModernTestimonial {...props} />;
        }
    },
};
