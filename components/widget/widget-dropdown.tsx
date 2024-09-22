'use client'

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { CommandList } from "cmdk";
import { fetchAllWidgets } from "@/services/admin/admin-widget-service";
import { Widget } from "@/types/WidgetTypes";


interface DropdownSelectorProps {
    onChange: (value: string|null) => void;
    value?: string;
    selectorKey?: keyof Widget,
    placeholder?: string
}

export function WidgetDropDown({ onChange, value, selectorKey = '_id', placeholder }: DropdownSelectorProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const { data, isLoading, error } = useQuery({
        queryKey: ['/admin/widgets'],
        queryFn: () => fetchAllWidgets()
    });




    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;
    return (
        <div className="relative">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full max-w-full justify-between"
                    >
                        {value
                            ? (data?.docs || []).find((item: Widget) => item[selectorKey] === value)?.title
                            : (placeholder || "Select item...")}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 PopoverContent">
                    <Command className="w-full max-w-full">
                        <CommandInput
                            placeholder="Search..."
                            value={search}
                            className="w-full"
                            onChangeCapture={(e) => setSearch(e.currentTarget.value)}
                        />
                        <CommandList>
                            <CommandEmpty>No item found.</CommandEmpty>
                            <CommandGroup>
                                {/* <CommandItem 
                                key={nanoid()} 
                                className="cursor-pointer" 
                                value={undefined}
                                onSelect={(currentValue) => {
                                    onChange(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            !value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    None
                                </CommandItem> */}
                                {data?.docs?.map((item: Widget) => {
                                    return <CommandItem
                                        key={nanoid()}
                                        className="cursor-pointer"
                                        value={String(item[selectorKey])}
                                        onSelect={(currentValue) => {
                                            onChange(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === item._id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {item.title}
                                    </CommandItem>
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
