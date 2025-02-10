import express from 'express';
import { TestController } from '../controllers/TestController';
import { CommandBus } from '../../application/usecases/CommandBus';
import verifyToken from "../middleware/authMiddleware";

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const testController = new TestController(commandBus);

  router.post('/',verifyToken, (req, res) => testController.create(req, res));
  router.put('/:id',verifyToken, (req, res) => testController.update(req, res));
  router.delete('/:id',verifyToken, (req, res) => testController.delete(req, res));
  return router;
};