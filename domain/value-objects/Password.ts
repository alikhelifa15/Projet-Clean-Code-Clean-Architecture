export class Password {
    private readonly value: string;
  
    constructor(value: string) {
      if (!this.isValidPassword(value)) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre');
      }
      this.value = value;
    }
  
    private isValidPassword(password: string): boolean {
      return password.length >= 6 
        && /[A-Z]/.test(password) 
        && /[a-z]/.test(password) 
        && /[0-9]/.test(password);
    }
  
    toString(): string {
      return this.value;
    }
  }