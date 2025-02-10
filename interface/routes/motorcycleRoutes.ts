import express from 'express';
import { MotorcycleController } from '../controllers/MotorcycleController';
import { CommandBus } from '../../application/usecases/CommandBus';
import verifyToken from "../middleware/authMiddleware";

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const motorcycleController = new MotorcycleController(commandBus);

  router.post('/',verifyToken, (req, res) => motorcycleController.create(req, res));
  router.put('/:id',verifyToken, (req, res) => motorcycleController.update(req, res));
  router.delete('/:id',verifyToken, (req, res) => motorcycleController.delete(req, res));

  return router;
};