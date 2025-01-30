import { Request, Response } from 'express';
import { CommandBus } from '../../application/usecases/CommandBus';
import { CreatePartCommand } from '../../application/usecases/commands/PartCommands/CreatePartCommand';
import { UpdatePartCommand } from '../../application/usecases/commands/PartCommands/UpdatePartCommand';
import { DeletePartCommand } from '../../application/usecases/commands/PartCommands/DeletePartCommand';

export class PartController {
  constructor(private commandBus: CommandBus) {}

  // Créer une nouvelle pièce
  async createPart(req: Request, res: Response): Promise<void> {
    try {
      const {
        reference,
        name,
        description,
        currentStock,
        alertThreshold,
        unitPrice,
      } = req.body;

      const command = new CreatePartCommand(
        reference,
        name,
        description || null,
        currentStock,
        alertThreshold,
        unitPrice || null
      );

      const newPart = await this.commandBus.execute(command);
      res.status(201).json({ message: 'Part created successfully', part: newPart });
    } catch (error) {
      console.error('Error occurred during part creation:', error);
      if (error instanceof Error) res.status(400).json({ error: error.message });
    }
  }

  // Mettre à jour une pièce existante
  async updatePart(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {
        reference,
        name,
        description,
        currentStock,
        alertThreshold,
        unitPrice,
      } = req.body;

      const command = new UpdatePartCommand(
        parseInt(id, 10),
        reference,
        name,
        description || null,
        currentStock,
        alertThreshold,
        unitPrice || null
      );

      const updatedPart = await this.commandBus.execute(command);
      res.status(200).json({ message: 'Part updated successfully', part: updatedPart });
    } catch (error) {
      console.error('Error occurred during part update:', error);
      if (error instanceof Error) res.status(400).json({ error: error.message });
    }
  }

  // Supprimer une pièce
  async deletePart(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const command = new DeletePartCommand(parseInt(id, 10));

      await this.commandBus.execute(command);
      res.status(200).json({ message: 'Part deleted successfully' });
    } catch (error) {
      console.error('Error occurred during part deletion:', error);
      if (error instanceof Error) res.status(400).json({ error: error.message });
    }
  }
}
