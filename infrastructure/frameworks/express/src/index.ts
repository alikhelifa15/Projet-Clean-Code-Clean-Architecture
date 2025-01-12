import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import '../../../database/mysql/models/index'; 
import { LoginCommandHandler } from '../../../../application/usecases/command-handlers/LoginCommandHandler';
import { SignUpCommandHandler } from '../../../../application/usecases/command-handlers/SignUpCommandHandler';
import { LoginCommand } from '../../../../application/usecases/commands/LoginCommand';
import { SignUpCommand } from '../../../../application/usecases/commands/SignUpCommand';

import { UserRepository } from '../../../adaptres/repositories/UserRepository';
import { CompanyRepository } from '../../../adaptres/repositories/CompanyRepository';
import { JwtService } from '../../../adaptres/services/JwtService';
import { HashService } from '../../../adaptres/services/HashService';
import authRoutes from '../../../../interface/routes/authRoutes';
import { CommandBus } from '../../../../application/usecases/CommandBus';
import { DealerRepository } from '../../../adaptres/repositories/DealerRepository';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const commandBus = new CommandBus();
const userRepository = new UserRepository ();
const companyRepository = new CompanyRepository ();
const dealerRepository = new DealerRepository ();
const jwtService = new JwtService();
const hashService = new HashService();

commandBus.register(LoginCommand, new LoginCommandHandler(userRepository, jwtService,hashService));
commandBus.register(SignUpCommand, new SignUpCommandHandler(userRepository, dealerRepository, companyRepository, hashService));

app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes(commandBus));

app.get('/api/hello', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
