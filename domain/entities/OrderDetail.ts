export class OrderDetail {
    constructor(
      public orderId: number,
      public partId: number,
      public quantity: number,
      public unitPrice: number,
      public id?: number
    ) {}
  }
  