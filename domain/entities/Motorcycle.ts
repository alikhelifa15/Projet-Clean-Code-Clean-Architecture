export class Motorcycle {
    constructor(
      public id: number | null,
      public companyId: number | null,
      public dealerId: number | null,  
      public brand: string,
      public model: string,
      public serialNumber: string,
      public photo: string | null,
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
  