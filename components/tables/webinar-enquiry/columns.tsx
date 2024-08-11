/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatDate } from "@/lib/utils";
import {  DynamicEnquiry, WebinarEnquiry } from "@/types/EnquiryTypes";

export const WebinarEnquiryColumn: ColumnDef<DynamicEnquiry<WebinarEnquiry>>[] = [
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
    accessorKey: "fullName",
    header: "FULL NAME",
    cell: ({ row }) => row.original.fullName || '-',
  },
  {
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => row.original.email || '-',
  },
  {
    accessorKey: "phone",
    header: "PHONE",
    cell: ({ row }) => row.original.phone || '-',
  },
  {
    accessorKey: "extraInfo.webinar.title",
    header: "WEBINAR TITLE",
    cell: ({ row }) => row.original.extraInfo.webinar?.title || '-',
  },
  {
    accessorKey: "extraInfo.webinar.startDate",
    header: "WEBINAR DATE",
    cell: ({ row }) => formatDate(row.original.extraInfo.webinar?.startDate||''),
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
