'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatDate } from "@/lib/utils";
import { CourseEnrollment } from "@/types/CourseEnrollment";
import EnrollmentStausChanger from "./statusChanger";

export const columns: ColumnDef<CourseEnrollment>[] = [
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
    accessorKey: "userId.name",
    header: "NAME",
    cell: ({ row }) => row.original.userId.name
  },
  {
    accessorKey: "courseId",
    header: "COURSE",
    cell: ({ row }) => row.original.courseId.title
  },
  {
    accessorKey: "userId.email",
    header: "EMAIL",
    cell: ({ row }) => row.original.userId.email
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => <EnrollmentStausChanger statusType="ENROLLMENT_STATUS" value={row.original.status} selfMode={{id: row.original._id}} />
  },
  {
    accessorKey: "paymentStatus",
    header: "PAYMENT STATUS",
    cell: ({ row }) => <EnrollmentStausChanger statusType="PAYMENT_STATUS" value={row.original.paymentStatus} selfMode={{id: row.original._id}} />
  },
  {
    accessorKey: "paymentMethod",
    header: "PAYMENT METHOD",
    cell: ({row}) => row.original.paymentMethod || '-'
  },
  {
    accessorKey: "otp.verified",
    header: "OTP VERIFIED",
    // cell: ({row}) => row.original. || '-'
  },
  // {
  //   accessorKey: "expiredAt",
  //   header: "EXPIRE AT",
  //   cell: ({ row }) => formatDate(row.original.expiredAt)
  // },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: ({ row }) => formatDate(row.original.createdAt)
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
