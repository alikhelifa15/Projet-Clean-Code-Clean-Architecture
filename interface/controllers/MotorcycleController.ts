import { Request, Response } from 'express';
import { CommandBus } from '../../application/usecases/CommandBus';
import { CreateMotorcycleCommand } from '../../application/usecases/commands/CreateMotorcycleCommand';
import { UpdateMotorcycleCommand } from '../../application/usecases/commands/UpdateMotorcycleCommand';
import { DeleteMotorcycleCommand } from '../../application/usecases/commands/DeleteMotorcycleCommand';

export class MotorcycleController {
  constructor(private commandBus: CommandBus) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const command = new CreateMotorcycleCommand(
        req.body.companyId,
        req.body.dealerId,
        req.body.brand,
        req.body.model,
        req.body.serialNumber,
        req.body.photo,
        req.body.status,
        req.body.maintenanceInterval,
        {
          mileage: req.body.mileage,
          serviceDate: req.body.serviceDate ? new Date(req.body.serviceDate) : undefined
        }
      );

      const result = await this.commandBus.execute(command);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating motorcycle:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const command = new UpdateMotorcycleCommand(
        parseInt(req.params.id),
        req.body.mileage,
        req.body.serialNumber,
        req.body.model,
        req.body.brand,
        req.body.serviceDate ? new Date(req.body.serviceDate) : undefined,
        req.body.status,
        req.body.photo,
        req.body.maintenanceInterval
      );

      const result = await this.commandBus.execute(command);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error updating motorcycle:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const command = new DeleteMotorcycleCommand(parseInt(req.params.id));
      await this.commandBus.execute(command);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting motorcycle:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
}