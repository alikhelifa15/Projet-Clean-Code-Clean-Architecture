export class UpdateClientCommand {
    constructor(
      public readonly id: number,
      public readonly firstName?: string,
      public readonly lastName?: string,
      public readonly phone?: string | null
    ) {}
  }