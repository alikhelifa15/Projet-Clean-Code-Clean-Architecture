import { Company } from "../../../../domain/entities/Company";
import { Dealer } from "../../../../domain/entities/Dealer";
import { User } from "../../../../domain/entities/User";
import { Email } from "../../../../domain/value-objects/Email";
import { Password } from "../../../../domain/value-objects/Password";
import { UserType } from "../../../../domain/value-objects/UserType";
import { CompanyRepository } from "../../../../infrastructure/adaptres/repositories/CompanyRepository";
import { DealerRepository } from "../../../../infrastructure/adaptres/repositories/DealerRepository";
import { UserRepository } from "../../../../infrastructure/adaptres/repositories/UserRepository";
import { HashService } from "../../../../infrastructure/adaptres/services/HashService";
import { CommandHandler } from "../../CommandBus";
import { UpdateUserCommand } from "../../commands/User-Commands/UpdateUserCommand";


export class UpdateUserCommandHandler implements CommandHandler<UpdateUserCommand> {
    constructor(
      private userRepository: UserRepository,
      private dealerRepository: DealerRepository,
      private companyRepository: CompanyRepository,
        private hashService: HashService
    ) {}
  
    async execute(command: UpdateUserCommand): Promise<User> {
        const existingUser = await this.userRepository.findById(command.userId);
        if (!existingUser) {
          throw new Error('User not found');
        }
    
         let hashedPassword = existingUser.getPassword();
        if (command.password) {
          hashedPassword = await this.hashService.hash(command.password);
        }
      const user = new User(
        command.userId,
        new Email(command.email),
        new Password(hashedPassword),
        new UserType(command.type),
        existingUser.creationDate
      );
  
      const updatedUser = await this.userRepository.update(user);
      if (!updatedUser) {
        throw new Error('Failed to update user');
      }
  
      if (command.type === 'DEALER') {
        const dealerData = command.additionalData;
        const dealer = new Dealer(
          existingUser.id!.toString(),
          existingUser.id!.toString(),
          dealerData.name,
          dealerData.phone,
          dealerData.address,
          dealerData.postalCode,
          dealerData.city,
          dealerData.services
        );
        await this.dealerRepository.update(dealer);
      } else if (command.type === 'COMPANY') {
        const companyData = command.additionalData;
        const company = new Company(
          existingUser.id!.toString(),
          existingUser.id!.toString(),
          companyData.companyName,
          companyData.siretNumber,
          companyData.phone,
          companyData.address,
          companyData.postalCode,
          companyData.city
        );
        await this.companyRepository.update(company);
      }
  
      return updatedUser;
    }
  }