export class MotorcycleModel {
    constructor(
      public id: number | null,
      public brandId: number,
      public name: string,
      public year: number,
      public color: string
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (!this.name) {
        throw new Error('Model name is required.');
      }
      if (this.year < 1900 || this.year > new Date().getFullYear()) {
        throw new Error('Invalid model year.');
      }
    }
  }
  