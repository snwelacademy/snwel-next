'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useFieldArray, useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import slugify from "slugify"
import { DragHandleDots2Icon, PlusIcon } from "@radix-ui/react-icons"
import { Clock10, Notebook, Trash2 } from "lucide-react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Editor from "@/components/Editor"
import FileUploadModal from "@/components/modal/FileUploadModal"
import { AfterCourseCreatedModal } from "@/components/modal/AfterCourseCreated"
import CategorySelectorFormElement from "@/components/course-category/CategorySelector"
import TimeUnitSelector from "@/components/TimeUnitSelector"
import { MasterDropdown } from "@/components/master/master-dropdown"
import CourseTabBuilderForm from "./CourseTabBuilderForm"
import CourseInfoBuilder from "./CourseInfoBuilder"
import DraggableList from "@/components/DraggableList"
import { MultiSelectMaster } from "@/components/master/MultiSelectMaster"
import { WidgetDropDown } from "@/components/widget/widget-dropdown"

import { useToast } from "@/components/ui/use-toast"
import { createCourse, updateCourse } from "@/services/admin/admin-course-service"
import { Course, CourseInfoSchema, CourseTabSchema } from "@/types"
import { MASTER_CODES } from "@/types/master"

const createCourseSchema = z.object({
  image: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  shortDescription: z.string(),
  text: z.string(),
  courseDuration: z.string(),
  difficulty: z.string().optional(),
  certificate: z.boolean().optional().default(false),
  currency: z.string().optional(),
  price: z.number().default(0),
  isPremium: z.boolean().default(false),
  isPopular: z.boolean().default(false),
  categories: z.array(z.string()).default([]),
  appearence: z.object({
    themeColor: z.string().optional(),
    forgroundColor: z.string().optional(),
  }),
  images: z.object({
    promotionalCardImage: z.string().optional(),
    iconImage: z.string().optional(),
  }).optional(),
  qualifications: z.array(z.string()).default([]).optional(),
  trainingModes: z.array(z.string()).default([]).optional(),
  curriculum: z.array(
    z.object({
      title: z.string(),
      duration: z.string(),
      unit: z.string().optional(),
      curriculumType: z.any().optional(),
      classCount: z.string().optional(),
    })
  ).default([]),
  widget: z.string().optional(),
  content: z.object({
    tabs: z.array(CourseTabSchema),
    info: z.array(CourseInfoSchema),
    durationUnit: z.string().default("hour"),
    showPrice: z.boolean().default(true)
  }).optional(),
})

export default function MutateCourse({ 
  courseData, 
  currentStep, 
  setCurrentStep 
}: { 
  courseData?: Course
  currentStep?: number
  setCurrentStep?: (step: number) => void
}) {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof createCourseSchema>>({
    defaultValues: {
      difficulty: "begginer",
      price: 0,
      isPremium: false,
      isPopular: false,
      curriculum: [],
      content: {
        tabs: [],
        info: [],
      },
    },
    resolver: zodResolver(createCourseSchema),
  })

  const Watch = useWatch({ control: form.control })
  const { fields, append, remove, move } = useFieldArray({
    name: "curriculum",
    control: form.control,
  })

  const handleSubmit = async (value: z.infer<typeof createCourseSchema>) => {
    try {
      setLoading(true)
      if (courseData) {
        await updateCourse(courseData._id, value)
      } else {
        await createCourse(value)
        setOpen(true)
      }
      toast({
        title: `Course ${courseData ? "Updated" : "created"} successfully!`,
      })
    } catch (error: any) {
      toast({ title: `Error: ${error.message}` })
    } finally {
      setLoading(false)
    }
  }

  const onAddNew = () => {
    form.reset()
    setOpen(false)
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }
    move(result.source.index, result.destination.index)
  }

  useEffect(() => {
    if (Watch.title) {
      form.setValue("slug", slugify(Watch.title, { lower: true }))
    }
  }, [Watch.title, form])

  useEffect(() => {
    if (courseData) {
      Object.keys(courseData).forEach(key => {
        if (key === "categories") {
          form.setValue(key, courseData[key].map((ctg) => ctg._id))
        } else if (key === "curriculum") {
          form.setValue('curriculum', courseData[key].map(crc => ({
            ...crc,
            curriculumType: (typeof crc.curriculumType === 'object' && crc.curriculumType) ? crc.curriculumType['_id'] : crc.curriculumType
          })))
        } else if (key === "qualifications") {
          form.setValue('qualifications', courseData[key]?.map(crc => typeof crc === 'object' ? crc['_id'] : crc))
        } else if (key === "trainingModes") {
          form.setValue('trainingModes', courseData[key]?.map(crc => typeof crc === 'object' ? crc['_id'] : crc))
        } else {
          form.setValue(key as any, courseData[key as keyof Course])
        }
      })
    }
  }, [courseData, form])

  const activeTab = currentStep ? String(currentStep) : "1"
  const handleTabChange = (value: string) => {
    if (setCurrentStep) {
      setCurrentStep(Number(value))
    }
  }

  return (
    <div className="w-full">
      <AfterCourseCreatedModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onAddNew={onAddNew}
        loading={loading}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <Card>
              <CardContent className="pt-6">
                {/* Tab 1: Basic Info */}
                <TabsContent value="1" className="space-y-6 mt-0">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Basic Information</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter the essential details about your course
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Course Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input disabled placeholder="course-slug" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Brief description of the course" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Content</FormLabel>
                        <FormControl>
                          <Editor {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* Tab 2: Content */}
                <TabsContent value="2" className="space-y-6 mt-0">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Course Content & Curriculum</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Define your course structure and learning materials
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold mb-2">Tabs Content</h3>
                      <Separator className="mb-4" />
                      <CourseTabBuilderForm control={form.control} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Course Info</h3>
                      <Separator className="mb-4" />
                      <CourseInfoBuilder />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Curriculum</h3>
                    <Separator className="mb-4" />
                    <DraggableList
                      items={fields}
                      onDragEnd={onDragEnd}
                      renderItem={(item, index) => (
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <FormField
                            control={form.control}
                            name={`curriculum.${index}.title`}
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormControl>
                                  <Input placeholder="Title" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`curriculum.${index}.curriculumType`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <MasterDropdown
                                    type="SUB_MASTER"
                                    parentCode={MASTER_CODES.CURRICULUM_TYPE}
                                    selectorKey="_id"
                                    {...field}
                                    value={typeof field.value === 'string' ? field.value : field.value?._id}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`curriculum.${index}.classCount`}
                            render={({ field }) => (
                              <FormItem className="relative">
                                <FormControl>
                                  <Input
                                    className="pr-8"
                                    placeholder="Classes"
                                    type="number"
                                    {...field}
                                  />
                                </FormControl>
                                <Notebook className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`curriculum.${index}.duration`}
                            render={({ field }) => (
                              <FormItem className="relative">
                                <FormControl>
                                  <Input
                                    placeholder="Duration"
                                    type="number"
                                    className="pr-8"
                                    {...field}
                                  />
                                </FormControl>
                                <Clock10 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`curriculum.${index}.unit`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <TimeUnitSelector {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex items-center space-x-2">
                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              size="icon"
                              variant="ghost"
                              className="hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="cursor-move"
                            >
                              <DragHandleDots2Icon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full"
                      onClick={() => append({ title: "", duration: "0", classCount: "0" })}
                    >
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Curriculum
                    </Button>
                  </div>
                </TabsContent>

                {/* Tab 3: Media */}
                <TabsContent value="3" className="space-y-6 mt-0">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Media & Appearance</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload images and customize the visual appearance
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ImageUploadSection
                      value={Watch.image}
                      setValue={form.setValue}
                      label="Thumbnail Image"
                      fieldName="image"
                    />
                    <ImageUploadSection
                      value={Watch.images?.promotionalCardImage}
                      setValue={form.setValue}
                      label="Promotional Image"
                      fieldName="images.promotionalCardImage"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="appearence.themeColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Theme Color</FormLabel>
                          <FormControl>
                            <Input type="color" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="appearence.forgroundColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Foreground Color</FormLabel>
                          <FormControl>
                            <Input type="color"   {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                {/* Tab 4: Settings */}
                <TabsContent value="4" className="space-y-6 mt-0">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Course Settings</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure pricing, duration, and other course preferences
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="courseDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Course Duration</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Duration" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="content.durationUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration Unit</FormLabel>
                          <FormControl>
                            <TimeUnitSelector {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Price"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select course level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="begginer">Beginner</SelectItem>
                              <SelectItem value="intermidiate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="categories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categories</FormLabel>
                          <FormControl>
                            <CategorySelectorFormElement {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="qualifications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Qualifications</FormLabel>
                          <FormControl>
                            <MultiSelectMaster 
                              parentCode={MASTER_CODES.QUALIFICATIONS} 
                              type="SUB_MASTER" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="trainingModes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Training Mode</FormLabel>
                          <FormControl>
                            <MultiSelectMaster 
                              parentCode={MASTER_CODES.TRAINING_MODE} 
                              type="SUB_MASTER"  
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="widget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Widget</FormLabel>
                          <FormControl>
                            <WidgetDropDown {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <CheckboxField
                      control={form.control}
                      name="certificate"
                      label="Certificate"
                    />
                    <CheckboxField
                      control={form.control}
                      name="isPremium"
                      label="Premium Course"
                    />
                    <CheckboxField
                      control={form.control}
                      name="isPopular"
                      label="Mark As Popular"
                    />
                    <CheckboxField
                      control={form.control}
                      name="content.showPrice"
                      label="Show Price"
                    />
                  </div>
                </TabsContent>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep && setCurrentStep(Math.max(1, (currentStep || 1) - 1))}
                disabled={!currentStep || currentStep === 1}
              >
                Previous
              </Button>
              <div className="flex gap-2">
                {currentStep && currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep && setCurrentStep(Math.min(4, (currentStep || 1) + 1))}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button disabled={loading} type="submit">
                    {courseData ? "Update Course" : "Create Course"}
                  </Button>
                )}
              </div>
            </div>
          </Tabs>
        </form>
      </Form>
    </div>
  )
}

function ImageUploadSection({ value, setValue, label, fieldName }: { 
  value?: string, 
  setValue: any, 
  label: string, 
  fieldName: string 
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div
        className="rounded-lg border-2 border-dashed border-gray-300 p-4 flex items-center justify-center bg-center bg-cover aspect-video"
        style={{ backgroundImage: `url(${value})` }}
      >
        {value ? (
          <FileUploadModal
            trigger={<Button variant="secondary">Change Image</Button>}
            onChange={(path) => setValue(fieldName, path)}
          />
        ) : (
          <FileUploadModal
            trigger={<Button variant="secondary">Upload Image</Button>}
            onChange={(path) => setValue(fieldName, path)}
          />
        )}
      </div>
    </div>
  )
}

function CheckboxField({ control, name, label }: { control: any, name: string, label: string }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
          </div>
        </FormItem>
      )}
    />
  )
}