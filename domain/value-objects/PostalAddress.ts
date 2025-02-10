export class PostalAddress {
    constructor(
      private readonly address: string,
      private readonly postalCode: string,
      private readonly city: string 
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (!this.isValidPostalCode(this.postalCode)) {
        throw new Error('Code postal invalide');
      }
      if (!this.city.trim()) {
        throw new Error('Ville invalide');
      }
    }
  
    private isValidPostalCode(postalCode: string): boolean {
      return /^\d{5}$/.test(postalCode);
    }
  
    getAddress(): string {
      return this.address;
    }
  
    getPostalCode(): string {
      return this.postalCode;
    }
  
    getCity(): string {
      return this.city;
    }
  
    toString(): string {
      return `${this.address}`;
    }
  }
  