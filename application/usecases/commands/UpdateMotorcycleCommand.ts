export class UpdateMotorcycleCommand {
    constructor(
      public readonly id: number,
      public readonly mileage?: number,
      public readonly serviceDate?: Date,
      public readonly status?: string,
      public readonly maintenanceInterval?: number
    ) {}
  }