'use client'

import BreadCrumb from '@/components/BreadCrumb';
import Loader from '@/components/Loader';
import MutateCourse from '@/components/courses/MutateCourse';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { getCourse } from '@/services/admin/admin-course-service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import ModernBlogCreator from './MutateBlog';
import { getBlog } from '@/services/admin/admin-blog-service';



const MutateBlogPage = () => {
    const params = useParams();
    const { data, isLoading } = useQuery({
        queryKey: [`blog`, params.id],
        queryFn: () => getBlog(params.id as string)
    });
    const breadcrumbItems = [{ title: "Courses", link: "/admin/blog/update" }];

    return (
        <div className="">
           

            {
                isLoading ? <Loader type={'default'} /> : !data ? <div>Invalid Blog id</div> : <ModernBlogCreator blogData={data} />
            }
        </div>
    )
}

export default MutateBlogPage