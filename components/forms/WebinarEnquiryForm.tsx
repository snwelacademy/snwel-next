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
import { MasterDropdown } from '@/components/master/master-dropdown';
import { MASTER_CODES } from '@/types/master';
import { Country } from 'country-state-city';

interface WebinarEnquirySubFormProps {
  control: any;
}

const WebinarEnquirySubForm: React.FC<WebinarEnquirySubFormProps> = ({ control }) => {
  const { currentWebinar } = useContext(context);
  const methods = useFormContext();

  useEffect(() => {
    methods.setValue('extraInfo.webinarId', currentWebinar?._id)
  }, [currentWebinar])

  // Prefix phone field with selected country's dial code
  const selectedCountry = methods.watch('extraInfo.location.country');
  useEffect(() => {
    if (!selectedCountry) return;
    const c = Country.getCountryByCode(selectedCountry);
    const phonecode = c?.phonecode;
    if (!phonecode) return;
    const dial = phonecode.startsWith('+') ? phonecode : `+${phonecode}`;

    const currentPhone: string = methods.getValues('phone') || '';

    // Remove all non-digit characters to get the raw numbers
    const cleanPhone = currentPhone.replace(/\D/g, '');

    let stripped = cleanPhone;
    if (cleanPhone.length > 0) {
      const allCountries = Country.getAllCountries();
      // Sort by length descending to match longest prefix first (e.g. match +1242 before +1)
      const sortedCountries = [...allCountries].sort((a, b) =>
        (b.phonecode?.length || 0) - (a.phonecode?.length || 0)
      );

      const matchedCountry = sortedCountries.find(country =>
        country.phonecode && cleanPhone.startsWith(country.phonecode)
      );

      if (matchedCountry) {
        stripped = cleanPhone.slice(matchedCountry.phonecode.length);
      }
    }

    methods.setValue('phone', `${dial} ${stripped}`.trim(), { shouldDirty: true });
  }, [selectedCountry])

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
                <MasterDropdown
                  parentCode={MASTER_CODES.QUALIFICATIONS}
                  selectorKey="name"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select qualification"
                  allowCustom
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

    </>

  );
};

export default WebinarEnquirySubForm;
