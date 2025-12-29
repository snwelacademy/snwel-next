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
      <PageHeader title="HELOO SNWEL Academy" image={"/assets/images/bim.jpg"} subtitle="Empowering careers through industry-aligned, practical training" />

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
                  At SNWEL Academy&apos; we go beyond traditional training methods by focusing on knowledge and skill-based learning that aligns with real-world career goals. Our programs emphasize hands-on practical training and industry-specific projects&apos; ensuring that our students are well-prepared for the demands of today's competitive job market.
                </p>
                <p className="text-gray-700">
                  Our mission is to empower you to achieve further professional success. In an environment where competition is fierce and challenges are greater than ever&apos; SNWEL Academy stands out as a crucial partner in your career development.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-purple-700">What We Offer</h2>
                <p className="text-gray-700">
                  We offer a wide range of engineering and technology courses tailored to meet industry needs. Delivered in modern&apos; innovative classrooms&apos; our training solutions are designed to truly meet your professional requirements.
                </p>
                <p className="text-gray-700">
                  Whether you aim to enhance your skills&apos; increase your productivity&apos; or secure a high-paying job at a top multinational company&apos; SNWEL Academy is here to support your journey.
                </p>
              </div>
            </section>

            {/* <section className="space-y-8">
              <h2 className="text-4xl text-center font-bold from-blue-500 to-purple-500 bg-gradient-to-r bg-clip-text text-transparent inline-block">Who We Serve</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "For Students",
                    content: "Bridge the gap between classroom learning and real-world industry demands with hands-on experience and practical skills.",
                    image: "/assets/images/for-student.jpg",
                  },
                  {
                    title: "For Job Seekers",
                    content: "Stand out in the competitive job market with specialized training programs that make you more marketable.",
                    image: "/assets/images/for-job-seeker.jpg",
                  },
                  {
                    title: "For Working Professionals",
                    content: "Stay ahead of the curve and keep your skills sharp with advanced training programs designed for continuous learning.",
                    image: "/assets/images/for-working-profissional.jpg",
                  },
                ].map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <CardTitle className="text-xl font-bold ">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{item.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section> */}

            <WheWeServeTwo/>

              <section className="space-y-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-lg">
              <h2 className="text-4xl font-semibold text-center from-blue-500 to-purple-500 bg-gradient-to-r bg-clip-text text-transparent inline-block">Why Choose SNWEL Academy</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Empower Your Career with Industry-Ready Skills",
                  "Hands-On Training to Bridge the Gap Between Theory and Practice",
                  "Get Ahead in the Job Market with Specialized Courses",
                  "Turn Knowledge into Expertise with Real-World Projects",
                  "Enhance Your Employability with Practical, Job-Oriented Training",
                  "Stay Competitive: Continuous Learning for Working Professionals",
                  "Tailored Courses to Meet the Demands of Today's Industries",
                  "Your Pathway to Professional Success Starts Here",
                  "From Classroom to Career: Gain the Skills Employers Want",
                  "Upgrade Your Skills, Boost Your Productivity, and Achieve More",
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-700 text-left">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="text-center bg-gradient-to-r from-blue-500 to-purple-500 p-12 rounded-lg">
              <h2 className="text-3xl font-semibold mb-4 text-white">Ready to Start Your Journey?</h2>
              <Link href="/courses">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">Explore Our Courses</Button>
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
            <img className="w-full" src={`${constants.imagePath}/about-us-2.webp`} />
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