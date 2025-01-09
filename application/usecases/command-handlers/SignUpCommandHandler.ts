import { UserRepository } from '../../../infrastructure/adaptres/repositories/UserRepository';
import { ClientRepository } from '../../../infrastructure/adaptres/repositories/ClientRepository';
import { CompanyRepository } from '../../../infrastructure/adaptres/repositories/CompanyRepository';

import { HashService } from '../../../infrastructure/adaptres/services/HashService';
import { User } from '../../../domain/entities/User';
import { SignUpCommand } from '../../../application/usecases/commands/SignUpCommand';
import { CommandHandler } from '../CommandBus';
import { Client } from '../../../domain/entities/Client';
import { Company } from '../../../domain/entities/Company';
export class SignUpCommandHandler implements CommandHandler<SignUpCommand> {
  constructor(
    private userRepository: UserRepository,
    private clientRepository: ClientRepository,
    private companyRepository: CompanyRepository,
    private hashService: HashService
  ) {}

  async execute(command: SignUpCommand): Promise<User> {
    const hashedPassword = await this.hashService.hash(command.password);
    const user = new User(null, command.email, hashedPassword, command.type);
 // Sauvegarder l'utilisateur
 const savedUser = await this.userRepository.save(user);

 // Gérer l'enregistrement spécifique en fonction du type d'utilisateur
 if (command.type === 'CLIENT') {
   const clientData = command.additionalData;
   const client = new Client(
     Number(null),
     savedUser.id!,
     clientData.companyId,
     clientData.firstName,
     clientData.lastName,
     clientData.phone
   );
   await this.clientRepository.save(client);
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
