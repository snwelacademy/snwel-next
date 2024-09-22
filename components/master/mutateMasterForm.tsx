'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { Switch } from '../ui/switch';
import { createMaster, updateMaster } from '@/services/admin/admin-master'; // Adjust to your service
import { MASTER_TYPE, Master, createMasterSchema, master_type_array, updateMasterSchema } from '@/types/master';
import slugify from 'slugify';
import { MasterDropdown } from './master-dropdown';
import { useQueryClient } from '@tanstack/react-query';
import DropdownSelector from '../DropdownSelector';

const MutateMaster = ({ type, data }: { type?: MASTER_TYPE, data?: Master }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof createMasterSchema>>({
        defaultValues: {
            code: '',
            name: '',
            parentCode: '',
            isActive: true,
            sequence: 0,
            type: data?.type || type || 'MASTER'
        },
        resolver: zodResolver(createMasterSchema)
    });
    const Watch = useWatch({ control: form.control });
    const client = useQueryClient()

    const handleSubmit = async (value: z.infer<typeof createMasterSchema> | z.infer<typeof updateMasterSchema>) => {
        try {
            setLoading(true);
            if (data) {
                await updateMaster(data._id, value as z.infer<typeof updateMasterSchema>);
            } else {
                await createMaster(value as z.infer<typeof createMasterSchema>);
            }
            client.invalidateQueries({ queryKey: ['/api/masters'] })
            toast({ title: `Master ${data ? 'Updated' : 'Created'} Successfully!` });
        } catch (error: any) {
            toast({ title: `Error: ${error.message}` });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (Watch.name && !data?.code) {
            form.setValue('code', slugify(Watch.name).toUpperCase())
        }
    }, [Watch.name]);

    useEffect(() => {
        if (data) {
            const custom: any = { ...data };
            Object.keys(custom).map((key: any) => {
                form.setValue(key, custom[key]);
            });
        }
    }, [data]);



    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='mx-auto'>
                        <Card>
                            <CardHeader />
                            <CardContent className='space-y-4'>
                                <div className='space-y-5'>
                                    <FormField
                                        name="code"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Code</FormLabel>
                                                <FormControl>
                                                    <Input disabled placeholder="Code" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormItem className='w-full'>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <DropdownSelector
                                                name="type"
                                                items={master_type_array.map(t => ({label: t, value: t}))}
                                                placeholder='Select Master Type'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                    {
                                        Watch.type === 'SUB_MASTER' &&
                                        <FormField
                                        name="parentCode"
                                        render={({ field }) => (
                                            <FormItem className='w-full' >
                                                <FormLabel>Master Code</FormLabel>
                                                <FormControl>
                                                    <MasterDropdown {...field} selectorKey='code' type={'MASTER'} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    }
                                    {/* <FormField
                                        control={form.control}
                                        name="sequence"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Sequence</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Sequence" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                    <FormField
                                        control={form.control}
                                        name="isActive"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                                                <div className="space-y-0.5">
                                                    <FormLabel>Active</FormLabel>
                                                    <FormDescription>
                                                        Toggle to activate or deactivate this record.
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
                                </div>
                                <div className='flex justify-end pt-5'>
                                    <Button disabled={loading} type='submit'>{data ? "Update" : "Create"}</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default MutateMaster;
