'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WhatsAppIntegration from './WhatsappForm'
import SMTPEmailIntegration from './SMTPEmailForm'
import RenderEmailIntegration from './RenderEmailForm'
import TelegramBotIntegration from './TelegramBotIntegration'
import SMSSendIntegration from './SmsIntegrationForm'
import { motion } from 'framer-motion'
import { IntegrationType } from '@/types/IntegrationTypes'
import PushNotificationIntegration from './PushNotification'
import { createIntegration, updateIntegration } from '@/services/admin/admin-integration'
import { useToast } from '../ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import LoadingButton from '../ui/loading-button'
import SnwelSMTPEmailIntegration from './SnwelSMTP'
import GoogleMapIntegration from './GoogleMap'
import { DynamicIntegrationSchema } from './appcenterConfig'
import TagManagerIntegration from './TagManager'
import PixelIntegration from './FacebookPixel'


const CreateIntegrationSchema = z.object({
    serviceName: z.string().min(1, 'Service name is required'),
    config: z.record(z.any()),
    enabled: z.boolean().optional().default(true),
    supportedActions: z.array(z.string()).min(1, 'At least one action is required'),
})

type IntegrationFormValues = z.infer<typeof CreateIntegrationSchema>



export default function IntegrationForm({ data, serviceName }: { data?: IntegrationType, serviceName: string }) {
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();
    const client = useQueryClient();
    const form = useForm<IntegrationFormValues>({
        resolver: zodResolver(CreateIntegrationSchema),
        defaultValues: {
            serviceName: serviceName,
            config: {},
            enabled: true,
            supportedActions: ["otp"],
        },
    })

    async function onSubmit(value: IntegrationFormValues) {
        if(loading) return;
        try {
            setLoading(true)
            if (!data) {
                const res = await createIntegration(value);
                toast({title: "Integration saved successfully!", variant: 'success'});
                await client.invalidateQueries({queryKey: ["appcenter"]});
            } else{
                const res = await updateIntegration(data._id, value);
                toast({title: "Integration updated successfully!", variant: 'success'});
                await client.invalidateQueries({queryKey: ["appcenter"]});
            }
        } catch (error: any) {
            toast({title: "Problem in saving integration", description: error.message || "Something went wrong in saving the integration"});
            console.log(error)
        }   
    }

    useEffect(() => {
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                form.setValue(key as any, value as any);
                console.log(key, value)
            })
        }
    }, [data])

    useEffect(() => {
        console.log(form.formState.errors)
    }, [form.formState.errors])


    return (
        <Form {...form}>
            <form
                className="space-y-8 mt-4"
                onSubmit={form.handleSubmit(onSubmit)}>

                <FormField
                    control={form.control}
                    name="enabled"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Enabled</FormLabel>
                                <FormDescription>
                                    Enable or disable this integration
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

                {
                    serviceName === 'whatsapp' &&
                    <WhatsAppIntegration form={form} />
                }
                {
                    serviceName === 'smtp' &&
                    <SMTPEmailIntegration form={form} />
                }
                {
                    serviceName === 'render' &&
                    <RenderEmailIntegration form={form} />
                }
                {
                    serviceName === 'telegram' &&
                    <TelegramBotIntegration form={form} />
                }
                {
                    serviceName === 'sms' &&
                    <SMSSendIntegration form={form} />
                }
                {
                    serviceName === 'push' &&
                    <PushNotificationIntegration form={form} />
                }
                {
                    serviceName === 'snwel' &&
                    <SnwelSMTPEmailIntegration form={form} />
                }
                {
                    serviceName === 'gmap' &&
                    <GoogleMapIntegration form={form} />
                }
                {
                    serviceName === 'tagmanger' &&
                    <TagManagerIntegration form={form} />
                }
                {/* {
                    serviceName === 'pixal' &&
                    <PixelIntegration form={form} />
                } */}
                <LoadingButton type="submit" >Save</LoadingButton>
            </form>
        </Form>
    )
}