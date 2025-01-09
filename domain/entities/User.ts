export class User {
    constructor(
      public id: number | null,
      public email: string,
      public password: string,
      public type: string,
      public creationDate: Date = new Date()
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (!this.email.includes('@')) {
        throw new Error('L\'email est invalide.');
      }
      if (this.password.length < 6) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères.');
      }
     
      if (!['COMPANY', 'CLIENT'].includes(this.type)) {
        throw new Error('Le type utilisateur est invalide.');
      }
    }
  }
  