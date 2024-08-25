'use client'

/* eslint-disable react-hooks/exhaustive-deps */

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '../ui/use-toast';
import { createSetting, getSetting, updateSetting } from '@/services/admin/setting-service';
import { IntegrationSetting, IntegrationSettingTypeSchema, SETTINGS } from '@/types/Setting';
import Loader from '../Loader';
import { useQuery } from '@tanstack/react-query';
import { Separator } from '../ui/separator';

const IntegrationSettingForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const {data: settingData, isLoading} = useQuery({
        queryKey: ['admin/setting/integration'],
        queryFn: () => getSetting<IntegrationSetting>(SETTINGS.INTEGRATION)
    })

    const form = useForm<z.infer<typeof IntegrationSettingTypeSchema>>({
        defaultValues: {
            code: SETTINGS.INTEGRATION,
            data: {
                whatsapp: {
                    url: '',
                    appKey: '',
                    authKey: '',
                    message: ''
                }
            }
        },
        resolver: zodResolver(IntegrationSettingTypeSchema)
    });

    const handleSubmit = async (value: z.infer<typeof IntegrationSettingTypeSchema>) => {
        try {
            setLoading(true);
            if (settingData) {
                await updateSetting(settingData.code, value);
                toast({ title: 'Integration setting updated successfully!' });
            } else {
                await createSetting(value);
                toast({ title: 'Integration setting created successfully!' });
            }
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
                        <Card>
                            <CardHeader title={settingData ? 'Update Integration Setting' : 'Create Integration Setting'} />
                            <CardContent className='space-y-4'>
                            <div>
                                    <h2 className='text-lg font-medium'>Whatsapp API Configuration</h2>
                                    <p className="text-sm text-muted-foreground">This whatsapp setting used to send otp. </p>
                                </div>
                                    <Separator/>
                                <FormField
                                    control={form.control}
                                    name="data.whatsapp.url"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>WhatsApp App Key</FormLabel>
                                            <FormControl>
                                                <Input placeholder="WhatsApp URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="data.whatsapp.appKey"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>WhatsApp App Key</FormLabel>
                                            <FormControl>
                                                <Input placeholder="WhatsApp App Key" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="data.whatsapp.authKey"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>WhatsApp Auth Key</FormLabel>
                                            <FormControl>
                                                <Input placeholder="WhatsApp Auth Key" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="data.whatsapp.message"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>WhatsApp Message</FormLabel>
                                            <FormControl>
                                                <Input placeholder="WhatsApp Message" {...field} />
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

export default IntegrationSettingForm;
