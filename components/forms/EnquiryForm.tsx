'use client'

/* eslint-disable react-hooks/exhaustive-deps */

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { CreateEnquirySchema, enquirySchema } from "@/types/EnquiryTypes";
import { useQueryClient } from '@tanstack/react-query';
import WebinarEnquirySubForm from './WebinarEnquiryForm';
import GeneralEnquirySubForm from './GeneralEnquiryForm';
import { createEnquiry } from '@/services/enquiry-service';

const EnquiryForm = ({ type, isUnique }: { type: string, isUnique?: boolean }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const client = useQueryClient();
    const { toast } = useToast();

    const form = useForm<CreateEnquirySchema>({
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            message: '',
            type: type,
            isUnique: isUnique || false,
            extraInfo: type === 'webinar' ? { webinarId: '', location: { country: '', city: '', state: '', address: '' } } : {}
        },
        resolver: zodResolver(enquirySchema)
    });

    const handleSubmit = async (value: CreateEnquirySchema) => {
        try {
            setLoading(true);
            await createEnquiry(value);
            toast({ title: 'Enquiry submitted successfully!', variant: 'success' });
            client.invalidateQueries({ queryKey: ['enquiries'] });
            form.reset();
        } catch (error: any) {
            toast({ title: `${error.message}`, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='mx-auto'>
                        <Card className='bg-secondary'>
                            <CardHeader title='Submit Enquiry' />
                            <CardContent className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Full Name" {...field} />
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
                                                <Input placeholder="Email" {...field} />
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
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Phone" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {type === 'webinar' && <WebinarEnquirySubForm control={form.control} />}
                                {type === 'general' && <GeneralEnquirySubForm control={form.control} />}
                                <div className='flex justify-end pt-5'>
                                    <Button disabled={loading} type='submit'>Submit</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default EnquiryForm;
