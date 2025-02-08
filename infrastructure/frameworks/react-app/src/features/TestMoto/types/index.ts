
export interface TestMotoData {
    id?: string;
    motorcycle_id: string;
    driver_id?: string;
    client_id?: string;
    start_date: string;
    end_date?: string;
    starting_mileage: number;
    ending_mileage?: number;
    comments?: string;
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  }
  
  export interface TestMotoResponse {
    message: string;
    data?: TestMotoData;
    error?: string;
  }
  
  export interface TestMoto {
    id: string;
    motoId: string;
    driverId?: string;
    clientId?: string;
    startDate: string;
    endDate?: string;
    startingMileage: number;
    endingMileage?: number;
    comments?: string;
    status: string;
    motorcycle?: {
      id: string;
      brand: string;
      model: string;
      photo: string;
      serialNumber: string;
    };
    client?: {
      id: string;
      firstName: string;
      lastName: string;
      primes: boolean;
    };
    driver?: {
      id: string;
      firstName: string;
      lastName: string;
      experience: string;
      licenseNumber: string;
    };
  }
  
  export interface GetTestMotosByDealerData {
    testMotosByDealer: TestMoto[];
  }
  
  export interface GetTestMotosByCompanyData {
    testMotosByCompany: TestMoto[];
  }
  
  export interface Driver {
    id: string;
    firstName: string;
    lastName: string;
    licenseNumber: string;
    experience: string;
  }
  
  export interface GetDriversByCompanyData {
    driversByCompany: Driver[];
  }
  
  export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    phone?: string;
    primes: boolean;
  }
  
  export interface GetClientsByDealerData {
    clientsByDealer: Client[];
  }