export class CreatePartCommand {
    constructor(
      public reference: string,
      public name: string,
      public description: string | null,
      public currentStock: number,
      public alertThreshold: number,
      public unitPrice: number | null
    ) {}
  }