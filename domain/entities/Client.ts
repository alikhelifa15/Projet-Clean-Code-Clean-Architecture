export class Client {
    constructor(
      public id: number ,
      public userId: number,
      public dealerId: number | null,
      public firstName: string,
      public lastName: string,
      public phone: string | null
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (!this.firstName || !this.lastName) {
        throw new Error('First name and last name are required.');
      }
    }
  }
  