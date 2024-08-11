'use client'

import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { nanoid } from 'nanoid';
import { changeCourseStatus } from '@/services/admin/admin-course-service';
import { COURSE_STATUS } from '@/types/Course';


interface StatusChangerProps {
    courseId: string;
    status?: string;
}



const CourseStatusChanger: React.FC<StatusChangerProps> = ({ courseId, status }) => {
    const [currentStatus, setCurrentStatus] = useState<string | undefined>(status);
    const [loading, setLoading] = useState(false)
    const { toast } = useToast();

    const updateStatus = async (newStatus: string) => {
        setLoading(true);
        try {
            await changeCourseStatus(courseId, newStatus);
            setCurrentStatus(newStatus);
            toast({
                title: "Success",
                description: "Status updated successfully.",
                variant: 'success'
            });
        } catch (error) {
            console.error('Error updating status:', error);
            toast({
                title: "Error",
                description: "Failed to update status. Please try again.",
                variant: "destructive",
            });
        } finally{
            setLoading(false)
        }
    };

    return (
        <Select onValueChange={updateStatus} value={currentStatus} disabled={loading}>
            <SelectTrigger className="max-w-full">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                {Object.values(COURSE_STATUS).map((status) => (
                    <SelectItem key={nanoid()} value={status}>
                        {status}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default CourseStatusChanger;