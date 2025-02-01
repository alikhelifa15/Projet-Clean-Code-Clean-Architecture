import { CommandHandler } from '../../CommandBus';
import { DeleteClientCommand } from '../../commands/Client-Commands/DeleteClientCommand';
import { ClientRepository } from '../../../repositories/ClientRepository';

export class DeleteClientCommandHandler implements CommandHandler<DeleteClientCommand> {
  constructor(
    private clientRepository: ClientRepository
  ) {}

  async execute(command: DeleteClientCommand): Promise<void> {
    await this.clientRepository.delete(command.id);
  }
}