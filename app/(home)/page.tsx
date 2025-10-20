// import AnimatedComponent from "@/components/animate/AnimatedComponent";
import nextDynamic from "next/dynamic";
import { conf } from "@/components/page-builder/builder";
import Typography from "@/components/typography";
import { fetchMaster } from "@/services/admin/admin-master";
const RenderPage = nextDynamic(() => import('@/components/page-builder/RenderPage'), { ssr: false })

export const dynamic = 'force-dynamic'
export const revalidate = 0


const HomePage = async () => {
  const master = await fetchMaster("HOME-PAGE");

  if(!master){
    return <div className="w-screen h-screen grid place-content-center">
       <Typography as="title">Page Not Found!</Typography>
    </div>
  }

  return (
    <RenderPage config={conf as any} data={master.meta as any}/>
  )

  // return (
  //   <div>
  //     <Hero />


  //     <div className="container mx-auto px-4 mt-20 md:mt-40">
  //       <StatisticsSection />
  //     </div>

  //     <div className="mt-20">
  //     <PremiumCourseSection/>
  //     </div>

  //     <div className="container mx-auto px-4 mt-20">
  //       <SectionTitle title="Popular Courses" />
  //       <PopularCourseSlider />
  //     </div>

  //     <div className="mt-40">
  //       <CourseFeatures />
  //     </div>


  //     <section className="bg-secondary py-20 mt-20">
  //       <div className="container mx-auto px-4 ">
  //         <WhyChooseUs />
  //       </div>
  //     </section>


  //     <div className="container mx-auto px-4 mt-20 md:mt-40">
  //       <SectionTitle title="Our Courses" />
  //       <CourseTabByCategory />
  //     </div>


  //     <div className="container mx-auto px-4 mt-20 md:mt-40">
  //       <MarketingOne />
  //     </div>

  //     <div className="mt-20">
  //       <CtaOne />
  //     </div>

  //     <div className="container mx-auto px-4 mt-20 md:mt-40">
  //       <Testimonial />
  //     </div>
  //     <div className=" mt-20 md:mt-40">
  //       <CtaTwo />
  //     </div>

  //     <section className="py-20 bg-primary/5">
  //       <div className="container mx-auto px-4"><PopularBlogsSection/></div>
  //     </section>

  //     <div className=" container mx-auto py-28">
  //       <JoinCourseSection />
  //     </div>
      
  //   </div>
  // )
}



export default HomePage