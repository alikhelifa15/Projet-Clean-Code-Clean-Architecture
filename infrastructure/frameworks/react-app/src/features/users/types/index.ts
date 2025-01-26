export interface UpdateUserData {
  id?: string;
  email: string;
  type: 'DEALER' | 'COMPANY';
  password?: string;
  company?: {
    id?: string;
    companyName: string;
    siretNumber: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    
  };
  dealer?: {
    name: string;
    phone: string;
    address: string;
    services: string;
    postalCode: string;
    city: string;
  };
}
 export interface UpdateUserResponse {
    id: number;
    email: string;
   
  }
  export interface DeleteUserResponse {
    success: boolean;
  }
  export interface User {
    id?: number;
    email: string;
    type: 'COMPANY' | 'DEALER';
    password?: string;
    company?: {
      companyName: string;
      phone: string;
      address: string;
    };
    dealer?: {
      name: string; 
      phone: string;
      address: string;
    };
   }
   export interface DealerRegistrationData {
    email: string;
    password: string;
    type: 'DEALER';
    additionalData: {
      name: string;
      services: string;
      address: string;
      postalCode: string;
      city: string;
      phone: string;
    };
  }
  
  export interface CompanyRegistrationData {
    email: string;
    password: string;
    type: 'COMPANY';
    additionalData: {
      companyName: string;
      siretNumber: string;
      address: string;
      postalCode: string;
      city: string;
      phone: string;
    };
  }