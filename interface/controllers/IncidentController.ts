import { Request, Response } from 'express';
import { CommandBus } from '../../application/usecases/CommandBus';
import { CreateIncidentCommand } from '../../application/usecases/commands/Incident-Commands/CreateIncidentCommand';
import { UpdateIncidentCommand } from '../../application/usecases/commands/Incident-Commands/UpdateIncidentCommand';
import { DeleteIncidentCommand } from '../../application/usecases/commands/Incident-Commands/DeleteIncidentCommand';

export class IncidentController {
  constructor(private commandBus: CommandBus) {}

  async create(req: Request, res: Response): Promise<void> {

    try {
      const command = new CreateIncidentCommand(
        req.body.id||null,
        req.body.test_id,
        new Date(req.body.incident_date),
        req.body.type,
        req.body.severity,
        req.body.description,
        req.body.actions_taken
      );

      const result = await this.commandBus.execute(command);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating incident:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const command = new UpdateIncidentCommand(
        parseInt(req.params.id),
        req.body.type,
        req.body.severity,
        req.body.description,
        req.body.actions_taken
      );

      const result = await this.commandBus.execute(command);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error updating incident:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const command = new DeleteIncidentCommand(parseInt(req.params.id));
      await this.commandBus.execute(command);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting incident:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
}