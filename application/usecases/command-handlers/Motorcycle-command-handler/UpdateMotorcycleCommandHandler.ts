import { Motorcycle } from "../../../../domain/entities/Motorcycle";
import { MotorcycleRepository } from "../../../repositories/MotorcycleRepository";
import { CommandHandler } from "../../CommandBus";
import { UpdateMotorcycleCommand } from "../../commands/Motorcycle-Commands/UpdateMotorcycleCommand";
export class UpdateMotorcycleCommandHandler implements CommandHandler<UpdateMotorcycleCommand> {
    constructor(
      private motorcycleRepository: MotorcycleRepository
    ) {}
  
    async execute(command: UpdateMotorcycleCommand): Promise<Motorcycle> {
      const existingMotorcycle = await this.motorcycleRepository.findById(command.id);
      if (!existingMotorcycle) {
        throw new Error('Motorcycle not found');
      }
   const updatedMotorcycle = new Motorcycle(
    existingMotorcycle.id,
    existingMotorcycle.companyId,
    existingMotorcycle.dealerId,
    command.model ?? existingMotorcycle.model,  
    command.brand ?? existingMotorcycle.brand, 
    command.serialNumber ?? existingMotorcycle.serialNumber,
    command.photo ?? existingMotorcycle.photo,
    command.mileage ?? existingMotorcycle.mileage,
    command.serviceDate ?? existingMotorcycle.serviceDate,
    command.status ?? existingMotorcycle.status,
    command.maintenanceInterval ?? existingMotorcycle.maintenanceInterval
  );
      return this.motorcycleRepository.update(updatedMotorcycle);
    }
  }