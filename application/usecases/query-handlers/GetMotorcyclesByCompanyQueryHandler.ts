// application/usecases/query-handlers/GetMotorcyclesByCompanyQueryHandler.ts
import { connectDB } from '../../../infrastructure/database/mongodb/models';
import MotorcycleMongo from '../../../infrastructure/database/mongodb/models/motorcycle';
import { GetMotorcyclesByCompanyQuery } from '../queries/GetMotorcyclesByCompanyQuery';

export class GetMotorcyclesByCompanyQueryHandler {
  async execute(query: GetMotorcyclesByCompanyQuery) {
    try {
      await connectDB();
      const motorcycles = await MotorcycleMongo.find({
        company_id: parseInt(query.companyId)
      });
      return motorcycles;
    } catch (error) {
      console.error('Error in GetMotorcyclesByCompanyQueryHandler:', error);
      throw error;
    }
  }
}