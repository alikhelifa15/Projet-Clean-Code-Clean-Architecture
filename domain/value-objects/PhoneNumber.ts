export class PhoneNumber {
    private readonly value: string;
  
    constructor(value: string | null) {
      if (value !== null && !this.isValidPhoneNumber(value)) {
        throw new Error('Numéro de téléphone invalide');
      }
      this.value = value || '';
    }
  
    private isValidPhoneNumber(phone: string): boolean {
      const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
      return phoneRegex.test(phone);
    }
  
    toString(): string {
      return this.value;
    }
  }