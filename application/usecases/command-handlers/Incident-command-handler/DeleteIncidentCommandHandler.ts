import { IncidentRepository } from "../../../repositories/IncidentRepository";
import { CommandHandler } from "../../CommandBus";
import { DeleteIncidentCommand } from "../../commands/Incident-Commands/DeleteIncidentCommand";

export class DeleteIncidentCommandHandler implements CommandHandler<DeleteIncidentCommand> {
    constructor(private incidentRepository: IncidentRepository) {}
  
    async execute(command: DeleteIncidentCommand): Promise<void> {
      await this.incidentRepository.delete(command.id);
    }
  }