import { connectDB } from '../../../infrastructure/database/mongodb/models';
import MotorcycleMongo from '../../../infrastructure/database/mongodb/models/motorcycle';
import { GetMotorcyclesByDealerQuery } from '../../../application/usecases/queries/GetMotorcyclesByDealerQuery';

export class GetMotorcyclesByDealerQueryHandler {
  async execute(query: GetMotorcyclesByDealerQuery) {
    try {
      await connectDB();
      const motorcycles = await MotorcycleMongo.find({
        dealer_id: parseInt(query.dealerId)
      });
      return motorcycles;
    } catch (error) {
      console.error('Error in GetMotorcyclesByDealerQueryHandler:', error);
      throw error;
    }
  }
}