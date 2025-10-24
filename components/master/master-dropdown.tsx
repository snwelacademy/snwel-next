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
import { MASTER_TYPE, Master } from "@/types/master";
import { nanoid } from "nanoid";
import { CommandList } from "cmdk";
import { getPublicMasters } from "@/services/public/master-service";


interface DropdownSelectorProps {
    parentCode?: string; // Optional parent code for filtering
    onChange: (value: string) => void;
    value?: string;
    selectorKey?: keyof Master,
    type?: MASTER_TYPE,
    placeholder?: string,
    forcedData?: Master[],
    allowCustom?: boolean
}

export function MasterDropdown({ parentCode, onChange, value, selectorKey = '_id', type, placeholder, forcedData, allowCustom = false }: DropdownSelectorProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const { data, isLoading, error } = useQuery({
        queryKey: ['/api/masters', parentCode, search, type],
        queryFn: () => getPublicMasters({ search, filter: getFilterValue({parentCode, type}) }),
        enabled: !forcedData || forcedData.length === 0
    });

    const items = React.useMemo<Master[]>(() => {
        if (forcedData && forcedData.length) return forcedData;
        return data?.docs || [];
    }, [forcedData, data]);

    const getFilterValue = (data: {parentCode?: string, type?: MASTER_TYPE}) => {
        const filter: any = {};
        if(parentCode) filter['parentCode'] = data.parentCode;
        if(type) filter['type'] = data.type;
        return filter;
    }
    
    // Note: Avoid early returns to keep hooks order stable across renders
    const selectedItemLabel = React.useMemo(() => {
        const match = items.find((item: Master) => String(item[selectorKey]) === String(value));
        if (match) return match.name;
        if (allowCustom && value) return String(value);
        return undefined;
    }, [items, value, selectorKey, allowCustom]);

    // const noMatch = React.useMemo(() => {
    //     return !items.some((item: Master) => String(item[selectorKey]) === String(value));
    // }, [items, value, selectorKey]);

    return (
        <div className="relative">
            <Popover open={open} onOpenChange={(v)=>{ setOpen(v); if(!v) setSearch(""); }}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full max-w-full justify-between"
                    >
                        {selectedItemLabel || (placeholder || "Select item...")}
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
                            { (isLoading && (!forcedData || forcedData.length === 0)) ? (
                                <div className="p-2 text-sm">Loading...</div>
                            ) : error ? (
                                <div className="p-2 text-sm text-destructive">Error fetching data</div>
                            ) : (
                                <>
                                    <CommandEmpty>
                                        {allowCustom && search ? (
                                            <div className="p-2 text-sm text-muted-foreground">No item found. Use custom value below.</div>
                                        ) : (
                                            "No item found."
                                        )}
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {items.map((item: Master) => {
                                            return <CommandItem
                                                key={nanoid()}
                                                className="cursor-pointer"
                                                value={String(item[selectorKey])}
                                                onSelect={(currentValue) => {
                                                    onChange(currentValue === value ? "" : currentValue);
                                                    setSearch("");
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        String(value) === String(item[selectorKey]) ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {item.name}
                                            </CommandItem>
                                        })}
                                        {allowCustom && search && (
                                            <CommandItem
                                                key="__custom__"
                                                className="cursor-pointer text-primary"
                                                value={search}
                                                onSelect={(currentValue) => {
                                                    onChange(currentValue);
                                                    setSearch("");
                                                    setOpen(false);
                                                }}
                                            >
                                                Use "{search}"
                                            </CommandItem>
                                        )}
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
