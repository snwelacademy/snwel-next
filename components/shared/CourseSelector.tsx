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
import { Course } from "@/types";

const CourseSelector = ({
    value,
    onChange,
    filter,
    onCourseSelect
}: {
    onChange?: (value?: string) => void,
    value?: string,
    filter?: {
        qualifications?: string,
        trainingModes?: string
    },
    onCourseSelect?: (course: Course) => void
}) => {
    const {data} = useQuery({
        queryKey: ['client/courses', filter],
        queryFn:  () => getPublicCourses({filter})
    })
    const handleChange = (val: string) => {
        onChange?.(val)
        const found = data?.docs.find(c => c._id === val)
        if(found && onCourseSelect){
            onCourseSelect(found)
        }
    }
    return (
        <Select onValueChange={handleChange} defaultValue={value}>
            
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