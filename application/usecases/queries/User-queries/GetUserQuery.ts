export class GetUserQuery {
    constructor(
      public readonly id?: number,
      public readonly email?: string
    ) {}
  }