import express from 'express';
import { DriverController } from '../controllers/DriverController';
import { CommandBus } from '../../application/usecases/CommandBus';
import verifyToken from "../middleware/authMiddleware";

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const driverController = new DriverController(commandBus);

  router.post('/createDriver',verifyToken, (req, res) => driverController.createDriver(req, res));

  router.put('/updateDriver/:id', verifyToken,(req, res) => driverController.updateDriver(req, res));

  router.get('/getDriver/:id', verifyToken,(req, res) => driverController.getDriverById(req, res));

  router.get('/getAllDrivers',verifyToken, (req, res) => driverController.getAllDrivers(req, res));

  router.delete('/deleteDriver/:id',verifyToken, (req, res) => driverController.deleteDriver(req, res));

  return router;
};
