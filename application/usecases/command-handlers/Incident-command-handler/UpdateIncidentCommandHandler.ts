import { Incident } from "../../../../domain/entities/Incident";
import { IncidentRepository } from "../../../repositories/IncidentRepository";
import { CommandHandler } from "../../CommandBus";
import { UpdateIncidentCommand } from "../../commands/Incident-Commands/UpdateIncidentCommand";

export class UpdateIncidentCommandHandler implements CommandHandler<UpdateIncidentCommand> {
    constructor(private incidentRepository: IncidentRepository) {}
  
    async execute(command: UpdateIncidentCommand): Promise<Incident> {
      const existingIncident = await this.incidentRepository.findById(command.id);
      if (!existingIncident) {
        throw new Error('Incident not found');
      }
     console.log("  UpdateIncidentCommandHandler -> execute -> command",
      command
     )
      const updatedIncident = new Incident(
        existingIncident.id,
        existingIncident.testId,
        existingIncident.incidentDate,
        command.type ?? existingIncident.type,
        command.severity ?? existingIncident.severity,
        command.description ?? existingIncident.description,
        command.actions_taken ?? existingIncident.actionsTaken
      );
  
      return await this.incidentRepository.update(updatedIncident);
    }
  }