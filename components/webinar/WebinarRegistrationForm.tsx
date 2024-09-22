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
import Typography from '../typography';
import { cn } from '@/lib/utils';


const formSchema = z.object({
    name: z.string().min(3, {message: "Write atleast 3 letter"}),
    email: z.string().email(),
    phone: z.string(),
})

const WebinarRegistrationForm = ({ className }: { className?: string }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {}
    });


    function onSubmit(value: z.infer<typeof formSchema>) {

    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn(["space-y-3 rounded-2xl p-4 md:p-10", className])}>
               
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Name*</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                <div className='pt-5 space-y-3'>
                    <Button type="submit" size={'lg'} className='w-full'>Register</Button>
                    <Typography as="lable" className='text-primary block'>By sharing your email, you agree to our Privacy Policy and Terms and Service.</Typography>
                </div>
            </form>
        </Form>
    )
}

export default WebinarRegistrationForm