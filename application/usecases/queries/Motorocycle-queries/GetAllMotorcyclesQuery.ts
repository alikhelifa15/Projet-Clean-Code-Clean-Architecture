export class GetAllMotorcyclesQuery {
    constructor(
      public readonly dealerId?: string,
      public readonly companyId?: string
    ) {}
  }