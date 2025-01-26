import { GetMotorcycleQuery } from '../queries/GetMotorcycleQuery';
import MotorcycleMongo from '../../../infrastructure/database/mongodb/models/motorcycle';
import { connectDB } from '../../../infrastructure/database/mongodb/models';

export class GetMotorcycleQueryHandler {
  async execute(query: GetMotorcycleQuery) {
    try {
      await connectDB();
      const motorcycle = await MotorcycleMongo.findOne({ id: parseInt(query.id) });
      return motorcycle;
    } catch (error) {
      console.error('Error in GetMotorcycleQueryHandler:', error);
      throw error;
    }
  }
}