import { Request, Response } from 'express';
import { CommandBus } from '../../application/usecases/CommandBus';
import { CreateDriverCommand } from '../../application/usecases/commands/Driver-Commands/CreateDriverCommand';
import { UpdateDriverCommand } from '../../application/usecases/commands/Driver-Commands/UpdateDriverCommand';
import { DeleteDriverCommand } from '../../application/usecases/commands/Driver-Commands/DeleteDriverCommand';
import { GetDriverByIdCommand } from '../../application/usecases/commands/Driver-Commands/GetDriverByIdCommand';

export class DriverController {
  constructor(private commandBus: CommandBus) {}

  // Créer un nouveau driver
  async createDriver(req: Request, res: Response): Promise<void> {
    console.log('Request Body:', req.body);
    try {
      const {
        companyId,
        firstName,
        lastName,
        licenseNumber,
        licenseDate,
        experience,
        status,
      } = req.body;

      const command = new CreateDriverCommand(
        companyId,
        firstName,
        lastName,
        licenseNumber,
        new Date(licenseDate),
        experience,
        status
      );

      const newDriver = await this.commandBus.execute(command);
      res.status(201).json({ message: 'Driver created successfully', driver: newDriver });
    } catch (error) {
      console.error('Error occurred during driver creation:', error);
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }

  // Mettre à jour un driver existant
  async updateDriver(req: Request, res: Response): Promise<void> {
    console.log('Request Body:', req.body);
    try {
      const { id } = req.params;
      const {
        companyId,
        firstName,
        lastName,
        licenseNumber,
        licenseDate,
        experience,
        status,
      } = req.body;

      const command = new UpdateDriverCommand(
        parseInt(id, 10),
        companyId,
        firstName,
        lastName,
        licenseNumber,
        licenseDate ? new Date(licenseDate) : undefined,
        experience,
        status
      );

      const updatedDriver = await this.commandBus.execute(command);
      res.status(200).json({ message: 'Driver updated successfully', driver: updatedDriver });
    } catch (error) {
      console.error('Error occurred during driver update:', error);
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }

  // Supprimer un driver
  async deleteDriver(req: Request, res: Response): Promise<void> {
    console.log('Request Params:', req.params);
    try {
      const { id } = req.params;

      const command = new DeleteDriverCommand(parseInt(id, 10));

      await this.commandBus.execute(command);
      res.status(200).json({ message: 'Driver deleted successfully' });
    } catch (error) {
      console.error('Error occurred during driver deletion:', error);
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }

  async getDriverById(req: Request, res: Response) {
    try {
        const driverId = parseInt(req.params.id, 10); // Convertir req.params.id en number
        if (isNaN(driverId)) {
          res.status(400).json({ error: 'Invalid driver ID' });
          return;
        }
    
        const result = await this.commandBus.execute(new GetDriverByIdCommand(driverId));
        res.status(200).json(result);
      } catch (error) {
        if (error instanceof Error){res.status(400).json({ error: error.message });} 
      }
  }


}
