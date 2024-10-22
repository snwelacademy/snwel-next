"use client"

import { useQuery } from "@tanstack/react-query"
import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllBlogCategories } from "@/services/admin/admin-category-service"
import { CommandList } from "cmdk"

interface Category {
  id: string
  name: string
}

interface CategorySelectorProps {
  onSelect: (categoryId: string) => void
  selectedCategoryId?: string
}


export function CategorySelector({ onSelect, selectedCategoryId }: CategorySelectorProps) {
  const [open, setOpen] = React.useState(false)

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['/blog-categories'],
    queryFn: async () => getAllBlogCategories({})
})



  if (error) {
    return <div>Error loading categories: {error.message}</div>
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {isLoading ? (
            <Skeleton className="h-4 w-[100px]" />
          ) : selectedCategoryId ? (
            categories?.docs?.find((category) => category._id === selectedCategoryId)?.name
          ) : (
            "Select category..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        {isLoading ? (
          <div className="p-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
            {/* <CommandItem>Calendar</CommandItem> */}
              {categories?.docs.map((category) => (
                <CommandItem
                  key={category?._id}
                  value={category?._id}
                  onSelect={() => {
                    onSelect(category._id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCategoryId === category._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  )
}