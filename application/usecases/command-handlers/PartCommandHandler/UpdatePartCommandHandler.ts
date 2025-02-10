import { UpdatePartCommand } from '../../commands/PartCommands/UpdatePartCommand';
import { CommandHandler } from '../../CommandBus';
import { PartRepository } from '../../../../infrastructure/adaptres/repositories/PartRepository';
import { Part } from '../../../../domain/entities/Part';

export class UpdatePartCommandHandler implements CommandHandler<UpdatePartCommand> {
  constructor(private partsRepository: PartRepository) {}

  async execute(command: UpdatePartCommand): Promise<Part | null> {
    return this.partsRepository.update(command.id, {
      reference: command.reference,
      name: command.name,
      description: command.description,
      currentStock: command.currentStock,
      alertThreshold: command.alertThreshold,
      unitPrice: command.unitPrice,
    });
  }
}