export interface PartData {
    id: string;
    reference: string;
    name: string;
    description?: string;
    currentStock: number;
    alertThreshold: number;
    unitPrice?: number;
    companyId: string;
  }
  
  export interface PartResponse {
    message: string;
    data?: PartData;
    error?: string;
  }
  
  export interface Part {
    id: number;
    companyId: string;
    reference: string;
    name: string;
    description?: string;
    currentStock: number;
    alertThreshold: number;
    unitPrice?: number;
  }
  
  export interface GetPartsByDealerData {
    partsByDealer: Part[];
  }
  