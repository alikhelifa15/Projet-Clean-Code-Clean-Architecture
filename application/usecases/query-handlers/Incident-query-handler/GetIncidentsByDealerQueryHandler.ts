import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import TestMongo from '../../../../infrastructure/database/mongodb/models/test';
import IncidentMongo from '../../../../infrastructure/database/mongodb/models/incident';
import { GetIncidentsByDealerQuery } from '../../queries/Incident-queries/GetIncidentsByDealerQuery';

export class GetIncidentsByDealerQueryHandler {
  async execute(query: GetIncidentsByDealerQuery) {
    if (!query.dealerId) return [];

    try {
      await connectDB();
      
      const tests = await TestMongo.find({
        dealer_id: parseInt(query.dealerId)
      }).lean();

      if (!tests?.length) return [];

      const testIds = tests.map(test => test.id);
      const incidents = await IncidentMongo.find({
        test_id: { $in: testIds }
      }).populate('test_id').lean();

      return incidents?.map(incident => ({
        ...incident,
        test: incident.test_id
      })) || [];

    } catch (error) {
      console.error('Error in GetIncidentsByDealerQueryHandler:', error);
      return [];
    }
  }
}