import { CommandHandler } from '../../CommandBus';
import { DeleteDriverCommand } from '../../commands/Driver-Commands/DeleteDriverCommand';
import { DriverRepository } from '../../../../infrastructure/adaptres/repositories/DriverRepository';

export class DeleteDriverCommandHandler
  implements CommandHandler<DeleteDriverCommand>
{
  constructor(private driverRepository: DriverRepository) {}

  async execute(command: DeleteDriverCommand): Promise<void> {
    const driver = await this.driverRepository.findById(command.id);

    if (!driver) {
      throw new Error('Driver not found');
    }

    await this.driverRepository.delete(command.id);
  }
}
