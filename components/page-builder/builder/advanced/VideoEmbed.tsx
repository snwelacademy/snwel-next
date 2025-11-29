'use client'

import { ComponentConfig } from "@measured/puck";
import { Play } from "lucide-react";
import { useState } from "react";

export type VideoEmbedProps = {
    url: string;
    coverImage: string;
    title: string;
    autoplay: boolean;
};

export const VideoEmbed: ComponentConfig<VideoEmbedProps> = {
    fields: {
        url: { type: "text" },
        coverImage: { type: "text" },
        title: { type: "text" },
        autoplay: {
            type: "radio",
            options: [
                { label: "Yes", value: true },
                { label: "No", value: false },
            ]
        }
    },
    defaultProps: {
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        title: "Watch our introduction video",
        autoplay: false,
    },
    render: ({ url, coverImage, title, autoplay }) => {
        const [isPlaying, setIsPlaying] = useState(false);

        // Helper to get embed URL
        const getEmbedUrl = (url: string) => {
            if (url.includes("youtube.com") || url.includes("youtu.be")) {
                const videoId = url.split("v=")[1] || url.split("/").pop();
                return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }
            return url;
        };

        return (
            <div className="container mx-auto px-4 py-16">
                <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                    {!isPlaying ? (
                        <div className="absolute inset-0 cursor-pointer group" onClick={() => setIsPlaying(true)}>
                            <img src={coverImage} alt={title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center pl-1 shadow-lg">
                                        <Play className="w-6 h-6 text-primary fill-primary" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 text-white font-bold text-xl drop-shadow-md">
                                {title}
                            </div>
                        </div>
                    ) : (
                        <iframe
                            src={getEmbedUrl(url)}
                            title={title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
            </div>
        );
    },
};
