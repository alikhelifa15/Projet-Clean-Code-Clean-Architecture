export interface DriverData {
    id: string;
    firstName: string;
    lastName: string;
    licenseNumber: string;
    licenseDate: string;
    experience: string;
    status: string;
    companyId: string;
  }
  
  export interface DriverResponse {
    message: string;
    data?: DriverData;
    error?: string;
  }
  
  export interface Driver {
    id: number;
    companyId: string;
    firstName: string;
    lastName: string;
    licenseNumber: string;
    licenseDate: Date;
    experience: string;
    status: string;
  }
  
  export interface GetDriversByCompanyData {
    driversByCompany: Driver[];
  }
  