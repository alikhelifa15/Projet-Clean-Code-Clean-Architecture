import { DriverRepository as IDriverRepository } from '../../../application/repositories/DriverRepository';
import { Driver } from '../../../domain/entities/Driver';
import DriverModel from '../../database/mysql/models/Driver'; 

export class DriverRepository implements IDriverRepository {
  async save(driver: Driver): Promise<Driver> {
    const driverModel = await DriverModel.create({
      company_id: driver.companyId,
      first_name: driver.firstName,
      last_name: driver.lastName,
      license_number: driver.licenseNumber,
      license_date: driver.licenseDate,
      experience: driver.experience ?? "", 
      status: driver.status,
    } as any);

    return new Driver(
      driverModel.id, 
      driverModel.company_id,
      driverModel.first_name,
      driverModel.last_name,
      driverModel.license_number,
      driverModel.license_date,
      driverModel.experience,
      driverModel.status
    );
  }

  async findById(id: number): Promise<Driver | null> {
    const driverModel = await DriverModel.findByPk(id);

    if (!driverModel) {
      return null;
    }

    return new Driver(
      driverModel.id,
      driverModel.company_id,
      driverModel.first_name,
      driverModel.last_name,
      driverModel.license_number,
      driverModel.license_date,
      driverModel.experience,
      driverModel.status
    );
  }

  async findAll(): Promise<Driver[]> {
    const drivers = await DriverModel.findAll();

    return drivers.map(driverModel => 
      new Driver(
        driverModel.id,
        driverModel.company_id,
        driverModel.first_name,
        driverModel.last_name,
        driverModel.license_number,
        driverModel.license_date,
        driverModel.experience,
        driverModel.status
      )
    );
  }

  async update(id: number, updatedFields: Partial<Driver>): Promise<Driver | null> {
    const driver = await DriverModel.findByPk(id);
    if (driver) {
      console.log('Driver found:', driver.toJSON());
    }
    if (!driver) {
      throw new Error(`Driver with ID ${id} not found`);
    }
  
    await driver.update(
      {
        company_id: updatedFields.companyId,
        first_name: updatedFields.firstName,
        last_name: updatedFields.lastName,
        license_number: updatedFields.licenseNumber,
        license_date: updatedFields.licenseDate,
        experience: updatedFields.experience ?? "",
        status: updatedFields.status,
      },
      { validate: true } 
    );
  
  
    return new Driver(
      driver.id,
      driver.company_id,
      driver.first_name,
      driver.last_name,
      driver.license_number,
      driver.license_date,
      driver.experience,
      driver.status
    );
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await DriverModel.destroy({ where: { id } });
    return deletedCount > 0;
  }
}
