export class Company {
    constructor(
      public id: number ,
      public userId: number,
      public companyName: string,
      public siretNumber: string,
      public phone: string | null,
      public address: string | null,
      public postalCode: string | null,
      public city: string | null
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (!this.companyName) {
        throw new Error('Company name is required.');
      }
      if (this.siretNumber.length !== 14 || isNaN(Number(this.siretNumber))) {
        throw new Error('Invalid SIRET number.');
      }
    }
  }
  