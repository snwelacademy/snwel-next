'use client'

import React, { useContext, useEffect } from 'react';
import { Input } from '../ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { context } from '../webinar/WebinarContext';
import { useFormContext } from 'react-hook-form';

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
