"use client"

import { useState, useEffect, useCallback } from "react"
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
  phone: z.string()
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
  const { toast } = useToast()

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])
    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus()
    }
  }

  const sendOTP = async () => {
    setLoading(true)
    try {
      const response = await sendOtp(data)
      setToken(response.token)
      setOtpSent(true)
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

  const verifyOTP = useCallback(async () => {
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
      if(!token) return;
      const response = await verifyOtp({ otp: otp.join(""), token })
      if (response?.otp?.verified) {
        onVerify(response.otp)
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
  }, [otp, onVerify, toast])

  useEffect(() => {
    if (otp.every((digit) => digit !== "") && otpSent) {
      verifyOTP()
    }
  }, [otp, otpSent, verifyOTP])

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
        onClick={otpSent ? verifyOTP : sendOTP}
        disabled={loading}
        className="w-full"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {otpSent ? "Verify OTP" : "Send OTP"}
      </Button>
    </div>
  )
}