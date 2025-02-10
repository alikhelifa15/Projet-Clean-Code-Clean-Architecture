
import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import MotorcycleMongo from '../../../../infrastructure/database/mongodb/models/motorcycle';
import TestMongo from '../../../../infrastructure/database/mongodb/models/test';
import IncidentMongo from '../../../../infrastructure/database/mongodb/models/incident';
import { GetIncidentsByCompanyQuery } from '../../queries/Incident-queries/GetIncidentsByCompanyQuery';
import DriverMongo from '../../../../infrastructure/database/mongodb/models/driver';

export class GetIncidentsByCompanyQueryHandler {
  async execute(query: GetIncidentsByCompanyQuery) {
    if (!query.companyId) return [];
    
    try {
      await connectDB();
      const companyId = parseInt(query.companyId);
      
      const motorcycles = await MotorcycleMongo.find({ company_id: companyId }).lean();
      const motorcycleIds = motorcycles.map(m => m.id);
      
      const drivers = await DriverMongo.find({ companyId: companyId }).lean();
      const driverIds = drivers.map(d => d.id);
      
      const tests = await TestMongo.find({
        $or: [
          { motorcycle_id: { $in: motorcycleIds } },
          { driver_id: { $in: driverIds } }
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
        const driver = drivers.find(d => d.id === associatedTest?.driver_id);

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
            driver: driver ? {
              firstName: driver.firstName,
              lastName: driver.lastName
            } : null,
            motorcycle: motorcycle ? {
              brand: motorcycle.brand,
              model: motorcycle.model
            } : null
          }
        };
      });
      
    } catch (error) {
      console.error('Error in GetIncidentsByCompanyQueryHandler:', error);
      return [];
    }
  }
}