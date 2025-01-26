export class UserType {
    private readonly value: 'ADMIN' | 'COMPANY' | 'DEALER';
    public getValue(): string {
      return this.value;
    }
  
    constructor(value: string) {
      if (!this.isValidUserType(value)) {
        throw new Error('Type utilisateur invalide');
      }
      this.value = value as  'ADMIN' | 'COMPANY' | 'DEALER';
    }
  
    private isValidUserType(type: string): type is  'ADMIN' | 'COMPANY' | 'DEALER' {
      return ['COMPANY', 'DEALER', 'ADMIN'].includes(type);
    }
  
    toString(): string {
      return this.value;
    }
  }