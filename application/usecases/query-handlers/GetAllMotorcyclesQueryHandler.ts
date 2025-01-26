import { connectDB } from '../../../infrastructure/database/mongodb/models';
import MotorcycleMongo from '../../../infrastructure/database/mongodb/models/motorcycle';
import { GetAllMotorcyclesQuery } from '../queries/GetAllMotorcyclesQuery';

export class GetAllMotorcyclesQueryHandler {
  async execute(query: GetAllMotorcyclesQuery) {
    try {
      await connectDB();
      const criteria: any = {};
      
      if (query.dealerId) {
        criteria.dealer_id = parseInt(query.dealerId);
      }
      
      if (query.companyId) {
        criteria.company_id = parseInt(query.companyId);
      }
      
      const motorcycles = await MotorcycleMongo.find(criteria);
      return motorcycles;
    } catch (error) {
      console.error('Error in GetAllMotorcyclesQueryHandler:', error);
      throw error;
    }
  }
}