export class Notification {
    constructor(
      public id: number | null,
      public type: string,
      public message: string,
      public creationDate: Date = new Date(),
      public status: string,
      public referenceId: number | null,
      public companyId: number | null,
      public dealerId: number | null,
      public clientId: number | null
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (!this.type) {
        throw new Error('Notification type is required.');
      }
      if (!this.message) {
        throw new Error('Notification message is required.');
      }
    }
  }
  