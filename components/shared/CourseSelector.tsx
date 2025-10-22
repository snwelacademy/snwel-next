'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { nanoid } from "nanoid";
import { useQuery } from '@tanstack/react-query'
import { getPublicCourses } from "@/services/public/course-service";

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
        queryFn:  () => getPublicCourses({filter})
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