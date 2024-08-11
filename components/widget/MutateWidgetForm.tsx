'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import slugify from 'slugify';
import { Button } from '../ui/button';
import {createWidget, updateWidget, CreateWidget, UpdateWidget, WidgetType, Widgets, Widget } from '@/types/WidgetTypes';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import SliderSubForm from './SliderForm';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import CdtWidgetSubForm from './CDTWidgetForm';
import { createWidget as createWidgetService, updateWidgetById } from '@/services/admin/admin-widget-service';
import { useToast } from '../ui/use-toast';

interface MutateWidgetFormProps {
    widgetData?: Widget;
    type?: WidgetType
}

const MutateWidgetForm: React.FC<MutateWidgetFormProps> = ({ widgetData, type }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof createWidget>>({
        defaultValues: type  ? Widgets[type] : {},
        resolver: zodResolver(widgetData ? updateWidget : createWidget),
    });
    const {toast} = useToast()

    const watchFields = useWatch({ control: form.control });
    const widgetType = form.watch('type')

    const handleSubmit = async (values: CreateWidget| UpdateWidget) => {
        try {
            setLoading(true);
            if (widgetData) {
                await updateWidgetById(widgetData?._id||'', values as UpdateWidget);
            } else {
                await createWidgetService(values as CreateWidget);
               
            }
            toast({ title: `Course ${widgetData ? 'Updated' : 'created'} successfully!` })
        } catch (error: any) {
            toast({ title: `Error: ${error.message}` });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (watchFields.title) {
            form.setValue('code', slugify(watchFields.title, { lower: false }).toUpperCase());
        }
    }, [watchFields.title, form]);

    useEffect(() => {
        if (widgetData) {
            Object.keys(widgetData).forEach((key: any) => {
                if(key === 'type' ) console.log({type})
                form.setValue(key, widgetData[key as keyof CreateWidget]);
            });
        }
    }, [widgetData, form]);

    useEffect(() => {
        console.log({error: form.formState.errors})
    }, [form.formState.errors]);



    useEffect(() => {
      console.log(watchFields)
    }, [watchFields])
    
    

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='mx-auto'>
                        <Card>
                            <CardHeader title={widgetData ? 'Update Widget' : 'Create Widget'} />
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
                                        name="code"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Code</FormLabel>
                                                <FormControl>
                                                    <Input disabled placeholder="Enter Widget Code" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Widget Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a verified email to display" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Slider">Slider</SelectItem>
                                                        <SelectItem value="ctaBanner">Cta Banner</SelectItem>
                                                        <SelectItem value="marketingPopup">Marketing Popup</SelectItem>
                                                        <SelectItem value="cdtWidget">Count Down Timer Widget</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            

                                {widgetType === 'Slider' && (
                                    <SliderSubForm control={form.control}/>
                                )}
                                 {widgetType === "cdtWidget" && <CdtWidgetSubForm control={form.control} />}

                                <div className='flex justify-end pt-5'>
                                    <Button disabled={loading} type='submit'>
                                        {widgetData ? 'Update' : 'Create'}
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

export default MutateWidgetForm;
