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
import { deleteCourse } from "@/services/admin/admin-course-service";
import { Course } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePermission } from "@/hooks/usePermissions";
import { COURSE_PERMISSIONS } from "@/constants/permissions";
import { handlePermissionError } from "@/lib/permissionErrorHandler";

interface CellActionProps {
  data: Course;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const {toast} = useToast();
  
  const canUpdate = usePermission(COURSE_PERMISSIONS.COURSE_UPDATE);
  const canDelete = usePermission(COURSE_PERMISSIONS.COURSE_DELETE);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await deleteCourse(data._id);
      await queryClient.invalidateQueries({queryKey: ['/admin/course']})
      toast({title: "Course deleted successfully!"});
      setOpen(false)
    } catch (error: any) {
      handlePermissionError(error, "Failed to delete course");
      toast({title: "Error: Deleting Course", description: error.message})
    }finally{
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

          {canUpdate && (
            <DropdownMenuItem
              onClick={() => router.push(`/admin/courses/${data._id}`)}
            >
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
          )}
          {canDelete && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          )}
          {!canUpdate && !canDelete && (
            <DropdownMenuItem disabled>
              No actions available
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
