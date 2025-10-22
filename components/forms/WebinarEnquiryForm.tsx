'use client'

import React, { useContext, useEffect } from 'react';
import { Input } from '../ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { context } from '../webinar/WebinarContext';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CountrySelector } from '@/components/country-state-city/Country';
import { StateSelector } from '@/components/country-state-city/StateSelector';
import { CitySelector } from '@/components/country-state-city/CitySelector';

interface WebinarEnquirySubFormProps {
  control: any;
}

const WebinarEnquirySubForm: React.FC<WebinarEnquirySubFormProps> = ({ control }) => {
  const {currentWebinar} = useContext(context);
  const methods = useFormContext();

  useEffect(() => {
    methods.setValue('extraInfo.webinarId', currentWebinar?._id)
  }, [currentWebinar])
  
  return (
    
        <>
        {
          <FormField
          control={control}
          name="extraInfo.webinarId"
          render={({ field }) => (
            <FormItem className='w-full' hidden>
              <FormLabel>Webinar ID</FormLabel>
              <FormControl>
                <Input placeholder="Webinar ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        }
        {/* Registration Fields */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={control}
            name="extraInfo.qualification"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Qualification</FormLabel>
                <FormControl>
                  <Input placeholder="Highest Qualification" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={control}
            name="extraInfo.presentStatus"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Present Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="JOB_SEEKER">Job Seeker</SelectItem>
                    <SelectItem value="STUDENT">Student</SelectItem>
                    <SelectItem value="WORKING_PROFESSIONAL">Working Professional</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Country/State/City selectors */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <FormField
            control={control}
            name="extraInfo.location.country"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <CountrySelector value={field.value} onChange={field.onChange} placeholder="Select country" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="extraInfo.location.state"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <StateSelector value={field.value} onChange={field.onChange} countryCode={methods.watch('extraInfo.location.country')} placeholder="Select state" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="extraInfo.location.city"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <CitySelector value={field.value} onChange={field.onChange} countryCode={methods.watch('extraInfo.location.country')} stateCode={methods.watch('extraInfo.location.state')} placeholder="Select city" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="extraInfo.addressFull"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Address (Full)</FormLabel>
              <FormControl>
                <Textarea placeholder="Full Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={control}
          name="extraInfo.location.country"
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
          control={control}
          name="extraInfo.location.city"
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
          control={control}
          name="extraInfo.location.state"
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
          control={control}
          name="extraInfo.location.address"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        
        </>
     
  );
};

export default WebinarEnquirySubForm;
