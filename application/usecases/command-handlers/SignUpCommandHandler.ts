import { UserRepository } from '../../../infrastructure/adaptres/repositories/UserRepository';
import { CompanyRepository } from '../../../infrastructure/adaptres/repositories/CompanyRepository';

import { HashService } from '../../../infrastructure/adaptres/services/HashService';
import { User } from '../../../domain/entities/User';
import { SignUpCommand } from '../../../application/usecases/commands/SignUpCommand';
import { CommandHandler } from '../CommandBus';
import { Dealer } from '../../../domain/entities/Dealer';
import { Company } from '../../../domain/entities/Company';
import { DealerRepository } from '../../../infrastructure/adaptres/repositories/DealerRepository';
export class SignUpCommandHandler implements CommandHandler<SignUpCommand> {
  constructor(
    private userRepository: UserRepository,
    private dealerRepository: DealerRepository,
    private companyRepository: CompanyRepository,
    private hashService: HashService
  ) {}

  async execute(command: SignUpCommand): Promise<User> {
    const hashedPassword = await this.hashService.hash(command.password);
    const user = new User(null, command.email, hashedPassword, command.type);
 // Sauvegarder l'utilisateur
 const savedUser = await this.userRepository.save(user);

 // Gérer l'enregistrement spécifique en fonction du type d'utilisateur
 if (command.type === 'DEALER') {
   const dealerData = command.additionalData;
   const dealer = new Dealer(
      Number(null),
      savedUser.id!,
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
     Number(null),
     savedUser.id!,
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
