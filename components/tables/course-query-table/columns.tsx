'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { cn, formatDate } from "@/lib/utils";
import { CourseEnrollment } from "@/types/CourseEnrollment";
import EnrollmentStausChanger from "./statusChanger";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { Widget, WidgetType } from "@/types/WidgetTypes";
import Link from "next/link";


const isEnrolledDuringOffer = (
  enrollmentDate: string | Date, 
  offerStartDate: string | Date, 
  offerEndDate: string | Date
): boolean => {
  const enrollment = dayjs(enrollmentDate);  // Parse the enrollment date
  const offerStart = dayjs(offerStartDate);  // Parse the offer start date
  const offerEnd = dayjs(offerEndDate);  // Parse the offer end date

  // Check if the enrollment date is between the offer start and end dates
  return enrollment.isAfter(offerStart) && enrollment.isBefore(offerEnd);
};

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
    cell: ({ row }) => <Badge variant={'outline'}>{row.original.status}</Badge>
  },
  {
    accessorKey: "paymentStatus",
    header: "PAYMENT STATUS",
    cell: ({ row }) => <EnrollmentStausChanger statusType="PAYMENT_STATUS" value={row.original.paymentStatus} selfMode={{id: row.original._id}} />
  },
  {
    accessorKey: "widget",
    header: "Offer Widget",
    cell: ({row}) => {
      const widget: any = row.original?.widget;
      if(!widget || widget.type !== 'cdtWidget'){
        return  <p>-</p>
      }
      const inOff = isEnrolledDuringOffer(row.original.createdAt, widget.content?.startTime, widget.content?.endTime);
      return <div className="flex flex-col gap-1">
        <Badge className={cn(['inline-block',{'bg-green-700 text-white': inOff, "bg-red-700 text-white": !inOff}])}>{inOff ? 'In Offer': 'Not In Offer'}</Badge>
        <Link href={`/admin/widgets/${widget._id}?type=cdtWidget`}>{widget.title}</Link>
        {/* <p>{widget.title}</p> */}
      </div>
    }
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
