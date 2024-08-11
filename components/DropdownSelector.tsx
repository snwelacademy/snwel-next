/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

// Define the structure of the items
export interface Item {
    label: string;
    value: string;
}

interface DropdownSelectorProps {
    name: string;
    items?: Item[];
    queryKey?: string;
    queryFn?: () => Promise<any>;
    transformFn?: (data: any) => Item[];
    placeholder?: string;
    defaultValue?: string;
    onUpdate?: (value?: string| string[]) => Promise<void>;
    outputTransformFn?: (value?: string) => any
}

const DropdownSelector = ({
    name,
    items,
    queryKey,
    queryFn,
    transformFn,
    placeholder = "Select an option",
    defaultValue,
    onUpdate,
    outputTransformFn
}: DropdownSelectorProps) => {
    const { control, setValue } = useFormContext();
    const [dataItems, setDataItems] = useState<Item[]>(items || []);

    const { data: fetchedData } = useQuery({
        queryKey: queryKey ? [queryKey] : [],
        queryFn: queryFn,
        enabled: !!queryFn
    });

    useEffect(() => {
        if (defaultValue) {
            setValue(name, defaultValue);
        }
        if(items){
            setDataItems(items)
        }
    }, [defaultValue, name, setValue, items]);

    const handleValueChange = async (value: string| string[]) => {
        setValue(name, value);
        if (onUpdate) {
            await onUpdate(value);
        }
    };

    if(!!queryFn && transformFn){
        setDataItems(transformFn(fetchedData));
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Select
                    onValueChange={(value) => {
                        const outpu = outputTransformFn ? outputTransformFn?.(value) : value;
                        field.onChange(outpu);
                        handleValueChange(outpu);
                    }}
                    defaultValue={defaultValue}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {dataItems.map((item) => (
                            <SelectItem
                                key={item.value}
                                value={item.value}
                                className="cursor-pointer"
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        />
    );
};

export default DropdownSelector;
