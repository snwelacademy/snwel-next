'use client'
import React from 'react';
// import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '../ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import Editor from '../Editor';
import { Separator } from '../ui/separator';
import Typography from '../typography';
import { Switch } from '../ui/switch';
import { useFormContext, useWatch } from 'react-hook-form';
import { DateTimePicker } from '../ui/date-time-picker';


interface CdtWidgetSubFormProps {
    control: any;
}

const CdtWidgetSubForm: React.FC<CdtWidgetSubFormProps> = ({ control }) => {
    const form = useFormContext();
    const watch = useWatch({ control: form.control });

    return (
        <>
            <div className='space-y-5'>
                <FormField
                    control={control}
                    name="content.startTime"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Start Time</FormLabel><br></br>
                            <FormControl>
                                <DateTimePicker {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="content.endTime"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>End Time</FormLabel><br></br>
                            <FormControl>
                            <DateTimePicker {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="content.timeZone"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Time Zone</FormLabel>
                            <FormControl>
                                <Input placeholder="Time Zone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='pt-5'>
                <Typography as="h3">Count Display</Typography>
                <Separator></Separator>
            </div>

            <div className='space-y-8'>
                <div className='space-y-5'>
                    <div className="">
                        <FormField
                            control={control}
                            name="settings.countDisplay.day.isActive"
                            render={({ field }) => (
                                <FormItem className='inline-flex items-center space-x-2 w-[150px]'>
                                    <FormLabel htmlFor='button-active'>Day</FormLabel>
                                    <FormControl>
                                        <Switch id="button-active" checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="settings.countDisplay.day.label"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Day" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-5">
                        <FormField
                            control={control}
                            name="settings.countDisplay.hrs.isActive"
                            render={({ field }) => (
                                <FormItem className='flex items-center space-x-2 w-[150px]'>
                                    <FormLabel htmlFor='button-active'>Hours</FormLabel>
                                    <FormControl>
                                        <Switch id="button-active" checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="settings.countDisplay.hrs.label"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Hours" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-5">
                        <FormField
                            control={control}
                            name="settings.countDisplay.minutes.isActive"
                            render={({ field }) => (
                                <FormItem className='flex items-center space-x-2 w-[150px]'>
                                    <FormLabel htmlFor='button-active'>Minutes</FormLabel>
                                    <FormControl>
                                        <Switch id="button-active" checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="settings.countDisplay.minutes.label"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Minutes" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-5">
                        <FormField
                            control={control}
                            name="settings.countDisplay.seconds.isActive"
                            render={({ field }) => (
                                <FormItem className='flex items-center space-x-2 w-[150px]'>
                                    <FormLabel htmlFor='button-active'>Seconds</FormLabel>
                                    <FormControl>
                                        <Switch id="button-active" checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="settings.countDisplay.seconds.label"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Seconds" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                
            </div>

            <Separator></Separator>
            <div className="space-y-5">
                <FormField
                    control={control}
                    name="content.position"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="DEFAULT" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Install Required Position
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="STATIC_TOP" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Static Top Banner
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="FLOATING_TOP" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Floating Top Banner</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="FLOATING_BOTTOM" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Floating Bottom Banner</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="content.message"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Editor {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='pt-5'>
                <Typography as="h3">Button Setting</Typography>
                <Separator></Separator>
            </div>
            <div className="space-y-5">
                <FormField
                    control={control}
                    name="settings.button.text"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Button Text</FormLabel>
                            <FormControl>
                                <Input placeholder="Button Text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="settings.button.link"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Button Link</FormLabel>
                            <FormControl>
                                <Input placeholder="rg: https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="settings.button.isActive"
                    render={({ field }) => (
                        <FormItem className='flex items-center space-x-2'>
                            <FormLabel htmlFor='button-active'>Button Active</FormLabel>
                            <FormControl>
                                <Switch id="button-active" checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='pt-5'>
                <Typography as="h3">Action After Complete</Typography>
                <Separator></Separator>
            </div>
            <div className="space-y-5">

                <div>
                    <FormField
                        defaultValue={'HIDE'}
                        control={control}
                        name="settings.actionAfterComplete.action"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Choose Action</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"

                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="HIDE" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Hide Timer
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="SHOW_MESSAGE" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Show Message
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='space-y-5'>
                    {
                        (watch.settings?.actionAfterComplete?.action === "SHOW_MESSAGE") &&
                        <>
                            <FormField
                                control={control}
                                name="settings.actionAfterComplete.showMesage.message"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Show Message Text</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Message" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="settings.actionAfterComplete.showMesage.showCounter"
                                render={({ field }) => (
                                    <FormItem className='w-full flex items-center space-x-2'>
                                        <FormLabel htmlFor='showMesage.showCounter'>Show Counter</FormLabel>
                                        <FormControl className=''>
                                            <Switch id="showMesage.showCounter" checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="settings.actionAfterComplete.showMesage.showButton"
                                render={({ field }) => (
                                    <FormItem className='w-full flex items-center space-x-2'>
                                        <FormLabel htmlFor='showMesage.showButton'>Show Button</FormLabel>
                                        <FormControl className=''>
                                            <Switch id="showMesage.showButton" checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {
                                watch.settings?.actionAfterComplete?.showMesage?.showButton &&
                                <>
                                    <FormField
                                        control={control}
                                        name="settings.actionAfterComplete.showMesage.buttonLink"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Button Link</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Button Link" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="settings.actionAfterComplete.showMesage.buttonText"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Button Text</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Button Text" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            }

                        </>
                    }

                </div>

            </div>


            <div className='pt-5'>
                <Typography as="h3">Appearance</Typography>
                <Separator></Separator>
                <p className="text-sm text-muted-foreground mt-2">
                  All appearance settings have been moved to the Style tab for better organization.
                </p>
            </div>
        </>
    );
};

export default CdtWidgetSubForm;
