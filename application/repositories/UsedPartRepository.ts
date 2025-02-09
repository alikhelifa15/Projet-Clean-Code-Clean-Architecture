import { UsedPart } from "../../domain/entities/UsedPart";
export interface IUsedPartRepository {
    save(usedParts: UsedPart): Promise<UsedPart>;  // Accepter un tableau de UsedPart
    findByMaintenanceId(maintenanceId: number): Promise<UsedPart[]>;
    //update(usedPart: UsedPart): Promise<UsedPart>;
    //delete(id: number): Promise<void>;
  }
