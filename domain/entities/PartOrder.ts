export class PartOrder {
    constructor(
      public companyId: number,
      public dealerId: number,
      public status: string,
      public orderDate: Date = new Date(),
      public id?: number,
      public deliveryDate?: Date,
      public totalCost?: number
    ) {}
  }
  