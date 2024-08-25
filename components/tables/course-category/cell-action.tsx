'use client'

import MutateCategoryDrawer from "@/components/course-category/MutateCategoryDrawer";
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
import { deleteCourseCategory } from "@/services/admin/course-category-service";
import { CourseCategory } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";

interface CellActionProps {
  data: CourseCategory;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const onConfirm = async () => {
    try {
      setLoading(true);
      await deleteCourseCategory(data._id);
      await queryClient.invalidateQueries({ queryKey: ['/admin/course-category'] })
      toast({ title: "Course category deleted successfully!" });
      setOpen(false)
    } catch (error: any) {
      toast({ title: "Error: Deleting Course category", description: error.message })
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

      <MutateCategoryDrawer categoryData={{ ...data, parentCategory: data.parentCategory?._id }} trigger={<Button size={'sm'}>
        <Edit className="mr-2 h-4 w-4" />
      </Button>} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
