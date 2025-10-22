'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { nanoid } from "nanoid";
import CourseCard from "./CourseCard";
import { useQuery } from "@tanstack/react-query";
import { getPublicCourses } from "@/services/public/course-service";
import Loader from "../Loader";
import { getPublicCourseCategories } from "@/services/public/course-category-service";
import Typography from "../typography";


const CourseListByCategory = ({ ctg }: { ctg: string }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['public/courses', { category: ctg }],
        queryFn: () => {
            return getPublicCourses({ filter: { category: ctg } })
        }
    })

    return (
        <>
            {
                isLoading ? 
                <Loader type="default" />:
                data?.docs && data?.docs?.length > 0 ? 
                data?.docs.map(cs => {
                    return <div key={nanoid()} className="w-full">
                        <CourseCard key={nanoid()} course={cs} />
                    </div>
                })
                : (
                    <div className="flex items-center justify-center py-28">
                <Typography as="title">No Course Found!</Typography>
            </div>
                )
            }
        </>
    )
}


const CourseTabByCategory = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['public/course-category'],
        queryFn: () => getPublicCourseCategories()
    })

    if(isLoading){
        return <Loader type="default"/>
    }
    return (
        <Tabs defaultValue={data ? data?.docs[0].slug : ''} className="">
            <TabsList className="w-full justify-start overflow-x-auto">
                {
                    data?.docs?.map(ct => {
                        return <TabsTrigger key={ct.slug} value={ct.slug}>{ct.title}</TabsTrigger>
                    })
                }
            </TabsList>
            {
                data?.docs && data?.docs?.length > 0 ? 
                data?.docs.map(ct => {
                    return <TabsContent key={nanoid()} value={ct.slug}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 justify-items-center">
                            <CourseListByCategory ctg={ct.slug} />
                        </div>
                    </TabsContent>
                })
                :  <div className="flex items-center justify-center py-28">
                    <Typography as="title">No Course Found!</Typography>
                </div>
            }
            {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent> */}
        </Tabs>
    )
}

export default CourseTabByCategory