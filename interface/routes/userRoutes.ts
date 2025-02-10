
import express from 'express';
import { UserController } from '../controllers/UserController';
import { CommandBus } from '../../application/usecases/CommandBus';
import verifyToken from "../middleware/authMiddleware";

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const userController = new UserController(commandBus);

  router.post('/login', (req, res) => userController.login(req, res));
  router.post('/signup', (req, res) => userController.signUp(req, res));
  router.put('/users/:id',verifyToken, (req, res) => userController.updateUser(req, res));
  router.delete('/users/:id',verifyToken, (req, res) => userController.deleteUser(req, res));

  return router;
};
