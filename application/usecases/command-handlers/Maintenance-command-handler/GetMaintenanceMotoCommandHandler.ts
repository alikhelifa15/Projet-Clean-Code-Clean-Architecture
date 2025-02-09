import { GetAllMaintenanceCommand } from '../../commands/Maintenance-Commands/GetAllMaintenanceMoto';
import { MaintenanceRepository } from '../../../../infrastructure/adaptres/repositories/MaintenanceRepository';
import { Maintenance } from '../../../../domain/entities/Maintenance';
import { UsedPart } from '../../../../domain/entities/UsedPart';

export class GetAllMaintenanceHandler {
  constructor(
    private maintenanceRepository: MaintenanceRepository
  ) {}

  async execute(command: GetAllMaintenanceCommand): Promise<any[]> {
    const { motorcycleId } = command;
    const maintenances = await this.maintenanceRepository.findByMotorcycleId(motorcycleId);
    if (maintenances.length === 0) {
      return [];
    }
    return maintenances ;
    
    // .map(maintenance => ({
    //   id: maintenance.id,
    //   motorcycleId: maintenance.motorcycleId,
    //   maintenanceDate: maintenance.maintenanceDate,
    //   type: maintenance.type,
    //   description: maintenance.description,
    //   status: maintenance.status,
    //   totalCost: maintenance.totalCost,
    //   recommendations: maintenance.recommendations,
    //   usedParts: maintenance.usedParts || [] 
    // }));
  }
}
