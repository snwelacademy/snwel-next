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
import { Badge } from "@/components/ui/badge"
import RenderWidget from "@/components/widget/RenderWidget"
import { PrebuiltComponent } from "@/data/prebuiltComponents"
import { formatToLocalCurrency } from "@/lib/utils"
import { getPublicCourseBySlug } from "@/services/public/course-service"
import { useQuery } from "@tanstack/react-query"
import { Book, Dot, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { nanoid } from "nanoid"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { useRef } from "react"

export default function Page({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams()
  const { data: course, isLoading } = useQuery({
    queryKey: ["public/course", params.slug],
    queryFn: () => getPublicCourseBySlug(params.slug || "")
  })
  const tabsScrollRef = useRef<HTMLDivElement>(null)
  const scrollTabs = (dx: number) => tabsScrollRef.current?.scrollBy({ left: dx, behavior: 'smooth' })
  if (isLoading) {
    return <PageLoader />
  }
  if (!course) {
    return <PageHeader title='No Course Found!' />
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Hero Section */}
      <header className="relative h-[60vh] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        
        {/* Widget Overlay */}
        {course?.widget && (
          <div className="absolute top-4 right-4 z-20">
            <RenderWidget code={course.widget}/>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-orange-500 hover:bg-orange-600">Course</Badge>
                {course.isPremium && (
                  <Badge className="bg-purple-600 hover:bg-purple-700">Premium</Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{course.title}</h1>
              <p className="text-lg text-gray-200 max-w-3xl mb-4">{course.shortDescription}</p>
              
              <div className="flex items-center gap-6 text-gray-200">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.courseDuration} {course.content?.durationUnit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  <span>{course.curriculum.length} Lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(course.rating) ? "text-yellow-400" : "text-gray-400"}`}
                      fill={i < Math.round(course.rating) ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="ml-1">{Number(course.rating || 0).toFixed(1)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 -mt-20 relative z-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Course Tabs */}
            <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
              <Tabs defaultValue={searchParams.get('tab') || course.content?.tabs[0].name} className="w-full">
                {course.content && course.content.tabs.length && (
                  <>
                    <div className="relative mb-6">
                      <button
                        type="button"
                        aria-label="Scroll tabs left"
                        onClick={() => scrollTabs(-200)}
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 items-center justify-center h-8 w-8 rounded-full bg-white shadow border border-gray-200 hover:bg-gray-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <div
                        ref={tabsScrollRef}
                        className="overflow-x-auto overflow-y-hidden no-scrollbar"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      >
                        <TabsList className='inline-flex w-max whitespace-nowrap gap-2 px-8'>
                          {course.content.tabs.filter(tb => tb.isActive).map(tab => (
                            <TabsTrigger key={nanoid()} value={tab.name} className='shrink-0'>
                              <Book className='w-4 h-4 mr-2' />
                              <span>{tab.name}</span>
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </div>
                      <button
                        type="button"
                        aria-label="Scroll tabs right"
                        onClick={() => scrollTabs(200)}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 items-center justify-center h-8 w-8 rounded-full bg-white shadow border border-gray-200 hover:bg-gray-50"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent" />
                      <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent" />
                    </div>
                    <div>
                      {course.content.tabs.filter(tb => tb.isActive).map((tab, index) => {
                        if(tab.contentType === 'RICH_TEXT'){
                          return (
                            <TabsContent key={nanoid()} value={tab.name} defaultChecked={Boolean(index===0)}>
                              <CourseDescription desc={tab.content} />
                            </TabsContent>
                          )
                        } else if(tab.contentType === 'COMPONENT' && tab.content === 'courseCurricullum'){
                          const Component = PrebuiltComponent[tab.content].component;
                          return (
                            <TabsContent key={nanoid()} value={tab.name}>
                              <Component curriculum={course.curriculum} />
                            </TabsContent>
                          )
                        }
                      })}
                    </div>
                  </>
                )}
              </Tabs>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="rounded-2xl bg-gradient-to-br from-white-500 to-gray-700 p-8 shadow-xl text-gray-900 sticky top-24">
              <h2 className="mb-6 text-2xl font-bold">Course Details</h2>
              
              {/* Course Info */}
              <div className="space-y-4 mb-8">
                <CourseInfoSidebar course={course} variant="colored" />
              </div>

              {/* Price and Enroll */}
              <div className="pt-6 border-t border-white/20">
                {course.content?.showPrice && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-900">Price</p>
                    <p className="text-3xl font-bold font-mono">{formatToLocalCurrency(course.price)}</p>
                  </div>
                )}
                <EnrollCourseModal 
                  targetCourse={course} 
                  trigger={
                    <Button 
                      size="lg" 
                      className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold text-lg py-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      Enroll Now
                    </Button>
                  } 
                  courseId={course._id} 
                  widget={course.widget} 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}