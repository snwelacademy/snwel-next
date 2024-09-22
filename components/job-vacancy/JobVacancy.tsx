'use client'

import SingleVacancy from '@/components/job-vacancy/SingleVacancy'
import { getJobVacancy } from '@/services/guestJobVacancyService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const SingleJobPage = () => {
  const { slug } = useParams();
  const { data: jobVacancy, isLoading } = useQuery({
    queryKey: ['/job-vacancy', slug],
    queryFn: () => getJobVacancy(slug as string || '')
  })

  if (isLoading) {
    return (
      <div className="h-screen w-screen inset-0 z-50 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-primary">Loading...</p>
        </div>
      </div>
    )
  }
  if (!slug || !jobVacancy) return <div className="flex items-center"> Job Not Found!</div>
  return (
    <div className='container mx-auto mt-10'>
      <SingleVacancy data={jobVacancy} />
    </div>
  )
}

export default SingleJobPage