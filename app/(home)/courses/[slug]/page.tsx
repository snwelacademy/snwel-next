/* eslint-disable jsx-a11y/alt-text */
'use client'

import CourseDescription from "@/components/courses/CourseDescription"
import CourseInfoSidebar from "@/components/courses/CourseInfoSidebar"
import EnrollCourseModal from "@/components/courses/EnrollCourseModal"
import PageLoader from "@/components/PageLoader"
import PageHeader from "@/components/shared/PageHeader"
import Typography from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RenderWidget from "@/components/widget/RenderWidget"
import { PrebuiltComponent } from "@/data/prebuiltComponents"
import { formatToLocalCurrency } from "@/lib/utils"
import { getPublicCourseBySlug } from "@/services/public/course-service"
import { useQuery } from "@tanstack/react-query"
import { Book, Dot } from "lucide-react"
import { nanoid } from "nanoid"
import { useSearchParams } from "next/navigation"

export default function Page({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams()
  const { data: course, isLoading } = useQuery({
    queryKey: ["public/course", params.slug],
    queryFn: () => getPublicCourseBySlug(params.slug || "")
  })
  if (isLoading) {
    return <PageLoader />
  }
  if (!course) {
    return <PageHeader title='No Course Found!' />
  }
  return <>
  {/* <PageHeader title={course?.title} image={course.image} /> */}

  <section className='py-20 px-4 z-50'>
      <div className='container mx-auto px-0 flex flex-col md:flex-row gap-5 relative'>
          <div className='flex-grow relative'>
            {
                course?.widget && <RenderWidget code={course.widget}/>
            }
              <div className='aspect-video bg-primary bg-center bg-cover relative rounded-2xl shadow-md' style={{ backgroundImage: `url(${course.image})` }}>
              </div>
              <div className='px-2 md:px-5 lg:px-10'>
                  <div className='rounded-xl bg-background p-2 md:p-5 lg:p-5 md:shadow-xl -translate-y-1/2'>
                      <div className='flex items-center'>
                          <Typography className='flex-grow' as="h1">{course.title}</Typography>
                          <span> <img className='w-10' src={"/assets/images/284-2840858_100-job-guarantee-logo-hd-png-download.png"} /></span>
                      </div>

                      <div className='flex items-start flex-col gap-3 md:flex-row md:items-center '>
                          <div className='flex-auto flex gap-3 flex-col md:flex-row md:flex-wrap'>
                              <div className='flex gap-1 text-gray-600'>
                                  <Typography as="p" className=''>{course.courseDuration} {course.content?.durationUnit}</Typography>
                                  <span className='font-bold'><Dot/></span>
                                  <Typography as="p" className=''>{course.curriculum.length} Curriculum</Typography>
                              </div>
                          </div>

                          <div className='flex items-center justify-center gap-2'>
                              {
                                course.content?.showPrice 
                                &&
                                <span className='p-2 rounded-md text-primary text-2xl md:text-2xl font-mono font-bold text-orange-500'>{formatToLocalCurrency(course.price)}</span>
                              }
                              <EnrollCourseModal targetCourse={course} trigger={<Button>Enroll Now</Button>} courseId={course._id} widget={course.widget} />
                          </div>
                      </div>
                  </div>

                  <Tabs defaultValue={searchParams.get('tab') || course.content?.tabs[0].name} className="w-full" >
                      {
                          course.content && course.content.tabs.length &&
                          <>
                              <TabsList className='w-full justify-start' >
                                  {
                                      course.content.tabs.filter(tb => tb.isActive).map(tab => {
                                          return <TabsTrigger key={nanoid()} value={tab.name} ><Book className='w-4 h-4 mr-2' /> <span>{tab.name}</span></TabsTrigger>
                                      })
                                  }
                              </TabsList>
                              <div className='mt-10'>
                                  {
                                      course.content.tabs.filter(tb => tb.isActive).map((tab, index) => {
                                          if(tab.contentType === 'RICH_TEXT'){
                                              return <TabsContent key={nanoid()} value={tab.name} defaultChecked={Boolean(index===0)}><CourseDescription desc={tab.content} /></TabsContent>
                                          }else if(tab.contentType === 'COMPONENT' && tab.content === 'courseCurricullum'){
                                              const Component = PrebuiltComponent[tab.content].component;
                                              return <TabsContent key={nanoid()} value={tab.name}><Component curriculum={course.curriculum} /></TabsContent>
                                          }
                                      })
                                  }
                              </div>
                          </>
                      }
                      
                  </Tabs>
              </div>
          </div>
          
          <div className='max-w-sm w-full sticky top-[100px] h-full'>
              <Typography as="h2" className='mb-3'>Course Info</Typography>
              <CourseInfoSidebar course={course} />
          </div>
      </div>
  </section>
</>
}