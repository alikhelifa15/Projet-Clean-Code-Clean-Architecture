export class Brand {
    constructor(
      public id: number | null,
      public name: string,
      public country: string | null
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (!this.name) {
        throw new Error('Brand name is required.');
      }
    }
  }
  