export class GetAllDriversQuery {
    constructor(
      public readonly companyId?: string,
      public readonly status?: "active" | "inactive"
    ) {}
  }
  