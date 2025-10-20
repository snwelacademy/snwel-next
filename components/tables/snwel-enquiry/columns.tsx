import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatDate } from "@/lib/utils";
import { SnwelEnquiry } from "@/types/SnwelEnquiryTypes";
import { Badge } from "@/components/ui/badge";

export const SnwelEnquiryColumns: ColumnDef<SnwelEnquiry>[] = [
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
    header: "ENQUIRY ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original._id.substring(0, 8)}...</span>
    ),
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => row.original.name || '-',
  },
  {
    accessorKey: "businessEmail",
    header: "BUSINESS EMAIL",
    cell: ({ row }) => row.original.businessEmail || '-',
  },
  {
    accessorKey: "company",
    header: "COMPANY",
    cell: ({ row }) => row.original.company || '-',
  },
  {
    accessorKey: "enquiryType",
    header: "ENQUIRY TYPE",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.enquiryType || '-'}
      </Badge>
    ),
  },
  {
    accessorKey: "mobileNo",
    header: "MOBILE",
    cell: ({ row }) => row.original.mobileNo || '-',
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate block">
        {row.original.description || '-'}
      </span>
    ),
  },
  {
    accessorKey: "consentGiven",
    header: "CONSENT",
    cell: ({ row }) => (
      <Badge variant={row.original.consentGiven ? "default" : "destructive"}>
        {row.original.consentGiven ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "otpValidated",
    header: "OTP VERIFIED",
    cell: ({ row }) => (
      <Badge variant={row.original.otpValidated ? "default" : "destructive"}>
        {row.original.otpValidated ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
