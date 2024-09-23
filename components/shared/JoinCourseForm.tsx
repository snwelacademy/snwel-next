'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CourseSelector from './CourseSelector';
import Typography from '../typography';
import { cn } from '@/lib/utils';
import PhoneInput from '../ui/phoneInput';
import { createEnrollmentAnonymous } from '@/services/course-enrollment-service';
import { useToast } from '../ui/use-toast';
import { useEffect, useState } from 'react';
import OTPForm from '../otp/OtpForm';
import { CheckCircle } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { MasterDropdown } from '../master/master-dropdown';
import { MASTER_CODES } from '@/types/master';
import { CountrySelector } from '../country-state-city/Country';
import { StateSelector } from '../country-state-city/StateSelector';
import { CitySelector } from '../country-state-city/CitySelector';


const formSchema = z.object({
  name: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email(),
  courseId: z.string(),
  phone: z.string(),
  location: z.object({
    addr: z.string().optional(),
    city: z.string({ message: 'City Required' }),
    state: z.string({ message: 'State Required' }),
    country: z.string({ message: 'Country Required' })
  }),
  extra: z.object({
    agree: z.boolean(),
  }),
  qualification: z.string(),
  mode: z.string(),
  occupation: z.string(),
  widget: z.string().optional()
})

const JoinCourseForm = ({ className, value, onClose }: { className?: string, value?: z.infer<typeof formSchema>, onClose?: () => void, extraData?: {widgetId: string} }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: value || {}
  });


  const [state, setState] = useState<{ isVerified: boolean, token?: string, invalidOtp?: boolean, invalidToken?: boolean, enrollmentId?: string } | null>(null);
  const Watch = useWatch({ control: form.control })
  async function onSubmit(value: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const res = await createEnrollmentAnonymous(value);
      setState(res);
    } catch (error: any) {
      toast({ title: error.message || "Something went wrong!", variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  if (state?.token) {
    return <div className='mx-auto'>
      <OTPForm token={state.token} onVerified={setState} />
    </div>
  }

  // if(state?.isVerified && state.enrollmentId){
  //   return <div className='w-full aspect-square bg-center bg-cover bg-no-repeat relative flex ite' style={{backgroundImage: `url(/assets/images/otp-verifed.svg)`}}>
  //     <div></div>
  //   </div>
  // }
  if (state?.isVerified && state.enrollmentId) {
    return <div className="modal-body space-y-3 flex flex-col items-center">
      <div className="flex items-center justify-center">
        <CheckCircle className='w-[150px] h-[150px] text-green-700' />
      </div>
      <p className='font-bold'>Congratulations! You have successfully applied for the course.</p>
      <p>We will review your application and notify you of the outcome soon. In the meantime, you can check out the course detailes.</p>

      <Button type="button" onClick={() => { setState(null); onClose?.() }}>Close</Button>
    </div>
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(["space-y-3 rounded-2xl p-4 md:p-10", className])}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name={`occupation`}
            render={({ field }) => (
              <FormItem className='max-w-full'>
                {/* <FormLabel>Present Status</FormLabel> */}
                <FormControl>
                  <MasterDropdown
                    placeholder='Present Status'
                    type={"SUB_MASTER"}
                    parentCode={MASTER_CODES.CANDIDATE_STATUS}
                    selectorKey="_id"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`qualification`}
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Qualifications</FormLabel> */}
                <FormControl>
                  <MasterDropdown
                    placeholder='Qualifications'
                    type={"SUB_MASTER"}
                    parentCode={MASTER_CODES.QUALIFICATIONS}
                    selectorKey="_id"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Select Course </FormLabel> */}
                <FormControl>
                  <CourseSelector filter={{ qualifications: Watch.qualification, trainingModes: Watch.mode}} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`mode`}
            render={({ field }) => (
              <FormItem className='max-w-full'>
                {/* <FormLabel>Preferred Training Mode</FormLabel> */}
                <FormControl>
                  <MasterDropdown
                    placeholder='Preferred Training Mode'
                    type={"SUB_MASTER"}
                    parentCode={MASTER_CODES.TRAINING_MODE}
                    selectorKey="_id"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <FormControl>
                <Input placeholder="Your email"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Phone</FormLabel> */}
              <FormControl>
                <PhoneInput inputStyle={{ width: "100%" }} country={'in'} placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3  gap-3">
          <FormField
            control={form.control}
            name="location.country"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>City</FormLabel> */}
                <FormControl>
                  <CountrySelector placeholder="Your Country"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location.state"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>City</FormLabel> */}
                <FormControl>
                  <StateSelector countryCode={form.getValues().location?.country} placeholder="Your State"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location.city"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>City</FormLabel> */}
                <FormControl>
                  <CitySelector countryCode={form.getValues().location?.country} stateCode={form.getValues().location?.state} placeholder="Your City"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField

          control={form.control}
          name="extra.agree"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className='ml-2 font-bold text-primary'>I consent to be contacted by a snwel Academy representative for further steps.
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />



        <div className='pt-5 space-y-3'>
          <Button type="submit" size={'lg'} className='w-full' disabled={loading}>Submit</Button>
          <Typography as="lable" className='text-primary block'>By sharing your email, you agree to our Privacy Policy and Terms and Service.</Typography>
        </div>
      </form>
    </Form>
  )
}

export default JoinCourseForm