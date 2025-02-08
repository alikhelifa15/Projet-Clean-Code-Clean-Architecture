import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import TestMongo from '../../../../infrastructure/database/mongodb/models/test';
import { GetTestsByClientIdQuery } from '../../queries/Test-queries/GetTestsByClientIdQuery';

export class GetTestsByClientIdQueryHandler {
  async execute(query: GetTestsByClientIdQuery) {
    try {
      await connectDB();
      const tests = await TestMongo.find({
        client_id: parseInt(query.clientId)
      });
      return tests;
    } catch (error) {
      console.error('Error in GetTestsByClientIdQueryHandler:', error);
      throw error;
    }
  }
}