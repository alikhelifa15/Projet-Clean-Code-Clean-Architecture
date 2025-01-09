export class Test {
    constructor(
      public motorcycleId: number,
      public driverId: number,
      public startDate: Date,
      public startingMileage: number,
      public id?: number,
      public endDate?: Date,
      public endingMileage?: number,
      public comments?: string
    ) {}
  }
  