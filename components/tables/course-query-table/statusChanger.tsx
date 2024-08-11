'use client'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { updateEnrollment } from '@/services/admin/course-enrollment'


const EnrollmentStausChanger = ({
    value,
    onChange,
    selfMode,
    statusType = "ENROLLMENT_STATUS"
}: {
    value?: string,
    onChange?: (value: string) => void,
    selfMode?: {
        id: string
    },
    statusType: 'ENROLLMENT_STATUS' | "PAYMENT_STATUS"
}) => {
    const [status, setStatus] = useState(value)
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast()

    const handleOnChange = async (value: string) => {
        if (!selfMode) {
            onChange?.(value);
            return;
        }
        const res = await updateStatus(selfMode.id, value as any);
        if (res) {
            onChange?.(res);
            setStatus(res);
        }
    }

    const updateStatus = async (id: string, status: "ACTIVE" | "PENDING" | "DECLINED" | 'PAID' | 'PENDING' | 'FAILED') => {
        try {
            setLoading(true)
            const data = statusType === 'ENROLLMENT_STATUS' ? {status} : {paymentStatus: status}
            const res = await updateEnrollment(id, data);
            return statusType === 'ENROLLMENT_STATUS'? res.status : res.paymentStatus;
        } catch (error: any) {
            toast({ title: `Error: ${error.message}` });
        } finally {
            setLoading(false);
        }
    }


    return (
        <span className='inline-flex items-center justify-center'>
            {/* <Switch
                checked={value}
                onCheckedChange={handleOnChange}
                disabled={loading}
            /> */}
            <Select onValueChange={handleOnChange} value={status} defaultValue={value} disabled={loading}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        {
                            statusType === 'ENROLLMENT_STATUS' ?
                                <>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="DECLINED">Declined</SelectItem>
                                </>
                                : <>
                                    <SelectItem value="PAID">Paid</SelectItem>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="FAILED">Failed</SelectItem>
                                </>
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </span>
    )
}

export default EnrollmentStausChanger