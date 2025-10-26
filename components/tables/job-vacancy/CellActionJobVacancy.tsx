'use client'

import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { deleteJobVacancy, updateJobVacancy } from "@/services/admin/admin-jobVacancyService";
import { JobVacancyType } from "@/types/JobVacancyTypes";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePermission } from "@/hooks/usePermissions";
import { JOB_PERMISSIONS } from "@/constants/permissions";
import { handlePermissionError } from "@/lib/permissionErrorHandler";


interface CellActionProps {
  data: JobVacancyType;
}

export const CellActionJobVacancy: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  
  const canUpdateJob = usePermission(JOB_PERMISSIONS.JOB_UPDATE);
  const canDeleteJob = usePermission(JOB_PERMISSIONS.JOB_DELETE);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await deleteJobVacancy(data._id);
      await queryClient.invalidateQueries({ queryKey: ['/admin/job-vacancies'] });
      toast({ title: "Job vacancy deleted successfully!" });
      setOpen(false);
    } catch (error: any) {
      handlePermissionError(error, 'Failed to delete job vacancy');
      toast({ title: "Error: Deleting Job Vacancy", description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {canUpdateJob && (
            <DropdownMenuItem
              onClick={() => router.push(`/admin/job-vacancies/${data._id}`)}
            >
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
          )}
          {canDeleteJob && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
