import { PartRepository as IPartRepository } from '../../../application/repositories/PartRepository';
import { Part } from '../../../domain/entities/Part';
import PartModel from '../../database/mysql/models/Part';
  
export class PartRepository implements IPartRepository {
  // Méthode pour enregistrer une pièce (part)
  async save(part: Part): Promise<Part> {
    const partModel = await PartModel.create({
      reference: part.reference,
      name: part.name,
      description: part.description ?? null,
      current_stock: part.currentStock,
      alert_threshold: part.alertThreshold,
      unit_price: part.unitPrice ?? null,
    } as any);

    return new Part(
      partModel.id,
      partModel.reference,
      partModel.name,
      partModel.description,
      partModel.current_stock,
      partModel.alert_threshold,
      partModel.unit_price
    );
  }

  // Méthode pour trouver une pièce par son ID
  async findById(id: number): Promise<Part | null> {
    const partModel = await PartModel.findByPk(id);

    if (!partModel) {
      return null;
    }

    return new Part(
      partModel.id,
      partModel.reference,
      partModel.name,
      partModel.description,
      partModel.current_stock,
      partModel.alert_threshold,
      partModel.unit_price
    );
  }

  // Méthode pour trouver toutes les pièces
  async findAll(): Promise<Part[]> {
    const parts = await PartModel.findAll();

    return parts.map(partModel => 
      new Part(
        partModel.id,
        partModel.reference,
        partModel.name,
        partModel.description,
        partModel.current_stock,
        partModel.alert_threshold,
        partModel.unit_price
      )
    );
  }

  // Méthode pour mettre à jour une pièce
  async update(id: number, updatedFields: Partial<Part>): Promise<Part | null> {
    const part = await PartModel.findByPk(id);

    if (!part) {
      throw new Error(`Part with ID ${id} not found`);
    }

    await part.update(
      {
        reference: updatedFields.reference,
        name: updatedFields.name,
        description: updatedFields.description ?? null,
        current_stock: updatedFields.currentStock,
        alert_threshold: updatedFields.alertThreshold,
        unit_price: updatedFields.unitPrice ?? null,
      },
      { validate: true }
    );

    return new Part(
      part.id,
      part.reference,
      part.name,
      part.description,
      part.current_stock,
      part.alert_threshold,
      part.unit_price
    );
  }

  // Méthode pour supprimer une pièce
  async delete(id: number): Promise<boolean> {
    const deletedCount = await PartModel.destroy({ where: { id } });
    return deletedCount > 0;
  }
}
