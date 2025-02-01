import { UserRepository } from "../../../../infrastructure/adaptres/repositories/UserRepository";
import { CompanyRepository } from "../../../../infrastructure/adaptres/repositories/CompanyRepository";
import { DealerRepository } from "../../../../infrastructure/adaptres/repositories/DealerRepository";
import { LoginCommand } from "../../../usecases/commands/User-Commands/LoginCommand";
import { JwtService } from "../../../../infrastructure/adaptres/services/JwtService";
import { HashService } from "../../../../infrastructure/adaptres/services/HashService";
import { CommandHandler } from "../../CommandBus";
import { Email } from "../../../../domain/value-objects/Email";

export class LoginCommandHandler implements CommandHandler<LoginCommand> {
  constructor(
    private userRepository: UserRepository,
    private companyRepository: CompanyRepository,
    private dealerRepository: DealerRepository,
    private jwtService: JwtService,
    private hashService: HashService
  ) {}

  async execute(command: LoginCommand): Promise<string> {
    const email = new Email(command.email);
    const user = await this.userRepository.findByEmail(email.toString());
   
    if (!user) {
      throw new Error("Invalid credentials");
    }
    let company: any = null;
    let dealer: any = null;
    if (user?.getType() === 'COMPANY' && user.id !== null) {
       company = await this.companyRepository.findByUserId(user.id as number);
    }else if ( user?.getType() === 'DEALER' && user.id !== null) {
       dealer = await this.dealerRepository.findByUserId(user.id as number);

    }
    const isPasswordValid = await this.hashService.compare(
      command.password,
      user.getPassword()
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    return this.jwtService.generateToken(user , company , dealer);
  }
}