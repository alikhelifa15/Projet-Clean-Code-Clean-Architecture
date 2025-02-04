import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import TestMongo from '../../../../infrastructure/database/mongodb/models/test';
import IncidentMongo from '../../../../infrastructure/database/mongodb/models/incident';
import { GetIncidentsByDealerQuery } from '../../queries/Incident-queries/GetIncidentsByDealerQuery';

export class GetIncidentsByDealerQueryHandler {
  async execute(query: GetIncidentsByDealerQuery) {
    try {
      await connectDB();
      
      const motorcycleDealerTests = await TestMongo.find({
        dealer_id: parseInt(query.dealerId)
      });

      if (!motorcycleDealerTests.length) {
        return [];
      }

      const testIds = motorcycleDealerTests.map(test => test.id);
      const incidents = await IncidentMongo.find({
        test_id: { $in: testIds }
      }).populate('test_id');

      return incidents.map(incident => ({
        ...incident.toObject(),
        test: incident.test_id
      }));

    } catch (error) {
      console.error('Error in GetIncidentsByDealerQueryHandler:', error);
      throw error;
    }
  }
}