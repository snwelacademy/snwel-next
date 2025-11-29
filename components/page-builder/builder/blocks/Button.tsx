'use client'

import { ComponentConfig } from "@measured/puck";
import { Button as UiButton } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonProps = {
    text: string;
    href: string;
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size: "default" | "sm" | "lg" | "icon";
    align: "left" | "center" | "right";
    newTab?: boolean;
};

export const ButtonBlock: ComponentConfig<ButtonProps> = {
    fields: {
        text: { type: "text" },
        href: { type: "text" },
        variant: {
            type: "select",
            options: [
                { label: "Default", value: "default" },
                { label: "Secondary", value: "secondary" },
                { label: "Outline", value: "outline" },
                { label: "Destructive", value: "destructive" },
                { label: "Ghost", value: "ghost" },
                { label: "Link", value: "link" },
            ],
        },
        size: {
            type: "select",
            options: [
                { label: "Default", value: "default" },
                { label: "Small", value: "sm" },
                { label: "Large", value: "lg" },
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
        newTab: {
            type: "radio",
            options: [
                { label: "Yes", value: true },
                { label: "No", value: false },
            ]
        }
    },
    defaultProps: {
        text: "Click Me",
        href: "#",
        variant: "default",
        size: "default",
        align: "left",
        newTab: false,
    },
    render: ({ text, href, variant, size, align, newTab }) => {
        return (
            <div className={cn("w-full flex", {
                "justify-start": align === "left",
                "justify-center": align === "center",
                "justify-end": align === "right",
            })}>
                <UiButton asChild variant={variant} size={size}>
                    <Link href={href} target={newTab ? "_blank" : "_self"}>
                        {text}
                    </Link>
                </UiButton>
            </div>
        );
    },
};
