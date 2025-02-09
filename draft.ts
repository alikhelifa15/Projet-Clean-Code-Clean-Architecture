// src/domain/repositories/IMaintenanceRepository.ts
import { Maintenance } from '../entities/Maintenance';
import { UsedPart } from '../entities/UsedPart';

export interface IMaintenanceRepository {
  findById(id: number): Promise<Maintenance | null>;
  findByMotorcycleId(motorcycleId: number): Promise<Maintenance[]>;
  save(maintenance: Maintenance): Promise<number>; // retourne l'id généré
  update(maintenance: Maintenance): Promise<void>;
  delete(id: number): Promise<void>;
  addUsedParts(usedParts: UsedPart[]): Promise<void>;
  getUsedParts(maintenanceId: number): Promise<UsedPart[]>;
}

// src/application/commands/CreateMaintenanceCommand.ts
interface UsedPartDTO {
  partId: number;
  quantity: number;
  unitPrice: number;
}

export class CreateMaintenanceCommand {
  constructor(
    public readonly motorcycleId: number,
    public readonly maintenanceDate: Date,
    public readonly type: string,
    public readonly description: string | null,
    public readonly recommendations: string | null,
    public readonly usedParts: UsedPartDTO[]
  ) {}
}

// src/application/commands/CreateMaintenanceHandler.ts
export class CreateMaintenanceHandler {
  constructor(
    private maintenanceRepository: IMaintenanceRepository
  ) {}

  async handle(command: CreateMaintenanceCommand): Promise<number> {
    // 1. Calculer le coût total à partir des pièces utilisées
    const totalCost = command.usedParts.reduce(
      (sum, part) => sum + (part.quantity * part.unitPrice),
      0
    );

    // 2. Créer l'entretien
    const maintenance = new Maintenance(
      null, // id sera généré par la base de données
      command.motorcycleId,
      command.maintenanceDate,
      command.type,
      command.description,
      totalCost,
      command.recommendations,
      'planned' // status initial
    );

    // 3. Sauvegarder l'entretien
    const maintenanceId = await this.maintenanceRepository.save(maintenance);

    // 4. Créer et sauvegarder les pièces utilisées
    const usedParts = command.usedParts.map(part => 
      new UsedPart(
        maintenanceId,
        part.partId,
        part.quantity,
        part.unitPrice
      )
    );

    await this.maintenanceRepository.addUsedParts(usedParts);

    return maintenanceId;
  }
}

// src/infrastructure/repositories/MaintenanceRepository.ts
export class MaintenanceRepository implements IMaintenanceRepository {
  constructor(private db: any) {} // Remplacer 'any' par votre type de base de données

  async findById(id: number): Promise<Maintenance | null> {
    const result = await this.db.maintenance.findUnique({
      where: { id }
    });

    return result ? new Maintenance(
      result.id,
      result.motorcycleId,
      new Date(result.maintenanceDate),
      result.type,
      result.description,
      result.totalCost,
      result.recommendations,
      result.status
    ) : null;
  }

  async findByMotorcycleId(motorcycleId: number): Promise<Maintenance[]> {
    const results = await this.db.maintenance.findMany({
      where: { motorcycleId }
    });

    return results.map(result => new Maintenance(
      result.id,
      result.motorcycleId,
      new Date(result.maintenanceDate),
      result.type,
      result.description,
      result.totalCost,
      result.recommendations,
      result.status
    ));
  }

  async save(maintenance: Maintenance): Promise<number> {
    const result = await this.db.maintenance.create({
      data: {
        motorcycleId: maintenance.motorcycleId,
        maintenanceDate: maintenance.maintenanceDate,
        type: maintenance.type,
        description: maintenance.description,
        totalCost: maintenance.totalCost,
        recommendations: maintenance.recommendations,
        status: maintenance.status
      }
    });

    return result.id;
  }

  async update(maintenance: Maintenance): Promise<void> {
    await this.db.maintenance.update({
      where: { id: maintenance.id },
      data: {
        maintenanceDate: maintenance.maintenanceDate,
        type: maintenance.type,
        description: maintenance.description,
        totalCost: maintenance.totalCost,
        recommendations: maintenance.recommendations,
        status: maintenance.status
      }
    });
  }

  async delete(id: number): Promise<void> {
    // Supprimer d'abord les pièces utilisées
    await this.db.usedPart.deleteMany({
      where: { maintenanceId: id }
    });
    
    // Puis supprimer l'entretien
    await this.db.maintenance.delete({
      where: { id }
    });
  }

  async addUsedParts(usedParts: UsedPart[]): Promise<void> {
    await this.db.usedPart.createMany({
      data: usedParts.map(part => ({
        maintenanceId: part.maintenanceId,
        partId: part.partId,
        quantity: part.quantity,
        unitPrice: part.unitPrice
      }))
    });
  }

  async getUsedParts(maintenanceId: number): Promise<UsedPart[]> {
    const results = await this.db.usedPart.findMany({
      where: { maintenanceId }
    });

    return results.map(result => new UsedPart(
      result.maintenanceId,
      result.partId,
      result.quantity,
      result.unitPrice
    ));
  }
}

// src/infrastructure/controllers/MaintenanceController.ts
export class MaintenanceController {
  constructor(
    private createMaintenanceHandler: CreateMaintenanceHandler,
    private maintenanceRepository: IMaintenanceRepository
  ) {}

  async createMaintenance(req: Request, res: Response) {
    try {
      const command = new CreateMaintenanceCommand(
        req.body.motorcycleId,
        new Date(req.body.maintenanceDate),
        req.body.type,
        req.body.description,
        req.body.recommendations,
        req.body.usedParts
      );

      const maintenanceId = await this.createMaintenanceHandler.handle(command);
      res.status(201).json({ id: maintenanceId });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async getMaintenanceWithParts(req: Request, res: Response) {
    try {
      const maintenanceId = parseInt(req.params.id);
      const maintenance = await this.maintenanceRepository.findById(maintenanceId);
      
      if (!maintenance) {
        return res.status(404).json({ error: 'Maintenance not found' });
      }

      const usedParts = await this.maintenanceRepository.getUsedParts(maintenanceId);
      
      res.json({
        maintenance,
        usedParts
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getMaintenancesByMotorcycle(req: Request, res: Response) {
    try {
      const motorcycleId = parseInt(req.params.motorcycleId);
      const maintenances = await this.maintenanceRepository.findByMotorcycleId(motorcycleId);
      res.json(maintenances);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

// src/infrastructure/routes/maintenanceRoutes.ts
import { Router } from 'express';
import { MaintenanceController } from '../controllers/MaintenanceController';

export const maintenanceRouter = Router();

export function setupMaintenanceRoutes(controller: MaintenanceController) {
  maintenanceRouter.post('/maintenance', controller.createMaintenance.bind(controller));
  maintenanceRouter.get('/maintenance/:id', controller.getMaintenanceWithParts.bind(controller));
  maintenanceRouter.get('/motorcycle/:motorcycleId/maintenance', 
    controller.getMaintenancesByMotorcycle.bind(controller));
}



import { MaintenanceRepository as IMaintenanceRepository } from '../../../application/repositories/MaintenanceRepository';
import { Maintenance } from '../../../domain/entities/Maintenance';
import { UsedPart } from '../../../domain/entities/UsedPart';
import MaintenanceModel from '../../database/mysql/models/Maintenance';
import UsedPartModel from '../../database/mysql/models/UsedPart';
import { Transaction } from 'sequelize';

