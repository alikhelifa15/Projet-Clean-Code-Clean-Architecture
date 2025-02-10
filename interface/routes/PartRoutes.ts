import express from 'express';
import { PartController } from '../controllers/PartController';
import { CommandBus } from '../../application/usecases/CommandBus';
import verifyToken from "../middleware/authMiddleware";

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const partController = new PartController(commandBus);

  // Routes pour les pièces
  router.post('/createPart',verifyToken, (req, res) => partController.createPart(req, res));
  router.put('/updatePart/:id',verifyToken, (req, res) => partController.updatePart(req, res));
  router.delete('/deletePart/:id',verifyToken, (req, res) => partController.deletePart(req, res));

  return router;
};
