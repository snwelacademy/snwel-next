'use client';

import { useState } from 'react';
import { createMaster } from '@/services/admin/admin-master';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SeedTemplatesPage() {
  const [status, setStatus] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const templates = [
    {
      name: "Modern Course Landing",
      code: "template-modern-course",
      parentCode: 'PAGE_TEMPLATE',
      type: 'SUB_MASTER',
      isActive: true,
      sequence: 0,
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
      parentCode: 'PAGE_TEMPLATE',
      type: 'SUB_MASTER',
      isActive: true,
      sequence: 0,
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
      parentCode: 'PAGE_TEMPLATE',
      type: 'SUB_MASTER',
      isActive: true,
      sequence: 0,
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
      parentCode: 'PAGE_TEMPLATE',
      type: 'SUB_MASTER',
      isActive: true,
      sequence: 0,
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
      name: "Exclusive Course Launch",
      code: "template-exclusive-course",
      parentCode: 'PAGE_TEMPLATE',
      type: 'SUB_MASTER',
      isActive: true,
      sequence: 0,
      meta: {
        content: [
          {
            type: "ModernHero",
            props: {
              headline: "Master Full-Stack Development",
              subheadline: "The only course you need to go from zero to hired. Build real apps, master modern tools, and launch your career.",
              primaryButtonText: "Enroll Now",
              primaryButtonLink: "#pricing",
              secondaryButtonText: "Watch Trailer",
              secondaryButtonLink: "#trailer",
              align: "center",
              height: "screen",
              overlayOpacity: 60,
              backgroundImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
            }
          },
          {
            type: "LogoCloud",
            props: {
              title: "Graduates hired by top companies",
              logos: [
                { src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google" },
                { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg", alt: "Facebook" },
                { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", alt: "Netflix" },
                { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft" },
                { src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon" }
              ]
            }
          },
          {
            type: "StatsCounter",
            props: {
              background: "primary",
              stats: [
                { number: "15", suffix: "k+", label: "Students Enrolled" },
                { number: "4.9", suffix: "/5", label: "Average Rating" },
                { number: "120", suffix: "+", label: "Hours of Content" },
                { number: "50", suffix: "+", label: "Real Projects" }
              ]
            }
          },
          {
            type: "VideoEmbed",
            props: {
              title: "See what's inside the course",
              url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1744&q=80",
              autoplay: false
            }
          },
          {
            type: "FeatureGrid",
            props: {
              title: "Everything you need to succeed",
              subtitle: "We cover the entire stack, from database to deployment.",
              columns: "3",
              features: [
                { title: "React & Next.js", description: "Master the most popular frontend frameworks.", icon: "Code" },
                { title: "Node.js & Express", description: "Build robust and scalable backend APIs.", icon: "Zap" },
                { title: "Database Design", description: "Learn SQL and NoSQL database modeling.", icon: "BarChart" },
                { title: "Authentication", description: "Secure your apps with industry standards.", icon: "Shield" },
                { title: "Deployment", description: "Deploy to Vercel, AWS, and DigitalOcean.", icon: "Globe" },
                { title: "Career Coaching", description: "Resume reviews and mock interviews.", icon: "Users" }
              ]
            }
          },
          {
            type: "BentoGrid",
            props: {
              items: [
                { title: "Real-World Projects", description: "Build a portfolio that gets you hired.", span: "2", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                { title: "Interactive Coding", description: "Practice as you learn.", span: "1", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                { title: "Community Access", description: "Join our private Discord.", span: "1", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
              ]
            }
          },
          {
            type: "TestimonialCarousel",
            props: {
              title: "Success Stories",
              testimonials: [
                { quote: "I got a job at a FAANG company 3 months after finishing this course.", author: "Alex Johnson", role: "Software Engineer", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
                { quote: "The best explanation of React I've ever seen. Highly recommended.", author: "Maria Garcia", role: "Frontend Dev", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
                { quote: "Worth every penny. The community support is amazing.", author: "David Kim", role: "Full Stack Dev", avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d" }
              ]
            }
          },
          {
            type: "PricingTable",
            props: {
              title: "Simple Pricing",
              subtitle: "Invest in your future today.",
              plans: [
                { name: "Basic", price: "$49", frequency: "one-time", description: "Access to all video content.", features: "All Video Lessons\nSource Code Access\nCertificate of Completion", buttonText: "Enroll Basic", buttonLink: "#", popular: false },
                { name: "Pro", price: "$99", frequency: "one-time", description: "Video content + Community.", features: "Everything in Basic\nPrivate Discord Access\nWeekly Q&A Calls\nResume Review", buttonText: "Enroll Pro", buttonLink: "#", popular: true },
                { name: "Mentorship", price: "$299", frequency: "one-time", description: "1-on-1 guidance.", features: "Everything in Pro\n1-on-1 Mentorship Sessions\nMock Interviews\nJob Referral", buttonText: "Apply Now", buttonLink: "#", popular: false }
              ]
            }
          },
          {
            type: "FAQAccordion",
            props: {
              title: "Frequently Asked Questions",
              subtitle: "Got questions? We've got answers.",
              items: [
                { question: "Do I need prior experience?", answer: "No, this course starts from the very basics and takes you to an advanced level." },
                { question: "Is this course self-paced?", answer: "Yes, you can watch the lectures at your own pace and schedule." },
                { question: "Do you offer a refund guarantee?", answer: "Yes, we offer a 30-day no-questions-asked money-back guarantee." }
              ]
            }
          },
          {
            type: "CTAStrip",
            props: {
              headline: "Ready to launch your career?",
              subheadline: "Join 15,000+ students learning to code today.",
              buttonText: "Get Started Now",
              buttonLink: "#pricing",
              background: "dark"
            }
          }
        ],
        root: { title: "Exclusive Course Launch" }
      }
    },
    {
      name: "Creative Design Masterclass",
      code: "template-creative-design",
      parentCode: 'PAGE_TEMPLATE',
      type: 'SUB_MASTER',
      isActive: true,
      sequence: 0,
      meta: {
        content: [
          {
            type: "CreativeHero",
            props: {
              headline: "Unleash Your Inner Creator",
              subheadline: "Join the ultimate design masterclass. Learn to build stunning interfaces, immersive experiences, and brands that stand out.",
              badgeText: "New Cohort Starting Soon",
              primaryButtonText: "Start Creating",
              primaryButtonLink: "#curriculum",
              imageSrc: "https://images.unsplash.com/photo-1558655146-d09347e0b7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
              align: "left"
            }
          },
          {
            type: "InfiniteMarquee",
            props: {
              items: [
                { text: "UI DESIGN" },
                { text: "UX RESEARCH" },
                { text: "PROTOTYPING" },
                { text: "ANIMATION" },
                { text: "BRANDING" },
                { text: "STRATEGY" }
              ],
              direction: "left",
              speed: "normal",
              background: "black"
            }
          },
          {
            type: "Heading",
            props: { text: "Your Journey to Mastery", align: "center", level: "h2", size: "xl" }
          },
          {
            type: "Timeline",
            props: {
              title: "Course Curriculum",
              items: [
                { year: "Week 1", title: "Design Fundamentals", description: "Master color theory, typography, and layout grids." },
                { year: "Week 2", title: "UI & Interaction", description: "Learn Figma deep-dives and create clickable prototypes." },
                { year: "Week 3", title: "UX Research", description: "Conduct user interviews and build personas." },
                { year: "Week 4", title: "Capstone Project", description: "Build a complete case study for your portfolio." }
              ]
            }
          },
          { type: "VerticalSpace", props: { size: "80px" } },
          { type: "Heading", props: { text: "Get Certified", align: "center", level: "h2" } },
          {
            type: "TiltCard",
            props: {
              title: "Official Certification",
              description: "Receive a globally recognized certificate upon completion. Showcase your skills to top employers.",
              imageSrc: "https://images.unsplash.com/photo-1589330694653-4a8b2436a223?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
              buttonText: "View Sample",
              buttonLink: "#",
              theme: "light"
            }
          },
          { type: "VerticalSpace", props: { size: "80px" } },
          { type: "Heading", props: { text: "Ready to Start?", align: "center", level: "h2" } },
          { type: "VerticalSpace", props: { size: "20px" } },
          {
            type: "SmartButton",
            props: {
              text: "Enroll in Masterclass",
              actionType: "register_course",
              payload: "design-masterclass-101",
              variant: "default",
              size: "lg"
            }
          },
          { type: "VerticalSpace", props: { size: "10px" } },
          {
            type: "SmartButton",
            props: {
              text: "Get Syllabus via Email",
              actionType: "newsletter_subscribe",
              payload: "",
              variant: "ghost",
              size: "sm"
            }
          },
          { type: "VerticalSpace", props: { size: "80px" } }
        ],
        root: { title: "Creative Design Masterclass" }
      }
    },
    {
      name: "Blog & Resources",
      code: "template-blog-resources",
      parentCode: 'PAGE_TEMPLATE',
      type: 'SUB_MASTER',
      isActive: true,
      sequence: 0,
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

  const runSeeder = async () => {
    setLoading(true);
    setStatus([]);

    for (const template of templates) {
      try {
        setStatus(prev => [...prev, `Creating ${template.name}...`]);
        // @ts-ignore
        await createMaster(template);
        setStatus(prev => [...prev, `✅ ${template.name} created successfully!`]);
      } catch (error: any) {
        setStatus(prev => [...prev, `❌ Failed to create ${template.name}: ${error.message}`]);
      }
    }
    setLoading(false);
  };

  return (
    <div className="p-10 flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Seed Page Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Click the button below to create 5 demo page templates in your system.
          </p>
          <Button onClick={runSeeder} disabled={loading} className="w-full">
            {loading ? 'Seeding...' : 'Run Seeder'}
          </Button>

          <div className="mt-4 space-y-2 bg-black text-green-400 p-4 rounded-md font-mono text-sm min-h-[200px]">
            {status.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
            {status.length === 0 && <div className="text-gray-500">Ready to start...</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
