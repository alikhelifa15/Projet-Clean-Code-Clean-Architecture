import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import ClientMongo from '../../../../infrastructure/database/mongodb/models/client';
import { GetClientsByDealerQuery } from '../../queries/Client-queries/GetClientsByDealerQuery';

export class GetClientsByDealerQueryHandler {
  async execute(query: GetClientsByDealerQuery) {
    try {
      await connectDB();
      const clients = await ClientMongo.find({
        dealer_id: parseInt(query.dealerId)
      });
      return clients.map(client => ({
        id: client.id,
        dealerId: client.dealer_id,
        firstName: client.first_name,
        lastName: client.last_name,
        phone: client.phone
      }));
    } catch (error) {
      console.error('Error in GetClientsByDealerQueryHandler:', error);
      throw error;
    }
  }
}
