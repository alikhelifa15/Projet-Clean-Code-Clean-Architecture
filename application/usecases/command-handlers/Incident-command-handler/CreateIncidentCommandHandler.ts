import { CommandHandler } from "../../CommandBus";
import { CreateIncidentCommand } from "../../commands/Incident-Commands/CreateIncidentCommand";
import { Incident } from "../../../../domain/entities/Incident";
import { IncidentRepository } from "../../../repositories/IncidentRepository";
export class CreateIncidentCommandHandler implements CommandHandler<CreateIncidentCommand> {
    constructor(private incidentRepository: IncidentRepository) {}
  
    async execute(command: CreateIncidentCommand): Promise<Incident> {
      const incident = new Incident(
        null,
        command.test_id,
        command.incident_date,
        command.type,
        command.severity,
        command.description,
        command.actions_taken
      );
  
      return await this.incidentRepository.save(incident);
    }
  }