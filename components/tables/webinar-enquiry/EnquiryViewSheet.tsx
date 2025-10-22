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
import { DynamicEnquiry, WebinarEnquiry } from "@/types/EnquiryTypes"
import { formatDate } from "@/lib/utils"

export default function EnquiryViewSheet({ data }: { data: DynamicEnquiry<WebinarEnquiry> }) {
  const statusLabel = data.extraInfo?.presentStatus === 'JOB_SEEKER' ? 'Job Seeker'
    : data.extraInfo?.presentStatus === 'STUDENT' ? 'Student'
    : data.extraInfo?.presentStatus === 'WORKING_PROFESSIONAL' ? 'Working Professional'
    : data.extraInfo?.presentStatus || '-'

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">View</Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Webinar Enquiry</SheetTitle>
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
              <div>
                <div className="text-muted-foreground">Message</div>
                <div className="font-medium break-words">{data.message || '-'}</div>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Webinar</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-muted-foreground">Title</div>
                <div className="font-medium">{data.extraInfo?.webinar?.title || '-'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Date</div>
                <div className="font-medium">{formatDate(data.extraInfo?.webinar?.startDate || '')}</div>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Registration</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-muted-foreground">Qualification</div>
                <div className="font-medium break-words">{data.extraInfo?.qualification || '-'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Present Status</div>
                <div className="font-medium">{statusLabel}</div>
              </div>
              <div className="col-span-2">
                <div className="text-muted-foreground">Address (Full)</div>
                <div className="font-medium break-words">{data.extraInfo?.addressFull || data.extraInfo?.location?.address || '-'}</div>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Location</h3>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-muted-foreground">Country</div>
                <div className="font-medium">{data.extraInfo?.location?.country || '-'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">State</div>
                <div className="font-medium">{data.extraInfo?.location?.state || '-'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">City</div>
                <div className="font-medium">{data.extraInfo?.location?.city || '-'}</div>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Metadata</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
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
