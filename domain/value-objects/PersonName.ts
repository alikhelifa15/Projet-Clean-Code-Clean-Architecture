export class PersonName {
    constructor(
      private readonly firstName: string,
      private readonly lastName: string
    ) {
      if (!this.isValidName(firstName) || !this.isValidName(lastName)) {
        throw new Error('Nom ou prénom invalide');
      }
    }
  
    private isValidName(name: string): boolean {
      return name.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s-]+$/.test(name);
    }
  
    getFirstName(): string {
      return this.firstName;
    }
  
    getLastName(): string {
      return this.lastName;
    }
  
    getFullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
  }