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
import { deleteEnquiry } from "@/services/admin/admin-enquiry-service";
import { GeneralEnquiry, DynamicEnquiry } from "@/types/EnquiryTypes";
import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import EnquiryViewSheet from "./EnquiryViewSheet";
import { usePermission } from "@/hooks/usePermissions";
import { ENQUIRY_PERMISSIONS } from "@/constants/permissions";
import { handlePermissionError } from "@/lib/permissionErrorHandler";

interface CellActionProps {
  data: DynamicEnquiry<GeneralEnquiry>;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {toast} = useToast();
  const canDeleteEnquiry = usePermission(ENQUIRY_PERMISSIONS.ENQUIRY_DELETE);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await deleteEnquiry(data._id);
      await queryClient.invalidateQueries({ queryKey: ['/admin/enquiry'] });
      toast({ title: "Inquiry deleted successfully!" });
      setOpen(false);
    } catch (error: any) {
      handlePermissionError(error, 'Failed to delete enquiry');
      toast({ title: "Error: Deleting Inquiry", description: error.message, variant: 'destructive' });
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
      <div className="flex items-center gap-2">
        <EnquiryViewSheet data={data} />
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {canDeleteEnquiry && (
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
