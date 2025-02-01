import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import ClientMongo from '../../../../infrastructure/database/mongodb/models/client';
import { GetClientQuery } from '../../queries/Client-queries/GetClientQuery';

export class GetClientQueryHandler {
  async execute(query: GetClientQuery) {
    try {
      await connectDB();
      const client = await ClientMongo.findOne({ id: parseInt(query.id) });
      if (!client) return null;
      
      return {
        id: client.id,
        dealerId: client.dealer_id,
        firstName: client.first_name,
        lastName: client.last_name,
        phone: client.phone
      };
    } catch (error) {
      console.error('Error in GetClientQueryHandler:', error);
      throw error;
    }
  }
}