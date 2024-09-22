'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import Typography from '@/components/typography'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import WebinarGridList from '@/components/webinar/WebinarGridList'
import { getListOptionsFromSearchParams } from '@/lib/utils'
import { getAllPublicWebinars } from '@/services/admin/webinar-service'

export default function Component() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [date, setDate] = useState<Date | undefined>(undefined)

  const { data, isLoading } = useQuery({
    queryKey: ['/open/webinar', searchParams.get('search'), searchParams.get('startDate')],
    queryFn: () => getAllPublicWebinars(getListOptionsFromSearchParams(searchParams))
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    const startDate = searchParams.get('startDate')
    if (value) {
      router.push(`/webinars?search=${value}${startDate ? `&startDate=${startDate}` : ''}`)
    } else {
      router.push(`/webinars${startDate ? `?startDate=${startDate}` : ''}`)
    }
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    const search = searchParams.get('search')
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd')
      router.push(`/webinars?startDate=${formattedDate}${search ? `&search=${search}` : ''}`)
    } else {
      router.push(`/webinars${search ? `?search=${search}` : ''}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full bg-center bg-cover flex flex-col items-center justify-center min-h-96 bg-primary/10 text-center space-y-3 px-4 py-20">
        <Typography as="h1" className="text-4xl font-bold text-primary z-20 max-w-3xl text-center">
          Webinars
        </Typography>
        <Typography as="p" className="max-w-3xl text-center">
          Register now and unlock a world of knowledge designed to elevate your engineering skills and propel your
          career forward!
        </Typography>

        <div className="flex items-center justify-center w-full max-w-3xl space-x-4">
          <Input
            className="w-full max-w-sm"
            placeholder="Search Webinars..."
            onChange={handleSearch}
            value={searchParams.get('search') || ''}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <section className="flex-grow py-20">
        <div className="container">
          <WebinarGridList loading={isLoading} webinarList={data?.docs || []} />
        </div>
      </section>
    </div>
  )
}