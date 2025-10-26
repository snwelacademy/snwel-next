'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { CourseEnrollment } from "@/types/CourseEnrollment";
import EnrollmentStausChanger from "./statusChanger";
import dayjs from "dayjs";
import Link from "next/link";
import { CellAction } from "./cell-action";

const isEnrolledDuringOffer = (
  enrollmentDate: string | Date, 
  offerStartDate: string | Date, 
  offerEndDate: string | Date
): boolean => {
  const enrollment = dayjs(enrollmentDate);
  const offerStart = dayjs(offerStartDate);
  const offerEnd = dayjs(offerEndDate);
  return enrollment.isAfter(offerStart) && enrollment.isBefore(offerEnd);
};

export const columns = [
  {
    key: "select",
    label: "",
    render: (row: CourseEnrollment) => (
      <Checkbox
        checked={false} // You'll need to handle selection state
        onCheckedChange={() => {}} // Handle selection change
        aria-label="Select row"
      />
    )
  },
  {
    key: "userId.name",
    label: "NAME",
    sortable: true,
    render: (row: CourseEnrollment) => row.userId.name
  },
  {
    key: "courseId",
    label: "COURSE",
    sortable: true,
    render: (row: CourseEnrollment) => row.courseId?.title || '-'
  },
  {
    key: "userId.email",
    label: "EMAIL",
    sortable: true,
    render: (row: CourseEnrollment) => row.userId.email
  },
  {
    key: "status",
    label: "STATUS",
    sortable: true,
    filterable: true,
    filterOptions: [
      { label: "Pending", value: "pending" },
      { label: "Active", value: "active" },
      { label: "Completed", value: "completed" }
    ],
    render: (row: CourseEnrollment) => (
      <Badge variant="outline">{row.status}</Badge>
    )
  },
  {
    key: "paymentStatus",
    label: "PAYMENT STATUS",
    sortable: true,
    filterable: true,
    filterOptions: [
      { label: "Paid", value: "paid" },
      { label: "Unpaid", value: "unpaid" },
      { label: "Pending", value: "pending" }
    ],
    render: (row: CourseEnrollment) => (
      <EnrollmentStausChanger 
        statusType="PAYMENT_STATUS" 
        value={row.paymentStatus} 
        selfMode={{id: row._id}} 
      />
    )
  },
  {
    key: "widget",
    label: "Offer Widget",
    render: (row: CourseEnrollment) => {
      const widget: any = row.widget;
      if(!widget || widget.type !== 'cdtWidget') {
        return <p>-</p>
      }
      const inOff = isEnrolledDuringOffer(
        row.createdAt, 
        widget.content?.startTime, 
        widget.content?.endTime
      );
      return (
        <div className="flex flex-col gap-1">
          <Badge className={cn(['inline-block',{
            'bg-green-700 text-white': inOff, 
            "bg-red-700 text-white": !inOff
          }])}>
            {inOff ? 'In Offer': 'Not In Offer'}
          </Badge>
          <Link href={`/admin/widgets/${widget._id}?type=cdtWidget`}>
            {widget.title}
          </Link>
        </div>
      )
    }
  },
  {
    key: "otp.verified",
    label: "OTP VERIFIED",
    sortable: true,
    render: (row: CourseEnrollment) => row.otp?.verified || '-'
  },
  {
    key: "createdAt",
    label: "CREATED AT",
    sortable: true,
    render: (row: CourseEnrollment) => formatDate(row.createdAt)
  },
  {
    key: "actions",
    label: "",
    render: (row: CourseEnrollment) => <CellAction data={row} />
  }
];
