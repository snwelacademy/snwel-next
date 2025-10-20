'use client'

import BreadCrumb from '@/components/BreadCrumb';
import Loader from '@/components/Loader';
import { DataTable } from '@/components/shared/DataTable';
import { SnwelEnquiryColumns } from '@/components/tables/snwel-enquiry/columns';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { getListOptionsFromSearchParams, getTotalPages } from '@/lib/utils';
import { exportSnwelEnquiries, getAllSnwelEnquiries } from '@/services/admin/snwel-enquiry-service';
import { Separator } from '@radix-ui/react-separator';
import { useQuery } from '@tanstack/react-query';
import { Download } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const breadcrumbItems = [{ title: "Snwel Enquiries", link: "/admin/snwel-enquiry" }];

const SnwelEnquiryPage = () => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  
  const { data, isLoading } = useQuery({
    queryKey: ['/admin/snwel-enquiry', searchParams.toString()],
    queryFn: () => getAllSnwelEnquiries(getListOptionsFromSearchParams(searchParams))
  });

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const currentPage = Number(searchParams.get('page')) || 1;
      const currentLimit = Number(searchParams.get('limit')) || 10;
      await exportSnwelEnquiries({ page: currentPage, limit: currentLimit });
      toast({ title: "Export successful!", description: "CSV file has been downloaded." });
    } catch (error: any) {
      toast({ title: "Export failed", description: error.message, variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Snwel Enquiries (${data?.total || 0})`}
          description="Manage All Snwel Business Enquiries"
        />

        <Button
          onClick={handleExport}
          disabled={isExporting || isLoading}
          variant="outline"
        >
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Exporting..." : "Export CSV"}
        </Button>
      </div>
      <Separator />

      {isLoading ? 
        <Loader type="default" /> :
        <DataTable
          searchKey="name"
          pageNo={data?.currentPage || 1}
          columns={SnwelEnquiryColumns as any}
          total={data?.total || 0}
          data={data?.docs || []}
          pageCount={data?.total ? getTotalPages(data.total, data.limit) : 0}
          dateRange={true}
        />
      }
    </div>
  );
};

export default SnwelEnquiryPage;
