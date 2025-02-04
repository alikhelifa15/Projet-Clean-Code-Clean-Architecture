import express from 'express';
import { TestController } from '../controllers/TestController';
import { CommandBus } from '../../application/usecases/CommandBus';

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const testController = new TestController(commandBus);

  router.post('/', (req, res) => testController.create(req, res));
  router.put('/:id', (req, res) => testController.update(req, res));
  router.delete('/:id', (req, res) => testController.delete(req, res));
  return router;
};