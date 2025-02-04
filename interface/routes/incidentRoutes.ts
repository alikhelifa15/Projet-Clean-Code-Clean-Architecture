import express from 'express';
import { IncidentController } from '../controllers/IncidentController';
import { CommandBus } from '../../application/usecases/CommandBus';

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const incidentController = new IncidentController(commandBus);


  router.post('/', (req, res) => incidentController.create(req, res));
  router.put('/:id', (req, res) => incidentController.update(req, res));
  router.delete('/:id', (req, res) => incidentController.delete(req, res));

  return router;
};