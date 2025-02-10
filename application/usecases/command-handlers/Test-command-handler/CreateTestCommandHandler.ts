import { CreateTestCommand } from "../../commands/Test-Commands/CreateTestCommand";
import { TestRepository } from "../../../../application/repositories/TestRepository";
import { Test } from "../../../../domain/entities/Test";
import { CommandHandler } from "../../CommandBus";
export class CreateTestCommandHandler implements CommandHandler<CreateTestCommand> {
    constructor(private testRepository: TestRepository) {}
  
    async execute(command: CreateTestCommand): Promise<Test> {
      const test = new Test(
        null,
        command.motorcycle_id,
        command.driver_id,
        command.client_id,
        command.start_date,
        command.starting_mileage,
        command.end_date,
        command.ending_mileage || null,
        command.comments,
        command.status
      );
  
      return await this.testRepository.save(test);
    }
  }
  