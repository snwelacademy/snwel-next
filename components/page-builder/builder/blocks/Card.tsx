'use client'

import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type CardProps = {
    imageSrc?: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
    align: "left" | "center";
};

export const CardBlock: ComponentConfig<CardProps> = {
    fields: {
        imageSrc: { type: "text" },
        title: { type: "text" },
        description: { type: "textarea" },
        buttonText: { type: "text" },
        buttonLink: { type: "text" },
        align: {
            type: "radio",
            options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
            ],
        },
    },
    defaultProps: {
        title: "Card Title",
        description: "This is a description of the card content. You can edit this text.",
        align: "left",
        buttonText: "Learn More",
        buttonLink: "#",
        imageSrc: "https://via.placeholder.com/400x250",
    },
    render: ({ imageSrc, title, description, buttonText, buttonLink, align }) => {
        return (
            <div className={cn("bg-card text-card-foreground rounded-xl border shadow-sm overflow-hidden flex flex-col h-full", {
                "text-center": align === "center",
                "text-left": align === "left",
            })}>
                {imageSrc && (
                    <div className="relative w-full aspect-video">
                        <img
                            src={imageSrc}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className="p-6 flex flex-col flex-grow gap-4">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>
                    <p className="text-muted-foreground text-sm flex-grow">
                        {description}
                    </p>
                    {buttonText && buttonLink && (
                        <div className={cn("pt-2", {
                            "flex justify-center": align === "center",
                            "flex justify-start": align === "left",
                        })}>
                            <Button asChild variant="outline" size="sm">
                                <Link href={buttonLink}>{buttonText}</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        );
    },
};
