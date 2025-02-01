import express from 'express';
import { ClientController } from '../controllers/ClientController';
import { CommandBus } from '../../application/usecases/CommandBus';

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const clientController = new ClientController(commandBus);

  router.post('/', (req, res) => clientController.create(req, res));
  router.put('/:id', (req, res) => clientController.update(req, res));
  router.delete('/:id', (req, res) => clientController.delete(req, res));

  return router;
};