import express from 'express';
import { MaintenanceController } from '../controllers/MaintenanceController';
import { CommandBus } from '../../application/usecases/CommandBus';
import verifyToken from "../middleware/authMiddleware";

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const maintenanceController = new MaintenanceController(commandBus);

  router.post('/createMaintenance',verifyToken, (req, res) => maintenanceController.createMaintenance(req, res));
  router.get('/getMaintenanceMoto/:motorcycleId',verifyToken, (req, res) => maintenanceController.getAllByMotorcycleId(req, res));

  return router;
};
