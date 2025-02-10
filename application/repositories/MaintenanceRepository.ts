import { Maintenance } from '../../domain/entities/Maintenance';
import { UsedPart } from '../../domain/entities/UsedPart';

export interface IMaintenanceRepository {
  findById(id: number): Promise<any | null>;
  save(maintenance: Maintenance): Promise<Maintenance>;
  findByMotorcycleId(id: number): Promise<any | null>;
  //delete(id: number): Promise<void>;
  //addUsedParts(maintenanceId: number, usedParts: UsedPart[]): Promise<void>;
}