import { ComponentConfig } from "@measured/puck";
import { CheckCircle2, Check } from "lucide-react";

export type CurriculumItem = {
    title: string;
};

export type MarketingCurriculumProps = {
    variant: 'list' | 'grid';
    title: string;
    items: CurriculumItem[];
};

const ListCurriculum = (props: MarketingCurriculumProps) => (
    <section className="py-20 bg-white font-sans">
        <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-10 text-center">{props.title}</h2>
            <div className="space-y-4">
                {props.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-sm">{i + 1}</span>
                            <span className="font-medium text-slate-800">{item.title}</span>
                        </div>
                        <Check className="h-5 w-5 text-green-600" />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const GridCurriculum = (props: MarketingCurriculumProps) => (
    <section className="py-24 font-sans">
        <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-bold mb-8">{props.title}</h2>
                    <div className="space-y-4">
                        {props.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span className="font-medium text-slate-700">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-1/2 bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden min-h-[300px] flex items-center justify-center">
                    <div className="text-center z-10">
                        <h3 className="text-2xl font-bold mb-2">Master the Curriculum</h3>
                        <p className="text-slate-300">Join thousands of students today.</p>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20" />
                </div>
            </div>
        </div>
    </section>
);

export const MarketingCurriculum: ComponentConfig<MarketingCurriculumProps> = {
    fields: {
        variant: {
            type: "select",
            options: [
                { label: "List View", value: "list" },
                { label: "Grid/Split View", value: "grid" },
            ],
        },
        title: { type: "text" },
        items: {
            type: "array",
            arrayFields: {
                title: { type: "text" },
            },
        },
    },
    defaultProps: {
        variant: "list",
        title: "Curriculum Overview",
        items: [
            { title: "Introduction to the Course" },
            { title: "Advanced Concepts" },
            { title: "Final Project" },
        ],
    },
    render: (props) => {
        switch (props.variant) {
            case "grid":
                return <GridCurriculum {...props} />;
            case "list":
            default:
                return <ListCurriculum {...props} />;
        }
    },
};
