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

  // Créer un objet avec les champs mis à jour
  const updatedFields: Partial<Driver> = {
    companyId: command.companyId ?? driver.companyId,
    firstName: command.firstName ?? driver.firstName,
    lastName: command.lastName ?? driver.lastName,
    licenseNumber: command.licenseNumber ?? driver.licenseNumber,
    licenseDate: command.licenseDate ?? driver.licenseDate,
    experience: command.experience ?? driver.experience,
    status: command.status ?? driver.status,
  };

  // Appeler la méthode update avec l'ID et les champs mis à jour
  const updatedDriver = await this.driverRepository.update(command.id, updatedFields);

  if (!updatedDriver) {
    throw new Error('Failed to update driver');
  }

  return updatedDriver;
  }
}
