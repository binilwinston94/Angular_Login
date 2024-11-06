export interface Doctor {
    doctorId: number;
    doctorName: string;
    doctorSpecialisation: string;
  }
  
  export interface Hospital {
    hospitalId: number;
    hospitalName: string;
    hospitalLocation: string;
    doctorDetails: Doctor[];
  }
  
  export interface HospitalResponse {
    details: Hospital[];
  }