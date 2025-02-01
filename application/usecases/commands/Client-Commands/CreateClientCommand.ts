export class CreateClientCommand {
    constructor(
      public readonly Id: number,
      public readonly dealerId: number | null,
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly phone: string | null
    ) {}
  }