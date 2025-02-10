import { CommandHandler } from '../../CommandBus';
import { CreatePartCommand } from '../../commands/PartCommands/CreatePartCommand';
import { PartRepository } from '../../../../infrastructure/adaptres/repositories/PartRepository';
import { Part } from '../../../../domain/entities/Part';

export class CreatePartCommandHandler implements CommandHandler<CreatePartCommand> {
  constructor(private partsRepository: PartRepository) {}

  async execute(command: CreatePartCommand): Promise<Part> {
    const part = new Part(
      null, // L'ID sera généré automatiquement
      command.reference,
      command.name,
      command.description,
      command.currentStock,
      command.alertThreshold,
      command.unitPrice
    );

    return this.partsRepository.save(part);
  }
}