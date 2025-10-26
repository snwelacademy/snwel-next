'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Input } from '../ui/input'
import slugify from 'slugify'
import { Textarea } from '../ui/textarea'
import Editor from '../Editor'
import FileUploadModal from '../modal/FileUploadModal'
import { Button } from '../ui/button'
import { Webinar } from '@/types'
import { useToast } from '../ui/use-toast'
import { AfterCourseCreatedModal } from '../modal/AfterCourseCreated'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn, formatDate } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Calendar } from '../ui/calendar'
import UserSelectorFormElement from '../shared/UserSelectorFormElement'

import { createWebinar, updateWebinar } from '@/services/admin/webinar-service'
import { useSession } from 'next-auth/react'

const createWebinarSchema = z.object({
    thumbnail: z.string().optional(),
    title: z.string(),
    slug: z.string(),
    shortDescription: z.string(),
    content: z.string(),
    startDate: z.date(),
    hosts: z.array(z.string()).optional().default([]),
    currency: z.string().optional(),
    price: z.number().default(0),
    createdBy: z.string(),
    coverImage: z.string().optional(),
    videoUrl: z.string().optional().nullable()
})


const MutateWebinar = ({ data }: { data?: Webinar }) => {
    const { data:currentUser } = useSession()
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast()
    const form = useForm<z.infer<typeof createWebinarSchema>>({
        defaultValues: {
            currency: 'INR',
            createdBy: currentUser?.user.id,
            price: 0
        },
        resolver: zodResolver(createWebinarSchema)
    })
    const Watch = useWatch({ control: form.control });
    const handleSubmit = async (value: z.infer<typeof createWebinarSchema>) => {
        // console.log({value});
        // return;
        try {
            setLoading(true);
            if (data) {
                await updateWebinar(data._id, value);
            } else {
                await createWebinar(value);
                setOpen(true)
            }
            toast({ title: `Webinar ${data ? 'Updated' : 'created'} successfully!`, variant:'success' })
        } catch (error: any) {
            toast({ title: `Error: ${error.message}` });
        } finally {
            setLoading(false);
        }
    }

    const onAddNew = () => {
        form.reset();
        setOpen(false)
    }

    useEffect(() => {
        if (Watch.title) {
            form.setValue('slug', slugify(Watch.title, { lower: true }));
        }
    }, [Watch.title])



    useEffect(() => {
        if (data) {
           const custom: any = {...data,startDate: new Date(data.startDate), createdBy: data.createdBy?._id, hosts: data.hosts.map(h => h?._id)}
            Object.keys(custom).map((key: any) => {
                form.setValue(key, custom[key]);
            });
        }
    }, [data])

    useEffect(() => {
      form.setValue('createdBy', currentUser?.user.id||"")
    }, [currentUser])
    

    
    useEffect(() => {
      console.log(form.formState.errors, currentUser)
    }, [form.formState.errors])
    

    return (
        <div>
            {/* <AfterCourseCreatedModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onAddNew={onAddNew}
                loading={loading}
            /> */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='mx-auto'>
                        <Card>
                            <CardHeader />
                            <CardContent className='space-y-4'>
                           
                               <div className="flex items-center gap-5">
                               <div className='rounded-2xl w-full border-dashed border-gray-600 py-10 aspect-square max-w-sm border-2 flex items-center justify-center bg-center bg-cover' style={{ backgroundImage: `url(${Watch.thumbnail})` }}>
                                    {
                                        Watch.thumbnail ?
                                            <FileUploadModal trigger={<Button>Change Image</Button>} onChange={path => form.setValue('thumbnail', path)} />
                                            : <FileUploadModal trigger={<Button>Upload File</Button>} onChange={path => form.setValue('thumbnail', path)} />
                                    }
                                </div>
                                <div className='rounded-2xl w-full border-dashed border-gray-600 py-10 aspect-square max-w-sm border-2 flex items-center justify-center bg-center bg-cover' style={{ backgroundImage: `url(${Watch.coverImage})` }}>
                                    {
                                        Watch.thumbnail ?
                                            <FileUploadModal trigger={<Button>Change Image</Button>} onChange={path => form.setValue('coverImage', path)} />
                                            : <FileUploadModal trigger={<Button>Upload File</Button>} onChange={path => form.setValue('coverImage', path)} />
                                    }
                                </div>
                               </div>
                                <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
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
                                <FormField
                                    control={form.control}
                                    name="shortDescription"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Short Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Short Description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Webinar Content</FormLabel>
                                            <FormControl>
                                                <Editor {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>

                                    <FormField
                                        control={form.control}
                                        name="startDate"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Start Date</FormLabel>
                                                <br></br>
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
                                                                // disabled={(date: Date) =>
                                                                //     date > new Date() || date < new Date("1994-01-01")
                                                                // }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Webinar Price</FormLabel>
                                                <FormControl>
                                                    <Input type='number' placeholder="Webinar Price" {...field} onChange={val => field.onChange(Number(val.target.value))} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="videoUrl"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Intro Video URL (YouTube)</FormLabel>
                                                <FormControl>
                                                    <Input type='url' placeholder="https://youtu.be/O98fT..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hosts"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Hosts</FormLabel>
                                                <UserSelectorFormElement onChange={field.onChange} value={field.value} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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

export default MutateWebinar