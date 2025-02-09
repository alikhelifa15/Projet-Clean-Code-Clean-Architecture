import { CreateMaintenanceCommand } from '../../commands/Maintenance-Commands/CreateMaintenanceCmd';
import { Maintenance } from '../../../../domain/entities/Maintenance';
import { UsedPart } from '../../../../domain/entities/UsedPart';
import { MaintenanceRepository } from '../../../../infrastructure/adaptres/repositories/MaintenanceRepository';
import { UsedPartRepository } from '../../../../infrastructure/adaptres/repositories/usedPartsRepository';

export class CreateMaintenanceHandler {
  constructor(
    private maintenanceRepository: MaintenanceRepository,
    private UsedPartRepository: UsedPartRepository
  ) {}

  async execute(command: CreateMaintenanceCommand): Promise<Maintenance> {
    // Calculer le coût total des pièces
    const totalCost = command.usedParts.reduce(
      (sum, part) => sum + (part.quantity * part.unitPrice),
      0
    );

    // Créer l'entretien avec les pièces utilisées
    const maintenance = new Maintenance(
      null, // L'ID sera généré
      command.motorcycleId,
      command.maintenanceDate,
      command.type,
      command.description,
      totalCost,
      command.recommendations,
      'planned', // Statut initial
      command.usedParts // Passer les pièces utilisées dans la création de la maintenance
    );

    // Sauvegarder l'entretien
    const savedMaintenance = await this.maintenanceRepository.save(maintenance);

    if (command.usedParts.length > 0) {
      for (const part of command.usedParts) {
        const usedPart = new UsedPart(
          savedMaintenance.id!,  // Associer la maintenance à chaque pièce
          part.partId,
          part.quantity,
          part.unitPrice
        );
    
        // Sauvegarder chaque pièce utilisée dans la base de données
        await this.UsedPartRepository.save(usedPart);
      }
    }

    return savedMaintenance;
  }
}
