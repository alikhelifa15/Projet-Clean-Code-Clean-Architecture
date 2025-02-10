export class Part {
    constructor(
      public id: number | null,
      public reference: string,
      public name: string,
      public description: string | null,
      public currentStock: number = 0,
      public alertThreshold: number = 10,
      public unitPrice: number | null
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (!this.reference) {
        throw new Error('Part reference is required.');
      }
      if (this.currentStock < 0) {
        throw new Error('Stock cannot be negative.');
      }
    }
  }
  