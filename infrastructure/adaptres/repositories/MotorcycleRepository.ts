import { MotorcycleRepository as IMotorcycleRepository } from '../../../application/repositories/MotorcycleRepository';
import { Motorcycle } from '../../../domain/entities/Motorcycle';
import MotorcycleModel from '../../database/mysql/models/Motorcycle';

export class MotorcycleRepository implements IMotorcycleRepository {
  async save(motorcycle: Motorcycle): Promise<Motorcycle> {
    const motorcycleModel = await MotorcycleModel.create({
      company_id: motorcycle.companyId || null,
      dealer_id: motorcycle.dealerId || null,
      model_id: motorcycle.modelId,
      serial_number: motorcycle.serialNumber,
      mileage: motorcycle.mileage,
      service_date: motorcycle.serviceDate,
      status: motorcycle.status,
      maintenance_interval: motorcycle.maintenanceInterval,
    } as any);

    return new Motorcycle(
      motorcycleModel.id,
      motorcycleModel.company_id,
      motorcycleModel.dealer_id,
      motorcycleModel.model_id,
      motorcycleModel.serial_number,
      motorcycleModel.mileage,
      motorcycleModel.service_date,
      motorcycleModel.status,
      motorcycleModel.maintenance_interval
    );
  }

  async findById(id: number): Promise<Motorcycle | null> {
    const motorcycleModel = await MotorcycleModel.findByPk(id);
    if (!motorcycleModel) return null;

    return new Motorcycle(
      motorcycleModel.id,
      motorcycleModel.company_id,
      motorcycleModel.dealer_id,
      motorcycleModel.model_id,
      motorcycleModel.serial_number,
      motorcycleModel.mileage,
      motorcycleModel.service_date,
      motorcycleModel.status,
      motorcycleModel.maintenance_interval
    );
  }

  async findBySerialNumber(serialNumber: string): Promise<Motorcycle | null> {
    const motorcycleModel = await MotorcycleModel.findOne({
      where: { serial_number: serialNumber }
    });
    if (!motorcycleModel) return null;

    return new Motorcycle(
      motorcycleModel.id,
      motorcycleModel.company_id,
      motorcycleModel.dealer_id,
      motorcycleModel.model_id,
      motorcycleModel.serial_number,
      motorcycleModel.mileage,
      motorcycleModel.service_date,
      motorcycleModel.status,
      motorcycleModel.maintenance_interval
    );
  }

  async update(motorcycle: Motorcycle): Promise<Motorcycle> {
    if (!motorcycle.id) {
      throw new Error('Motorcycle ID is required for update');
    }  
    const instance = await MotorcycleModel.findByPk(motorcycle.id);
    if (!instance) {
      throw new Error(`Motorcycle with id ${motorcycle.id} not found`);
    }
      await instance.update({
      mileage: motorcycle.mileage,
      service_date: motorcycle.serviceDate,
      status: motorcycle.status,
      maintenance_interval: motorcycle.maintenanceInterval,
    });
  
    return motorcycle;
  }

  async delete(id: number): Promise<void> {
        const instance = await MotorcycleModel.findByPk(id);
    if (!instance) {
      throw new Error(`Motorcycle with id ${id} not found`);
    }
      await instance.destroy();
  }
}
