export class SignUpCommand {
    constructor(
      public email: string,
      public password: string,
      public type: 'DEALER' | 'COMPANY',
      public additionalData: any
    ) {}
  }
  