export interface PartData {
    id: string;
    reference: string;
    name: string;
    description?: string;
    currentStock: string;
    alertThreshold: string;
    unitPrice?: string;
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
    currentStock: string;
    alertThreshold: string;
    unitPrice?: string;
  }
  
  export interface GetPartsByDealerData {
    parts: Part[];
  }
  