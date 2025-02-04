import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import IncidentMongo from '../../../../infrastructure/database/mongodb/models/incident';
import { GetAllIncidentsQuery } from '../../queries/Incident-queries/GetAllIncidentsQuery';

export class GetAllIncidentsQueryHandler {
  async execute(query: GetAllIncidentsQuery) {
    try {
      await connectDB();
      const criteria: any = {};
      
      if (query.testId) {
        criteria.test_id = parseInt(query.testId);
      }
      
      if (query.type) {
        criteria.type = query.type;
      }

      if (query.severity) {
        criteria.severity = query.severity;
      }
      
      const incidents = await IncidentMongo.find(criteria);
      return incidents;
    } catch (error) {
      console.error('Error in GetAllIncidentsQueryHandler:', error);
      throw error;
    }
  }
}