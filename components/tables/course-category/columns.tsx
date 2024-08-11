
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CourseCategory } from "@/types";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<CourseCategory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Name",
  },
  {
    accessorKey: "shortDescription",
    header: "Short Description",
  },
  {
    accessorKey: "isPremium",
    header: "Premium",
    cell: ({ row }) => (row.original.isPremium ? "Yes" : "No"),
  },
  {
    accessorKey: "parentCategory",
    header: "Parent Category",
    cell: ({ row }) => (row.original.parentCategory ? row.original.parentCategory.title : "-"),
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "courseCount",
    header: "Courses",
  },

  
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
