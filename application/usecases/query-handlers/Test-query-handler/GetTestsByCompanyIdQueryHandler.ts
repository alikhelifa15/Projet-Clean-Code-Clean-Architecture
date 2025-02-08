import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import TestMongo from '../../../../infrastructure/database/mongodb/models/test';
import DriverMongo from '../../../../infrastructure/database/mongodb/models/driver';
import { GetTestsByCompanyIdQuery } from '../../queries/Test-queries/GetTestsByCompanyIdQuery';

export class GetTestsByCompanyIdQueryHandler {
  async execute(query: GetTestsByCompanyIdQuery) {
    try {
      await connectDB();
      
      const drivers = await DriverMongo.find({
        companyId: parseInt(query.companyId)
      }).lean();
      
      const driverIds = drivers.map(driver => driver.id);
      
      const tests = await TestMongo.aggregate([
        {
          $match: {
            driver_id: { $in: driverIds }
          }
        },
        {
          $lookup: {
            from: 'motorcycles',
            localField: 'motorcycle_id',
            foreignField: 'id',
            as: 'motorcycle'
          }
        },
        {
          $lookup: {
            from: 'drivers',
            localField: 'driver_id',
            foreignField: 'id',
            as: 'driver'
          }
        },
        {
          $lookup: {
            from: 'clients',
            localField: 'client_id',
            foreignField: 'id',
            as: 'client'
          }
        },
        {
          $unwind: {
            path: '$motorcycle',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $unwind: {
            path: '$driver',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $unwind: {
            path: '$client',
            preserveNullAndEmptyArrays: true
          }
        }
      ]);

      return tests;
    } catch (error) {
      console.error('Error in GetTestsByCompanyIdQueryHandler:', error);
      throw error;
    }
  }
}
