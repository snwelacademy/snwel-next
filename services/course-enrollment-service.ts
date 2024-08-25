
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
        const res = await api.post<ApiResponse<{isVerified: boolean, enrollmentId?: string, invalidOtp?: boolean}>>("/course-enroll/verify-otp", input);
    return res.data.data;
    } catch (error) {
        throw new Error("Error: verifyOtp")
    }
}
