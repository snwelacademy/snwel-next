'use client'

import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";

export type HeadingProps = {
    align: "left" | "center" | "right";
    text?: string;
    level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    size?: "s" | "m" | "l" | "xl";
    className?: string;
};

export const Heading: ComponentConfig<HeadingProps> = {
    fields: {
        text: { type: "text" },
        level: {
            type: "select",
            options: [
                { label: "H1", value: "h1" },
                { label: "H2", value: "h2" },
                { label: "H3", value: "h3" },
                { label: "H4", value: "h4" },
                { label: "H5", value: "h5" },
                { label: "H6", value: "h6" },
            ],
        },
        size: {
            type: "select",
            options: [
                { label: "Small", value: "s" },
                { label: "Medium", value: "m" },
                { label: "Large", value: "l" },
                { label: "Extra Large", value: "xl" },
            ],
        },
        align: {
            type: "radio",
            options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
            ],
        },
        className: { type: "text" }, // Hidden or advanced field
    },
    defaultProps: {
        align: "left",
        text: "Heading",
        level: "h2",
        size: "m",
    },
    render: ({ align, text, level = "h2", size = "m", className }) => {
        const Tag = level;
        const sizeClasses = {
            s: "text-lg md:text-xl",
            m: "text-2xl md:text-3xl",
            l: "text-3xl md:text-4xl",
            xl: "text-4xl md:text-5xl font-extrabold",
        };

        return (
            <Tag
                className={cn(
                    "font-bold text-foreground mb-4",
                    sizeClasses[size],
                    `text-${align}`,
                    className
                )}
            >
                {text}
            </Tag>
        );
    },
};
