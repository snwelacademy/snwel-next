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
import { deleteWebinar } from "@/services/admin/webinar-service";
import {  Webinar } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePermission } from "@/hooks/usePermissions";
import { WEBINAR_PERMISSIONS } from "@/constants/permissions";
import { handlePermissionError } from "@/lib/permissionErrorHandler";


interface CellActionProps {
  data: Webinar;
}

export const WebinarCellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const {toast} = useToast();
  
  const canUpdateWebinar = usePermission(WEBINAR_PERMISSIONS.WEBINAR_UPDATE);
  const canDeleteWebinar = usePermission(WEBINAR_PERMISSIONS.WEBINAR_DELETE);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await deleteWebinar(data._id);
      await queryClient.invalidateQueries({queryKey: ['/admin/webinar']})
      toast({title: "Webinar deleted successfully!"});
      setOpen(false)
    } catch (error: any) {
      handlePermissionError(error, 'Failed to delete webinar');
      toast({title: "Error: Deleting Webinar", description: error.message, variant: 'destructive'})
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

          {canUpdateWebinar && (
            <DropdownMenuItem
              onClick={() => router.push(`/admin/webinars/${data._id}`)}
            >
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
          )}
          {canDeleteWebinar && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
