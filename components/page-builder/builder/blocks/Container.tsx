'use client'

import { ComponentConfig, DropZone } from "@measured/puck";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";


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
            ]
        }
    },
    defaultProps: {
        className: 'container mx-auto px-4 mt-20 md:mt-40'
    },
    render: ({ className }) => {
        return (
            <div
                className={cn([
                    className
                ])}
            >
                <DropZone
                    zone={`container`}
                    disallow={["Hero", "Logos", "Stats"]}
                />

            </div>
        );
    },
};