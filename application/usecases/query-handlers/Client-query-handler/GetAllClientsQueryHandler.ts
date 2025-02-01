import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import ClientMongo from '../../../../infrastructure/database/mongodb/models/client';
import { GetAllClientsQuery } from '../../queries/Client-queries/GetAllClientsQuery';

export class GetAllClientsQueryHandler {
  async execute(query: GetAllClientsQuery) {
    try {
      await connectDB();
      const criteria: any = {};
      
      if (query.dealerId) {
        criteria.dealer_id = parseInt(query.dealerId);
      }
      
      const clients = await ClientMongo.find(criteria);
      return clients.map(client => ({
        id: client.id,
        dealerId: client.dealer_id,
        firstName: client.first_name,
        lastName: client.last_name,
        phone: client.phone
      }));
    } catch (error) {
      console.error('Error in GetAllClientsQueryHandler:', error);
      throw error;
    }
  }
}