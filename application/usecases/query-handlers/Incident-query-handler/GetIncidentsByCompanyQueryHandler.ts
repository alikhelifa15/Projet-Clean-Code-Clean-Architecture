import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import TestMongo from '../../../../infrastructure/database/mongodb/models/test';
import IncidentMongo from '../../../../infrastructure/database/mongodb/models/incident';
import { GetIncidentsByCompanyQuery } from '../../queries/Incident-queries/GetIncidentsByCompanyQuery';

export class GetIncidentsByCompanyQueryHandler {
  async execute(query: GetIncidentsByCompanyQuery) {
    try {
      await connectDB();
      
      const motorcycleCompanyTests = await TestMongo.find({
        company_id: parseInt(query.companyId)
      });

      if (!motorcycleCompanyTests.length) {
        return [];
      }

      const testIds = motorcycleCompanyTests.map(test => test.id);
      const incidents = await IncidentMongo.find({
        test_id: { $in: testIds }
      }).populate('test_id');

      return incidents.map(incident => ({
        ...incident.toObject(),
        test: incident.test_id
      }));

    } catch (error) {
      console.error('Error in GetIncidentsByCompanyQueryHandler:', error);
      throw error;
    }
  }
}