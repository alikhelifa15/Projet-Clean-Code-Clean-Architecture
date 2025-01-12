export class Dealer {
    constructor(
      public id: number | null,
      public userId: number,
      public name: string,
      public phone: string | null,
      public address: string | null,
      public postalCode: string | null,
      public city: string | null,
      public services: string | null,
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (!this.name) {
        throw new Error('Dealer name is required.');
      }
    }
  }
  