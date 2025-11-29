'use client'

import { ComponentConfig, DropZone } from "@measured/puck";
import { cn } from "@/lib/utils";

export type ContainerProps = {
    className?: string
};

export const Container: ComponentConfig<ContainerProps> = {
    fields: {
        className: {
            type: 'select',
            options: [
                { label: "Default", value: "container mx-auto px-4 mt-20 md:mt-40" },
                { label: "Compact", value: "container mx-auto px-4 mt-5 md:mt-10" },
                { label: "Full Width", value: "w-full px-4 mt-20 md:mt-40" },
                { label: "None", value: "" },
            ]
        }
    },
    defaultProps: {
        className: 'container mx-auto px-4 mt-20 md:mt-40'
    },
    render: ({ className, id }) => {
        return (
            <div
                className={cn([
                    className
                ])}
            >
                <DropZone
                    zone={`container-${id}`}
                    disallow={["Hero", "Logos", "Stats"]}
                />
            </div>
        );
    },
};