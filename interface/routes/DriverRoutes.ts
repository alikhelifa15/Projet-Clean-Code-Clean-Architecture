import express from 'express';
import { DriverController } from '../controllers/DriverController';
import { CommandBus } from '../../application/usecases/CommandBus';

export default (commandBus: CommandBus) => {
  const router = express.Router();
  const driverController = new DriverController(commandBus);

  router.post('/createDriver', (req, res) => driverController.createDriver(req, res));

  router.put('/updateDriver/:id', (req, res) => driverController.updateDriver(req, res));

  router.get('/getDriver/:id', (req, res) => driverController.getDriverById(req, res));


  router.delete('/deleteDriver/:id', (req, res) => driverController.deleteDriver(req, res));

  return router;
};
