import express from 'express';
import { IncidentController } from '../controllers/IncidentController';
import { CommandBus } from '../../application/usecases/CommandBus';
import verifyToken from "../middleware/authMiddleware";

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const incidentController = new IncidentController(commandBus);


  router.post('/',verifyToken, (req, res) => incidentController.create(req, res));
  router.put('/:id',verifyToken, (req, res) => incidentController.update(req, res));
  router.delete('/:id',verifyToken, (req, res) => incidentController.delete(req, res));

  return router;
};