import { TestRepository } from "../../../repositories/TestRepository";
import { CommandHandler } from "../../CommandBus";
import { DeleteTestCommand } from "../../commands/Test-Commands/DeleteTestCommand";

export class DeleteTestCommandHandler implements CommandHandler<DeleteTestCommand> {
    constructor(private testRepository: TestRepository) {}
  
    async execute(command: DeleteTestCommand): Promise<void> {
      await this.testRepository.delete(command.id);
    }
  }