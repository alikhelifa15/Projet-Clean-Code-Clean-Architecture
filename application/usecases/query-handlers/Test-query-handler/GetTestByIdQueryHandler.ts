import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import TestMongo from '../../../../infrastructure/database/mongodb/models/test';
import { GetTestQuery } from '../../../usecases/queries/Test-queries/GetTestQuery';

export class GetTestByIdQueryHandler {
  async execute(query: GetTestQuery) {
    try {
      await connectDB();
      const test = await TestMongo.findOne({ id: parseInt(query.id) });
      return test;
    } catch (error) {
      console.error('Error in GetTestByIdQueryHandler:', error);
      throw error;
    }
  }
}