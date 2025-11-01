'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import  { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { createCourseCategory, updateCourseCategory, CreateCourseCategory, UpdateCourseCategory } from '@/types/CourseCategory'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Input } from '../ui/input'
import slugify from 'slugify'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { useToast } from '../ui/use-toast'
import { createCourseCategory as createCategory, updateCourseCategory as updateCategory } from '@/services/admin/course-category-service'
import CategorySelectorFormElement from './CategorySelector'
import { useQueryClient } from '@tanstack/react-query'

interface CourseCategoryFormProps {
    categoryData?: UpdateCourseCategory
}

const CourseCategoryForm = ({ categoryData }: CourseCategoryFormProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const client = useQueryClient();
    const form = useForm<z.infer<typeof createCourseCategory>>({
        defaultValues: {
            isPremium: false,
            isActive: false,
        },
        resolver: zodResolver(categoryData ? updateCourseCategory : createCourseCategory)
    });

    const watchFields = useWatch({ control: form.control });

    const handleSubmit = async (values: z.infer<typeof createCourseCategory>) => {
        try {
            setLoading(true);
            if (categoryData && categoryData._id) {
                await updateCategory(categoryData._id, values as UpdateCourseCategory);
                toast({ title: 'Category updated successfully!' });
            } else {
                await createCategory(values as CreateCourseCategory);
                toast({ title: 'Category created successfully!' });
            }
            client.invalidateQueries({queryKey: ['/admin/course-category']})
        } catch (error: any) {
            toast({ title: `Error: ${error.message}` });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (watchFields.title) {
            form.setValue('slug', slugify(watchFields.title, { lower: true }));
        }
    }, [watchFields.title, form]);

    useEffect(() => {
        if (categoryData) {
            Object.keys(categoryData).forEach((key: any) => {
                form.setValue(key, categoryData[key as keyof CreateCourseCategory]);
            });
        }
    }, [categoryData, form]);

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='mx-auto'>
                        <Card>
                            <CardHeader title={categoryData ? 'Update Category' : 'Create Category'} />
                            <CardContent className='space-y-4'>
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
                                                <Input placeholder="Short Description" {...field} />
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
                                                <Input placeholder="Description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parentCategory"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Parent Category</FormLabel>
                                            <FormControl>
                                               <CategorySelectorFormElement onChange={field.onChange} value={field.value || ''} singleMode />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isPremium"
                                    render={({ field }) => (
                                        <FormItem className='w-full flex items-center space-x-3'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel>Premium</FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {categoryData && (
                                    <FormField
                                        control={form.control}
                                        name="isActive"
                                        render={({ field }) => (
                                            <FormItem className='w-full flex items-center space-x-3'>
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormLabel>Active</FormLabel>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                <div className='flex justify-end pt-5'>
                                    <Button loading={loading} type='submit'>
                                        {categoryData ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CourseCategoryForm;
