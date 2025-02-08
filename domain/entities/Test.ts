export class Test {
    constructor(
      public id: number | null,
      public motorcycleId: number,
      public driverId: number | null,
      public clientId: number | null,
      public startDate: Date,
      public startingMileage: number,
      public endDate?: Date,
      public endingMileage?: number | null,
      public comments?: string,
      public status?: string,
    ) {}
  }
  