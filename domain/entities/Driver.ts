export class Driver {
    constructor(
      public id: number | null,
      public companyId: number,
      public firstName: string,
      public lastName: string,
      public licenseNumber: string,
      public licenseDate: Date,
      public experience: string | null,
      public status: string
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (!this.licenseNumber) {
        throw new Error('License number is required.');
      }
    }
  }
  