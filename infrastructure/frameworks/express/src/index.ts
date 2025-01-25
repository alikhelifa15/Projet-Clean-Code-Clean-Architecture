import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import '../../../database/mysql/models/index'; 
import { LoginCommandHandler } from '../../../../application/usecases/command-handlers/LoginCommandHandler';
import { SignUpCommandHandler } from '../../../../application/usecases/command-handlers/SignUpCommandHandler';
import { CreateDriverCommandHandler } from '../../../../application/usecases/command-handlers/Diver-command-handler/CreateDriverCommandHandler';
import { UpdateDriverCommandHandler } from '../../../../application/usecases/command-handlers/Diver-command-handler/UpdateDriverCommandHandler';
import { DeleteDriverCommandHandler } from '../../../../application/usecases/command-handlers/Diver-command-handler/DeleteDriverCommandHandler';
import { GetDriverByIdCommandHandler } from '../../../../application/usecases/command-handlers/Diver-command-handler/GetDriverByIdCommandHandler';


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
import { CreateDriverCommand } from '../../../../application/usecases/commands/Driver-Commands/CreateDriverCommand';
import { UpdateDriverCommand } from '../../../../application/usecases/commands/Driver-Commands/UpdateDriverCommand';
import { DeleteDriverCommand } from '../../../../application/usecases/commands/Driver-Commands/DeleteDriverCommand';
import { GetDriverByIdCommand } from '../../../../application/usecases/commands/Driver-Commands/GetDriverByIdCommand';

import { UserRepository } from '../../../adaptres/repositories/UserRepository';
import { CompanyRepository } from '../../../adaptres/repositories/CompanyRepository';
import { DealerRepository } from '../../../adaptres/repositories/DealerRepository';
import { DriverRepository } from '../../../adaptres/repositories/DriverRepository';
import { JwtService } from '../../../adaptres/services/JwtService';
import { HashService } from '../../../adaptres/services/HashService';
import userRoutes from '../../../../interface/routes/userRoutes';
import motorcycleRoutes from '../../../../interface/routes/motorcycleRoutes';

import authRoutes from '../../../../interface/routes/authRoutes';
import driverRoutes from '../../../../interface/routes/driverRoutes';

import { CommandBus } from '../../../../application/usecases/CommandBus';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(express.json());
const PORT = process.env.PORT || 3000;

const commandBus = new CommandBus();

// Repositories
const userRepository = new UserRepository ();
const companyRepository = new CompanyRepository ();
const dealerRepository = new DealerRepository ();
const motorcycleRepository = new MotorcycleRepository ();
const driverRepository = new DriverRepository();

// Services
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

// driver Command Handlers

commandBus.register(CreateDriverCommand, new CreateDriverCommandHandler(driverRepository));
commandBus.register(UpdateDriverCommand, new UpdateDriverCommandHandler(driverRepository));
commandBus.register(DeleteDriverCommand, new DeleteDriverCommandHandler(driverRepository));
commandBus.register(GetDriverByIdCommand, new GetDriverByIdCommandHandler(driverRepository));

app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes(commandBus));
app.use('/api/motorcycles', motorcycleRoutes(commandBus));

// Routes
app.use('/auth', authRoutes(commandBus));
app.use('/api', driverRoutes(commandBus));

app.get('/api/hello', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});


app.use(express.urlencoded({ extended: true }));



// Start Server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
