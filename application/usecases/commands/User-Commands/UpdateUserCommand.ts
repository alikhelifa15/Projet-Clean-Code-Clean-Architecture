export class UpdateUserCommand {
    constructor(
      public userId: number,
      public email: string,
      public password: string,
      public type: 'DEALER' | 'COMPANY',
      public additionalData: any
    ) {}
  }