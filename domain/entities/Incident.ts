export class Incident {
    constructor(
      public testId: number,
      public incidentDate: Date,
      public type: string,
      public severity: string,
      public id?: number,
      public description?: string,
      public actionsTaken?: string
    ) {}
  }
  