import { IMaintenanceRepository } from '../../../application/repositories/MaintenanceRepository';
import { Maintenance } from '../../../domain/entities/Maintenance';
import MaintenanceModel from '../../database/mysql/models/Maintenance';
import UsedPartModel from '../../database/mysql/models/UsedPart';
import PartModel from '../../database/mysql/models/Part';
import MotorcycleModel from '../../database/mysql/models/Motorcycle';

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
      include: [
        {
          model: UsedPartModel,
          as: 'maintenanceUsedParts',  
          required: false,
          include: [
            {
              model: PartModel,
              as: 'part',  
              required: false,
            }
          ]
        },
        {
          model: MotorcycleModel, 
          as: 'motorcycle',  
          required: true, 
        }
      ],
      order: [
        ['id', 'DESC']  
      ]
    });
    
    if (!maintenanceModels) return [];
  
    return maintenanceModels;
  }
  

}
