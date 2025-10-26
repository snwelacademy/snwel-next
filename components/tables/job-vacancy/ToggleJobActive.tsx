'use client'
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { updateJobVacancy } from '@/services/admin/admin-jobVacancyService'
import { JobVacancyType } from '@/types/JobVacancyTypes'
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { usePermission } from '@/hooks/usePermissions';
import { JOB_PERMISSIONS } from '@/constants/permissions';
import { handlePermissionError } from '@/lib/permissionErrorHandler';

const ToggleJobActive = ({ data }: { data: JobVacancyType }) => {
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const searchParams = useSearchParams()
    const canPublishJob = usePermission(JOB_PERMISSIONS.JOB_PUBLISH);

    const { toast } = useToast();
    const onToggleActive = async (checked: boolean) => {
        if (!canPublishJob) {
            toast({ title: "Permission Denied", description: "You don't have permission to publish/unpublish job vacancies", variant: 'destructive' });
            return;
        }
        try {
            setLoading(true);
            await updateJobVacancy(data._id, { isActive: checked });
            await queryClient.invalidateQueries({ queryKey: ['/admin/job-vacancies', searchParams] });
            toast({ title: `Job vacancy ${data.isActive ? 'Deactivated' : 'Activated'} successfully!` });
        } catch (error: any) {
            handlePermissionError(error, 'Failed to update job vacancy');
            toast({ title: "Error: Update Job Vacancy", description: error.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }
    if (!canPublishJob) {
        return null;
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