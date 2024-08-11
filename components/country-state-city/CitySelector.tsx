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
import { City } from 'country-state-city';
import { useVirtualizer } from "@tanstack/react-virtual";

interface DropdownSelectorProps {
    onChange: (value: string) => void;
    value?: string;
    placeholder?: string;
    countryCode?: string;
    stateCode?: string;
}

export function CitySelector({ onChange, value, placeholder, countryCode, stateCode }: DropdownSelectorProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const cities = React.useMemo(() => {
        return City.getAllCities().map(city => ({
            value: city.name,
            displayValue: city.name,
        }));
    }, [countryCode, stateCode]);

    const filteredCities = React.useMemo(() => {
        return cities.filter(city =>
            city.displayValue.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, cities]);

    const parentRef = React.useRef(null);

    const rowVirtualizer = useVirtualizer({
        count: filteredCities.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
        overscan: 5,
    });

    React.useEffect(() => {
        console.log(cities.length, filteredCities.length)
    }, [cities])

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
                            ? cities.find((item) => item.value === value)?.displayValue
                            : (placeholder || "Select city...")}
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

                            <CommandGroup
                                ref={parentRef}
                                style={{ maxHeight: '400px', overflow: 'auto' }}
                            >
                                <div
                                    style={{
                                        height: `${rowVirtualizer.getTotalSize()}px`,
                                        position: 'relative',
                                        width: '100%',
                                    }}
                                >
                                    {rowVirtualizer?.getVirtualItems()?.map((virtualRow) => {
                                        const city = filteredCities[virtualRow.index];
                                        return (
                                            <CommandItem
                                                key={city.value}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    transform: `translateY(${virtualRow.start}px)`,
                                                }}
                                                value={city.value}
                                                onSelect={(currentValue) => {
                                                    onChange(currentValue === value ? "" : currentValue);
                                                    setOpen(false);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === city.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {city.displayValue}
                                            </CommandItem>
                                        );
                                    })}
                                </div>
                            </CommandGroup>
                            <CommandEmpty>No city found.</CommandEmpty>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
