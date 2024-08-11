'use client'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "@/components/ui/use-toast"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { verifyOtp } from '@/services/course-enrollment-service'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useParams, useRouter, useSearchParams } from "next/navigation"

const FormSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
    token: z.string()
})

const OtpPage = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const navigate = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            otp: "",
            token: params.token as string || '',
        },
    })


    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            if (!data.token) return toast({ title: "Token not found!" });
            const res = await verifyOtp(data);
            if (res) {
                const ru = searchParams.get("redirectUrl");
                if(ru){
                    navigate.push(ru);
                }else{
                    navigate.push('/')
                }
                return toast({title: "OTP Verified Successfully!"})
            }
            toast({ title: "Invalid OTP" })
            
        } catch (error: any) {
            toast({ title: error.message||"Sonthing went wrong!", variant: "destructive" });
        }
    }




    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xs space-y-6">
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter OTP</FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator/>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator/>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription>
                                    Please enter the one-time password sent to your email & whatsapp.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div >
    )
}

export default OtpPage