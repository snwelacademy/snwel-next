'use client'
import JobVacancyListCard from '@/components/job-vacancy/JobVacancyListCard'
import { getListOptionsFromSearchParams } from '@/lib/utils'
import { getAllJobVacancies } from '@/services/guestJobVacancyService'
import { useQuery } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import { useSearchParams } from 'next/navigation'
import NoActiveJobs from './NoActiveJobs'
import LoadingJobScreen from './LodingJobsScreen'
import JobVacancyHeader from './JobVacancyHeader'

const JobVacancyListPage = () => {
    const searchParams = useSearchParams()
    const { data, isLoading } = useQuery({
        queryKey: ['/jobvacancy', searchParams.toString()],
        queryFn: () => {
            return getAllJobVacancies(getListOptionsFromSearchParams(searchParams))
        }
    })
    if(isLoading){
        return <LoadingJobScreen/>
    }
    if(data&& data.docs && (!data.docs.find(dt => dt.isActive) || data.docs.length === 0)){
        return <NoActiveJobs/>
    }
    return (
        <>
        <JobVacancyHeader/>
            <div className='container px-4 pb-12'>
            <div className='grid grid-cols-1 gap-[30px] mt-10'>
                {
                    data?.docs.filter(dt => dt.isActive).map(job => {
                        return <div className='w-full' key={nanoid()}><JobVacancyListCard data={job} /></div>
                    })
                }
            </div>
            </div>
        </>
    )
}

export default JobVacancyListPage