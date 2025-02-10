import { CommandHandler } from '../../CommandBus';
import { CreateMotorcycleCommand } from '../../commands/Motorcycle-Commands/CreateMotorcycleCommand';
import { Motorcycle } from '../../../../domain/entities/Motorcycle';
import { MotorcycleRepository } from '../../../repositories/MotorcycleRepository';

export class CreateMotorcycleCommandHandler implements CommandHandler<CreateMotorcycleCommand> {
  constructor(
    private motorcycleRepository: MotorcycleRepository
  ) {}

  async execute(command: CreateMotorcycleCommand): Promise<Motorcycle> {
    const motorcycle = new Motorcycle(
      null,
      command.companyId || null,
      command.dealerId || null,
      command.brand,
      command.model,
      command.photo || '',
      command.serialNumber,
      command.additionalData?.mileage || 0,
      command.additionalData?.serviceDate || null,
      command.status,
      command.maintenanceInterval
    );

    const savedMotorcycle = await this.motorcycleRepository.save(motorcycle);
    return savedMotorcycle;
  }
}
