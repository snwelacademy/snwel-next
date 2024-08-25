
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellActionJobVacancy } from "./CellActionJobVacancy";
import { formatDate } from "@/lib/utils";
import { JobVacancyType } from "@/types/JobVacancyTypes";

export const JobVacancyColumns: ColumnDef<JobVacancyType>[] = [
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
    header: "Title",
    cell: ({ row }) => row.original.title || '-',
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
    cell: ({ row }) => row.original.companyName || '-',
  },
  {
    accessorKey: "location.city",
    header: "City",
    cell: ({ row }) => row.original.location?.city || '-',
  },
  {
    accessorKey: "employmentType",
    header: "Employment Type",
    cell: ({ row }) => row.original.employmentType || '-',
  },
  {
    accessorKey: "applicationDeadline",
    header: "Application Deadline",
    cell: ({ row }) => formatDate(row.original.applicationDeadline),
  },
  {
    accessorKey: "postedDate",
    header: "Posted Date",
    cell: ({ row }) => formatDate(row.original.postedDate||''),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionJobVacancy data={row.original} />,
  },
];
