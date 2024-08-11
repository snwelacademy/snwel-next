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
import { deleteEnquiry } from "@/services/admin/admin-enquiry-service"; // Replace with your actual service
import { GeneralEnquiry, DynamicEnquiry } from "@/types/EnquiryTypes"; // Replace with your actual type
import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

interface CellActionProps {
  data: DynamicEnquiry<GeneralEnquiry>;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
//   const navigate = useNavigate();
  const {toast} = useToast();

  const onConfirm = async () => {
    try {
      setLoading(true);
      await deleteEnquiry(data._id); // Adjust to your delete function
      await queryClient.invalidateQueries({ queryKey: ['/admin/enquiry'] }); // Adjust query key as necessary
      toast({ title: "Inquiry deleted successfully!" });
      setOpen(false);
    } catch (error: any) {
      toast({ title: "Error: Deleting Inquiry", description: error.message });
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

          {/* <DropdownMenuItem
            onClick={() => navigate(`/admin/inquiry/${data._id}`)} // Adjust path as necessary
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
