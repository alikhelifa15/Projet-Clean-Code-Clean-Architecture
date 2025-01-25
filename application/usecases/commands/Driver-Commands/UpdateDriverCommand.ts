export class UpdateDriverCommand {
    constructor(
      public id: number,
      public companyId?: number,
      public firstName?: string,
      public lastName?: string,
      public licenseNumber?: string,
      public licenseDate?: Date,
      public experience?: string | null,
      public status?: string
    ) {}
  }
  