import { CommandHandler } from '../../CommandBus';
import { CreateDriverCommand } from '../../commands/Driver-Commands/CreateDriverCommand';
import { DriverRepository } from '../../../../infrastructure/adaptres/repositories/DriverRepository';
import { Driver } from '../../../../domain/entities/Driver';

export class CreateDriverCommandHandler
  implements CommandHandler<CreateDriverCommand>
{
  constructor(private driverRepository: DriverRepository) {}

  async execute(command: CreateDriverCommand): Promise<Driver> {
    const driver = new Driver(
      null, // L'ID sera généré automatiquement
      command.companyId,
      command.firstName,
      command.lastName,
      command.licenseNumber,
      command.licenseDate,
      command.experience,
      command.status
    );

    return this.driverRepository.save(driver);
  }
}
