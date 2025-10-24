
import ModernLoader from '@/components/ModernLoader';
import { DataTable } from '@/components/shared/DataTable';
import { MasterColumns } from '@/components/tables/master/master-columns';
import { getListOptionsFromSearchParams, getTotalPages } from '@/lib/utils';
import { getAllMasters } from '@/services/admin/admin-master'; 
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';



const SubMasterList = () => {
  const searchParams = useSearchParams();
  const option = getListOptionsFromSearchParams(searchParams);

  const { data, isLoading } = useQuery({
    queryKey: ['/admin/masters', searchParams],
    queryFn: () => getAllMasters(option),
    enabled: option?.filter?.parentCode
  });

  return (
    <div>
      

      {
        isLoading ? 
        <ModernLoader variant="default" />
        : <DataTable
            searchKey="name" 
            pageNo={data?.currentPage || 1}
            columns={MasterColumns} 
            total={data?.total || 0}
            data={data?.docs || []}
            pageCount={data?.total ? getTotalPages(data.total, data.limit) : 0}
          />
      }
    </div>
  );
}

export default SubMasterList;
