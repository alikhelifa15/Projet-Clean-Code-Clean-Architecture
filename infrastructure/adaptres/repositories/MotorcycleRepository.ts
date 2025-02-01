import { MotorcycleRepository as IMotorcycleRepository } from "../../../application/repositories/MotorcycleRepository";
import { Motorcycle } from "../../../domain/entities/Motorcycle";
import MotorcycleModel from "../../database/mysql/models/Motorcycle";

export class MotorcycleRepository implements IMotorcycleRepository {
  async save(motorcycle: Motorcycle): Promise<Motorcycle> {
    const motorcycleModel = await MotorcycleModel.create({
      company_id: motorcycle.companyId || null,
      dealer_id: motorcycle.dealerId || null,
      brand: motorcycle.brand,
      model: motorcycle.model,
      serial_number: motorcycle.serialNumber,
      photo: motorcycle.photo || null,
      mileage: motorcycle.mileage,
      service_date: motorcycle.serviceDate,
      status: motorcycle.status,
      maintenance_interval: motorcycle.maintenanceInterval,
    } as any);

    return new Motorcycle(
      motorcycleModel.id,
      motorcycleModel.company_id,
      motorcycleModel.dealer_id,
      motorcycleModel.model,
      motorcycleModel.brand,
      motorcycleModel.serial_number,
      motorcycleModel.photo,
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
      motorcycleModel.brand,
      motorcycleModel.model,
      motorcycleModel.serial_number,
      motorcycleModel.photo,
      motorcycleModel.mileage,
      motorcycleModel.service_date,
      motorcycleModel.status,
      motorcycleModel.maintenance_interval
    );
  }

  async findByDealerId(dealerId: string): Promise<Motorcycle[]> {
    const motorcycles = await MotorcycleModel.findAll({
      where: { dealer_id: dealerId },
    });
    return motorcycles.map((motorcycle) => {
      return new Motorcycle(
        motorcycle.id,
        motorcycle.company_id,
        motorcycle.dealer_id,
        motorcycle.brand,
        motorcycle.model,
        motorcycle.serial_number,
        motorcycle.photo,
        motorcycle.mileage,
        motorcycle.service_date,
        motorcycle.status,
        motorcycle.maintenance_interval
      );
    });
  }

  async findByCompanyId(companyId: string): Promise<Motorcycle[]> {
    const motorcycles = await MotorcycleModel.findAll({
      where: { company_id: companyId },
    });
    return motorcycles.map((motorcycle) => {
      return new Motorcycle(
        motorcycle.id,
        motorcycle.company_id,
        motorcycle.dealer_id,
        motorcycle.brand,
        motorcycle.model,
        motorcycle.serial_number,
        motorcycle.photo,
        motorcycle.mileage,
        motorcycle.service_date,
        motorcycle.status,
        motorcycle.maintenance_interval
      );
    });
  }

  async update(motorcycle: Motorcycle): Promise<Motorcycle> {
    if (!motorcycle.id) {
      throw new Error("Motorcycle ID is required for update");
    }
    const instance = await MotorcycleModel.findByPk(motorcycle.id);
    if (!instance) {
      throw new Error(`Motorcycle with id ${motorcycle.id} not found`);
    }
    console.log(motorcycle);
    await instance.update({
      brand: motorcycle.brand,
      model: motorcycle.model,
      serial_number: motorcycle.serialNumber,
      photo: motorcycle.photo,

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
