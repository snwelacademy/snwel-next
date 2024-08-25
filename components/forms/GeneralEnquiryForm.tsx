


import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';

interface GeneralEnquirySubFormProps {
  control: any;
}

const GeneralEnquirySubForm: React.FC<GeneralEnquirySubFormProps> = ({ control }) => {
  return (
        <FormField
          control={control}
          name="extraInfo.message"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  );
};

export default GeneralEnquirySubForm;
