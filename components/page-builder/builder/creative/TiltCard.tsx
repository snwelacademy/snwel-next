'use client'

import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";
import { useRef, useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type TiltCardProps = {
    title: string;
    description: string;
    imageSrc: string;
    buttonText: string;
    buttonLink: string;
    theme: "dark" | "light";
};

export const TiltCard: ComponentConfig<TiltCardProps> = {
    fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        imageSrc: { type: "text" },
        buttonText: { type: "text" },
        buttonLink: { type: "text" },
        theme: {
            type: "radio",
            options: [
                { label: "Dark", value: "dark" },
                { label: "Light", value: "light" },
            ]
        }
    },
    defaultProps: {
        title: "The Future is Here",
        description: "Experience the next generation of web interaction with our 3D tilt technology.",
        imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        buttonText: "Explore Now",
        buttonLink: "#",
        theme: "dark",
    },
    render: ({ title, description, imageSrc, buttonText, buttonLink, theme }) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const [rotation, setRotation] = useState({ x: 0, y: 0 });
        const [isHovering, setIsHovering] = useState(false);

        const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;

            const card = cardRef.current;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            setRotation({ x: rotateX, y: rotateY });
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            setRotation({ x: 0, y: 0 });
        };

        return (
            <div className="py-20 flex justify-center perspective-1000">
                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={handleMouseLeave}
                    className={cn("relative w-full max-w-md rounded-3xl overflow-hidden transition-all duration-200 ease-out shadow-2xl", {
                        "bg-gray-900 text-white": theme === "dark",
                        "bg-white text-gray-900": theme === "light",
                    })}
                    style={{
                        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovering ? 1.05 : 1})`,
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Image Layer */}
                    <div className="relative h-64 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <img
                            src={imageSrc}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500"
                            style={{
                                transform: isHovering ? "scale(1.1)" : "scale(1)",
                            }}
                        />
                    </div>

                    {/* Content Layer */}
                    <div className="relative p-8 z-20" style={{ transform: "translateZ(20px)" }}>
                        <h3 className="text-3xl font-bold mb-3">{title}</h3>
                        <p className={cn("mb-6 leading-relaxed", {
                            "text-gray-300": theme === "dark",
                            "text-gray-600": theme === "light",
                        })}>
                            {description}
                        </p>
                        <Button asChild variant={theme === "dark" ? "secondary" : "default"} className="w-full">
                            <Link href={buttonLink}>{buttonText}</Link>
                        </Button>
                    </div>

                    {/* Glare Effect */}
                    <div
                        className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay opacity-0 transition-opacity duration-300"
                        style={{
                            opacity: isHovering ? 0.4 : 0,
                            background: `linear-gradient(${115 + rotation.x * 2}deg, transparent 30%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.8) 55%, transparent 70%)`
                        }}
                    />
                </div>
            </div>
        );
    },
};
