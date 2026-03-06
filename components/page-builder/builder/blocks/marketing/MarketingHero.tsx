import { ComponentConfig } from "@measured/puck";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Terminal, User, ArrowUpRight } from "lucide-react";

export type MarketingHeroProps = {
    variant: 'modern' | 'dark' | 'corporate' | 'creative' | 'minimal-dark';
    title: string;
    subtitle: string;
    badgeText?: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    imageSrc?: string;
};

const ModernHero = (props: MarketingHeroProps) => (
    <section className="relative pt-20 pb-32 overflow-hidden bg-white text-slate-900 font-sans">
        <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2 space-y-8">
                    {props.badgeText && (
                        <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-slate-100 text-slate-600 rounded-full">
                            {props.badgeText}
                        </Badge>
                    )}
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-slate-900" dangerouslySetInnerHTML={{ __html: props.title }} />
                    <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                        {props.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href={props.primaryButtonLink}>
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-slate-900 hover:bg-slate-800 text-white w-full sm:w-auto">
                                {props.primaryButtonText} <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href={props.secondaryButtonLink}>
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-slate-200 hover:bg-slate-50 w-full sm:w-auto">
                                {props.secondaryButtonText}
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 pt-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />
                            ))}
                        </div>
                        <p>Joined by 2,000+ developers</p>
                    </div>
                </div>
                <div className="lg:w-1/2 relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-100 aspect-video">
                        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                            Image Loading...
                        </div>
                        {props.imageSrc && (
                            <img
                                src={props.imageSrc}
                                alt="Hero"
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.querySelector('div')!.style.display = 'flex';
                                }}
                            />
                        )}
                    </div>
                    <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50" />
                </div>
            </div>
        </div>
    </section>
);

const DarkHero = (props: MarketingHeroProps) => (
    <div className="bg-black text-white font-mono selection:bg-cyan-500 selection:text-black overflow-hidden">
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <section className="relative pt-24 pb-32">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {props.badgeText && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            {props.badgeText}
                        </div>
                    )}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-500" dangerouslySetInnerHTML={{ __html: props.title }} />
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        {props.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                        <Link href={props.primaryButtonLink}>
                            <Button size="lg" className="h-14 px-8 text-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-none border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition-all w-full sm:w-auto">
                                {props.primaryButtonText} <Terminal className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href={props.secondaryButtonLink}>
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg bg-transparent text-cyan-400 border-cyan-500/50 hover:bg-cyan-950 rounded-none hover:text-cyan-300 w-full sm:w-auto">
                                {props.secondaryButtonText}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-16 relative z-10">
                <div className="relative rounded-lg border border-slate-800 bg-slate-950/50 backdrop-blur-sm p-2 shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                    <div className="aspect-video bg-slate-900 rounded overflow-hidden relative group">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-mono">
                            [ SYSTEM_IMAGE_LOADING... ]
                        </div>
                        {props.imageSrc && (
                            <img
                                src={props.imageSrc}
                                alt="Hero"
                                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.querySelector('div')!.style.display = 'flex';
                                }}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    </div>
);

const CorporateHero = (props: MarketingHeroProps) => (
    <section className="bg-white border-b border-slate-200 font-sans">
        <div className="container mx-auto px-4 py-20 lg:py-28">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 space-y-6">
                    <h1 className="text-4xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight" dangerouslySetInnerHTML={{ __html: props.title }} />
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {props.subtitle}
                    </p>
                    <div className="flex gap-4 pt-4">
                        <Link href={props.primaryButtonLink}>
                            <Button size="lg" className="bg-blue-800 hover:bg-blue-900 text-white rounded-md px-8 h-12">
                                {props.primaryButtonText}
                            </Button>
                        </Link>
                        <Link href={props.secondaryButtonLink}>
                            <Button variant="outline" size="lg" className="border-blue-800 text-blue-800 hover:bg-blue-50 rounded-md px-8 h-12">
                                {props.secondaryButtonText}
                            </Button>
                        </Link>
                    </div>
                    <div className="pt-8 border-t border-slate-100 flex gap-8">
                        <div>
                            <div className="text-2xl font-bold text-slate-900">50+</div>
                            <div className="text-sm text-slate-500">Modules</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">120h</div>
                            <div className="text-sm text-slate-500">Content</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">Cert</div>
                            <div className="text-sm text-slate-500">Included</div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <div className="relative shadow-xl rounded-lg overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3]">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200">
                            Image Loading...
                        </div>
                        {props.imageSrc && (
                            <img
                                src={props.imageSrc}
                                alt="Hero"
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.querySelector('div')!.style.display = 'flex';
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const CreativeHero = (props: MarketingHeroProps) => (
    <div className="bg-[#f8f5f2] text-[#2d2a26] font-sans overflow-hidden relative">
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ffecd1] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#e0f4ff] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-[#ffe4e6] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <section className="relative pt-24 pb-32">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    {props.badgeText && (
                        <div className="inline-block mb-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                            <span className="bg-[#ff6b6b] text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg">
                                {props.badgeText}
                            </span>
                        </div>
                    )}
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]" dangerouslySetInnerHTML={{ __html: props.title }} />
                    <p className="text-2xl text-[#666] mb-12 max-w-2xl mx-auto font-light">
                        {props.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href={props.primaryButtonLink}>
                            <Button size="lg" className="h-16 px-10 text-xl bg-[#2d2a26] text-white rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                {props.primaryButtonText}
                            </Button>
                        </Link>
                        <Link href={props.secondaryButtonLink}>
                            <Button variant="outline" size="lg" className="h-16 px-10 text-xl border-2 border-[#2d2a26] text-[#2d2a26] bg-transparent rounded-2xl hover:bg-[#2d2a26] hover:text-white transition-colors">
                                {props.secondaryButtonText}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-20 relative h-[400px] hidden md:block">
                <div className="absolute left-10 top-10 w-64 bg-white p-4 rounded-2xl shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-10">
                    <div className="h-32 bg-[#ffecd1] rounded-xl mb-4"></div>
                    <div className="h-4 w-3/4 bg-slate-100 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                </div>
                <div className="absolute right-10 top-20 w-64 bg-white p-4 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
                    <div className="h-32 bg-[#e0f4ff] rounded-xl mb-4"></div>
                    <div className="h-4 w-3/4 bg-slate-100 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                </div>
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-96 h-64 bg-white p-2 rounded-3xl shadow-2xl z-20">
                    <div className="w-full h-full rounded-2xl overflow-hidden relative bg-slate-200">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                            [ Creative Visual ]
                        </div>
                        {props.imageSrc && (
                            <img
                                src={props.imageSrc}
                                alt="Creative Design"
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.querySelector('div')!.style.display = 'flex';
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    </div>
);

const MinimalDarkHero = (props: MarketingHeroProps) => (
    <section className="bg-[#1a1a1a] text-white font-sans min-h-[600px] flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 space-y-8">
                    <div className="uppercase tracking-widest text-xs font-bold text-gray-400 mb-2">
                        VIRTUAL COURSE: WEB DESIGN 101
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-serif leading-tight" dangerouslySetInnerHTML={{ __html: props.title }} />
                    <p className="text-lg text-gray-300 leading-relaxed max-w-lg font-light">
                        {props.subtitle}
                    </p>
                    <div className="flex items-center gap-6 pt-4">
                        {props.badgeText && (
                            <div className="text-2xl font-light">
                                <span className="line-through text-gray-500 mr-3 text-lg">$79</span>
                                {props.badgeText} <span className="text-xs font-bold tracking-widest ml-2 uppercase">FOR A LIMITED TIME</span>
                            </div>
                        )}
                    </div>
                    <div className="pt-4">
                        <Link href={props.primaryButtonLink}>
                            <Button size="lg" className="h-16 px-10 text-lg bg-[#81e6d9] hover:bg-[#4fd1c5] text-[#1a202c] rounded-none uppercase tracking-widest font-bold w-full sm:w-auto">
                                {props.primaryButtonText}
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="lg:w-1/2 relative">
                    <div className="relative z-10 border-[12px] border-[#b2f5ea] shadow-2xl">
                        {props.imageSrc && (
                            <img
                                src={props.imageSrc}
                                alt="Hero"
                                className="w-full h-auto object-cover"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
        {/* Background decorative lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="absolute top-0 right-0 w-1/2 h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 C 50 100 80 100 100 0 Z" fill="none" stroke="white" strokeWidth="0.5" />
                <path d="M20 0 C 70 100 100 100 100 20 Z" fill="none" stroke="white" strokeWidth="0.5" />
            </svg>
        </div>
    </section>
);

export const MarketingHero: ComponentConfig<MarketingHeroProps> = {
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
        badgeText: { type: "text" },
        primaryButtonText: { type: "text" },
        primaryButtonLink: { type: "text" },
        secondaryButtonText: { type: "text" },
        secondaryButtonLink: { type: "text" },
        imageSrc: { type: "text" },
    },
    defaultProps: {
        variant: "modern",
        title: "Master React Patterns",
        subtitle: "Elevate your frontend skills with advanced design patterns, performance optimization techniques, and scalable architecture.",
        primaryButtonText: "Enroll Now",
        primaryButtonLink: "#",
        secondaryButtonText: "View Course",
        secondaryButtonLink: "#",
        imageSrc: "/artifacts/marketing_hero_1.png",
        badgeText: "Advanced Level Course"
    },
    render: (props) => {
        switch (props.variant) {
            case "dark":
                return <DarkHero {...props} />;
            case "corporate":
                return <CorporateHero {...props} />;
            case "creative":
                return <CreativeHero {...props} />;
            case "minimal-dark":
                return <MinimalDarkHero {...props} />;
            case "modern":
            default:
                return <ModernHero {...props} />;
        }
    },
};
