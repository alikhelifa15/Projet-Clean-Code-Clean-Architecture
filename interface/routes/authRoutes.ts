
import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { CommandBus } from '../../application/usecases/CommandBus';

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const authController = new AuthController(commandBus);

  router.post('/login', (req, res) => authController.login(req, res));
  router.post('/signup', (req, res) => authController.signUp(req, res));

  return router;
};
