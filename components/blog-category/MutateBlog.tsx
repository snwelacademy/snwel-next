'use client'

import { useState, useMemo, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useToast } from '../ui/use-toast'
import { createBlogCategory, updateBlogCategory } from '@/services/admin/admin-category-service'
import { BlogCategory } from '@/types/BlogCategory'
import slugify from 'slugify'


const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  slug: z.string().min(2, {
    message: 'Slug must be at least 2 characters.',
  }),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
})

type FormValues = z.infer<typeof formSchema>

interface BlogCategoryFormProps {
  category?: BlogCategory
  onSubmit: (data: FormValues) => void
}

function BlogCategoryForm({ category, onSubmit }: BlogCategoryFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      return {
        name: category?.name || '',
        slug: category?.slug || '',
        description: category?.description || '',
        isActive: category?.isActive ?? true,
      }
    }, [category]),
  })

  const watch = useWatch({control: form.control});

  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      await onSubmit(data)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsLoading(false)
    }
  }

useEffect(() => {
    form.setValue('slug', watch.name ? slugify(watch.name) : '');
}, [watch.name])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormDescription>This is the name of your blog category.</FormDescription>
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
                <Input placeholder="Enter category slug" {...field} />
              </FormControl>
              <FormDescription>This is the URL-friendly version of the name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter category description" {...field} />
              </FormControl>
              <FormDescription>Provide a brief description of the category (optional).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active</FormLabel>
                <FormDescription>
                  This category will be visible on the site when active.
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : category ? 'Update Category' : 'Create Category'}
        </Button>
      </form>
    </Form>
  )
}

interface BlogCategoryFormSheetProps {
  category?: BlogCategory
  onSubmit?: (data: FormValues) => void
  triggerButton: React.ReactNode
}

export default function BlogCategoryFormSheet({ category, onSubmit, triggerButton }: BlogCategoryFormSheetProps) {
    const [loading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {toast} = useToast();

  const handleSubmit = async (data: FormValues) => {
    try {
        setIsLoading(true);
        if(category){
            const res = await updateBlogCategory(category._id, data)
        }else{
            const res = await createBlogCategory(data as BlogCategory) 
        }
        toast({title: "Category saved successfully!"})
        onSubmit?.(data)
    setIsOpen(false)
    } catch (error) {
        toast({
            title: "Problem in saving category"
        })
    } finally{
        setIsOpen(false);
        setIsLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {triggerButton}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{category ? 'Update Category' : 'Create New Category'}</SheetTitle>
          <SheetDescription>
            {category ? 'Update the details of your blog category.' : 'Add a new category to your blog.'}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <BlogCategoryForm category={category} onSubmit={handleSubmit} />
        </div>
      </SheetContent>
    </Sheet>
  )
}