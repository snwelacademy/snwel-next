import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getPublicCourseCategories } from "@/services/public/course-category-service";
import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";

const CourseCategorySelector = ({
    value,
    onChange
}: {
    onChange?: (value?: string) => void,
    value?: string
}) => {
    const { data: categories } = useQuery({
        queryKey: ['public/course-category'],
        queryFn: () => getPublicCourseCategories()
      });
    return (
        <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Courses"/>
            </SelectTrigger>
            <SelectContent>
                {
                    categories?.docs.map(cs => {
                        return  <SelectItem key={nanoid()} className="cursor-pointer" value={cs.slug}>{cs.title}</SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    )
}

export default CourseCategorySelector