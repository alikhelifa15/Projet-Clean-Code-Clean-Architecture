export class SignUpCommand {
    constructor(
      public email: string,
      public password: string,
      public type: 'CLIENT' | 'COMPANY',
      public additionalData: any
    ) {}
  }
  