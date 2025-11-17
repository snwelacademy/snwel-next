
import { api } from "@/lib/api"
import { ApiResponse } from "@/types/ApiResponses";

export async function createEnrollmentAnonymous(input: any){
    try {
        const res = await api.post<ApiResponse<{token?: string, isVerified: boolean, enrollmentId?: string}>>("/course-enroll/anon", input);
        return res.data.data;
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong while creating course enrollment.";
        throw new Error(message);
    }
}

export async function verifyOtp(input: {
    otp: string,
    token: string
}){
    try {
        const res = await api.post<ApiResponse<{
            isVerified: boolean,
            enrollmentId?: string,
            invalidOtp?: boolean,
            otpExpired?: boolean,
            verificationId?: string,
            resend_allowed?: boolean,
            retry_after?: number,
            session_expires_at?: string
        }>>("/course-enroll/verify-otp", input);
        return res.data.data;
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Error verifying OTP.";
        throw new Error(message)
    }
}

export async function resendOtp(input: { token?: string, verificationId?: string }){
    try {
        const res = await api.post<ApiResponse<{
            token?: string,
            otp_expires_at?: string,
            session_expires_at?: string,
            resend_allowed?: boolean,
            retry_after?: number,
            reason?: 'COOLDOWN' | 'RESEND_LIMIT_REACHED' | 'SESSION_EXPIRED',
            invalidToken?: boolean
        }>>("/course-enroll/resend-otp", input);
        return res.data.data;
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Error resending OTP.";
        throw new Error(message)
    }
}

