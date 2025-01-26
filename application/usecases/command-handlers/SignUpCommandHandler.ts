import { UserRepository } from '../../../infrastructure/adaptres/repositories/UserRepository';
import { CompanyRepository } from '../../../infrastructure/adaptres/repositories/CompanyRepository';
import { HashService } from '../../../infrastructure/adaptres/services/HashService';
import { User } from '../../../domain/entities/User';
import { SignUpCommand } from '../../../application/usecases/commands/SignUpCommand';
import { CommandHandler } from '../CommandBus';
import { Dealer } from '../../../domain/entities/Dealer';
import { Company } from '../../../domain/entities/Company';
import { DealerRepository } from '../../../infrastructure/adaptres/repositories/DealerRepository';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { UserType } from '../../../domain/value-objects/UserType';
export class SignUpCommandHandler implements CommandHandler<SignUpCommand> {
  constructor(
    private userRepository: UserRepository,
    private dealerRepository: DealerRepository,
    private companyRepository: CompanyRepository,
    private hashService: HashService
  ) {}

  async execute(command: SignUpCommand): Promise<User> {
    const email = new Email(command.email);
    const hashedPassword = await this.hashService.hash(command.password);
    const userType = new UserType(command.type);
    if(userType.getValue() === 'ADMIN') {
      throw new Error('Type utilisateur invalide');
    }

    const user = new User(
      null,
      email,
      new Password(hashedPassword),
      userType
    );

    const savedUser = await this.userRepository.save(user);

    if (command.type === 'DEALER') {
      const dealerData = command.additionalData;
      const dealer = new Dealer(
        null,
        savedUser.id!.toString(),
        dealerData.name,
        dealerData.phone,
        dealerData.address,
        dealerData.postalCode,
        dealerData.city,
        dealerData.services
      );
      await this.dealerRepository.save(dealer);
    } else if (command.type === 'COMPANY') {
      const companyData = command.additionalData;
      const company = new Company(
        null as unknown as string,
        savedUser.id!.toString(),
        companyData.companyName,
        companyData.siretNumber,
        companyData.phone,
        companyData.address,
        companyData.postalCode,
        companyData.city
      );
      await this.companyRepository.save(company);
    }

    return savedUser;
  }
}