// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Clock, Clock8, ChevronDown, ChevronUp } from "lucide-react"
// import { Progress } from "@/components/ui/progress"

// type DaySchedule = {
//     day: string
//     hours: string | "Closed" | "24 hours"
// }

// const businessHours: DaySchedule[] = [
//     { day: "Sunday", hours: "10:00 AM - 1:30 PM" },
//     { day: "Monday", hours: "9:30 AM - 6:30 PM" },
//     { day: "Tuesday", hours: "9:30 AM - 6:30 PM" },
//     { day: "Wednesday", hours: "9:30 AM - 6:30 PM" },
//     { day: "Thursday", hours: "9:30 AM - 6:30 PM" },
//     { day: "Friday", hours: "9:30 AM - 6:30 PM" },
//     { day: "Saturday", hours: "9:30 AM - 6:30 PM" },
// ]

// export default function BusinessHours() {
//     const [currentDay, setCurrentDay] = useState("")
//     const [currentTime, setCurrentTime] = useState(new Date())
//     const [isExpanded, setIsExpanded] = useState(false)

//     useEffect(() => {
//         const timer = setInterval(() => setCurrentTime(new Date()), 60000)
//         return () => clearInterval(timer)
//     }, [])

//     useEffect(() => {
//         setCurrentDay(currentTime.toLocaleDateString("en-US", { weekday: "long" }))
//     }, [currentTime])

//     const getCurrentDaySchedule = () => {
//         return businessHours.find((schedule) => schedule.day === currentDay)
//     }

//     const isOpen = (schedule: DaySchedule) => {
//         if (schedule.hours === "Closed") return false
//         if (schedule.hours === "24 hours") return true

//         const [openTime, closeTime] = schedule.hours.split(" - ")
//         const currentHours = currentTime.getHours()
//         const currentMinutes = currentTime.getMinutes()

//         const [openHour, openMinute] = openTime.split(":").map(Number)
//         const [closeHour, closeMinute] = closeTime.split(":").map(Number)

//         const currentTimeInMinutes = currentHours * 60 + currentMinutes
//         const openTimeInMinutes = (openHour % 12 + (openTime.includes("PM") ? 12 : 0)) * 60 + openMinute
//         const closeTimeInMinutes = (closeHour % 12 + (closeTime.includes("PM") ? 12 : 0)) * 60 + closeMinute

//         return currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes
//     }

//     const getTimeUntilCloseOrOpen = (schedule: DaySchedule) => {
//         if (schedule.hours === "Closed" || schedule.hours === "24 hours") return null

//         const [openTime, closeTime] = schedule.hours.split(" - ")
//         const currentHours = currentTime.getHours()
//         const currentMinutes = currentTime.getMinutes()

//         const [openHour, openMinute] = openTime.split(":").map(Number)
//         const [closeHour, closeMinute] = closeTime.split(":").map(Number)

//         const currentTimeInMinutes = currentHours * 60 + currentMinutes
//         const openTimeInMinutes = (openHour % 12 + (openTime.includes("PM") ? 12 : 0)) * 60 + openMinute
//         const closeTimeInMinutes = (closeHour % 12 + (closeTime.includes("PM") ? 12 : 0)) * 60 + closeMinute

//         if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
//             // Time until close
//             return closeTimeInMinutes - currentTimeInMinutes
//         } else {
//             // Time until open
//             return (openTimeInMinutes - currentTimeInMinutes + 1440) % 1440
//         }
//     }

//     const formatTimeLeft = (minutes: number) => {
//         const hours = Math.floor(minutes / 60)
//         const mins = minutes % 60
//         return `${hours}h ${mins}m`
//     }

//     const currentSchedule = getCurrentDaySchedule()
//     const openNow = currentSchedule ? isOpen(currentSchedule) : false
//     const timeLeft = currentSchedule ? getTimeUntilCloseOrOpen(currentSchedule) : null

//     return (
//         <Card className="w-full max-w-lg">
//             <CardHeader>
//                 <CardTitle className="flex items-center">
//                     <Clock className="mr-2" />
//                     Business Hours
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <ul className="space-y-2">
//                     {businessHours.map((schedule) => (
//                         <li
//                             key={schedule.day}
//                             className={`flex justify-between items-center p-2 rounded ${schedule.day === currentDay ? "bg-primary/10" : ""
//                                 }`}
//                         >
//                             <span className="font-medium">{schedule.day}</span>
//                             <span className="flex items-center">
//                                 {schedule.hours === "Closed" ? (
//                                     <Clock8 className="mr-2 text-destructive" size={18} />
//                                 ) : schedule.hours === "24 hours" ? (
//                                     <Clock className="mr-2 text-primary" size={18} />
//                                 ) : null}
//                                 <span
//                                     className={
//                                         schedule.hours === "Closed"
//                                             ? "text-destructive"
//                                             : schedule.hours === "24 hours"
//                                                 ? "text-primary"
//                                                 : ""
//                                     }
//                                 >
//                                     {schedule.hours}
//                                 </span>
//                             </span>
//                         </li>
//                     ))}
//                 </ul>
//                 {currentSchedule && currentSchedule.day === currentDay && (
//                     <div className="mt-4">
//                         <button
//                             onClick={() => setIsExpanded(!isExpanded)}
//                             className="flex items-center justify-between w-full p-2 bg-primary/5 rounded"
//                         >
//                             <span className="font-medium">Today&apos;s Hours</span>
//                             {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//                         </button>
//                         {isExpanded && (
//                             <div className="mt-2 p-2 bg-primary/5 rounded">
//                                 <p className={`font-bold ${openNow ? "text-primary" : "text-destructive"}`}>
//                                     {openNow ? "Open now" : "Closed now"}
//                                 </p>
//                                 {timeLeft !== null && (
//                                     <div className="mt-2">
//                                         <p className="text-sm">
//                                             {openNow ? "Closes" : "Opens"} in {formatTimeLeft(timeLeft)}
//                                         </p>
//                                         <Progress
//                                             value={((openNow ? 1440 - timeLeft : timeLeft) / 1440) * 100}
//                                             className="mt-1"
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </CardContent>
//         </Card>
//     )
// }
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Clock8, ChevronDown, ChevronUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type DaySchedule = {
  day: string
  hours: string | "Closed" | "24 hours"
}

const businessHours: DaySchedule[] = [
  { day: "Sunday", hours: "10:00 AM - 1:30 PM" },
  { day: "Monday", hours: "9:30 AM - 6:30 PM" },
  { day: "Tuesday", hours: "9:30 AM - 6:30 PM" },
  { day: "Wednesday", hours: "9:30 AM - 6:30 PM" },
  { day: "Thursday", hours: "9:30 AM - 6:30 PM" },
  { day: "Friday", hours: "9:30 AM - 6:30 PM" },
  { day: "Saturday", hours: "9:30 AM - 6:30 PM" },
]

/* ------------------ TIME HELPERS ------------------ */
const toMinutes = (time: string) => {
  const [hm, period] = time.split(" ")
  const [h, m] = hm.split(":").map(Number)

  let hour = h % 12
  if (period === "PM") hour += 12

  return hour * 60 + m
}

export default function BusinessHours() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentDay, setCurrentDay] = useState("")
  const [expanded, setExpanded] = useState(false)

  /* ----------- UPDATE TIME EVERY 1 MIN ----------- */
  useEffect(() => {
    const timer = setInterval(() => {
      // For India only (optional)
      // setCurrentTime(new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })))
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  /* ----------- UPDATE DAY AUTOMATICALLY ----------- */
  useEffect(() => {
    setCurrentDay(
      currentTime.toLocaleDateString("en-US", { weekday: "long" })
    )
  }, [currentTime])

  const todaySchedule = businessHours.find(
    (d) => d.day === currentDay
  )

  const currentMinutes =
    currentTime.getHours() * 60 + currentTime.getMinutes()

  /* ------------------ OPEN / CLOSED ------------------ */
  const isOpen = () => {
    if (!todaySchedule) return false
    if (todaySchedule.hours === "Closed") return false
    if (todaySchedule.hours === "24 hours") return true

    const [open, close] = todaySchedule.hours.split(" - ")
    return (
      currentMinutes >= toMinutes(open) &&
      currentMinutes < toMinutes(close)
    )
  }

  /* ------------------ TIME LEFT ------------------ */
  const timeLeft = () => {
    if (!todaySchedule) return null
    if (
      todaySchedule.hours === "Closed" ||
      todaySchedule.hours === "24 hours"
    )
      return null

    const [open, close] = todaySchedule.hours.split(" - ")
    const openM = toMinutes(open)
    const closeM = toMinutes(close)

    if (isOpen()) return closeM - currentMinutes
    return (openM - currentMinutes + 1440) % 1440
  }

  const formatTime = (min: number) =>
    `${Math.floor(min / 60)}h ${min % 60}m`

  const openNow = isOpen()
  const remaining = timeLeft()

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock /> Business Hours
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* ----------- WEEK LIST ----------- */}
        <ul className="space-y-2">
          {businessHours.map((d) => (
            <li
              key={d.day}
              className={`flex justify-between items-center p-2 rounded ${
                d.day === currentDay ? "bg-primary/10" : ""
              }`}
            >
              <span className="font-medium">{d.day}</span>
              <span className="flex items-center gap-2">
                {d.hours === "Closed" && (
                  <Clock8 className="text-destructive" size={16} />
                )}
                {d.hours === "24 hours" && (
                  <Clock className="text-primary" size={16} />
                )}
                <span
                  className={
                    d.hours === "Closed"
                      ? "text-destructive"
                      : d.hours === "24 hours"
                      ? "text-primary"
                      : ""
                  }
                >
                  {d.hours}
                </span>
              </span>
            </li>
          ))}
        </ul>

        {/* ----------- TODAY STATUS ----------- */}
        {todaySchedule && (
          <div className="mt-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex justify-between items-center w-full p-2 rounded bg-primary/5"
            >
              <span className="font-medium">Today&apos;s Status</span>
              {expanded ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expanded && (
              <div className="mt-2 p-3 rounded bg-primary/5">
                <p
                  className={`font-bold ${
                    openNow ? "text-primary" : "text-destructive"
                  }`}
                >
                  {openNow ? "Open Now" : "Closed Now"}
                </p>

                {remaining !== null && (
                  <>
                    <p className="text-sm mt-1">
                      {openNow ? "Closes in" : "Opens in"}{" "}
                      {formatTime(remaining)}
                    </p>

                    <Progress
                      value={openNow ? 100 - (remaining / 540) * 100 : 0}
                      className="mt-2"
                    />
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
