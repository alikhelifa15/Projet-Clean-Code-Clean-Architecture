import { Request, Response } from 'express';
import { CommandBus } from '../../application/usecases/CommandBus';
import { CreateTestCommand } from '../../application/usecases/commands/Test-Commands/CreateTestCommand';
import { UpdateTestCommand } from '../../application/usecases/commands/Test-Commands/UpdateTestCommand';
import { DeleteTestCommand } from '../../application/usecases/commands/Test-Commands/DeleteTestCommand';

export class TestController {
  constructor(private commandBus: CommandBus) {}
 
  async create(req: Request, res: Response): Promise<void> {
    try {
      const command = new CreateTestCommand(
        req.body.motorcycle_id,
        req.body.driver_id || null,
        req.body.client_id || null,
        new Date(req.body.start_date),
        req.body.starting_mileage,
        req.body.end_date ? new Date(req.body.end_date) : new Date(),
        req.body.ending_mileage || null,
        req.body.comments,
        'scheduled',
      );

      const result = await this.commandBus.execute(command);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating test:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const command = new UpdateTestCommand(
        parseInt(req.params.id),
        req.body.end_date ? new Date(req.body.end_date) : undefined,
        req.body.ending_mileage,
        req.body.status,
        req.body.comments
      );

      const result = await this.commandBus.execute(command);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error updating test:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const command = new DeleteTestCommand(parseInt(req.params.id));
      await this.commandBus.execute(command);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting test:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

}
