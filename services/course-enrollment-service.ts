
import { api } from "@/lib/api"
import { ApiResponse } from "@/types/ApiResponses";

export async function createEnrollmentAnonymous(input: any){
    try {
        const res = await api.post<ApiResponse<{token?: string, isVerified: boolean}>>("/course-enroll/anon", input);
    return res.data.data;
    } catch (error: any) {
        throw new Error(error.message);
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
    } catch (error) {
        throw new Error("Error: verifyOtp")
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
    } catch (error) {
        throw new Error("Error: resendOtp")
    }
}
