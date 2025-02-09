import express from 'express';
import { MaintenanceController } from '../controllers/MaintenanceController';
import { CommandBus } from '../../application/usecases/CommandBus';

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const maintenanceController = new MaintenanceController(commandBus);

  router.post('/createMaintenance', (req, res) => maintenanceController.createMaintenance(req, res));
  router.get('/getMaintenanceMoto/:motorcycleId', (req, res) => maintenanceController.getAllByMotorcycleId(req, res));

  return router;
};
