import { JobVacancyType } from '@/types/JobVacancyTypes'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDate, formatToLocalCurrency, getAvatarLetters } from '@/lib/utils'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { nanoid } from 'nanoid'
import ApplyNowModal from './JobApplyNow'

const SingleVacancy = ({
    data
}: {
    data: JobVacancyType
}) => {

    const jobOverview: {icon: keyof typeof Icons, lable: string, value?: string }[] = [
        {
            lable: 'Employment Type',
            value: data.employmentType,
            icon: 'user'
        },
        {
            lable: 'Location',
            value: data.location && !data.remoteWorkOption ? `${data.location.state}, ${data.location.country}` : 'Work From Anywhere',
            icon: 'location'
        },
        {
            lable: 'Job Type',
            value: data.categories[0].name,
            icon: 'jobType'
        },
        {
            lable: 'Experience',
            value: data.experienceLevel,
            icon: 'experience'
        },
        {
            lable: 'Salary',
            value:data.salaryRange||'',
            icon: 'salary'
        },
        {
            lable: 'Date Posted',
            value: formatDate(data.postedDate||''),
            icon: 'datePosted'
        }

    ]
    return (
        <>
            <div className='flex flex-col md:flex-row gap-5 mb-44'>

                <div className='flex-grow'>
                    <Card className='bg-background'>
                        <CardContent className='flex items-center gap-5 pt-8'>
                            <Avatar className='h-20 w-20'>
                                <AvatarImage src={data.companyLogo}></AvatarImage>
                                <AvatarFallback>{getAvatarLetters(data.companyName)}</AvatarFallback>
                            </Avatar>

                            <div className="md:ms-4 md:mt-0 mt-6">
                                <h5 className="text-xl ">{data.title}</h5>
                                <div className="mt-2">
                                    <span className="text-slate-400 font-medium me-2 inline-flex items-center">
                                        <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" className="text-[18px] text-emerald-600 me-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"></path>
                                        </svg>
                                        {data.companyName}
                                    </span>
                                    <span className="text-slate-400 font-medium me-2 inline-flex items-center">
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" className="text-[18px] text-emerald-600 me-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
                                        </svg>
                                        {data.remoteWorkOption && !data.location ? "Work From Anywhere" : `${data.location?.state}, ${data.location?.country}`}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <article className='prose prose-zinc mt-10 prose-li:mt-0 prose-li:mb-0'>
                        <h2>Job Description</h2>
                        <div dangerouslySetInnerHTML={{ __html: data.description }}></div>

                        <h2>Job Requirment</h2>
                        <div dangerouslySetInnerHTML={{ __html: data.requirements }}></div>
                    </article>

                    <div className='mt-5'>
                        <ApplyNowModal data={data}/>
                    </div>
                </div>

                <div className='md:max-w-[30%] w-full relative'>
                <Card className='bg-background sticky top-[100px]'>
                        <CardHeader>
                            <CardTitle>Job Information</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-5'>
                            {
                                jobOverview.map(info => {
                                    const Icon = Icons[info.icon || "arrowRight"];
                                    return <div key={nanoid()} className='flex gap-2 items-center'>
                                        <Icon className="mr-2 h-6 w-6 text-gray-500" />
                                        <div className='space-y-1'>
                                            <h3>{info.lable}:</h3>
                                            <p className='text-emerald-600'>{info.value || '-'}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default SingleVacancy