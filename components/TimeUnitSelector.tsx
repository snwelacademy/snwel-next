import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { nanoid } from "nanoid"

const units: { label: string, value: string }[] = [
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Days", value: "days" },
    { label: "Hours", value: "hours" },
    { label: "Minute", value: "minute" },
    { label: "Seconds", value: "seconds" },

]

const TimeUnitSelector = ({value, onChange}: {value?: string, onChange?: (value?: string) => void}) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="">
                <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
                {
                    units.map(un => {
                        return <SelectItem key={nanoid()} value={un.value}>{un.label}</SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    )
}

export default TimeUnitSelector
