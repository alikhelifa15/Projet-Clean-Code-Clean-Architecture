import { GetDriverByIdCommand } from '../../commands/Driver-Commands/GetDriverByIdCommand';
import { DriverRepository } from '../../../../infrastructure/adaptres/repositories/DriverRepository';

export class GetDriverByIdCommandHandler {
    constructor(private driverRepository: DriverRepository) {}
  
    async execute(command: GetDriverByIdCommand): Promise<any> {
      const { driverId } = command;
  
      // Récupérer le driver depuis le repository
      const driver = await this.driverRepository.findById(driverId);
  
      if (!driver) {
        throw new Error(`Driver with ID ${driverId} not found`);
      }
  
      return driver;
    }
  }
