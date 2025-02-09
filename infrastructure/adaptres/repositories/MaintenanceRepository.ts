import { IMaintenanceRepository } from '../../../application/repositories/MaintenanceRepository';
import { Maintenance } from '../../../domain/entities/Maintenance';
import MaintenanceModel from '../../database/mysql/models/Maintenance';
import UsedPartModel from '../../database/mysql/models/UsedPart';
import PartModel from '../../database/mysql/models/Part';

export class MaintenanceRepository implements IMaintenanceRepository {
  async save(maintenance: Maintenance): Promise<Maintenance> {
    const maintenanceModel = await MaintenanceModel.create({
      motorcycle_id: maintenance.motorcycleId,
      maintenance_date: maintenance.maintenanceDate,
      type: maintenance.type,
      description: maintenance.description,
      total_cost: maintenance.totalCost,
      recommendations: maintenance.recommendations,
      status: maintenance.status,
    } as any);

    return new Maintenance(
      maintenanceModel.id,
      maintenanceModel.motorcycle_id,
      maintenanceModel.maintenance_date,
      maintenanceModel.type,
      maintenanceModel.description,
      maintenanceModel.total_cost,
      maintenanceModel.recommendations,
      maintenanceModel.status
    );
  }

  async findById(id: number): Promise<Maintenance | null> {
    const maintenanceModel = await MaintenanceModel.findByPk(id);
    if (!maintenanceModel) return null;

    return new Maintenance(
      maintenanceModel.id,
      maintenanceModel.motorcycle_id,
      maintenanceModel.maintenance_date,
      maintenanceModel.type,
      maintenanceModel.description,
      maintenanceModel.total_cost,
      maintenanceModel.recommendations,
      maintenanceModel.status
    );
  }

  async findByMotorcycleId(motorcycleId: number): Promise<any[]> {
    const maintenanceModels = await MaintenanceModel.findAll({
      where: { motorcycle_id: motorcycleId },
      include: [{
        model: UsedPartModel,
        as: 'usedParts',  // ✅ Utilisation de l'alias défini dans Maintenance.ts
        required: false,
        include: [{
          model: PartModel,
          as: 'part',  // ✅ Utilisation de l'alias défini dans UsedPart.ts
          required: false,
        }]
      }]
    });
  
    if (!maintenanceModels) return [];
  
     return maintenanceModels;
    // .map((maintenanceModel) => ({
    //   id: maintenanceModel.id,
    //   motorcycleId: maintenanceModel.motorcycle_id,
    //   maintenanceDate: maintenanceModel.maintenance_date,
    //   type: maintenanceModel.type,
    //   description: maintenanceModel.description,
    //   totalCost: maintenanceModel.total_cost,
    //   recommendations: maintenanceModel.recommendations,
    //   status: maintenanceModel.status,
      // usedParts: maintenanceModel.parts?.map((usedPart :any) => ({
      //   partId: usedPart.part.id,        // L'id de la pièce
      //   quantity: usedPart.quantity,     // La quantité de la pièce utilisée
      //   unitPrice: usedPart.unit_price,  // Le prix unitaire de la pièce
      // })) || []  // Si aucune pièce n'est trouvée, on retourne un tableau vide
    // }));
  }

}
