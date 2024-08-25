'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import slugify from 'slugify'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn, formatDate } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Calendar } from '../ui/calendar'
import { createJobVacancy, updateJobVacancy } from '@/services/admin/admin-jobVacancyService'
import { CreateJobVacancy, JobVacancyType, UpdateJobVacancy, createJobVacancySchema } from '@/types/JobVacancyTypes'
import DropdownSelector, { Item } from '../DropdownSelector'
import Editor from '../Editor'
import { useQuery } from '@tanstack/react-query'
import { getAllJobCategories } from '@/services/guestJobCategoryService'
import { Switch } from '../ui/switch'
import FileUploadModal from '../modal/FileUploadModal'


const MutateJobVacancy = ({ data }: { data?: JobVacancyType }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast()
    const form = useForm<z.infer<typeof createJobVacancySchema>>({
        defaultValues: {
            postedDate: new Date(),
            location: undefined
        },
        resolver: zodResolver(createJobVacancySchema)
    });
    const categories = useQuery({
        queryKey: ['/admin/job-categories'],
        queryFn: () => getAllJobCategories()
    });
    const Watch = useWatch({ control: form.control });

    const staticItems: Item[] = [
        { label: "Full Time", value: "full-time" },
        { label: "Part Time", value: "part-time" },
        { label: "Contract", value: "contract" },
        { label: "Temporary", value: "temporary" },
    ];
    const expLevel: Item[] = [
        { label: "Entry Level", value: "entry-level" },
        { label: "Mid Level", value: "mid-level" },
        { label: "Senior Level", value: "senior-level" },
    ];

    const handleSubmit = async (value: CreateJobVacancy | UpdateJobVacancy) => {
        try {
            setLoading(true);
            if (data) {
                await updateJobVacancy(data._id, value as UpdateJobVacancy);
            } else {
                await createJobVacancy(value as CreateJobVacancy);
            }
            toast({ title: `Job Vacancy ${data ? 'Updated' : 'created'} successfully!` })
        } catch (error: any) {
            toast({ title: `Error: ${error.message}` });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (Watch.title) {
            form.setValue('slug', slugify(Watch.title, { lower: true }));
        }
    }, [Watch.title])
    useEffect(() => {
        if (Watch.remoteWorkOption) {
            form.setValue('location', undefined);
        }
    }, [Watch.remoteWorkOption])

    useEffect(() => {
        if (data) {
            const custom: any = { ...data, applicationDeadline: new Date(data.applicationDeadline), postedDate: new Date(data?.postedDate||''), categories: data.categories.map(ctg => ctg._id) }
            Object.keys(custom).map((key: any) => {
                form.setValue(key, custom[key]);
            });
        }
    }, [data])

    useEffect(() => {
        console.log({ errors: form.formState.errors })
    }, [form.formState.errors])

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='mx-auto'>
                        <Card>
                            <CardHeader />
                            <CardContent className='space-y-4'>
                                <div className='flex gap-5'>

                                    <div className='space-y-2 flex-grow max-w-[200px]'>
                                        <label>Company Logo</label>
                                        <div className='rounded-2xl border-dashed border-gray-600 py-10 aspect-square max-w-[250px] border-2 flex items-center justify-center bg-center bg-cover' style={{ backgroundImage: `url(${Watch.companyLogo})` }}>
                                            {
                                                Watch.companyLogo ?
                                                    <FileUploadModal trigger={<Button>Change Image</Button>} onChange={path => form.setValue('companyLogo', path)} />
                                                    : <FileUploadModal trigger={<Button>Upload File</Button>} onChange={path => form.setValue('companyLogo', path)} />
                                            }
                                        </div>
                                    </div>

                                    <div className='space-y-5 flex-grow'>
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Title..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="slug"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel>Slug</FormLabel>
                                                    <FormControl>
                                                        <Input disabled placeholder="Slug" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Editor {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="requirements"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Requirements</FormLabel>
                                            <FormControl>
                                                <Editor {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-start gap-5'>
                                    <div className='space-y-5'>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Company Info</CardTitle>
                                            </CardHeader>
                                            <CardContent>

                                                <div className='space-y-5'>
                                                    <FormField
                                                        control={form.control}
                                                        name="companyName"
                                                        render={({ field }) => (
                                                            <FormItem className='w-full'>
                                                                <FormLabel>Company Name</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Company" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="contactInfo"
                                                        render={({ field }) => (
                                                            <FormItem className='w-full'>
                                                                <FormLabel>Contact Email</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Contact Email" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Job Info</CardTitle>
                                            </CardHeader>
                                            <CardContent className='space-y-5'>
                                                <FormField
                                                    control={form.control}
                                                    name="salaryRange"
                                                    render={({ field }) => (
                                                        <FormItem className='w-full'>
                                                            <FormLabel>Salary Range</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Salary Range" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormItem className='w-full'>
                                                    <FormLabel>Employment Type</FormLabel>
                                                    <DropdownSelector
                                                        name="employmentType"
                                                        items={staticItems}
                                                        placeholder="Choose Employment Type"
                                                    />
                                                    <FormMessage />
                                                </FormItem>

                                                <FormItem className='w-full'>
                                                    <FormLabel>Category</FormLabel>
                                                    <DropdownSelector
                                                        name="categories"
                                                        items={categories?.data?.docs?.map(ctg => ({ label: ctg.name, value: ctg._id }))}
                                                        placeholder="Select Job Category"
                                                        outputTransformFn={(value) => ([value])}
                                                    />
                                                    <FormMessage />
                                                </FormItem>

                                                <FormItem className='w-full'>
                                                    <FormLabel>Employment Type</FormLabel>
                                                    <DropdownSelector
                                                        name="experienceLevel"
                                                        items={expLevel}
                                                        placeholder="Choose Experience Level"
                                                    />
                                                    <FormMessage />
                                                </FormItem>

                                                <FormField
                                                    control={form.control}
                                                    name="applicationDeadline"
                                                    render={({ field }) => (
                                                        <FormItem className='w-full'>
                                                            <FormLabel>Application Deadline</FormLabel>
                                                            <br />
                                                            <FormControl>
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <FormControl>
                                                                            <Button
                                                                                variant={"outline"}
                                                                                className={cn(
                                                                                    "w-[240px] pl-3 text-left font-normal",
                                                                                    !field.value && "text-muted-foreground"
                                                                                )}
                                                                            >
                                                                                {field.value ? (
                                                                                    formatDate(field.value, "DD/MM/YYYY")
                                                                                ) : (
                                                                                    <span>Pick a date</span>
                                                                                )}
                                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto p-0" align="start">
                                                                        <Calendar
                                                                            mode="single"
                                                                            selected={field.value}
                                                                            onSelect={field.onChange}
                                                                            initialFocus
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Job Location</CardTitle>
                                            </CardHeader>

                                            <CardContent>
                                                <div className='space-y-5'>
                                                    <FormField
                                                        control={form.control}
                                                        name="remoteWorkOption"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                                                                <div className="space-y-0.5">
                                                                    <FormLabel>Remote Work</FormLabel>
                                                                    <FormDescription>
                                                                        When the &quot;Remote Job&quot; option is selected, the admin is not required to fill out the location form field.
                                                                    </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {
                                                        !Watch.remoteWorkOption &&
                                                        <div className='space-y-5'>
                                                            <FormField
                                                                control={form.control}
                                                                name="location.country"
                                                                render={({ field }) => (
                                                                    <FormItem className='w-full'>
                                                                        <FormLabel>Country</FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="Country" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="location.state"
                                                                render={({ field }) => (
                                                                    <FormItem className='w-full'>
                                                                        <FormLabel>State</FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="State" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="location.city"
                                                                render={({ field }) => (
                                                                    <FormItem className='w-full'>
                                                                        <FormLabel>City</FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="City" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="location.address"
                                                                render={({ field }) => (
                                                                    <FormItem className='w-full'>
                                                                        <FormLabel>Address</FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="Address" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="location.zipcode"
                                                                render={({ field }) => (
                                                                    <FormItem className='w-full'>
                                                                        <FormLabel>Zipcode</FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="Zipcode" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    }
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                                <div className='flex justify-end pt-5'>
                                    <Button disabled={loading} type='submit'>{data ? "Update" : "Create"}</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default MutateJobVacancy
