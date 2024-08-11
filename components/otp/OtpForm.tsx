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

const FormSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
    token: z.string()
})

const OTPForm = ({token, onVerified}: {token: string, onVerified?: (data:  {isVerified: boolean, enrollmentId?: string}) =>void}) => {
   
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            otp: "",
            token: token || '',
        },
    })


    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            if (!data.token) return toast({ title: "Token not found!" });
            const res = await verifyOtp(data);
            if(res.isVerified){
               return onVerified?.(res)
            }
            if(res.invalidOtp){
                form.setError("otp", {message: "Invalid Otp"})
            }

            
        } catch (error: any) {
            toast({ title: error.message||"Sonthing went wrong!", variant: "destructive" });
        }
    }

    return (
        
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

                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </Form>
    
    )
}

export default OTPForm