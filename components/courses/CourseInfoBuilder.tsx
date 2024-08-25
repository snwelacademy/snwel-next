'use client'
import { Course } from "@/types";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { PlusIcon, Trash2 } from "lucide-react";
import { useEffect } from "react";
import FileUploadModal from "../modal/FileUploadModal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon, DragHandleDots2Icon } from "@radix-ui/react-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";

const courseBuiltinKeys: Record<keyof Course | string, string> = {
  categories: "Course Categories",
  lessons: "Lessons",
  duration: "Duration",
  price: "Price",
  certificate: "Certificate",
  isPremium: "Job Gaurantee",
  rating: "Course Rating",
};
const courseInfoItemType: Record<string, string> = {
  PREBUILT: "Prebuilt Info",
  CUSTOM: "Custom Info",
  VIDEO_LINK: "Video Link",
  IMAGE_LINK: "Image Link",
  LINK: "Link",
};

const CourseInfoBuilder = () => {
  const form = useFormContext();
  const watch = useWatch({ control: form.control });
  const { fields, remove, append, move } = useFieldArray({
    name: "content.info",
    control: form.control,
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    move(result.source.index, result.destination.index);
  };

  // useEffect(() => {
  //   console.log({
  //     state: form.getValues(),
  //     fields,
  //     error: form.formState.errors,
  //   });
  // }, [form.formState]);
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
                <Draggable key={field.id} draggableId={field.id} index={index}>
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
                            {watch.content?.info[index]?.lable}
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
                        <div className="flex items-center gap-5">
                          <FormField
                            control={form.control}
                            name={`content.info.${index}.lable`}
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormControl>
                                  <Input placeholder="Tab Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`content.info.${index}.isActive`}
                            render={({ field }) => (
                              <FormItem className="">
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
                        </div>

                        <div className="flex items-center gap-5">
                          <FormField
                            control={form.control}
                            name={`content.info.${index}.type`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <Select
                                  onValueChange={(e) => {
                                    form.setValue(
                                      `content.info.${index}.value`,
                                      undefined
                                    );
                                    field.onChange(e);
                                  }}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full max-w-full">
                                      <SelectValue placeholder="Select Course Keys" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {Object.entries(courseInfoItemType).map(
                                      ([key, value]) => {
                                        return (
                                          <SelectItem
                                            key={`${key}-${value}`}
                                            value={key}
                                          >
                                            {value}
                                          </SelectItem>
                                        );
                                      }
                                    )}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {watch.content?.info?.length &&
                            watch.content?.info[index]?.type === "PREBUILT" && (
                              <FormField
                                control={form.control}
                                name={`content.info.${index}.value`}
                                render={({ field }) => (
                                  <FormItem className="w-full">
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select Key" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {Object.entries(courseBuiltinKeys).map(
                                          ([key, value]) => {
                                            return (
                                              <SelectItem
                                                key={`${key}-${value}`}
                                                value={key}
                                              >
                                                {value}
                                              </SelectItem>
                                            );
                                          }
                                        )}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}

                          {watch.content?.info?.length &&
                            watch.content?.info[index]?.type === "CUSTOM" && (
                              <div className="w-full">
                                <FormField
                                  control={form.control}
                                  name={`content.info.${index}.value`}
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormControl>
                                        <Input
                                          placeholder="Add Custom Text"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}
                          {watch.content?.info?.length &&
                            ["VIDEO_LINK"].includes(
                              watch.content?.info[index]?.type
                            ) && (
                              <div className="w-full">
                                <FormField
                                  control={form.control}
                                  name={`content.info.${index}.value`}
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormControl>
                                        <Input
                                          placeholder="Add Youtube Video Id"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}

                          {watch.content?.info?.length &&
                            ["LINK"].includes(
                              watch.content?.info[index]?.type
                            ) && (
                              <div className="w-full">
                                <FormField
                                  control={form.control}
                                  name={`content.info.${index}.style.linkStyle`}
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Link Style" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value={"button"}>
                                            Button
                                          </SelectItem>
                                          <SelectItem value={"text-link"}>
                                            Text Link
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}

                          {watch.content?.info?.length &&
                            ["IMAGE_LINK"].includes(
                              watch.content?.info[index]?.type
                            ) && (
                              <div className="w-full">
                                {watch.content?.info[index]?.value ? (
                                  <FileUploadModal
                                    trigger={
                                      <Button className="w-full">
                                        Change Image
                                      </Button>
                                    }
                                    onChange={(path) =>
                                      form.setValue(
                                        `content.info.${index}.value`,
                                        path
                                      )
                                    }
                                  />
                                ) : (
                                  <FileUploadModal
                                    trigger={
                                      <Button className="w-full">
                                        Upload File
                                      </Button>
                                    }
                                    onChange={(path) =>
                                      form.setValue(
                                        `content.info.${index}.value`,
                                        path
                                      )
                                    }
                                  />
                                )}
                              </div>
                            )}
                        </div>

                        {watch.content?.info?.length &&
                          ["IMAGE_LINK"].includes(
                            watch.content?.info[index]?.type
                          ) && (
                            <div className="w-full">
                                <FormField
                                  control={form.control}
                                  name={`content.info.${index}.imageLink`}
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormControl>
                                        <Input
                                          placeholder="External URL"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                          )}

                        {watch.content?.info?.length &&
                          ["LINK"].includes(
                            watch.content?.info[index]?.type
                          ) && (
                            <>
                              <div className="flex items-center gap-5">
                                <div className="w-full">
                                  <FormField
                                    control={form.control}
                                    name={`content.info.${index}.style.name`}
                                    render={({ field }) => (
                                      <FormItem className="w-full">
                                        <FormControl>
                                          <Input
                                            placeholder="Name"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <div className="w-full">
                                  <FormField
                                    control={form.control}
                                    name={`content.info.${index}.style.linkType`}
                                    render={({ field }) => (
                                      <FormItem className="w-full">
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger className="w-full">
                                              <SelectValue placeholder="Select Link Type" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value={"external"}>
                                              External
                                            </SelectItem>
                                            <SelectItem value={"internal"}>
                                              Internal
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>

                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="w-full">
                                <FormField
                                  control={form.control}
                                  name={`content.info.${index}.value`}
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormControl>
                                        <Input
                                          placeholder="Link URL"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </>
                          )}
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
                onClick={() =>
                  append({
                    lable: `Info ${fields.length + 1}`,
                    type: "PREBUILT",
                    style: {
                      linkType: 'external',
                      name: `Link ${fields.length + 1}`,
                      linkStyle: 'text-link'
                    }
                  })
                }
              >
                <PlusIcon className="mr-2" />
                Add Info
              </Button>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CourseInfoBuilder;
