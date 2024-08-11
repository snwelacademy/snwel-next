'use client'

/* eslint-disable react-hooks/exhaustive-deps */

import { zodResolver } from '@hookform/resolvers/zod';
import  { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '../ui/use-toast';
import { createSetting, getSetting, updateSetting } from '@/services/admin/setting-service';
import { EmailSettingTypeSchema, EMAIL_TRANSPORTER, GeneralSetting } from "@/types/Setting";
import { SETTINGS } from '@/types/Setting';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../Loader';
import { Separator } from '../ui/separator';

const EmailSettingForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const client = useQueryClient()
    const { toast } = useToast();
    const {data: settingData, isLoading} = useQuery({
        queryKey: ['admin/setting/email'],
        queryFn: () => getSetting<GeneralSetting>(SETTINGS.EMAIL)
    })

    const form = useForm<z.infer<typeof EmailSettingTypeSchema>>({
        defaultValues: {
            code: SETTINGS.EMAIL,
            data: {
                [EMAIL_TRANSPORTER.NODEMAILER]: {
                    appKey: '',
                    authKey: '',
                    message: ''
                }
            }
        },
        resolver: zodResolver(EmailSettingTypeSchema)
    });


    const handleSubmit = async (value: z.infer<typeof EmailSettingTypeSchema>) => {
        try {
            setLoading(true);
            if (settingData) {
                await updateSetting(settingData.code, value);
                toast({ title: 'Email setting updated successfully!' });
            } else {
                await createSetting(value);
                toast({ title: 'Email setting created successfully!' });
            }
            client.invalidateQueries({queryKey: ['admin/setting/email']})
        } catch (error: any) {
            toast({ title: `Error: ${error.message}` });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (settingData) {
            form.reset(settingData as any);
        }
    }, [settingData]);


    if(isLoading){
        return <div className='flex items-center w-full h-1/2 justify-center'><Loader type='default' /></div>
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='mx-auto'>
                        <Card className='bg-secondary'>
                            <CardHeader title={settingData ? 'Update Email Setting' : 'Create Email Setting'} />
                            <CardContent className='space-y-4'>
                                <div>
                                    <h2 className='text-lg font-medium'>SMTP Configuration</h2>
                                    <p className="text-sm text-muted-foreground">Update your SMTP Email setting. </p>
                                </div>
                                    <Separator/>
                                <FormField
                                    control={form.control}
                                    name={`data.${EMAIL_TRANSPORTER.NODEMAILER}.appKey`}
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>App Key</FormLabel>
                                            <FormControl>
                                                <Input placeholder="App Key" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`data.${EMAIL_TRANSPORTER.NODEMAILER}.authKey`}
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Auth Key</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Auth Key" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`data.${EMAIL_TRANSPORTER.NODEMAILER}.message`}
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Message" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isChangable"
                                    render={({ field }) => (
                                        <FormItem className='w-full flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Is Changable
                                                </FormLabel>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='flex justify-end pt-5'>
                                    <Button disabled={loading} type='submit'>{settingData ? 'Update' : 'Create'}</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default EmailSettingForm;
