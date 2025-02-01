import { Client } from '../../../../domain/entities/Client';
import { CommandHandler } from '../../CommandBus';
import { UpdateClientCommand } from '../../commands/Client-Commands/UpdateClientCommand';
import { ClientRepository } from '../../../repositories/ClientRepository';

export class UpdateClientCommandHandler implements CommandHandler<UpdateClientCommand> {
  constructor(
    private clientRepository: ClientRepository
  ) {}

  async execute(command: UpdateClientCommand): Promise<Client> {
    const existingClient = await this.clientRepository.findById(command.id);
    if (!existingClient) {
      throw new Error('Client not found');
    }

    const client = new Client(
      existingClient.id,
      existingClient.dealerId,
      command.firstName ?? existingClient.getFirstName(),
      command.lastName ?? existingClient.getLastName(),
      command.phone !== undefined ? command.phone : existingClient.getPhone()
    );

    return await this.clientRepository.update(client);
  }
}