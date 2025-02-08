import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// ======================================
// Configuration Base de données
// ======================================
import '../../../database/mysql/models/index'; 

// ======================================
// Command Handlers - Utilisateur et Authentication
// ======================================
import { LoginCommandHandler } from '../../../../application/usecases/command-handlers/User-command-handler/LoginCommandHandler';
import { SignUpCommandHandler } from '../../../../application/usecases/command-handlers/User-command-handler/SignUpCommandHandler';
import { DeleteUserCommandHandler } from '../../../../application/usecases/command-handlers/User-command-handler/DeleteUserCommandHandler';
import { UpdateUserCommandHandler } from '../../../../application/usecases/command-handlers/User-command-handler/UpdateUserCommandHandler';

// ======================================
// Command Handlers - Chauffeur
// ======================================
import { CreateDriverCommandHandler } from '../../../../application/usecases/command-handlers/Diver-command-handler/CreateDriverCommandHandler';
import { UpdateDriverCommandHandler } from '../../../../application/usecases/command-handlers/Diver-command-handler/UpdateDriverCommandHandler';
import { DeleteDriverCommandHandler } from '../../../../application/usecases/command-handlers/Diver-command-handler/DeleteDriverCommandHandler';
import { GetDriverByIdCommandHandler } from '../../../../application/usecases/command-handlers/Diver-command-handler/GetDriverByIdCommandHandler';
import { GetAllDriversCommandHandler } from '../../../../application/usecases/command-handlers/Diver-command-handler/GetAllDriversCommandHandler';

// ======================================
// Command Handlers - Pièces détachées
// ======================================
import { CreatePartCommandHandler } from '../../../../application/usecases/command-handlers/PartCommandHandler/CreatePartCommandHandler';
import { UpdatePartCommandHandler } from '../../../../application/usecases/command-handlers/PartCommandHandler/UpdatePartCommandHandler';
import { DeletePartCommandHandler } from '../../../../application/usecases/command-handlers/PartCommandHandler/DeletePartCommandHandler';

// ======================================
// Command Handlers - Client
// ======================================
import { CreateClientCommandHandler } from '../../../../application/usecases/command-handlers/Client-command-handler/CreateClientCommandHandler';
import { UpdateClientCommandHandler } from '../../../../application/usecases/command-handlers/Client-command-handler/UpdateClientCommandHandler';
import { DeleteClientCommandHandler } from '../../../../application/usecases/command-handlers/Client-command-handler/DeleteClientCommandHandler';

// ======================================
// Commands - Utilisateur et Authentication
// ======================================
import { LoginCommand } from '../../../../application/usecases/commands/User-Commands/LoginCommand';
import { SignUpCommand } from '../../../../application/usecases/commands/User-Commands/SignUpCommand';
import { DeleteUserCommand } from '../../../../application/usecases/commands/User-Commands/DeleteUserCommand';
import { UpdateUserCommand } from '../../../../application/usecases/commands/User-Commands/UpdateUserCommand';

// ======================================
// Commands & Handlers - Moto
// ======================================
import { CreateMotorcycleCommand } from '../../../../application/usecases/commands/Motorcycle-Commands/CreateMotorcycleCommand';
import { CreateMotorcycleCommandHandler } from '../../../../application/usecases/command-handlers/Motorcycle-command-handler/CreateMotorcycleCommandHandler';
import { UpdateMotorcycleCommand } from '../../../../application/usecases/commands/Motorcycle-Commands/UpdateMotorcycleCommand';
import { UpdateMotorcycleCommandHandler } from '../../../../application/usecases/command-handlers/Motorcycle-command-handler/UpdateMotorcycleCommandHandler';
import { DeleteMotorcycleCommand } from '../../../../application/usecases/commands/Motorcycle-Commands/DeleteMotorcycleCommand';
import { DeleteMotorcycleCommandHandler } from '../../../../application/usecases/command-handlers/Motorcycle-command-handler/DeleteMotorcycleCommandHandler';

// ======================================
// Commands & Handlers - Test
// ======================================
import { CreateTestCommandHandler } from '../../../../application/usecases/command-handlers/Test-command-handler/CreateTestCommandHandler';
import { UpdateTestCommandHandler } from '../../../../application/usecases/command-handlers/Test-command-handler/UpdateTestCommandHandler';
import { DeleteTestCommandHandler } from '../../../../application/usecases/command-handlers/Test-command-handler/DeleteTestCommandHandler';

// ======================================
// Commands & Handlers - incident
// ======================================
import { CreateIncidentCommandHandler } from '../../../../application/usecases/command-handlers/Incident-command-handler/CreateIncidentCommandHandler';
import { UpdateIncidentCommandHandler } from '../../../../application/usecases/command-handlers/Incident-command-handler/UpdateIncidentCommandHandler';
import { DeleteIncidentCommandHandler } from '../../../../application/usecases/command-handlers/Incident-command-handler/DeleteIncidentCommandHandler';




// ======================================
// Commands - Chauffeur
// ======================================
import { CreateDriverCommand } from '../../../../application/usecases/commands/Driver-Commands/CreateDriverCommand';
import { UpdateDriverCommand } from '../../../../application/usecases/commands/Driver-Commands/UpdateDriverCommand';
import { DeleteDriverCommand } from '../../../../application/usecases/commands/Driver-Commands/DeleteDriverCommand';
import { GetDriverByIdCommand } from '../../../../application/usecases/commands/Driver-Commands/GetDriverByIdCommand';
import { GetAllDriversCommand } from '../../../../application/usecases/commands/Driver-Commands/GetAllDriversCommand';

// ======================================
// Commands - Pièces détachées
// ======================================
import { CreatePartCommand } from '../../../../application/usecases/commands/PartCommands/CreatePartCommand';
import { UpdatePartCommand } from '../../../../application/usecases/commands/PartCommands/UpdatePartCommand';
import { DeletePartCommand } from '../../../../application/usecases/commands/PartCommands/DeletePartCommand';

// ======================================
// Commands - Client
// ======================================
import { CreateClientCommand } from '../../../../application/usecases/commands/Client-Commands/CreateClientCommand';
import { UpdateClientCommand } from '../../../../application/usecases/commands/Client-Commands/UpdateClientCommand';
import { DeleteClientCommand } from '../../../../application/usecases/commands/Client-Commands/DeleteClientCommand';

// ======================================
// Commands - Test
// ======================================
import { CreateTestCommand } from '../../../../application/usecases/commands/Test-Commands/CreateTestCommand';
import { UpdateTestCommand } from '../../../../application/usecases/commands/Test-Commands/UpdateTestCommand';
import { DeleteTestCommand } from '../../../../application/usecases/commands/Test-Commands/DeleteTestCommand';

// ======================================
// Commands - incident
// ======================================
import { CreateIncidentCommand } from '../../../../application/usecases/commands/Incident-Commands/CreateIncidentCommand';
import { UpdateIncidentCommand } from '../../../../application/usecases/commands/Incident-Commands/UpdateIncidentCommand';  
import { DeleteIncidentCommand } from '../../../../application/usecases/commands/Incident-Commands/DeleteIncidentCommand';

// ======================================
// Repositories - Couche d'accès aux données
// ======================================
import { MotorcycleRepository } from '../../../adaptres/repositories/MotorcycleRepository';
import { UserRepository } from '../../../adaptres/repositories/UserRepository';
import { CompanyRepository } from '../../../adaptres/repositories/CompanyRepository';
import { DealerRepository } from '../../../adaptres/repositories/DealerRepository';
import { DriverRepository } from '../../../adaptres/repositories/DriverRepository';
import { ClientRepository } from '../../../adaptres/repositories/ClientRepository';
import { PartRepository } from '../../../adaptres/repositories/PartRepository';
import { TestRepository } from '../../../adaptres/repositories/TestRepository';
import { IncidentRepository } from '../../../adaptres/repositories/IncidentRepository';

// ======================================
// Services - Services d'infrastructure
// ======================================
import { JwtService } from '../../../adaptres/services/JwtService';
import { HashService } from '../../../adaptres/services/HashService';

// ======================================
// Routes - Configuration des routes API
// ======================================
import userRoutes from '../../../../interface/routes/userRoutes';
import motorcycleRoutes from '../../../../interface/routes/motorcycleRoutes';
import clientRoutes from '../../../../interface/routes/ClientRoutes';
import driverRoutes from '../../../../interface/routes/DriverRoutes';
import partRoutes from '../../../../interface/routes/PartRoutes';
import testRoutes from '../../../../interface/routes/TestRoutes';
import incidentRoutes from '../../../../interface/routes/IncidentRoutes';  

// ======================================
// Command Bus - Bus de commandes CQRS
// ======================================
import { CommandBus } from '../../../../application/usecases/CommandBus';


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

// Repositories
const userRepository = new UserRepository ();
const companyRepository = new CompanyRepository ();
const dealerRepository = new DealerRepository ();
const motorcycleRepository = new MotorcycleRepository ();
const driverRepository = new DriverRepository();
const partRepository = new PartRepository();
const clientRepository = new ClientRepository();
const testRepository = new TestRepository();
const incidentRepository = new IncidentRepository();
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
commandBus.register(GetDriverByIdCommand, new GetDriverByIdCommandHandler(driverRepository));
commandBus.register(GetAllDriversCommand, new GetAllDriversCommandHandler(driverRepository));
// part Command Handlers
commandBus.register(CreatePartCommand, new CreatePartCommandHandler(partRepository));
commandBus.register(UpdatePartCommand, new UpdatePartCommandHandler(partRepository));
commandBus.register(DeletePartCommand, new DeletePartCommandHandler(partRepository));

// client Command Handlers
commandBus.register(CreateClientCommand, new CreateClientCommandHandler(clientRepository));
commandBus.register(UpdateClientCommand, new UpdateClientCommandHandler(clientRepository));
commandBus.register(DeleteClientCommand, new DeleteClientCommandHandler(clientRepository));

// test Command Handlers
commandBus.register(CreateTestCommand, new CreateTestCommandHandler(testRepository));
commandBus.register(UpdateTestCommand, new UpdateTestCommandHandler(testRepository));
commandBus.register(DeleteTestCommand, new DeleteTestCommandHandler(testRepository));
// incident Command Handlers
commandBus.register(CreateIncidentCommand, new CreateIncidentCommandHandler(incidentRepository));
commandBus.register(UpdateIncidentCommand, new UpdateIncidentCommandHandler(incidentRepository));
commandBus.register(DeleteIncidentCommand, new DeleteIncidentCommandHandler(incidentRepository));



// Routes
app.use('/api', userRoutes(commandBus));
app.use('/api/motorcycles', motorcycleRoutes(commandBus));

app.use('/api', driverRoutes(commandBus));
app.use('/api', partRoutes(commandBus));
app.use('/api/clients', clientRoutes(commandBus));

app.use('/api/tests', testRoutes(commandBus));
app.use('/api/incidents', incidentRoutes(commandBus));

app.get('/api/hello', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});


app.use(express.urlencoded({ extended: true }));



// Start Server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
