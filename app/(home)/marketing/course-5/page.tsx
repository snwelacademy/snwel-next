import nextDynamic from "next/dynamic";
import { Data } from "@measured/puck";

const RenderPage = nextDynamic(() => import('@/components/page-builder/RenderPage'), { ssr: false })

export const dynamic = 'force-dynamic'
export const revalidate = 0

const pageData: Data = {
    content: [
        {
            type: "MarketingHero",
            props: {
                variant: "minimal-dark",
                title: "Design 101: <br/> Master the Art of Digital Design",
                subtitle: "A comprehensive guide to creating beautiful, functional, and user-centric digital experiences. Learn the principles of design, typography, color theory, and more.",
                badgeText: "New Course",
                primaryButtonText: "Start Learning",
                primaryButtonLink: "/enroll/design-101",
                secondaryButtonText: "View Curriculum",
                secondaryButtonLink: "#curriculum",
                imageSrc: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000",
                id: "hero-1"
            }
        },
        {
            type: "MarketingFeatures",
            props: {
                variant: "minimal-dark",
                title: "What You'll Learn",
                description: "Master the core concepts of digital design.",
                features: [
                    { title: "Typography", description: "Understand typefaces, hierarchy, and readability.", icon: "Type" },
                    { title: "Color Theory", description: "Master color harmony, contrast, and psychology.", icon: "Palette" },
                    { title: "Layout", description: "Learn grid systems, spacing, and composition.", icon: "Layout" },
                    { title: "UX Principles", description: "Design with the user in mind.", icon: "Users" }
                ],
                id: "features-1"
            }
        },
        {
            type: "MarketingCTA",
            props: {
                variant: "minimal-dark",
                title: "Ready to Start Your Design Journey?",
                subtitle: "Join thousands of students and start creating today.",
                buttonText: "Enroll Now",
                buttonLink: "/enroll/design-101",
                id: "cta-1"
            }
        },
        {
            type: "MarketingTestimonial",
            props: {
                variant: "minimal-dark",
                quote: "This course completely changed how I approach design. The principles I learned here are applicable to everything I create.",
                author: "Sarah Jenkins",
                role: "Product Designer at TechFlow",
                avatarSrc: "https://randomuser.me/api/portraits/women/44.jpg",
                id: "testimonial-1"
            }
        }
    ],
    root: { props: { title: "Design 101" } },
    zones: {}
};

export default function Course5Page() {
    return (
        <main>
            <RenderPage data={pageData} />
        </main>
    );
}
