"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import FileUploadModal from '../modal/FileUploadModal'; // Assuming you have this component
import { createSetting, getSetting, updateSetting } from '@/services/admin/setting-service';
import { GeneralSetting, GeneralSettingSchema, SETTINGS } from '@/types/Setting';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../Loader';
import { Label } from '../ui/label';
import { FacebookIcon, InstagramIcon, LinkedinIcon, X, Youtube } from 'lucide-react';

const GeneralSettingForm = () => {
    const { data: settingData, isLoading } = useQuery({
        queryKey: ['admin/setting/general'],
        queryFn: () => getSetting<GeneralSetting>(SETTINGS.GENERAL)
    })
    const client = useQueryClient();
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof GeneralSettingSchema>>({
        defaultValues: {
            data: {
                siteName: '',
                logoUrl: '',
                location: {
                    address: '',
                    city: '',
                    state: '',
                    country: '',
                    url: ''
                },
                contacts: {
                    phone: '',
                    email: ''
                },
                senderEmail: '',
                socialLinks: {
                    facebook: '',
                    insta: '',
                    x: '',
                    youtube: '',
                    linkedin: ''
                }
            }
        },
        resolver: zodResolver(GeneralSettingSchema)
    });

    const watchFields = useWatch({ control: form.control });

    const handleSubmit = async (value: z.infer<typeof GeneralSettingSchema>) => {
        try {
            setLoading(true);
            if (settingData) {
                await updateSetting(settingData.code, value);
                toast({ title: 'Setting updated successfully!' });
            } else {
                await createSetting(value);
                toast({ title: 'Setting created successfully!' });
            }
            client.invalidateQueries({ queryKey: ['admin/setting/general'] })
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

    if (isLoading) {
        return <div className='flex items-center w-full h-1/2 justify-center'><Loader type='default' /></div>
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='mx-auto'>
                        <Card>
                            <CardHeader title={settingData ? 'Update Setting' : 'Create Setting'} />
                            <CardContent className='space-y-4'>
                                <div className='rounded-2xl border-dashed border-gray-600 py-10 aspect-square max-w-[200px] border-2 flex items-center justify-center bg-center bg-cover' style={{ backgroundImage: `url(${watchFields.data?.logoUrl})` }}>
                                    {watchFields.data?.logoUrl ?
                                        <FileUploadModal trigger={<Button>Change Logo</Button>} onChange={path => form.setValue('data.logoUrl', path)} />
                                        : <FileUploadModal trigger={<Button>Upload Logo</Button>} onChange={path => form.setValue('data.logoUrl', path)} />
                                    }
                                </div>
                                <FormField
                                    control={form.control}
                                    name="data.siteName"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Site Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Site Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="data.contacts.email"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="data.senderEmail"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Sender Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="Sender Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="data.contacts.phone"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input type="tel" placeholder="Phone" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="data.location.address"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="data.location.city"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder="City" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="data.location.state"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input placeholder="State" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="data.location.country"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Country" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="data.location.url"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Direction URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="google map url" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <fieldset className="space-y-4">
                                    <legend className="text-lg font-semibold">Social Media Links</legend>
                                    <div className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="data.socialLinks.x"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel htmlFor="twitter" className="flex items-center space-x-2">
                                                        <X className="w-5 h-5 text-black" />
                                                        <span>X</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="url"
                                                            placeholder="https://x.com/yourusername"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">

                                        <FormField
                                            control={form.control}
                                            name="data.socialLinks.facebook"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel htmlFor="twitter" className="flex items-center space-x-2">
                                                        <FacebookIcon className="w-5 h-5 text-blue-600" />
                                                        <span>Facebook</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="url"
                                                            placeholder="https://facebook.com/yourpage"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="data.socialLinks.linkedin"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel htmlFor="twitter" className="flex items-center space-x-2">
                                                        <LinkedinIcon className="w-5 h-5 text-blue-700" />
                                                        <span>LinkedIn</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="url"
                                                            placeholder="https://linkedin.com/in/yourprofile"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                    <FormField
                                            control={form.control}
                                            name="data.socialLinks.insta"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel htmlFor="twitter" className="flex items-center space-x-2">
                                                    <InstagramIcon className="w-5 h-5 text-pink-600" />
                                                    <span>Instagram</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="url"
                                                            placeholder="https://instagram.com/yourusername"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="data.socialLinks.youtube"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel htmlFor="twitter" className="flex items-center space-x-2">
                                                        <Youtube className="w-5 h-5 text-red-600" />
                                                        <span>YouTube</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="url"
                                                            placeholder="https://youtube.com/yourusername"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </fieldset>

                                <div className='flex justify-end pt-5'>
                                    <Button disabled={loading || isLoading} type='submit'>{settingData ? 'Update' : 'Create'}</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default GeneralSettingForm;
