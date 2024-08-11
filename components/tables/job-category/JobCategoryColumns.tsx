'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellActionJobCategory } from "./CellActionJobCategory";
import { JobCategoryType } from "@/types/JobCategory";

export const JobCategoryColumns: ColumnDef<JobCategoryType>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name || '-',
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description || '-',
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionJobCategory data={row.original} />,
  },
];
