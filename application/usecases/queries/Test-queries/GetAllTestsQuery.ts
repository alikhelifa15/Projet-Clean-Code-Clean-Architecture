export class GetAllTestsQuery {
    constructor(
      public readonly driverId?: string,
      public readonly clientId?: string,
      public readonly motorcycleId?: string
    ) {}
  }