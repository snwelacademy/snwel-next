"use client"

import { useEffect, useState } from "react"
import { Clock, Clock8, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

/* ===============================
   IST TIME HELPER (CRITICAL FIX)
================================ */
const getISTDate = () =>
  new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  )

const toMinutes = (time: string) => {
  const [hm, period] = time.split(" ")
  const [h, m] = hm.split(":").map(Number)
  let hour = h % 12
  if (period === "PM") hour += 12
  return hour * 60 + m
}

export default function BusinessHours() {
  const [now, setNow] = useState<Date>(getISTDate())
  const [expanded, setExpanded] = useState(false)

  /* Update time every minute */
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(getISTDate())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const currentDay = now.toLocaleDateString("en-US", { weekday: "long" })
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const today = businessHours.find(d => d.day === currentDay)

  const isOpen = () => {
    if (!today) return false
    if (today.hours === "Closed") return false
    if (today.hours === "24 hours") return true

    const [open, close] = today.hours.split(" - ")
    return (
      currentMinutes >= toMinutes(open) &&
      currentMinutes < toMinutes(close)
    )
  }

  const minutesLeft = () => {
    if (!today || today.hours === "Closed" || today.hours === "24 hours")
      return null

    const [open, close] = today.hours.split(" - ")
    const openM = toMinutes(open)
    const closeM = toMinutes(close)

    if (isOpen()) return closeM - currentMinutes
    return (openM - currentMinutes + 1440) % 1440
  }

  const formatTime = (m: number) =>
    `${Math.floor(m / 60)}h ${m % 60}m`

  const openNow = isOpen()
  const remaining = minutesLeft()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock /> Business Hours (IST)
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* WEEK LIST */}
        <ul className="space-y-2">
          {businessHours.map(d => (
            <li
              key={d.day}
              className={`flex justify-between items-center p-2 rounded ${
                d.day === currentDay ? "bg-primary/10" : ""
              }`}
            >
              <span className="font-medium">{d.day}</span>
              <span className="flex items-center gap-2">
                {d.hours === "Closed" && (
                  <Clock8 size={16} className="text-destructive" />
                )}
                {d.hours === "24 hours" && (
                  <Clock size={16} className="text-primary" />
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

        {/* TODAY STATUS */}
        {today && (
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
                    <Progress className="mt-2" />
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
