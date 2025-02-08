import { Test } from "../../../../domain/entities/Test";
import { TestRepository } from "../../../repositories/TestRepository";
import { CommandHandler } from "../../CommandBus";
import { UpdateTestCommand } from "../../commands/Test-Commands/UpdateTestCommand";

export class UpdateTestCommandHandler implements CommandHandler<UpdateTestCommand> {
    constructor(private testRepository: TestRepository) {}
  
    async execute(command: UpdateTestCommand): Promise<Test> {
      const existingTest = await this.testRepository.findById(command.id);
      if (!existingTest) {
        throw new Error('Test not found');
      }
  
      const updatedTest = new Test(
        existingTest.id,
        existingTest.motorcycleId,
        existingTest.driverId,
        existingTest.clientId,
        existingTest.startDate,
        existingTest.startingMileage,
        command.end_date ?? existingTest.endDate,
        command.ending_mileage ?? existingTest.endingMileage,
        command.comments ?? existingTest.comments,
        command.status ?? existingTest.status
      );
  
      return await this.testRepository.update(updatedTest);
    }
  }