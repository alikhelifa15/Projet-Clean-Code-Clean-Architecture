export class CreateTestCommand {
    constructor(
      public readonly motorcycle_id: number,
      public readonly driver_id: number | null,
      public readonly client_id: number | null,
      public readonly start_date: Date,
      public readonly starting_mileage: number,
      public readonly end_date: Date,
      public readonly ending_mileage: number | null,
      public readonly comments?: string,
      public readonly status?: string
    ) {}
  }