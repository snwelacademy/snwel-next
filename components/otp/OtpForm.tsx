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
import { verifyOtp, resendOtp } from '@/services/course-enrollment-service'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const FormSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
    token: z.string()
})

const OTPForm = ({token, onVerified}: {token: string, onVerified?: (data:  {isVerified: boolean, enrollmentId?: string}) =>void}) => {
    const [resendCooldown, setResendCooldown] = useState(0)
    const [resending, setResending] = useState(false)
    const [verificationId, setVerificationId] = useState<string | undefined>(undefined)
    const [otpExpired, setOtpExpired] = useState<boolean>(false)
   
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
                if (res.otpExpired) {
                    setOtpExpired(true)
                    if (res.verificationId) setVerificationId(res.verificationId)
                    const ra = typeof res.retry_after === 'number' ? res.retry_after : 30
                    setResendCooldown(ra)
                    form.setError("otp", { message: "Code expired. Please resend." })
                    toast({ title: 'Code expired', description: 'Please resend a new code.', variant: 'destructive' })
                } else {
                    form.setError("otp", {message: "Incorrect code"})
                }
            }

            
        } catch (error: any) {
            toast({ title: error.message||"Sonthing went wrong!", variant: "destructive" });
        }
    }

    async function onResend() {
        try {
            const tk = form.getValues('token')
            if (!verificationId && !tk) return toast({ title: 'Session invalid', description: 'Please restart the process.', variant: 'destructive' })
            setResending(true)
            const res = await resendOtp(verificationId ? { verificationId } : { token: tk })
            if (res.invalidToken) {
                toast({ title: 'Invalid token', description: 'Please restart the process.', variant: 'destructive' })
                return
            }
            if (res.resend_allowed === false) {
                const ra = typeof res.retry_after === 'number' ? res.retry_after : 0
                setResendCooldown(ra)
                if (res.reason === 'COOLDOWN') toast({ title: 'Please wait', description: `You can resend OTP in ${ra}s.` })
                if (res.reason === 'RESEND_LIMIT_REACHED') toast({ title: 'Limit reached', description: `Please try again in ${ra}s.`, variant: 'destructive' })
                if (res.reason === 'SESSION_EXPIRED') toast({ title: 'Session expired', description: 'Please restart the process.', variant: 'destructive' })
                return
            }
            if (res.resend_allowed && res.token) {
                form.setValue('token', res.token)
                setOtpExpired(false)
                const ra = typeof res.retry_after === 'number' ? res.retry_after : 30
                setResendCooldown(ra)
                toast({ title: 'OTP resent', description: 'Please check your email/WhatsApp.' })
            }
        } catch (error: any) {
            toast({ title: error.message || 'Failed to resend OTP', variant: 'destructive' })
        } finally {
            setResending(false)
        }
    }

    useEffect(() => {
        if (resendCooldown <= 0) return
        const id = setInterval(() => setResendCooldown((s) => s - 1), 1000)
        return () => clearInterval(id)
    }, [resendCooldown])

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
                                    {otpExpired
                                        ? (resendCooldown > 0 ? `Code expired. Resend available in ${resendCooldown}s.` : 'Code expired. You can resend a new code now.')
                                        : 'Please enter the one-time password sent to your email & whatsapp.'}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-between gap-2">
                        <Button type="button" variant="ghost" disabled={resending || resendCooldown > 0} onClick={onResend}>
                            {resending ? 'Resending...' : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
    
    )
}

export default OTPForm