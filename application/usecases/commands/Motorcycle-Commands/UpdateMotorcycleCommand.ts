export class UpdateMotorcycleCommand {
    constructor(
      public readonly id: number,
      public readonly mileage?: number,
      public readonly serialNumber?: string,
      public readonly model?: string,
      public readonly brand?: string,
      public readonly serviceDate?: Date,
      public readonly status?: string,
      public readonly photo?: string,
      public readonly maintenanceInterval?: number
    ) {}
  }