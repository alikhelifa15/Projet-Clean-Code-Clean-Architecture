import { CompanyRepository } from "../../../../infrastructure/adaptres/repositories/CompanyRepository";
import { DealerRepository } from "../../../../infrastructure/adaptres/repositories/DealerRepository";
import { UserRepository } from "../../../../infrastructure/adaptres/repositories/UserRepository";
import { CommandHandler } from "../../CommandBus";
import { DeleteUserCommand } from "../../commands/User-Commands/DeleteUserCommand";

export class DeleteUserCommandHandler implements CommandHandler<DeleteUserCommand> {
    constructor(
      private userRepository: UserRepository,
      private dealerRepository: DealerRepository,
      private companyRepository: CompanyRepository
    ) {}
  
    async execute(command: DeleteUserCommand): Promise<boolean> {
      const user = await this.userRepository.findById(command.userId);
      if (!user) {
        throw new Error('User not found');
      }
  
      if (user.getType() === 'DEALER') {
        await this.dealerRepository.delete(user.id! as number);
      } else if (user.getType() === 'COMPANY') {
        await this.companyRepository.delete(user.id!.toString());
      }
  
      return await this.userRepository.delete(command.userId);
    }
  }
  