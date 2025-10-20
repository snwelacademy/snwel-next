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
import { getAllMasters } from "@/services/admin/admin-master"; // Adjust the import based on your service
import { MASTER_TYPE, Master } from "@/types/master";
import { nanoid } from "nanoid";
import { CommandList } from "cmdk";


interface DropdownSelectorProps {
    parentCode?: string; // Optional parent code for filtering
    onChange: (value: string) => void;
    value?: string;
    selectorKey?: keyof Master,
    type?: MASTER_TYPE,
    placeholder?: string,
    forcedData?: Master[]
}

export function MasterDropdown({ parentCode, onChange, value, selectorKey = '_id', type, placeholder, forcedData }: DropdownSelectorProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const { data, isLoading, error } = useQuery({
        queryKey: ['/api/masters', parentCode, search],
        queryFn: () => getAllMasters({ search, filter: getFilterValue({parentCode, type}) }),
        enabled: !forcedData || forcedData.length === 0
    });


    const getFilterValue = (data: {parentCode?: string, type?: MASTER_TYPE}) => {
        const filter: any = {};
        if(parentCode) filter['parentCode'] = data.parentCode;
        if(type) filter['type'] = data.type;
        return filter;
    }
    
    // console.log(forcedData)
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
                            ? (data?.docs || []).find((item: Master) => item[selectorKey] === value)?.name
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
                                {(forcedData || data?.docs)?.map((item: Master) => {
                                    // console.log({forcedData})
                                    return <CommandItem
                                    key={nanoid()}
                                        className="cursor-pointer"
                                        // key={nanoid()}
                                        value={String(item[selectorKey])}
                                        onSelect={(currentValue) => {
                                            onChange(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === item.name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {item.name}
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
