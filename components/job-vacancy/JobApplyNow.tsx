"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, SubmitHandler, useWatch } from "react-hook-form"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { JobVacancyType } from "@/types/JobVacancyTypes"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import PhoneInput from "../ui/phoneInput"
import FileUploadModal from "../modal/FileUploadModal"
import FileManagerPopup from "../modal/FileManager"
import FileUploadInput from "../ui/FileUploadInput"
import { useToast } from "../ui/use-toast"
import VerifyOtp from "../ui/verify-otp"
import { OTPResponse } from "@/types/OtpTypes"
import { createJobApplication } from "@/services/admin/admin-jobApplication"
import JobApplicationSuccess from "./JobApplicationSuccess"


const FormInputsSchema = z.object({
  jobId: z.string(),
  notes: z.string().optional(),
  applicantName: z.string(),
  email: z.string({message: "Email required"}).email(),
  phone: z.string({message: "Phone Number required"}),
  coverLetter: z.string(),
  resumeUrl: z.string({message: "You CV is required"}).url()
})

export default function ApplyNowModal({ data }: { data?: JobVacancyType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpData, setOtpData] = useState<OTPResponse>()
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const {toast} = useToast();
  const form = useForm<z.infer<typeof FormInputsSchema>>({
    resolver: zodResolver(FormInputsSchema),
    defaultValues: {
      jobId: data?._id
    }
  })
  const Watch = useWatch({control: form.control})
  const onSubmit = async(data: any) => {
    if(!otpData || !otpData.verified){
      toast({title: "First verify the otp", variant: "destructive"});
      return;
    }
    try {
      console.log(data)
      const res = await createJobApplication(data);
      setIsOpen(false)
      form.reset()
      setIsSuccessOpen(true)
    } catch (error: any) {
      toast({title: "Submission Failed", description: error?.message || "There is problem submitting application"})
    }
  }

  return (
    <>
    <JobApplicationSuccess isOpen={isSuccessOpen} setIsOpen={setIsSuccessOpen} />
      <Button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
        Apply Now
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-800">Apply for Position</h2>
                  {
                    data &&
                    <p className="line-clamp-1 text-gray-400">{data.title}</p>
                  }
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">


                  <FormField
                    control={form.control}
                    name="applicantName"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jhone Doe..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <PhoneInput placeholder="xxx,xxx,xxx..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Cover Letter</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your Cover letter" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="resumeUrl"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        {/* <FormLabel></FormLabel> */}
                        <FormControl>
                          <FileUploadInput placeholder="Upload Your CV" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {
                    (!otpData?.verified && Watch.email && Watch.phone) && 
                    <VerifyOtp
                  data={{
                    email: Watch.email||'',
                    phone: Watch.phone || ''
                  }}
                  onVerify={setOtpData}
                  />
                  }


                  <div className="pt-2">
                  <Button className="w-full" type="submit" disabled={!otpData || !otpData.verified} >
                    Submit
                  </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}