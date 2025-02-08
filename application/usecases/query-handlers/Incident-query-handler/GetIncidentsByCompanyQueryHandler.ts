import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import TestMongo from '../../../../infrastructure/database/mongodb/models/test';
import IncidentMongo from '../../../../infrastructure/database/mongodb/models/incident';
import { GetIncidentsByCompanyQuery } from '../../queries/Incident-queries/GetIncidentsByCompanyQuery';

export class GetIncidentsByCompanyQueryHandler {
  async execute(query: GetIncidentsByCompanyQuery) {
    if (!query.companyId) return [];
    
    try {
      await connectDB();
      
      const tests = await TestMongo.find({
        company_id: parseInt(query.companyId)
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
      console.error('Error in GetIncidentsByCompanyQueryHandler:', error);
      return [];
    }
  }
}