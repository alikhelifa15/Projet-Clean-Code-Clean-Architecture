import { CommandHandler } from '../../CommandBus';
import { UpdateDriverCommand } from '../../commands/Driver-Commands/UpdateDriverCommand';
import { DriverRepository } from '../../../../infrastructure/adaptres/repositories/DriverRepository';
import { Driver } from '../../../../domain/entities/Driver';

export class UpdateDriverCommandHandler
  implements CommandHandler<UpdateDriverCommand>
{
  constructor(private driverRepository: DriverRepository) {}

  async execute(command: UpdateDriverCommand): Promise<Driver> {
    const driver = await this.driverRepository.findById(command.id);

    if (!driver) {
      throw new Error('Driver not found');
    }

    // Mettre à jour les champs uniquement si des valeurs sont fournies
    driver.companyId = command.companyId ?? driver.companyId;
    driver.firstName = command.firstName ?? driver.firstName;
    driver.lastName = command.lastName ?? driver.lastName;
    driver.licenseNumber = command.licenseNumber ?? driver.licenseNumber;
    driver.licenseDate = command.licenseDate ?? driver.licenseDate;
    driver.experience = command.experience ?? driver.experience;
    driver.status = command.status ?? driver.status;

    return this.driverRepository.save(driver);
  }
}
