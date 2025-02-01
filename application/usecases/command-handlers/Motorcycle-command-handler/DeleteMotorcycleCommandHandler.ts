import { MotorcycleRepository } from "../../../repositories/MotorcycleRepository";
import { CommandHandler } from "../../CommandBus";
import { DeleteMotorcycleCommand } from "../../commands/Motorcycle-Commands/DeleteMotorcycleCommand";
export class DeleteMotorcycleCommandHandler implements CommandHandler<DeleteMotorcycleCommand> {
    constructor(
      private motorcycleRepository: MotorcycleRepository
    ) {}
  
    async execute(command: DeleteMotorcycleCommand): Promise<void> {
        await this.motorcycleRepository.delete(command.id);
      }
  }