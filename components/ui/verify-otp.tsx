"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"
import { sendOtp, verifyOtp } from "@/services/otpService"
import { OTPResponse } from "@/types/OtpTypes"



const dataSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
})

interface OTPVerifyProps {
  onVerify: (data: OTPResponse) => void,
  data: z.infer<typeof dataSchema>;
}

export default function VerifyOtp({ onVerify, data }: OTPVerifyProps) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
  const [loading, setLoading] = useState<boolean>(false)
  const [otpSent, setOtpSent] = useState<boolean>(false)
  const [otpData, setOtpData] = useState<OTPResponse | null>(null)
  const [token, setToken] = useState<string>();
  const [verified, setVerified] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const { toast } = useToast()

  const isContactValid = dataSchema.safeParse(data).success

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])
    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus()
    }
  }

  const sendOTP = async () => {
    if (!isContactValid) {
      toast({
        title: "Contact details required",
        description: "Please enter a valid email and phone number before requesting OTP.",
        variant: "destructive",
      })
      return
    }
    setLoading(true)
    try {
      const response = await sendOtp(data)
      setToken(response.token)
      setOtpSent(true)
      setResendCooldown(60)
      setOtp(new Array(6).fill(""))
      toast({
        title: "OTP Sent",
        description: `OTP sent to your phone and email. It will expire in 5 minutes.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const verifyOTP = async () => {
    if (otp.some((digit) => digit === "")) {
      toast({
        title: "Incomplete OTP",
        description: "Please enter all digits of the OTP.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      if(!token) {
        setLoading(false)
        toast({ title: 'OTP session expired', description: 'Please resend OTP.', variant: 'destructive' })
        return;
      }
      const response = await verifyOtp({ otp: otp.join(""), token })
      if (response?.otp?.verified) {
        onVerify(response.otp)
        setVerified(true)
        toast({
          title: "OTP Verified",
          description: "Your OTP has been successfully verified.",
        })
      } else {
        toast({
          title: "Verification Failed",
          description: "Invalid OTP. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (otp.every((digit) => digit !== "") && otpSent && !verified) {
      verifyOTP()
    }
  // Intentionally exclude verifyOTP from deps to avoid recreating function and re-triggering
  }, [otp, otpSent, verified])

  // Resend cooldown ticker
  useEffect(() => {
    if (resendCooldown <= 0) return
    const id = setInterval(() => setResendCooldown((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [resendCooldown])

  // Reset OTP flow when contact details change
  useEffect(() => {
    setOtp(new Array(6).fill(""))
    setOtpSent(false)
    setToken(undefined)
    setVerified(false)
    setResendCooldown(0)
  }, [data.email, data.phone])

  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="otp-input">Enter OTP</Label>
        {
          otpSent &&
          <div className="flex gap-2" >
          {otp.map((data, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              className="w-10 h-10 text-center"
            />
          ))}
        </div>
        }
      </div>
      <Button
        type="button"
        onClick={otpSent ? verifyOTP : sendOTP}
        disabled={loading || (!otpSent && !isContactValid) || (otpSent && (otp.some((d)=>d==="") || verified))}
        className="w-full"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {otpSent ? "Verify OTP" : "Send OTP"}
      </Button>
      {otpSent && !verified && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="link"
            onClick={sendOTP}
            disabled={loading || resendCooldown > 0 || !isContactValid}
          >
            {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
          </Button>
        </div>
      )}
    </div>
  )
}