import { connectDB } from "../../../../infrastructure/database/mongodb/models";
import IncidentMongo from "../../../../infrastructure/database/mongodb/models/incident";
import { GetAllIncidentsQuery } from "../../queries/Incident-queries/GetAllIncidentsQuery";

export class GetAllIncidentsQueryHandler {
  async execute(query: GetAllIncidentsQuery) {
    try {
      await connectDB();
      const criteria: any = {};
      
      if (query.testId) criteria.test_id = parseInt(query.testId);
      if (query.type) criteria.type = query.type;
      if (query.severity) criteria.severity = query.severity;
      
      const incidents = await IncidentMongo.find(criteria).lean();
      
      return incidents.map(incident => ({
        id: incident.id,
        test_Id: incident.test_id,
        incident_Date: incident.incident_date.toISOString(),
        type: incident.type,
        severity: incident.severity,
        description: incident.description || null,
        actions_Taken: incident.actions_taken || null
      })) || [];
      
    } catch (error) {
      console.error('Error in GetAllIncidentsQueryHandler:', error);
      return [];
    }
  }
}