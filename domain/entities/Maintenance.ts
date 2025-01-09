export class Maintenance {
    constructor(
      public id: number | null,
      public motorcycleId: number,
      public maintenanceDate: Date,
      public type: string,
      public description: string | null,
      public totalCost: number | null,
      public recommendations: string | null,
      public status: string
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (!this.maintenanceDate) {
        throw new Error('Maintenance date is required.');
      }
      if (!['planned', 'completed', 'cancelled'].includes(this.status)) {
        throw new Error('Invalid maintenance status.');
      }
    }
  }
  