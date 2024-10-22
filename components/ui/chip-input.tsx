'use client'

import React, { useState, KeyboardEvent, ChangeEvent } from 'react'
import { X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface MultiChipInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string,
  className?: string
}

export function MultiChipInput({
  value,
  onChange,
  placeholder = "Type and press Enter",
  className,
  ...props
}: MultiChipInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addChip()
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const addChip = () => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue && !value.includes(trimmedValue)) {
      onChange([...value, trimmedValue])
      setInputValue('')
    }
  }

  const removeChip = (chipToRemove: string) => {
    onChange(value.filter(chip => chip !== chipToRemove))
  }

  return (
    <div className={cn(
      "flex flex-wrap gap-2 p-2 border rounded-md bg-background",
      className
    )}>
      {value.map((chip, index) => (
        <Badge key={index} variant="secondary" className="text-sm">
          {chip}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
            onClick={() => removeChip(chip)}
            aria-label={`Remove ${chip}`}
          >
            <X size={14} />
          </Button>
        </Badge>
      ))}
      <Input
        {...props}
        type="text"
        className="flex-grow border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-0"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={addChip}
        placeholder={placeholder}
        aria-label="Add new chip"
      />
    </div>
  )
}