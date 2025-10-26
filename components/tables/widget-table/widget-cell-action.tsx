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
import { deleteWidgetById } from "@/services/admin/admin-widget-service";
import { Widget } from "@/types/WidgetTypes";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePermission } from "@/hooks/usePermissions";
import { WIDGET_PERMISSIONS } from "@/constants/permissions";
import { handlePermissionError } from "@/lib/permissionErrorHandler";


interface WidgetCellActionProps {
  data: Widget;
}

export const WidgetCellAction: React.FC<WidgetCellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  
  const canUpdateWidget = usePermission(WIDGET_PERMISSIONS.WIDGET_UPDATE);
  const canDeleteWidget = usePermission(WIDGET_PERMISSIONS.WIDGET_DELETE);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await deleteWidgetById(data?._id||'');
      await queryClient.invalidateQueries({ queryKey: ['/admin/widgets'] });
      toast({ title: "Widget deleted successfully!" });
      setOpen(false);
    } catch (error: any) {
      handlePermissionError(error, 'Failed to delete widget');
      toast({ title: "Error: Deleting Widget", description: error.message, variant: 'destructive' });
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
          {canUpdateWidget && (
            <DropdownMenuItem onClick={() => router.push(`/admin/widgets/${data._id}?type=${data.type}`)}>
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
          )}
          {canDeleteWidget && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
