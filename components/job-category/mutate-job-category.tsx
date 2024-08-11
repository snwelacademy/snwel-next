'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import slugify from 'slugify'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { createJobCategory, updateJobCategory } from '@/services/admin/admin-jobCategoryService'
import { Textarea } from '@/components/ui/textarea'

const createJobCategorySchema = z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
})

const MutateJobCategory = ({ data }: { data?: any }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast()
    const form = useForm<z.infer<typeof createJobCategorySchema>>({
        defaultValues: {
           
        },
        resolver: zodResolver(createJobCategorySchema)
    })
    const Watch = useWatch({ control: form.control });

    const handleSubmit = async (value: z.infer<typeof createJobCategorySchema>) => {
        try {
            setLoading(true);
            if (data) {
                await updateJobCategory(data._id, value);
            } else {
                await createJobCategory(value);
            }
            toast({ title: `Job Category ${data ? 'Updated' : 'created'} successfully!` })
        } catch (error: any) {
            toast({ title: `Error: ${error.message}` });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (Watch.name) {
            form.setValue('slug', slugify(Watch.name, { lower: true }));
        }
    }, [Watch.name])

    useEffect(() => {
        if (data) {
            Object.keys(data).map((key: any) => {
                form.setValue(key, data[key]);
            });
        }
    }, [data])

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='mx-auto'>
                        <Card>
                            <CardHeader />
                            <CardContent className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name..." {...field} />
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
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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

export default MutateJobCategory
