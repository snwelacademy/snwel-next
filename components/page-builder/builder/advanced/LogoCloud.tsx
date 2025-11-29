'use client'

import { ComponentConfig } from "@measured/puck";

export type LogoItem = {
    src: string;
    alt: string;
};

export type LogoCloudProps = {
    title: string;
    logos: LogoItem[];
};

export const LogoCloud: ComponentConfig<LogoCloudProps> = {
    fields: {
        title: { type: "text" },
        logos: {
            type: "array",
            arrayFields: {
                src: { type: "text" },
                alt: { type: "text" },
            },
            getItemSummary: (item) => item.alt || "Logo",
        }
    },
    defaultProps: {
        title: "Trusted by industry leaders",
        logos: [
            { src: "https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg", alt: "Transistor" },
            { src: "https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg", alt: "Reform" },
            { src: "https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg", alt: "Tuple" },
            { src: "https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg", alt: "SavvyCal" },
            { src: "https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg", alt: "Statamic" },
        ]
    },
    render: ({ title, logos }) => {
        return (
            <div className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 text-gray-900 mb-10">
                        {title}
                    </h2>
                    <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        {logos.map((logo, i) => (
                            <img
                                key={i}
                                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                                src={logo.src}
                                alt={logo.alt}
                                width={158}
                                height={48}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    },
};
