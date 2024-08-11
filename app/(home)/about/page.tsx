import PageHeader from "@/components/shared/PageHeader"
import HeadingSubtitle from "@/components/shared/SectionLable"
import Typography from "@/components/typography"
import HighlightedText from "@/components/typography/HighlightedHeading"
import { HandHeart, HandshakeIcon, HeadsetIcon, Star } from "lucide-react";
import {constants} from '@/config/constants'
import { Progress } from "@/components/ui/progress"
import PremiumCourseSection from "@/components/courses/PremiumCourseSection";
// import OurTeamSection from "@/components/shared/OurTeamSection";
import JoinCourseSection2 from "@/components/shared/JoinCourseSection2";
import MarketingFour from "@/components/shared/MarketingFour";


const AboutPage = () => {
  return (
    <div>
      <PageHeader title="About Us" image={"/assets/images/bim.jpg"} />

      <section className="py-32 px-4 text-primary text-center">
        <div className="flex items-center justify-center flex-col">
          <div className="max-w-5xl">
            <HeadingSubtitle title="CUSTOMER REVIEWS" className="" />
            <Typography as="title" className="mb-10">Global Students Provide Us With Outstanding <HighlightedText>Client Testimonials</HighlightedText></Typography>
            <Typography as="p">Donec laoreet quam in arcu tempor, ut aliquet diam sagittis. Morbi id elit sodales, facilisis enim sollicitudin, pellentesque quam. Donec tempor metus felis, nec egestas ligula convallis a. Duis rutrum, massa non vehicula sodales.</Typography>
          </div>
        </div>

        <section className="py-20">
        <div className="container mx-auto">
        <MarketingFour/>
        </div>
      </section>

        <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 items-center justify-items-center gap-5 mt-14  ">
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
        </div>
      </section>





      <section className="py-32 px-4 bg-primary/5">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-items-center">
          <div className="rounded-xl overflow-hidden">
            <img className="w-full" src={`${constants.imagePath}/about-us-2.webp`} />
          </div>

          <div>
            <HeadingSubtitle title="STUDY AND RESEARCH" />
            <Typography as="title" className="mb-5">Remarkable Research &  <HighlightedText>Outstanding</HighlightedText> Teaching Expertise</Typography>
            <Typography as="p">Ligula ullamcorper malesuada proin et netus et malesuada fames ac turpis et malesuada fames ac ante ipsum primis in faucibus. Vestibu tium.</Typography>

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

      <PremiumCourseSection className="bg-background"/>

      {/* <OurTeamSection/> */}

      <JoinCourseSection2/>
    </div>
  )
}

export default AboutPage