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
import {Country, State} from 'country-state-city'
import { nanoid } from "nanoid";
import { CommandList } from "cmdk";


interface DropdownSelectorProps {
    onChange: (value: string) => void;
    value?: string;
    placeholder?: string,
    countryCode?: string
}


export function StateSelector({  onChange, value, placeholder, countryCode }: DropdownSelectorProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const data =  React.useMemo(() => {
        return State.getStatesOfCountry(countryCode).map(state => ({
            value: state.isoCode,
            displayValue: `${state.name} - ${state.isoCode}`
        }))
    }, [countryCode]);

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
                            ? data.find((item) => item.value === value)?.displayValue
                            : (placeholder || "Select state...")}
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
                        <CommandList className="max-h-[400px] overflow-auto">
                            <CommandEmpty>No State found.</CommandEmpty>
                            <CommandGroup>
                                {data?.map((item) => {
                                    return <CommandItem
                                    key={nanoid()}
                                        className="cursor-pointer"
                                        // key={nanoid()}
                                        value={String(item.value)}
                                        onSelect={(currentValue) => {
                                            onChange(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === item.displayValue ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {item.displayValue}
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
