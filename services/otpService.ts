import { api } from "@/lib/api";
import { ApiResponse } from "@/types/ApiResponses";
import { OTPResponse } from "@/types/OtpTypes";
import { AxiosResponse } from "axios";


export const sendOtp = async(data: any): Promise<{token: string}> => {
    try {
        const response: AxiosResponse<ApiResponse<{token: string}>> = await api.post('/otp/generate', data);
        return response.data.data;
      } catch (error) {
        console.error('Error genrating otp:', error);
        throw error;
      }
}
export const verifyOtp = async(data: {otp: string, token: string}): Promise<{success: boolean, message: string, otp: OTPResponse}> => {
    try {
        const response: AxiosResponse<ApiResponse<{success: boolean, message: string, otp: OTPResponse}>> = await api.post('/otp/verify', {otp: data.otp}, {
            headers: {
                'x-otp-token': data.token
            }
        });
        return response.data.data;
      } catch (error) {
        console.error('Error verifying otp:', error);
        throw error;
      }
}

