export class Incident {
    constructor(
      public id: number | null,
      public testId: number,
      public incidentDate: Date,
      public type: string,
      public severity: string,
      public description?: string,
      public actionsTaken?: string
    ) {}
  }
  