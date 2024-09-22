'use client'
import { getAllCourseCategories } from '@/services/admin/course-category-service';
import { useQuery } from '@tanstack/react-query'
import { MultiSelect } from "react-multi-select-component";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { nanoid } from 'nanoid';

const CategorySelectorFormElement = ({
    value = [],
    onChange,
    singleMode
}: {
    value: string[]|string,
    onChange?: (value: string[]|string) => void,
    singleMode?: boolean
}) => {
    const { data, isLoading } = useQuery({
        queryKey: ['admin/course-category'],
        queryFn: () => getAllCourseCategories()
    })

    const onChangeHandler = (val: { lable: string, value: string }[]) => {
        onChange?.(val.map(v => v.value));
    }

    const onSingleChangeHandler = (value: string) => {
        onChange?.(value)
    }

    return (
        <>
        {
            singleMode ?

            <Select onValueChange={onSingleChangeHandler} value={value as string}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    {
                        data?.docs.map(d => {
                            return  <SelectItem key={nanoid()} value={d._id}>{d.title}</SelectItem>
                        })
                    }
                </SelectContent>
            </Select>

            :
            
            <MultiSelect
                options={data && data?.docs.length > 0 ? data.docs.map(d => ({ label: d.title, value: d._id })) : []}
                value={(data && data?.docs.length > 0) ? data.docs.filter(d => value.includes(d._id)).map(d => ({ label: d.title, value: d._id })) : []}
                onChange={onChangeHandler}
                labelledBy="Select Catgeory"
                isLoading={isLoading}
            />
        }

            
        </>
    )
}

export default CategorySelectorFormElement