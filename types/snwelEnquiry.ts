// src/types/Enquiry.ts

export type EnquiryType = 
  | 'General Enquiry' 
  | 'Analysis Services' 
  | '3D Modelling' 
  | '3D Laser Scanning' 
  | 'Piping Engineering' 
  | 'Structural Engineering' 
  | 'Instrumentation Engineering' 
  | '3D Printing' 
  | 'Fire Fighting Engineering';

export const EnquiryTypesArray = [
  'General Enquiry' ,
   'Analysis Services' ,
   '3D Modelling' ,
   '3D Laser Scanning' ,
   'Piping Engineering' ,
   'Structural Engineering' ,
   'Instrumentation Engineering' ,
   '3D Printing' ,
   'Fire Fighting Engineering'
]

export interface Enquiry {
  _id: string;
  name: string;
  businessEmail: string;
  company: string;
  enquiryType: EnquiryType;
  mobileNo: string;
  description: string;
  consentGiven: boolean;
  otpValidated: boolean;
  createdAt: Date;
  updatedAt: Date;
}
