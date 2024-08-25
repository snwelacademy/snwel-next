'use client'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { PlusIcon, Trash2 } from 'lucide-react';
import { CourseTabContentType } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Editor from '../Editor';
import { PrebuiltComponent } from '@/data/prebuiltComponents';
import { Switch } from '../ui/switch';
import { ScrollArea } from '../ui/scroll-area';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { nanoid } from 'nanoid';
import { Collapsible } from '@radix-ui/react-collapsible';
import { cn } from '@/lib/utils';
import { CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { CaretSortIcon, DragHandleDots2Icon } from '@radix-ui/react-icons';


const courseContentType: Record<string, CourseTabContentType> = {
    'Builtin Component': 'COMPONENT',
    "Rich Text Editor": 'RICH_TEXT'
}


const CourseTabBuilderForm = ({ control }: { control: any }) => {
    const form = useFormContext();
    const { fields, append, remove, move } = useFieldArray({ name: "content.tabs", control });
    const watch = useWatch({ control: form.control });

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        move(result.source.index, result.destination.index);
    };

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={nanoid()}>
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-2"
                        >
                            {fields.map((field, index) => (
                                <Draggable key={field.id} draggableId={field.id} index={index} >
                                    {(provided, snapshot) => (
                                        <Collapsible
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className={cn([
                                                'shadow-md rounded-2xl border p-2 active:cursor-grab draggable-item',
                                                {
                                                    'shadow-2xl': snapshot.isDragging
                                                }
                                            ])}

                                        >

                                            <div className="flex items-center justify-between space-x-4">
                                                <div className="flex items-center gap-2">
                                                    <CollapsibleTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <CaretSortIcon className="h-5 w-5" />
                                                            <span className="sr-only">Toggle</span>
                                                        </Button>
                                                    </CollapsibleTrigger>
                                                    <h4 className="text-sm font-semibold">
                                                        {watch.content.tabs[index]?.name}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        className="hover:bg-red-200 handle"
                                                        size={"icon"}
                                                        variant={"ghost"}
                                                    >
                                                        <DragHandleDots2Icon className="text-red-600 w-5 h-5" />
                                                    </Button>
                                                    <Button
                                                        className="hover:bg-red-200"
                                                        onClick={() => remove(index)}
                                                        size={"icon"}
                                                        variant={"ghost"}
                                                    >
                                                        <Trash2 className="text-red-600 w-5 h-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <CollapsibleContent className="space-y-3 p-3 overflow-hidden">
                                            {/* <div className='space-y-3 p-3 border shadow-md rounded-2xl overflow-hidden' key={field.id}> */}
                                                <div className='flex items-center gap-5'>
                                                    <FormField
                                                        control={control}
                                                        name={`content.tabs.${index}.name`}
                                                        render={({ field: inp }) => (
                                                            <FormItem className='flex-grow'>
                                                                <FormControl>
                                                                    <Input placeholder='Tab Name'  {...inp} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`content.tabs.${index}.contentType`}
                                                        render={({ field }) => (
                                                            <FormItem className=''>
                                                                <Select onValueChange={e => {
                                                                    form.setValue(`content.tabs.${index}.content`, undefined);
                                                                    field.onChange(e);
                                                                }} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="w-[180px]">
                                                                            <SelectValue placeholder="Select Tab content type" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {
                                                                            Object.entries(courseContentType).map(([key, value]) => {
                                                                                return <SelectItem key={`${key}-${value}`} value={value}>{key}</SelectItem>
                                                                            })
                                                                        }
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {
                                                        watch.content?.tabs[index]?.contentType === courseContentType["Builtin Component"] &&

                                                        <FormField
                                                            control={form.control}
                                                            name={`content.tabs.${index}.content`}
                                                            render={({ field }) => (
                                                                <FormItem className=''>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger className="w-[180px]">
                                                                                <SelectValue placeholder="Select Component" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            {
                                                                                Object.entries(PrebuiltComponent).map(([key, value]) => {
                                                                                    return <SelectItem key={`${key}-${value}`} value={key}>{value.label}</SelectItem>
                                                                                })
                                                                            }
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />


                                                    }

                                                    <FormField
                                                        control={form.control}
                                                        name={`content.tabs.${index}.isActive`}
                                                        render={({ field }) => (
                                                            <FormItem className=''>
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <Button className='hover:bg-red-200' onClick={() => remove(index)} size={'icon'} variant={'ghost'}><Trash2 className='text-red-600' /></Button>
                                                </div>

                                                {
                                                    watch.content?.tabs[index]?.contentType === courseContentType["Rich Text Editor"] &&
                                                    <div className='w-full'>
                                                        <FormField
                                                            control={form.control}
                                                            name={`content.tabs.${index}.content`}
                                                            render={({ field }) => (
                                                                <FormItem className='w-full'>
                                                                    <FormControl>
                                                                        <ScrollArea className="h-[400px] rounded-md border p-4">
                                                                            <Editor {...field} />
                                                                        </ScrollArea>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                    </div>
                                                }
                                            {/* </div> */}
                                            </CollapsibleContent>
                                        </Collapsible>
                                    )}
                                </Draggable>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2 border-dashed border-spacing-3 w-full"
                                onClick={() => append({ name: `Tab ${fields.length + 1}`, contentType: courseContentType["Rich Text Editor"] })}
                            >
                                <PlusIcon className='mr-2' />
                                Add Tabs
                            </Button>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default CourseTabBuilderForm