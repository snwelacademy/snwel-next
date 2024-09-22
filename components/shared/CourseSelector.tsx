'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getListOptionsFromSearchParams } from "@/lib/utils";
import { getAllCourses } from "@/services/admin/admin-course-service";
import { nanoid } from "nanoid";
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from "next/navigation";

const CourseSelector = ({
    value,
    onChange,
    filter
}: {
    onChange?: (value?: string) => void,
    value?: string,
    filter?: {
        qualifications?: string,
        trainingModes?: string
    }
}) => {
    const {data} = useQuery({
        queryKey: ['client/courses', filter],
        queryFn:  () => getAllCourses({filter})
    })
    return (
        <Select onValueChange={onChange} defaultValue={value}>
            
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Courses" />
            </SelectTrigger>
            <SelectContent>
                {
                    data?.docs.map(cs => {
                        return  <SelectItem key={nanoid()} value={cs._id}>{cs.title}</SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    )
}

export default CourseSelector