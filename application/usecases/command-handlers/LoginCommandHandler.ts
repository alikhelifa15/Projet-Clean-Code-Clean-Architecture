import { UserRepository } from '../../../infrastructure/adaptres/repositories/UserRepository';
import { LoginCommand } from '../../../application/usecases/commands/LoginCommand';
import { JwtService } from '../../../infrastructure/adaptres/services/JwtService';
import { HashService } from '../../../infrastructure/adaptres/services/HashService'; // Import du HashService
import { CommandHandler } from '../CommandBus';

export class LoginCommandHandler implements CommandHandler<LoginCommand> {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private hashService: HashService
  ) {}

  async execute(command: LoginCommand): Promise<string> {
    const user = await this.userRepository.findByEmail(command.email);
    console.log(user);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Vérifiez si le mot de passe correspond
    const isPasswordValid = await this.hashService.compare(command.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Génération du token JWT
    return this.jwtService.generateToken(user);
  }
}
