// Commande pour mettre à jour une pièce existante
export class UpdatePartCommand {
    constructor(
      public id: number,
      public reference?: string,
      public name?: string,
      public description?: string | null,
      public currentStock?: number,
      public alertThreshold?: number,
      public unitPrice?: number | null
    ) {}
  }