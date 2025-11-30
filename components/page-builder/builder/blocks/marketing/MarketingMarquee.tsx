import { ComponentConfig } from "@measured/puck";

export type MarketingMarqueeProps = {
    items: string[];
    speed?: number;
};

export const MarketingMarquee: ComponentConfig<MarketingMarqueeProps> = {
    fields: {
        items: {
            type: "array",
            getItemSummary: (item) => item || "Item",
            arrayFields: {
                item: { type: "text" }
            }
        },
        speed: { type: "number" }
    },
    defaultProps: {
        items: ["FIGMA", "ADOBE XD", "SKETCH", "FRAMER", "PRINCIPLE", "PROTOPIE", "WEBFLOW"],
        speed: 20
    },
    render: ({ items }) => {
        return (
            <div className="bg-[#2d2a26] py-6 overflow-hidden transform -rotate-1">
                <div className="flex gap-12 text-white/50 text-2xl font-bold whitespace-nowrap animate-marquee">
                    {items.map((item, i) => <span key={i}>{item}</span>)}
                    {items.map((item, i) => <span key={`dup-${i}`}>{item}</span>)}
                    {items.map((item, i) => <span key={`dup2-${i}`}>{item}</span>)}
                </div>
            </div>
        );
    },
};
