import { Request, Response } from 'express';
import { CommandBus } from '../../application/usecases/CommandBus';
import { CreateClientCommand } from '../../application/usecases/commands/Client-Commands/CreateClientCommand';
import { UpdateClientCommand } from '../../application/usecases/commands/Client-Commands/UpdateClientCommand';
import { DeleteClientCommand } from '../../application/usecases/commands/Client-Commands/DeleteClientCommand';

export class ClientController {
  constructor(private commandBus: CommandBus) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const command = new CreateClientCommand(
        req.body.userId,
        req.body.dealerId,
        req.body.firstName,
        req.body.lastName,
        req.body.phone
      );

      const result = await this.commandBus.execute(command);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const command = new UpdateClientCommand(
        parseInt(req.params.id),
        req.body.firstName,
        req.body.lastName,
        req.body.phone
      );

      const result = await this.commandBus.execute(command);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const command = new DeleteClientCommand(parseInt(req.params.id));
      await this.commandBus.execute(command);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
}