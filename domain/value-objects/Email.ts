export class Email {
    private readonly value: string;
  
    constructor(value: string) {
      if (!this.isValidEmail(value)) {
        throw new Error('Format d\'email invalide');
      }
      this.value = value;
    }
  
    private isValidEmail(email: string): boolean {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }
  
    toString(): string {
      return this.value;
    }
  }