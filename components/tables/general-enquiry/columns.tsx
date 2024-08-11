
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatDate } from "@/lib/utils";
import { GeneralEnquiry, DynamicEnquiry } from "@/types/EnquiryTypes";

export const GeneralEnquiryColumn: ColumnDef<DynamicEnquiry<GeneralEnquiry>>[] = [
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
    accessorKey: "_id",
    header: "INQUIRY ID",
    cell: ({ row }) => row.original._id || '-',
  },
  {
    accessorKey: "fullName",
    header: "CUSTOMER NAME",
    cell: ({ row }) => row.original.fullName || '-',
  },
  {
    accessorKey: "email",
    header: "CUSTOMER EMAIL",
    cell: ({ row }) => row.original.email || '-',
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: "updatedAt",
    header: "UPDATED AT",
    cell: ({ row }) => formatDate(row.original.updatedAt),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
