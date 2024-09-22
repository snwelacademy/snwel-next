'use client'
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { updateJobVacancy } from '@/services/admin/admin-jobVacancyService'
import { JobVacancyType } from '@/types/JobVacancyTypes'
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

const ToggleJobActive = ({ data }: { data: JobVacancyType }) => {
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const searchParams = useSearchParams()

    const { toast } = useToast();
    const onToggleActive = async (checked: boolean) => {
        try {
            setLoading(true);
            await updateJobVacancy(data._id, { isActive: checked }); // Adjust to your delete function
            await queryClient.invalidateQueries({ queryKey: ['/admin/job-vacancies', searchParams] }); // Adjust query key as necessary
            toast({ title: `Job vacancy ${data.isActive ? 'Deactivated' : 'Activated'} successfully!` });
        } catch (error: any) {
            toast({ title: "Error: Update Job Vacancy", description: error.message });
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex items-center space-x-2">
            <Switch 
            checked={data.isActive}
            onCheckedChange={onToggleActive}
            disabled={loading}
             />
            <Label htmlFor="airplane-mode">{data.isActive ? "Deactivate" : "Activate"}</Label>
        </div>
    )
}

export default ToggleJobActive