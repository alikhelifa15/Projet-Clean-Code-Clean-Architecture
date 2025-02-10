export type UserType = 'DEALER' | 'COMPANY';

export interface RegisterResponse {
  id: string;
  email: string;
  type: UserType;
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


export interface GetUsersQuery {
    users: Array<{
      id: string;
      email: string;
      type: 'DEALER' | 'COMPANY';
      creationDate: string;
      company?: {
        id: string;
        companyName: string;
        siretNumber: string;
        phone: string;
        address: string;
      } | null;
      dealer?: {
        id: string;
        name: string;
        phone: string;
        address: string;
        services: string;
      } | null;
    }>;
  }

   export interface LoginData {
    email: string;
    password: string;
  }
  
   export interface LoginResponse {
    token: string; 
  }
  export interface DecodedUser {
    id: number;
    email: {
      value: string;
    };
    type: {
      value: 'ADMIN' | 'DEALER' | 'COMPANY';
    };
    company: string | null;
    dealer: string | null;
    iat: number;
    exp: number;
  }