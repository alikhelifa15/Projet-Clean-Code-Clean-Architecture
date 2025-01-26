import express from 'express';
import { MotorcycleController } from '../controllers/MotorcycleController';
import { CommandBus } from '../../application/usecases/CommandBus';

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const motorcycleController = new MotorcycleController(commandBus);

  router.post('/', (req, res) => motorcycleController.create(req, res));
  router.put('/:id', (req, res) => motorcycleController.update(req, res));
  router.delete('/:id', (req, res) => motorcycleController.delete(req, res));

  return router;
};