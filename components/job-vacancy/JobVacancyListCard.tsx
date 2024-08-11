import { JobVacancyType } from '@/types/JobVacancyTypes'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { formatDate, formatToLocalCurrency, getAvatarLetters } from '@/lib/utils'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'

const JobVacancyListCard = ({ data }: {
    data: JobVacancyType
}) => {
    return (
        <Card className='bg-background relative'>
            <CardContent className='group relative overflow-hidden md:flex justify-between items-center rounded shadow hover:shadow-md dark:shadow-gray-700 transition-all duration-500 p-5'>
                <div className='flex items-center'>
                    <Avatar className='h-14 w-14'>
                        <AvatarImage src={data.companyLogo} />
                        <AvatarFallback>{getAvatarLetters(data.companyName)}</AvatarFallback>
                    </Avatar>
                    <a className='text-lg hover:text-emerald-600 font-light transition-all duration-500 ms-3 min-w-[180px]' href={`/job-vacancies/${data.slug}`}>{data.title}</a>
                </div>
                <div className='md:block flex justify-between md:mt-0 mt-4'>
                    <span className='block'>
                        <span className='bg-emerald-600/10 inline-block text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full'>
                            {`"${data.employmentType}"`}
                        </span>
                    </span>
                    <span className='flex items-center text-slate-400 text-sm md:mt-1 mt-0'>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="me-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
                        {data.postedDate ? formatDate(data.postedDate) : '-'}
                    </span>
                </div>
                <div className="md:block flex justify-between md:mt-0 mt-2">
                    {
                        data.remoteWorkOption && !data.location ?
                            <span className='text-slate-400 flex items-center'>Work From Anywhere</span> :
                            <span className="text-slate-400 flex items-center">
                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="me-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                {data.location?.country}
                            </span>
                    }
                    <span className="block font-light md:mt-1 mt-0">
                        {formatToLocalCurrency(data.salaryRange ||'', 'en-US', 'inr')}
                    </span>
                </div>

                <div className='md:mt-0 mt-4 flex items-center gap-2'>
                    <Button size={'icon'} variant={'outline'}><Bookmark/></Button>
                    <Button>Apply Now</Button>
                </div>
                {
                    data.isFeatured &&
                    <span className="w-24 text-white p-1 text-center absolute ltr:-rotate-45 -rotate-45 -start-[30px] top-3 bg-yellow-400 flex justify-center"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path></svg></span>
                }
            </CardContent>
        </Card>
    )
}

export default JobVacancyListCard