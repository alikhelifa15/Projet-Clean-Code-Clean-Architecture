export class Motorcycle {
    constructor(
      public id: number | null,
      public companyId: number,
      public modelId: number,
      public serialNumber: string,
      public mileage: number = 0,
      public serviceDate: Date | null,
      public status: string,
      public maintenanceInterval: number
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (!this.serialNumber) {
        throw new Error('Serial number is required.');
      }
      if (!['active', 'maintenance', 'inactive'].includes(this.status)) {
        throw new Error('Invalid motorcycle status.');
      }
    }
  }
  