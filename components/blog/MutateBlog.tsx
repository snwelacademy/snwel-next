'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Image as ImageIcon, Settings, ChevronLeft } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import FileManagerPopup from '@/components/modal/FileManager'
import { useToast } from '@/components/ui/use-toast'
import Pragraph from '@yoopta/paragraph';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import dynamic from 'next/dynamic'
import { Blog } from '@/types'
import { createBlog, updateBlog } from '@/services/admin/admin-blog-service'
import { CategorySelector } from '../blog-category/CategorySelector'
import { MultiChipInput } from '../ui/chip-input'
import slugify from 'slugify'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const BlogEditor = dynamic(() => import('./editor/BlogEditor'), { ssr: false })

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.any(), // YoptaEditor returns a complex object, so we use any here
    excerpt: z.string().max(300, "Excerpt should be less than 300 characters"),
    category: z.string().optional().nullable(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    published: z.boolean(),
    seo: z.object({
        metaTitle: z.string().max(60, "Meta title should be less than 60 characters"),
        metaDescription: z.string().max(160, "Meta description should be less than 160 characters"),
        urlSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid URL slug format"),
    }),
    author: z.string().optional()
})

export default function ModernBlogCreator({ blogData }: { blogData?: Blog }) {
    const { toast } = useToast()
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            content: '',
            excerpt: '',
            category: null,
            tags: [],
            coverImage: '',
            published: false,
            seo: {
                metaTitle: '',
                metaDescription: '',
                urlSlug: '',
            },
            author: session?.user.id || ''
        },
    })

    const handleImageUpload = (values: string[]) => {
        form.setValue('coverImage', values[0])
    }

    const watch = useWatch({ control: form.control })

    const handleSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            // Transform for backend expectations
            const payload: any = {
                ...value,
                status: value.published ? 'PUBLISHED' : 'DRAFT',
            }
            if (blogData) {
                await updateBlog((blogData as any)._id, payload);
            } else {
                await createBlog(payload)
            }
            toast({
                title: `Blog ${blogData ? "Updated" : "created"} successfully!`,
            });
            router.push('/admin/blog');
        } catch (error: any) {
            toast({ title: `Error: ${error.message}` });
        } finally {
            setLoading(false);
        }
    };

    const editorConfig = {
        placeholder: 'Start writing your blog post...',
        autofocus: true,
        // tools: {
        //   header: {
        //     class: Header,
        //     inlineToolbar: ['link'],
        //     config: {
        //       placeholder: 'Enter a header',
        //       levels: [2, 3, 4],
        //       defaultLevel: 3
        //     }
        //   },
        //   list: {
        //     class: List,
        //     inlineToolbar: true,
        //   },
        //   image: {
        //     class: ImageTool,
        //     config: {
        //       endpoints: {
        //         byFile: 'http://localhost:8008/uploadFile', // Replace with your image upload endpoint
        //         byUrl: 'http://localhost:8008/fetchUrl', // Replace with your image fetch endpoint
        //       }
        //     }
        //   },
        //   quote: {
        //     class: Quote,
        //     inlineToolbar: true,
        //     shortcut: 'CMD+SHIFT+O',
        //     config: {
        //       quotePlaceholder: 'Enter a quote',
        //       captionPlaceholder: 'Quote\'s author',
        //     },
        //   },
        //   code: {
        //     class: CodeTool,
        //   },
        //   delimiter: Delimiter,
        //   inlineCode: {
        //     class: InlineCode,
        //     shortcut: 'CMD+SHIFT+M',
        //   },
        //   linkTool: {
        //     class: LinkTool,
        //     config: {
        //       endpoint: 'http://localhost:8008/fetchUrl', // Replace with your link data fetching endpoint
        //     }
        //   },
        //   embed: Embed,
        //   table: {
        //     class: Table,
        //     inlineToolbar: true,
        //     config: {
        //       rows: 2,
        //       cols: 3,
        //     },
        //   },
        // },
    }

    useEffect(() => {
        if (blogData) {
            // Basic fields
            form.setValue('title', (blogData as any).title || '')
            form.setValue('content', (blogData as any).content || '')
            form.setValue('excerpt', (blogData as any).excerpt || '')
            // Category may be id or object
            const categoryId = (blogData as any).category?._id || (blogData as any).category || null
            form.setValue('category', categoryId)
            // Tags could be array of strings
            form.setValue('tags', (blogData as any).tags || [])
            form.setValue('coverImage', (blogData as any).coverImage || '')
            // Published/status mapping
            const published = typeof (blogData as any).published === 'boolean'
                ? (blogData as any).published
                : ((blogData as any).status === 'PUBLISHED')
            form.setValue('published', published)
            // SEO mapping
            const slug = (blogData as any).slug || ''
            form.setValue('seo.metaTitle', (blogData as any).seo?.metaTitle || (blogData as any).title || '')
            form.setValue('seo.metaDescription', (blogData as any).seo?.metaDescription || (blogData as any).excerpt || '')
            form.setValue('seo.urlSlug', slug)
            // Author
            const authorId = (blogData as any).author?._id || (blogData as any).author || ''
            form.setValue('author', authorId)
        }
    }, [blogData])

    useEffect(() => {
        console.log(form.formState.errors)
    }, [form.formState])


    useEffect(() => {
        form.setValue("seo.urlSlug", slugify(watch?.title || '', {lower: true}))

    }, [watch.title])

    return (
        <div className="min-h-screen bg-gray-100">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    {/* Header */}
                    <header className="bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <Button variant="ghost" size="icon" type='button' onClick={() => router.back()}>
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                                <h1 className="ml-4 text-xl font-semibold text-gray-900">{blogData ? "Update Blog Post" : "Create New Blog Post"}</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FormField
                                    control={form.control}
                                    name="published"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel className="text-sm font-medium text-gray-700">
                                                {field.value ? 'Published' : 'Draft'}
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">
                                    {form.watch('published') ? 'Update' : 'Publish'}
                                </Button>
                            </div>
                        </div>
                    </header>

                    {/* Main content */}
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex gap-8">
                            {/* Editor */}
                            <div className="flex-1 space-y-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your blog post title"
                                                    className="text-4xl font-bold border-none bg-transparent placeholder-gray-400 focus:outline-none focus:ring-0"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="relative">
                                    <FileManagerPopup
                                        multiSelect={false}
                                        onChange={handleImageUpload}
                                        trigger={
                                            <div>
                                                {form.watch('coverImage') ? (
                                                    <img src={form.watch('coverImage')} alt="Cover" className="w-full h-64 object-cover rounded-lg" />
                                                ) : (
                                                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                                        <label htmlFor="coverImage" className="cursor-pointer flex flex-col items-center">
                                                            <ImageIcon className="h-12 w-12 text-gray-400" />
                                                            <span className="mt-2 text-sm text-gray-500">Add cover image</span>
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        }
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <BlogEditor
                                                    defaultValue={blogData?.content}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Sidebar */}
                            <div className="w-80  space-y-6">
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h2 className="text-lg font-semibold mb-4">Post Settings</h2>
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="excerpt"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Excerpt</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            placeholder="Write a short excerpt..."
                                                            className="mt-1"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Category</FormLabel>
                                                    {/* <Select onValueChange={field.onChange} defaultValue={field.value||''}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a category" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="technology">Technology</SelectItem>
                                                            <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                                            <SelectItem value="travel">Travel</SelectItem>
                                                            <SelectItem value="food">Food</SelectItem>
                                                        </SelectContent>
                                                    </Select> */}
                                                    <CategorySelector onSelect={field.onChange} selectedCategoryId={field.value || ''} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tags"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tags</FormLabel>
                                                    <FormControl>
                                                        <MultiChipInput
                                                            placeholder="Enter tags"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="seo-settings">
                                            <AccordionTrigger>
                                                <div className="flex items-center">
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    SEO Settings
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="space-y-4 mt-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="seo.metaTitle"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Meta Title</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Enter meta title"
                                                                        className="mt-1"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="seo.metaDescription"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Meta Description</FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        {...field}
                                                                        placeholder="Enter meta description"
                                                                        className="mt-1"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="seo.urlSlug"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>URL Slug</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Enter URL slug"
                                                                        className="mt-1"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </main>
                </form>
            </Form>
        </div>
    )
}