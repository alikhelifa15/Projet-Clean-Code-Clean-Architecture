import { CommandHandler } from '../../CommandBus';
import { GetAllDriversCommand } from '../../commands/Driver-Commands/GetAllDriversCommand';
import { DriverRepository } from '../../../../infrastructure/adaptres/repositories/DriverRepository';
import { Driver } from '../../../../domain/entities/Driver';

export class GetAllDriversCommandHandler
  implements CommandHandler<GetAllDriversCommand>
{
  constructor(private driverRepository: DriverRepository) {}

  // La méthode execute retourne une liste de drivers
  async execute(command: GetAllDriversCommand): Promise<Driver[]> {
    // Appelle la méthode findAll() du repository pour récupérer tous les drivers
    const drivers = await this.driverRepository.findAll();

    // Vérifie si des drivers sont trouvés
    if (!drivers || drivers.length === 0) {
      throw new Error('No drivers found');
    }

    return drivers;
  }
}
