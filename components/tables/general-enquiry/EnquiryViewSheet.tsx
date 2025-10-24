"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DynamicEnquiry, GeneralEnquiry } from "@/types/EnquiryTypes"
import { formatDate } from "@/lib/utils"

export default function EnquiryViewSheet({ data }: { data: DynamicEnquiry<GeneralEnquiry> }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">View</Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>General Enquiry</SheetTitle>
          <SheetDescription>View full enquiry details</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Applicant</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-muted-foreground">Full Name</div>
                <div className="font-medium">{data.fullName || '-'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Email</div>
                <div className="font-medium break-all">{data.email || '-'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Phone</div>
                <div className="font-medium">{data.phone || '-'}</div>
              </div>
              <div className="col-span-2">
                <div className="text-muted-foreground">Message</div>
                <div className="font-medium break-words">{data.message || data.extraInfo?.message || '-'}</div>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Metadata</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-muted-foreground">Type</div>
                <div className="font-medium">{data.type}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Unique</div>
                <div className="font-medium">{data.isUnique ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Created At</div>
                <div className="font-medium">{formatDate(data.createdAt)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Updated At</div>
                <div className="font-medium">{formatDate(data.updatedAt)}</div>
              </div>
              <div className="col-span-2">
                <div className="text-muted-foreground">ID</div>
                <div className="font-medium break-all">{data._id}</div>
              </div>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  )
}
