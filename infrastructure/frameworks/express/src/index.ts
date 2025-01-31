import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import '../../../database/mysql/models/index'; 
import { LoginCommandHandler } from '../../../../application/usecases/command-handlers/LoginCommandHandler';
import { SignUpCommandHandler } from '../../../../application/usecases/command-handlers/SignUpCommandHandler';
import { LoginCommand } from '../../../../application/usecases/commands/LoginCommand';
import { SignUpCommand } from '../../../../application/usecases/commands/SignUpCommand';
import { DeleteUserCommand } from '../../../../application/usecases/commands/DeleteUserCommand';
import { DeleteUserCommandHandler } from '../../../../application/usecases/command-handlers/DeleteUserCommandHandler';
import { UpdateUserCommand } from '../../../../application/usecases/commands/UpdateUserCommand';
import { UpdateUserCommandHandler } from '../../../../application/usecases/command-handlers/UpdateUserCommandHandler';
import { CreateMotorcycleCommand } from '../../../../application/usecases/commands/CreateMotorcycleCommand';
import { CreateMotorcycleCommandHandler } from '../../../../application/usecases/command-handlers/CreateMotorcycleCommandHandler';
import { UpdateMotorcycleCommand } from '../../../../application/usecases/commands/UpdateMotorcycleCommand';
import { UpdateMotorcycleCommandHandler } from '../../../../application/usecases/command-handlers/UpdateMotorcycleCommandHandler';
import { DeleteMotorcycleCommand } from '../../../../application/usecases/commands/DeleteMotorcycleCommand';
import { DeleteMotorcycleCommandHandler } from '../../../../application/usecases/command-handlers/DeleteMotorcycleCommandHandler';
  import { MotorcycleRepository } from '../../../adaptres/repositories/MotorcycleRepository';
import { UserRepository } from '../../../adaptres/repositories/UserRepository';
import { CompanyRepository } from '../../../adaptres/repositories/CompanyRepository';
import { JwtService } from '../../../adaptres/services/JwtService';
import { HashService } from '../../../adaptres/services/HashService';
import userRoutes from '../../../../interface/routes/userRoutes';
import motorcycleRoutes from '../../../../interface/routes/motorcycleRoutes';
import { CommandBus } from '../../../../application/usecases/CommandBus';
import { DealerRepository } from '../../../adaptres/repositories/DealerRepository';

dotenv.config();

const app = express();
app.use(express.json({limit: '80mb'}));
app.use(express.urlencoded({limit: '80mb', extended: true}));
app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(express.json());
const PORT = process.env.PORT || 3000;
const commandBus = new CommandBus();
const userRepository = new UserRepository ();
const companyRepository = new CompanyRepository ();
const dealerRepository = new DealerRepository ();
const motorcycleRepository = new MotorcycleRepository ();
const jwtService = new JwtService();
const hashService = new HashService();
// Register authentication command handlers
commandBus.register(LoginCommand, new LoginCommandHandler(userRepository, companyRepository, dealerRepository, jwtService,hashService));
commandBus.register(SignUpCommand, new SignUpCommandHandler(userRepository, dealerRepository, companyRepository, hashService));
// Register user command handlers
commandBus.register(UpdateUserCommand,new UpdateUserCommandHandler(userRepository,dealerRepository,companyRepository,hashService));
commandBus.register(DeleteUserCommand,new DeleteUserCommandHandler(userRepository,dealerRepository,companyRepository));

// Register motorcycle command handlers
commandBus.register(CreateMotorcycleCommand, new CreateMotorcycleCommandHandler(motorcycleRepository));
commandBus.register(UpdateMotorcycleCommand, new UpdateMotorcycleCommandHandler(motorcycleRepository));
commandBus.register(DeleteMotorcycleCommand, new DeleteMotorcycleCommandHandler(motorcycleRepository));


app.use('/api', userRoutes(commandBus));
app.use('/api/motorcycles', motorcycleRoutes(commandBus));
app.get('/api/hello', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
