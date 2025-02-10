export class CreateMotorcycleCommand {
    constructor(
      public readonly companyId: number | null,
      public readonly dealerId: number | null,
      public readonly brand: string,
      public readonly model: string,
      public readonly photo: string | null,
      public readonly serialNumber: string,
      public readonly status: string,
      public readonly maintenanceInterval: number,
      public readonly additionalData?: {
        mileage?: number;
        serviceDate?: Date;      }
    ) {}
  }