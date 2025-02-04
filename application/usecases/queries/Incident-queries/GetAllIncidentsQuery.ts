export class GetAllIncidentsQuery {
    constructor(
      public readonly testId?: string,
      public readonly type?: string,
      public readonly severity?: string
    ) {}
  }