'use client'
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Card, CardContent, CardHeader } from '../ui/card';

interface SliderSubFormProps {
  control: any
}

const SliderSubForm: React.FC<SliderSubFormProps> = ({control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'content.slides',
  });

  return (
        <Card>
          <CardHeader>
            <h2>Slider Widget</h2>
          </CardHeader>
          <CardContent>
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 gap-4 mb-4">
                <FormField
                  control={control}
                  name={`content.slides.${index}.imageUrl`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com/image.jpg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`content.slides.${index}.caption`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Caption</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Caption" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={() => remove(index)}>Remove Slide</Button>
              </div>
            ))}
            <Button type="button" onClick={() => append({ imageUrl: '', caption: '' })}>Add Slide</Button>
          </CardContent>
        </Card>
  );
};

export default SliderSubForm;
