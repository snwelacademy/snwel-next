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
