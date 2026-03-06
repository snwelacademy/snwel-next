import PageHeader from "@/components/shared/PageHeader"
import HeadingSubtitle from "@/components/shared/SectionLable"
import Typography from "@/components/typography"
import HighlightedText from "@/components/typography/HighlightedHeading"
import { CheckCircle, HandHeart, HandshakeIcon, HeadsetIcon, Star } from "lucide-react";
import { constants } from '@/config/constants'
import { Progress } from "@/components/ui/progress"
import PremiumCourseSection from "@/components/courses/PremiumCourseSection";
// import OurTeamSection from "@/components/shared/OurTeamSection";
import JoinCourseSection2 from "@/components/shared/JoinCourseSection2";
import MarketingFour from "@/components/shared/MarketingFour";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import JoinCourseSection from "@/components/shared/JoinCourseSection";
import { WheWeServeTwo } from "@/components/WhoWeServeTwo";

export const dynamic = 'force-dynamic'
export const revalidate = 0

const AboutPage = () => {
  return (
    <div>
      <PageHeader title="About SNWEL Academy" image={"/assets/images/About_us.png"} subtitle="Building careers through industry-aligned, practical training" />

      <section className="pt-10 pb-32 px-4 text-primary text-center">
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
          {/* <div className="relative h-80 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
            <img
          src="/assets/images/bim.jpg"
          alt="SNWEL Academy Banner"
          width={1920}
          height={400}
          className="object-cover object-center opacity-20"
        />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold tracking-tight text-white">About SNWEL Academy</h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                  Empowering careers through industry-aligned, practical training
                </p>
              </div>
            </div>
          </div> */}

          <div className="container mx-auto px-4 py-12 space-y-16 ">
            <section className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-blue-700">Our Mission</h2>
                <p className="text-gray-700">
                  At SNWEL Academy, we go beyond traditional training methods by focusing on knowledge- and skill-based learning that aligns with real-world career goals. Our programs emphasize hands-on practical training and industry-specific projects, ensuring that our students are well-prepared for the demands of today’s competitive job market.
                </p>
                <p className="text-gray-700">
                  Our mission is to empower you to achieve professional success. In an environment where competition is fierce and challenges are greater than ever, SNWEL Academy stands as a crucial partner in your career development.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-purple-700">What We Offer</h2>
                <p className="text-gray-700">
                  We offer a wide range of engineering and technology courses tailored to meet industry needs. Delivered in modern, innovative classrooms, our training solutions are designed to meet your professional requirements.
                </p>
                <p className="text-gray-700">
                  Whether you aim to enhance your skills, increase your productivity, or secure a high-paying job at a top multinational company, SNWEL Academy is here to support your journey.
                </p>
              </div>
            </section>



            <WheWeServeTwo/>

              <section className="space-y-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-lg">
              <h2 className="text-4xl font-semibold text-center from-blue-500 to-purple-500 bg-gradient-to-r bg-clip-text text-transparent inline-block">Why Choose SNWEL Academy</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[

                    "Master industry-ready skills to kick-start your career",
                    "Hands-on training bridging theory and practice",
                    "Real-world projects to turn knowledge into expertise",
                    "Practical, job-oriented training to boost employability",
                    "Tailored courses aligned with today’s industry demands",
                    "Specialized courses to get ahead in the job market",
                    "Continuous learning for working professionals",
                    "Upgrade skills, increase productivity, and achieve more",


                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-700 text-left">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* <section className="text-center bg-gradient-to-r from-blue-500 to-purple-500 p-12 rounded-lg">
              <h2 className="text-3xl font-semibold mb-4 text-white">Ready to Start Your Journey?</h2>
              <Link href="/courses">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">Explore Our Courses</Button>
              </Link>
            </section> */}
            <section className="text-center bg-gradient-to-br from-blue-500/90 to-purple-600/90 backdrop-blur-sm p-12 rounded-2xl transition-all duration-700 ease-out group overflow-hidden relative border border-white/20 shadow-2xl hover:shadow-3xl hover:border-white/30 hover:from-blue-600/95 hover:to-purple-700/95">
  {/* Glass effect overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
  
  {/* Floating particles */}
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(5)].map((_, i) => (
      <div 
        key={i}
        className="absolute rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-1000 ease-out"
        style={{
          width: `${Math.random() * 60 + 20}px`,
          height: `${Math.random() * 60 + 20}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.2}s`,
          transform: `scale(0)`,
        }}
        className="group-hover:scale-100"
      ></div>
    ))}
  </div>
  
  <h2 className="text-4xl font-bold mb-8 text-white relative z-10 drop-shadow-lg">
    <span className="inline-block transition-all duration-700 ease-out group-hover:translate-y-[-4px]">
      Ready to Start Your Journey?
    </span>
    <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6 opacity-50 group-hover:w-32 group-hover:opacity-80 transition-all duration-700"></div>
  </h2>
  
  <Link href="/courses" className="inline-block relative z-10">
    <Button 
      size="lg"
      className="bg-white/95 backdrop-blur-sm text-blue-700 font-bold rounded-xl px-10 py-5 shadow-2xl transition-all duration-500 hover:bg-white hover:shadow-3xl hover:-translate-y-2 active:translate-y-0 group/btn border border-white/30"
    >
      <span className="flex items-center gap-3">
        <span className="transition-all duration-500 group-hover/btn:tracking-wider">
          Explore Our Courses
        </span>
        <svg 
          className="w-5 h-5 transition-all duration-500 group-hover/btn:translate-x-2 group-hover/btn:scale-110" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </span>
    </Button>
  </Link>
</section>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto">
            <MarketingFour />
          </div>
        </section>

        {/* <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 items-center justify-items-center gap-5 mt-14  ">
          <div className="flex items-center justify-center flex-col gap-5">
            <Star className="w-20 text-primary h-20 "></Star>
            <span className="inline-flex p-2 text-primary-foreground gap-2 bg-primary rounded-xl items-center">
              <Typography as="h2" >9.6/10</Typography>
              <Star className="w-6 h-6 fill-yellow-500 text-yellow-500 drop-shadow shadow-yellow-600" ></Star>
            </span>
            <Typography as="h3" className="text-primary">Student Rating</Typography>
          </div>
          <div className="flex items-center justify-center flex-col gap-5">
            <HeadsetIcon className="w-20 text-primary h-20"></HeadsetIcon>
            <span className="inline-flex p-2 text-primary-foreground gap-2 bg-primary rounded-xl items-center">
              <Typography as="h2" >4.9/5</Typography>
              <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" ></Star>
            </span>
            <Typography as="h3" className="text-primary">Instrustor Support</Typography>
          </div>
          <div className="flex items-center justify-center flex-col gap-5">
            <HandshakeIcon className="w-20 text-primary h-20"></HandshakeIcon>
            <span className="inline-flex p-2 text-primary-foreground gap-2 bg-primary rounded-xl items-center">
              <Typography as="h2" >5/5</Typography>
              <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" ></Star>
            </span>
            <Typography as="h3" className="text-primary">Technical Guidance</Typography>
          </div>
          <div className="flex items-center justify-center flex-col gap-5">
            <HandHeart className="w-20 text-primary h-20"></HandHeart>
            <span className="inline-flex p-2 text-primary-foreground gap-2 bg-primary rounded-xl items-center">
              <Typography as="h2" >5/5</Typography>
              <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" ></Star>
            </span>
            <Typography as="h3" className="text-primary">Excellent Service</Typography>
          </div>
        </div> */}
      </section>





      <section className="py-32 px-4 bg-primary/5">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-items-center">
          <div className="rounded-xl overflow-hidden">
            <img className="w-full" src={`${constants.imagePath}/About_us_study.png`} />
          </div>

          <div>
            <HeadingSubtitle title="STUDY AND RESEARCH" />
            <Typography as="title" className="mb-5 from-blue-500 to-purple-500 bg-gradient-to-r bg-clip-text text-transparent inline-block">Remarkable Research &  <HighlightedText className="  ">Outstanding</HighlightedText> Teaching Expertise</Typography>
            <Typography as="p">Discover a world of academic excellence where groundbreaking research meets inspiring teaching. Our faculty are dedicated to fostering a culture of intellectual curiosity and academic achievement, guiding you on your path to success.</Typography>

            <div className="mt-10 space-y-2">
              <div className="flex items-center justify-between text-primary">
                <Typography as="p" className="font-semibold">Education:</Typography>
                <Typography as="p" className="font-semibold">90%</Typography>
              </div>
              <Progress value={90} />
            </div>
            <div className="mt-10 space-y-2">
              <div className="flex items-center justify-between text-primary">
                <Typography as="p" className="font-semibold">Motivation:</Typography>
                <Typography as="p" className="font-semibold">80%</Typography>
              </div>
              <Progress value={80} />
            </div>
            <div className="mt-10 space-y-2">
              <div className="flex items-center justify-between text-primary">
                <Typography as="p" className="font-semibold">Coaching:</Typography>
                <Typography as="p" className="font-semibold">85%</Typography>
              </div>
              <Progress value={85} />
            </div>
          </div>
        </div>
      </section>


      <PremiumCourseSection className="bg-background container mx-auto" />

      {/* <OurTeamSection/> */}

      <div className="container px-4 py-24">
        <JoinCourseSection />
      </div>
    </div>
  )
}

export default AboutPage