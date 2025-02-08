import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import TestMongo from '../../../../infrastructure/database/mongodb/models/test';
import { GetAllTestsQuery } from '../../queries/Test-queries/GetAllTestsQuery';

export class GetAllTestsQueryHandler {
  async execute(query: GetAllTestsQuery) {
    try {
      await connectDB();
      const criteria: any = {};
      
      if (query.driverId) {
        criteria.driver_id = parseInt(query.driverId);
      }
      
      if (query.clientId) {
        criteria.client_id = parseInt(query.clientId);
      }

      if (query.motorcycleId) {
        criteria.motorcycle_id = parseInt(query.motorcycleId);
      }
      
      const tests = await TestMongo.find(criteria)  .populate({
        path: 'motorcycle_id',
        model: 'Motorcycle'
      })
      .populate({
        path: 'driver_id',
        model: 'Driver'
      })
      .lean();
      return tests;
    } catch (error) {
      console.error('Error in GetAllTestsQueryHandler:', error);
      throw error;
    }
  }
}