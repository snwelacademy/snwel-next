
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Course } from "@/types";
import { getCurrencySymbol } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";
import CourseStatusChanger from "@/components/courses/CourseStatusChanger";

export const columns: ColumnDef<Course>[] = [
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
    header: "NAME",
  },
  {
    accessorKey: "enrolled",
    header: "ENROLLED",
  },
  {
    accessorKey: "rating",
    header: "RATING",
    cell: ({row}) => <span className="inline-flex items-center space-x-1"><span>{row.original.rating}</span><StarFilledIcon className="text-orange-600 w-4 h-4"/></span>
  },
  {
    accessorKey: "isPopular",
    header: "Popular"
  },
  {
    accessorKey: "isPremium",
    header: "Premium"
  },
  {
    accessorKey: "courseDuration",
    header: "DURATION",
  },
  {
    accessorKey: "price",
    header: "PRICE",
    cell: ({row}) => {
        return `${getCurrencySymbol(row.original?.currency||'INR')}${row.original?.price}`
    }
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({row}) => {
        return <CourseStatusChanger courseId={row.original._id} status={row.original.status} />
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
