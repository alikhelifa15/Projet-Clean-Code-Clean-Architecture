import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import TestMongo from '../../../../infrastructure/database/mongodb/models/test';
import { GetTestsByDriverQuery } from '../../queries/Test-queries/GetTestsByDriverQuery';

export class GetTestsByDriverIdQueryHandler {
  async execute(query: GetTestsByDriverQuery) {
    try {
      await connectDB();
      const tests = await TestMongo.find({
        driver_id: parseInt(query.driverId)
      });
      return tests;
    } catch (error) {
      console.error('Error in GetTestsByDriverIdQueryHandler:', error);
      throw error;
    }
  }
}
