// 'use client'

// import { useState } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import { format } from 'date-fns'
// import { Calendar as CalendarIcon } from 'lucide-react'

// import Typography from '@/components/typography'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
// import WebinarGridList from '@/components/webinar/WebinarGridList'
// import { getListOptionsFromSearchParams } from '@/lib/utils'
// import { getAllPublicWebinars } from '@/services/admin/webinar-service'

// export default function Component() {
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const pathname = usePathname()
//   const [date, setDate] = useState<Date | undefined>(undefined)

//   const { data, isLoading } = useQuery({
//     queryKey: ['/open/webinar', searchParams.get('search'), searchParams.get('startDate')],
//     queryFn: () => getAllPublicWebinars(getListOptionsFromSearchParams(searchParams))
//   })

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.currentTarget.value
//     const startDate = searchParams.get('startDate')
//     if (value) {
//       router.push(`/webinars?search=${value}${startDate ? `&startDate=${startDate}` : ''}`)
//     } else {
//       router.push(`/webinars${startDate ? `?startDate=${startDate}` : ''}`)
//     }
//   }

//   const handleDateSelect = (selectedDate: Date | undefined) => {
//     setDate(selectedDate)
//     const search = searchParams.get('search')
//     if (selectedDate) {
//       const formattedDate = format(selectedDate, 'yyyy-MM-dd')
//       router.push(`/webinars?startDate=${formattedDate}${search ? `&search=${search}` : ''}`)
//     } else {
//       router.push(`/webinars${search ? `?search=${search}` : ''}`)
//     }
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="relative w-full bg-center bg-cover flex flex-col items-center justify-center min-h-96 text-center space-y-3 px-4 py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
//         {/* Background Image */}
//         <div 
//           className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-20"
//           style={{
//             backgroundImage: `url('https://www.freepik.com/free-vector/techno-banner-design_5139400.htm#fromView=search&page=2&position=11&uuid=d2e3d7b8-e614-4fd5-b450-aa406b272c21&query=Webinar+background')`
//           }}
//         />
        
//         {/* Gradient Overlay */}
//         {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80" /> */}
        
//         {/* Content */}
//         <Typography as="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white z-20 max-w-4xl text-center leading-tight">
//           Webinars
//         </Typography>
//         <Typography as="p" className="max-w-3xl text-center text-blue-100 text-lg md:text-xl z-20 leading-relaxed">
//           Register now and unlock a world of knowledge designed to elevate your engineering skills and propel your
//           career forward!
//         </Typography>

//         <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-3xl space-y-3 sm:space-y-0 sm:space-x-4 z-20">
//           <Input
//             className="w-full max-w-sm bg-white/95 backdrop-blur-sm border-white/20 placeholder:text-gray-500 text-gray-900"
//             placeholder="Search Webinars..."
//             onChange={handleSearch}
//             value={searchParams.get('search') || ''}
//           />
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button variant="outline" className="w-full sm:w-[280px] justify-start text-left font-normal bg-white/95 backdrop-blur-sm border-white/20 text-gray-900 hover:bg-white/100">
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {date ? format(date, 'PPP') : <span>Pick a date</span>}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0">
//               <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
//             </PopoverContent>
//           </Popover>
//         </div>
//       </div>
//       <section className="flex-grow py-20">
//         <div className="container">
//           <WebinarGridList loading={isLoading} webinarList={data?.docs || []} />
//         </div>
//       </section>
//     </div>
//   )
// }
'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
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

export default function WebinarsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
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

      {/* ================= OUTER BANNER (IMAGE ONLY) ================= */}
      <section className="relative overflow-hidden">
        <div
          className="relative flex flex-col items-center justify-center min-h-[320px] px-4 py-20 text-center"
          style={{
            backgroundImage: "url('/assets/images/webinar/webinar.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%'
          }}
        >
          <Typography
            as="h1"
            className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl"
          >
            Webinars
          </Typography>

          <Typography
            as="p"
            className="max-w-3xl mx-auto text-white text-base md:text-lg mt-3 drop-shadow-xl"
          >
            Register now and unlock a world of knowledge designed to elevate your engineering
            skills and propel your career forward!
          </Typography>

          <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-3xl gap-4 mt-8">
            <Input
              className="w-full max-w-sm bg-white/95 backdrop-blur-sm border-white/20 text-gray-900"
              placeholder="Search Webinars..."
              onChange={handleSearch}
              value={searchParams.get('search') || ''}
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-[260px] justify-start text-left font-normal bg-white/95 border-white/20 text-gray-900"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>

      {/* ================= WEBINAR LIST ================= */}
      <section className="flex-grow py-20">
        <div className="container">
          <WebinarGridList
            loading={isLoading}
            webinarList={data?.docs || []}
          />
        </div>
      </section>

    </div>
  )
}
