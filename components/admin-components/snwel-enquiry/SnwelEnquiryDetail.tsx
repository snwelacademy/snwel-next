'use client'

import BreadCrumb from '@/components/BreadCrumb';
import ModernLoader from '@/components/ModernLoader';
import { Heading } from '@/components/ui/Heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSnwelEnquiry } from '@/services/admin/snwel-enquiry-service';
import { Separator } from '@radix-ui/react-separator';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@/lib/utils';
import { Building2, Mail, Phone, FileText, Calendar, CheckCircle2, XCircle } from 'lucide-react';

interface SnwelEnquiryDetailProps {
  enquiryId: string;
}

const SnwelEnquiryDetail = ({ enquiryId }: SnwelEnquiryDetailProps) => {
  const breadcrumbItems = [
    { title: "Snwel Enquiries", link: "/admin/snwel-enquiry" },
    { title: "Details", link: `/admin/snwel-enquiry/${enquiryId}` }
  ];

  const { data: enquiry, isLoading } = useQuery({
    queryKey: ['/admin/snwel-enquiry', enquiryId],
    queryFn: () => getSnwelEnquiry(enquiryId),
    enabled: !!enquiryId
  });

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <ModernLoader variant="default" />
      </div>
    );
  }

  if (!enquiry) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <p>Enquiry not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title="Enquiry Details"
          description={`View details for enquiry #${enquiry._id}`}
        />
      </div>
      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Customer details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-muted-foreground">{enquiry.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Company</p>
                <p className="text-sm text-muted-foreground">{enquiry.company}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Business Email</p>
                <p className="text-sm text-muted-foreground">{enquiry.businessEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Mobile Number</p>
                <p className="text-sm text-muted-foreground">{enquiry.mobileNo}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enquiry Information</CardTitle>
            <CardDescription>Enquiry type and details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Enquiry Type</p>
                <Badge variant="outline" className="mt-1 capitalize">
                  {enquiry.enquiryType}
                </Badge>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm text-muted-foreground mt-1">{enquiry.description}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              {enquiry.consentGiven ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-medium">Consent Given</p>
                <Badge variant={enquiry.consentGiven ? "default" : "destructive"} className="mt-1">
                  {enquiry.consentGiven ? "Yes" : "No"}
                </Badge>
              </div>
            </div>

            <div className="flex items-start gap-3">
              {enquiry.otpValidated ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-medium">OTP Validated</p>
                <Badge variant={enquiry.otpValidated ? "default" : "destructive"} className="mt-1">
                  {enquiry.otpValidated ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>Creation and update information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Created At</p>
                  <p className="text-sm text-muted-foreground">{formatDate(enquiry.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">{formatDate(enquiry.updatedAt)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SnwelEnquiryDetail;
