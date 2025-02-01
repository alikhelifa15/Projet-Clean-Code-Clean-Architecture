import { CommandHandler } from '../../CommandBus';
import { DeletePartCommand } from '../../commands/PartCommands/DeletePartCommand';
import { PartRepository } from '../../../../infrastructure/adaptres/repositories/PartRepository';
import { Part } from '../../../../domain/entities/Part';

export class DeletePartCommandHandler implements CommandHandler<DeletePartCommand> {
  constructor(private partsRepository: PartRepository) {}

  async execute(command: DeletePartCommand): Promise<boolean> {
    return this.partsRepository.delete(command.id);
  }
}