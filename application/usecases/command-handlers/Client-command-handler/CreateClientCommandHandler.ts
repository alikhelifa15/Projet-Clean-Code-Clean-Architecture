import { CommandHandler } from '../../CommandBus';
import { CreateClientCommand } from '../../../usecases/commands/Client-Commands/CreateClientCommand';
import { Client } from '../../../../domain/entities/Client';
import { ClientRepository } from '../../../repositories/ClientRepository';

export class CreateClientCommandHandler implements CommandHandler<CreateClientCommand> {
  constructor(
    private clientRepository: ClientRepository
  ) {}

  async execute(command: CreateClientCommand): Promise<Client> {
    const client = new Client(
      command.Id,
      command.dealerId,
      command.firstName,
      command.lastName,
      command.phone
    );

    return await this.clientRepository.save(client);
  }
}