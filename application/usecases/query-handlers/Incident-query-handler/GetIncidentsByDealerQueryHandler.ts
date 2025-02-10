import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import TestMongo from '../../../../infrastructure/database/mongodb/models/test';
import IncidentMongo from '../../../../infrastructure/database/mongodb/models/incident';
import { GetIncidentsByDealerQuery } from '../../queries/Incident-queries/GetIncidentsByDealerQuery';
import MotorcycleMongo from '../../../../infrastructure/database/mongodb/models/motorcycle';
import ClientMongo from '../../../../infrastructure/database/mongodb/models/client';
export class GetIncidentsByDealerQueryHandler {
  async execute(query: GetIncidentsByDealerQuery) {
    if (!query.dealerId) return [];
    
    try {
      await connectDB();
      const dealerId = parseInt(query.dealerId);
      
      const motorcycles = await MotorcycleMongo.find({ dealer_id: dealerId }).lean();
      const motorcycleIds = motorcycles.map(m => m.id);
      
      const clients = await ClientMongo.find({ dealer_id: dealerId }).lean();
      const clientIds = clients.map(c => c.id);
      
      const tests = await TestMongo.find({
        $or: [
          { motorcycle_id: { $in: motorcycleIds } },
          { client_id: { $in: clientIds } }
        ]
      }).lean();
      
      if (!tests?.length) return [];
      
      const testIds = tests.map(test => test.id);
      const incidents = await IncidentMongo.find({
        test_id: { $in: testIds }
      }).lean();

      return incidents.map(incident => {
        const associatedTest = tests.find(test => test.id === incident.test_id);
        const motorcycle = motorcycles.find(m => m.id === associatedTest?.motorcycle_id);
        const client = clients.find(c => c.id === associatedTest?.client_id);

        return {
          id: incident.id,
          test_Id: incident.test_id,
          incident_Date: incident.incident_date.toISOString(),
          type: incident.type,
          severity: incident.severity,
          description: incident.description || null,
          actions_Taken: incident.actions_taken || null,
          test: {
            id: associatedTest?.id,
            start_date: associatedTest?.start_date.toISOString(),
            end_date: associatedTest?.end_date ? associatedTest?.end_date.toISOString() : null,
            status: associatedTest?.status,
            client: client ? {
              first_name: client.first_name,
              last_name: client.last_name
            } : null,
            motorcycle: motorcycle ? {
              brand: motorcycle.brand,
              model: motorcycle.model
            } : null
          }
        };
      });
      
    } catch (error) {
      console.error('Error in GetIncidentsByDealerQueryHandler:', error);
      return [];
    }
  }
}