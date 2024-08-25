"use client";

import * as React from "react";
import {  format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerDemo } from "./time-picker-demo";

export function DateTimePicker({
  value = new Date().toISOString(),
  onChange,
}: {
  value?: string;
  onChange: (value: string | Date) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay || !date) return;

    const newDate = new Date(
      newDay.getFullYear(),
      newDay.getMonth(),
      newDay.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );

    setDate(newDate);
    onChange(newDate.toISOString());
  };

  const handleTimeChange = (newTime: Date) => {
    if (!date) return;

    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      newTime.getHours(),
      newTime.getMinutes(),
      newTime.getSeconds()
    );

    setDate(newDate);
    onChange(newDate.toISOString());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP HH:mm:ss") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleSelect(d)}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePickerDemo setDate={date => date && handleTimeChange(date)} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
