'use client'

import { ComponentConfig } from "@measured/puck";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export type TestimonialItem = {
    quote: string;
    author: string;
    role: string;
    avatar: string;
};

export type TestimonialCarouselProps = {
    title: string;
    testimonials: TestimonialItem[];
};

export const TestimonialCarousel: ComponentConfig<TestimonialCarouselProps> = {
    fields: {
        title: { type: "text" },
        testimonials: {
            type: "array",
            arrayFields: {
                quote: { type: "textarea" },
                author: { type: "text" },
                role: { type: "text" },
                avatar: { type: "text" },
            },
            getItemSummary: (item) => item.author || "Testimonial",
        }
    },
    defaultProps: {
        title: "Trusted by Thousands",
        testimonials: [
            { quote: "This platform completely transformed how we operate. Highly recommended!", author: "Sarah Johnson", role: "CTO, TechCorp", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
            { quote: "The best investment we've made this year. The support is phenomenal.", author: "Michael Chen", role: "Founder, StartupX", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
            { quote: "Simple, intuitive, and powerful. Exactly what we needed.", author: "Emily Davis", role: "Product Manager, CreativeInc", avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
        ]
    },
    render: ({ title, testimonials }) => {
        return (
            <div className="container mx-auto px-4 py-20 bg-muted/30">
                <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
                <div className="max-w-4xl mx-auto px-12">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {testimonials.map((item, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                                    <div className="p-1">
                                        <Card className="h-full">
                                            <CardContent className="flex flex-col justify-between h-full p-6">
                                                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                                                <p className="text-lg italic text-muted-foreground mb-6">"{item.quote}"</p>
                                                <div className="flex items-center gap-4 mt-auto">
                                                    <Avatar>
                                                        <AvatarImage src={item.avatar} alt={item.author} />
                                                        <AvatarFallback>{item.author[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-semibold text-sm">{item.author}</p>
                                                        <p className="text-xs text-muted-foreground">{item.role}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        );
    },
};
