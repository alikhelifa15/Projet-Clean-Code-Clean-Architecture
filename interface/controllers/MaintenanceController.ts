import { Request, Response } from "express";
import { CommandBus } from "../../application/usecases/CommandBus";
import { CreateMaintenanceCommand } from "../../application/usecases/commands/Maintenance-Commands/CreateMaintenanceCmd";
import { GetAllMaintenanceCommand } from "../../application/usecases/commands/Maintenance-Commands/GetAllMaintenanceMoto";

export class MaintenanceController {
  constructor(private commandBus: CommandBus) {}

  // 🔹 Créer une nouvelle maintenance
  async createMaintenance(req: Request, res: Response): Promise<void> {
    try {
      const { motorcycleId, maintenanceDate, type, description, recommendations, status, usedParts } = req.body;

      const command = new CreateMaintenanceCommand(
        motorcycleId,
        maintenanceDate,
        type,
        description,
        recommendations,
        status,
        usedParts
      );

      const createdMaintenance = await this.commandBus.execute(command);
      res.status(201).json({ message: "Maintenance created successfully", maintenance: createdMaintenance });
    } catch (error) {
      console.error("Error during maintenance creation:", error);
      res.status(400).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  }

   // Méthode pour récupérer toutes les maintenances d'une moto par ID
   async getAllByMotorcycleId(req: Request, res: Response): Promise<void> {
    try {
      const motorcycleId = parseInt(req.params.motorcycleId);
  
      if (isNaN(motorcycleId)) {
        res.status(400).json({ message: 'ID de la moto invalide.' });
        return;
      }
  
      const command = new GetAllMaintenanceCommand(motorcycleId);
  
      const maintenances = await this.commandBus.execute(command);
      if (maintenances && maintenances.length > 0) {
        res.status(200).json({ message: "Maintenances récupérées avec succès", maintenances });
      } else {
        res.status(404).json({ message: "Aucune maintenance trouvée pour cette moto." });
      }
    } catch (error) {
      console.error("Error during fetching maintenances:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Erreur inconnue" });
    }
  }
  
}
