export type OTPResponse = {
    _id: string,
    verified: boolean;
    deliveryMethod: string;
    action: string;
    token: string;
}