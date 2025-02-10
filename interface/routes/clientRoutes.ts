import express from 'express';
import { ClientController } from '../controllers/ClientController';
import verifyToken from "../middleware/authMiddleware";
import { CommandBus } from '../../application/usecases/CommandBus';

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const clientController = new ClientController(commandBus);

  router.post('/',verifyToken, (req, res) => clientController.create(req, res));
  router.put('/:id',verifyToken, (req, res) => clientController.update(req, res));
  router.delete('/:id',verifyToken, (req, res) => clientController.delete(req, res));

  return router;
};