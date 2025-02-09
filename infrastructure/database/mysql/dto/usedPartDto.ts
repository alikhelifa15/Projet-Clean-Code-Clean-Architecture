export default class UsedPartDTO {
    constructor(
      public maintenanceId: number,
      public partId: number,
      public quantity: number,
      public unitPrice: number
    ) {}
}