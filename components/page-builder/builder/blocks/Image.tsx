'use client'

import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";

export type ImageProps = {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    objectFit: "cover" | "contain" | "fill";
    align: "left" | "center" | "right";
    className?: string;
};

export const ImageBlock: ComponentConfig<ImageProps> = {
    fields: {
        src: { type: "text" },
        alt: { type: "text" },
        width: { type: "text" },
        height: { type: "text" },
        objectFit: {
            type: "select",
            options: [
                { label: "Cover", value: "cover" },
                { label: "Contain", value: "contain" },
                { label: "Fill", value: "fill" },
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
        className: { type: "text" },
    },
    defaultProps: {
        src: "https://via.placeholder.com/600x400",
        alt: "Placeholder Image",
        width: "100%",
        height: "auto",
        objectFit: "cover",
        align: "center",
    },
    render: ({ src, alt, width, height, objectFit, align, className }) => {
        return (
            <div className={cn("w-full flex", {
                "justify-start": align === "left",
                "justify-center": align === "center",
                "justify-end": align === "right",
            })}>
                <img
                    src={src}
                    alt={alt}
                    className={cn("max-w-full h-auto rounded-lg", className)}
                    style={{
                        width: width,
                        height: height,
                        objectFit: objectFit,
                    }}
                />
            </div>
        );
    },
};
