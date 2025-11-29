'use client'

import { ComponentConfig } from "@measured/puck";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export type SmartButtonProps = {
    text: string;
    actionType: "link" | "register_course" | "newsletter_subscribe" | "contact_support";
    payload: string; // URL, Course ID, or Email
    variant: "default" | "secondary" | "outline" | "ghost" | "link";
    size: "default" | "sm" | "lg" | "icon";
};

export const SmartButton: ComponentConfig<SmartButtonProps> = {
    fields: {
        text: { type: "text" },
        actionType: {
            type: "select",
            options: [
                { label: "Open Link", value: "link" },
                { label: "Register for Course (Enter Course ID)", value: "register_course" },
                { label: "Subscribe to Newsletter", value: "newsletter_subscribe" },
                { label: "Contact Support", value: "contact_support" },
            ]
        },
        payload: { type: "text" },
        variant: {
            type: "select",
            options: [
                { label: "Default", value: "default" },
                { label: "Secondary", value: "secondary" },
                { label: "Outline", value: "outline" },
                { label: "Ghost", value: "ghost" },
                { label: "Link", value: "link" },
            ]
        },
        size: {
            type: "select",
            options: [
                { label: "Default", value: "default" },
                { label: "Small", value: "sm" },
                { label: "Large", value: "lg" },
            ]
        }
    },
    defaultProps: {
        text: "Take Action",
        actionType: "link",
        payload: "#",
        variant: "default",
        size: "default",
    },
    render: ({ text, actionType, payload, variant, size }) => {
        const router = useRouter();
        const { toast } = useToast();
        const [loading, setLoading] = useState(false);
        const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
        const [email, setEmail] = useState("");

        const handleClick = async () => {
            if (actionType === "link") {
                router.push(payload);
            } else if (actionType === "register_course") {
                // Simulate checking course availability
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    router.push(`/courses/${payload}/enroll`);
                }, 500);
            } else if (actionType === "newsletter_subscribe") {
                setIsNewsletterOpen(true);
            } else if (actionType === "contact_support") {
                router.push("/contact");
            }
        };

        const handleSubscribe = async () => {
            if (!email) return;
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                setLoading(false);
                setIsNewsletterOpen(false);
                toast({ title: "Subscribed!", description: "You have been added to our newsletter." });
                setEmail("");
            }, 1000);
        };

        return (
            <>
                <Button
                    variant={variant}
                    size={size}
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {text}
                </Button>

                <Dialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Subscribe to our Newsletter</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Email Address</Label>
                                <Input
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSubscribe} disabled={loading}>
                                {loading ? "Subscribing..." : "Subscribe"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </>
        );
    },
};
