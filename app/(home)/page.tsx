// import AnimatedComponent from "@/components/animate/AnimatedComponent";
import PopularBlogsSection from "@/components/blog/PopularBlogsSection";
import CourseTabByCategory from "@/components/courses/CourseTabByCategory";
import PopularCourseSlider from "@/components/courses/PopularCourseSlider";
import PremiumCourseSection from "@/components/courses/PremiumCourseSection";
import CourseFeatures from "@/components/shared/CourseFeatures";
import CtaOne from "@/components/shared/CtaOne";
import CtaTwo from "@/components/shared/CtaTwo";
import Hero from "@/components/shared/Hero";
import JoinCourseSection from "@/components/shared/JoinCourseSection";
import MarketingOne from "@/components/shared/MarketingOne";
import SectionTitle from "@/components/shared/SectionTitle";
import StatisticsSection from "@/components/shared/StatisticsSection";
import Testimonial from "@/components/shared/Testimonial";
import WhyChooseUs from "@/components/shared/WhyChooseUs";



const HomePage = () => {


  return (
    <div>
      <Hero />


      <div className="container mx-auto px-4 mt-20 md:mt-40">
        <StatisticsSection />
      </div>

      <div className="mt-20">
      <PremiumCourseSection/>
      </div>

      <div className="container mx-auto px-4 mt-20">
        <SectionTitle title="Popular Courses" />
        <PopularCourseSlider />
      </div>

      <div className="mt-40">
        <CourseFeatures />
      </div>


      <section className="bg-secondary py-20 mt-20">
        <div className="container mx-auto px-4 ">
          <WhyChooseUs />
        </div>
      </section>


      <div className="container mx-auto px-4 mt-20 md:mt-40">
        <SectionTitle title="Our Courses" />
        <CourseTabByCategory />
      </div>


      <div className="container mx-auto px-4 mt-20 md:mt-40">
        <MarketingOne />
      </div>

      <div className="mt-20">
        <CtaOne />
      </div>

      <div className="container mx-auto px-4 mt-20 md:mt-40">
        <Testimonial />
      </div>
      <div className=" mt-20 md:mt-40">
        <CtaTwo />
      </div>

      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4"><PopularBlogsSection/></div>
      </section>

      <div className=" container mx-auto py-28">
        <JoinCourseSection />
      </div>
      
    </div>
  )
}

export default HomePage