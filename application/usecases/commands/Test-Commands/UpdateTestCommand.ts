export class UpdateTestCommand {
    constructor(
      public readonly id: number,
      public readonly end_date?: Date,
      public readonly ending_mileage?: number,
      public readonly status?: string,
      public readonly comments?: string
    ) {}
  }