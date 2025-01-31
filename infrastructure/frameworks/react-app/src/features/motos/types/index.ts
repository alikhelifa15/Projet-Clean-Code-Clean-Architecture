export interface MotorcycleData {
  id: string;
  companyId: string;
  dealerId: string;
  modelId: string;
  serialNumber: string;
  photo: string;
  mileage: number;
  serviceDate: string;
  status: string;
  maintenanceInterval: number;
}
export interface MotorcycleResponse {
  message: string;
  data?: MotorcycleData;
  error?: string;
}
export interface Motorcycle {
  id: number;
  companyId: string;
  dealerId: string;
  brand: string;
  model: string;

  serialNumber: string;
  photo: string;
  mileage: number;
  serviceDate: Date;
  status: string;
  maintenanceInterval: number;
}

export interface GetMotorcyclesByDealerData {
  motorcyclesByDealer: Motorcycle[];
}

export interface GetMotorcyclesByCompanyData {
  motorcyclesByCompany: Motorcycle[];
}
