export class Warranty {
    constructor(
      public id: number | null,
      public motorcycleId: number,
      public startDate: Date,
      public endDate: Date,
      public type: string,
      public conditions: string | null,
      public status: string
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (this.startDate >= this.endDate) {
        throw new Error('Start date must be earlier than end date.');
      }
    }
  }
  