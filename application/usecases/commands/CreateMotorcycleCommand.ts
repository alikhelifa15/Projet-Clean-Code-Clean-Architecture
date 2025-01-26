export class CreateMotorcycleCommand {
    constructor(
      public readonly companyId: number,
      public readonly dealerId: number,
      public readonly modelId: number,
      public readonly serialNumber: string,
      public readonly status: string,
      public readonly maintenanceInterval: number,
      public readonly additionalData?: {
        mileage?: number;
        serviceDate?: Date;
      }
    ) {}
  }