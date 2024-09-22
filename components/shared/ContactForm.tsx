'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CourseSelector from './CourseSelector';
import Typography from '../typography';
import { cn } from '@/lib/utils';


const formSchema = z.object({
    firstName: z.string().min(2, { message: "Firstname must be at least 2 characters." }),
    lastName: z.string().optional(),
    email: z.string().email(),
    phone: z.string(),
    course: z.string()
})

const ContactForm = ({ className }: { className?: string }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {}
    });


    function onSubmit(value: z.infer<typeof formSchema>) {
   
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn(["space-y-3 rounded-2xl p-4 md:p-10", className])}>
                <div className='flex-col md:flex-row flex items-center gap-5'>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="First Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='flex-col md:flex-row flex items-center gap-5 '>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Mobile Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mobile Number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Our Course</FormLabel>
                            <FormControl>
                                <CourseSelector {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='pt-5 space-y-3'>
                    <Button type="submit" size={'lg'} className='w-full'>Submit A Query</Button>
                    <Typography as="lable" className='text-primary block'>By sharing your email, you agree to our Privacy Policy and Terms and Service.</Typography>
                </div>
            </form>
        </Form>
    )
}

export default ContactForm