
const { createMaster } = require("@/services/admin/admin-master");

async function seedTemplates() {
    const templates = [
        {
            name: "Modern Course Landing",
            code: "template-modern-course",
            meta: {
                content: [
                    { type: "HeroSliderComponent", props: { id: "hero" } },
                    { type: "StatisticsComponent", props: { id: "stats" } },
                    { type: "CourseFeatureComponent", props: { id: "features" } },
                    { type: "PremiumCourseComponent", props: { id: "premium" } },
                    { type: "TestimonialComponent", props: { id: "testimonials" } },
                    { type: "JoinCourseComponent", props: { id: "join" } }
                ],
                root: { title: "Modern Course Landing" }
            }
        },
        {
            name: "Minimalist Workshop",
            code: "template-minimal-workshop",
            meta: {
                content: [
                    { type: "Heading", props: { text: "Masterclass Workshop", align: "center", level: "h1", size: "xl" } },
                    { type: "Text", props: { text: "Join us for an intensive 2-day workshop.", align: "center", size: "m" } },
                    { type: "ImageBlock", props: { src: "https://via.placeholder.com/1200x600", alt: "Workshop", width: "100%", height: "auto" } },
                    {
                        type: "Container", props: { className: "container mx-auto px-4 mt-10" }, content: [
                            {
                                type: "Columns", props: { distribution: "1fr 1fr" }, content: [
                                    { type: "CardBlock", props: { title: "Day 1", description: "Theory and Fundamentals", buttonText: "View Schedule" } },
                                    { type: "CardBlock", props: { title: "Day 2", description: "Practical Application", buttonText: "View Schedule" } }
                                ]
                            }
                        ]
                    },
                    { type: "ButtonBlock", props: { text: "Register Now", align: "center", variant: "default", size: "lg" } }
                ],
                root: { title: "Minimalist Workshop" }
            }
        },
        {
            name: "Tech Bootcamp",
            code: "template-tech-bootcamp",
            meta: {
                content: [
                    { type: "HeroSliderComponent", props: { id: "hero" } },
                    { type: "WhyChooseUsComponent", props: { id: "why-us" } },
                    { type: "CourseTabsComponent", props: { id: "tabs" } },
                    { type: "MarketingOneComponent", props: { id: "marketing" } },
                    { type: "CTAOneComponent", props: { id: "cta" } }
                ],
                root: { title: "Tech Bootcamp" }
            }
        },
        {
            name: "Webinar Registration",
            code: "template-webinar",
            meta: {
                content: [
                    { type: "Heading", props: { text: "Free Webinar: Future of AI", align: "center", level: "h1" } },
                    { type: "VerticalSpace", props: { size: "40px" } },
                    {
                        type: "Columns", props: { distribution: "1fr 1fr" }, content: [
                            { type: "ImageBlock", props: { src: "https://via.placeholder.com/600x400", alt: "Speaker" } },
                            {
                                type: "Container", props: {}, content: [
                                    { type: "Text", props: { text: "Learn from the experts about the latest trends in Artificial Intelligence." } },
                                    { type: "ButtonBlock", props: { text: "Reserve Your Spot", variant: "default" } }
                                ]
                            }
                        ]
                    }
                ],
                root: { title: "Webinar Registration" }
            }
        },
        {
            name: "Blog & Resources",
            code: "template-blog-resources",
            meta: {
                content: [
                    { type: "Heading", props: { text: "Our Latest Resources", align: "center" } },
                    { type: "PopularBlogComponent", props: { id: "blogs" } },
                    { type: "PopularCourseSliderComponent", props: { id: "courses" } },
                    { type: "WidgetComponent", props: { id: "newsletter" } }
                ],
                root: { title: "Blog & Resources" }
            }
        }
    ];

    // Note: This is a pseudo-code representation. 
    // In reality, I cannot run this script directly because I don't have DB access from here.
    // I will instead create a "Seeder" component or page that the user can visit to install these templates.
}
