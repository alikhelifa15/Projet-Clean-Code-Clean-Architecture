interface UsedPartDTO {
    partId: number;
    quantity: number;
    unitPrice: number;
  }
  
  export class CreateMaintenanceCommand {
    constructor(
      public readonly motorcycleId: number,
      public readonly maintenanceDate: Date,
      public readonly type: string,
      public readonly description: string | null,
      public readonly recommendations: string | null,
      public readonly status: string,
      public readonly usedParts: UsedPartDTO[]
    ) {}
  }