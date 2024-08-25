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
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Country } from 'country-state-city';

interface DropdownSelectorProps {
    onChange: (value: string) => void;
    value?: string;
    placeholder?: string
}

export function CountrySelector({ onChange, value, placeholder }: DropdownSelectorProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");

    // Memoize country data to prevent unnecessary recalculations
    const data = React.useMemo(() => 
        Country.getAllCountries().map(country => ({
            value: country.isoCode,
            displayValue: `${country.name} - ${country.isoCode}`
        }))
    , []);

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
                            onChangeCapture={(e: any) => setSearch(e.currentTarget.value)}
                        />
                        <CommandList className="max-h-[400px] overflow-y-auto">
                            <CommandEmpty>No item found.</CommandEmpty>
                            <CommandGroup>
                                {data.filter(item => item.displayValue.toLowerCase().includes(search.toLowerCase())).map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        className="cursor-pointer"
                                        value={item.value}
                                        onSelect={(currentValue) => {
                                            if (currentValue !== value) {
                                                onChange(currentValue);
                                            }
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === item.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {item.displayValue}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
