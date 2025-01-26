export class SiretNumber {
    private readonly value: string;
  
    constructor(value: string) {
      if (!this.isValidSiret(value)) {
        throw new Error('Numéro SIRET invalide');
      }
      this.value = value;
    }
  
    private isValidSiret(siret: string): boolean {
      if (siret.length !== 14 || isNaN(Number(siret))) {
        return false;
      }
    let sum = 0;
      for (let i = 0; i < siret.length; i++) {
        let digit = parseInt(siret[i]);
        if (i % 2 === 0) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        sum += digit;
      }
      return sum % 10 === 0;
    }
  
    toString(): string {
      return this.value;
    }
  }
  