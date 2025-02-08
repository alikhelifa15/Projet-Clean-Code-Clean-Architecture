import { connectDB } from '../../../../infrastructure/database/mongodb/models';
import TestMongo from '../../../../infrastructure/database/mongodb/models/test';
import ClientMongo from '../../../../infrastructure/database/mongodb/models/client';
import { GetTestsByDealerIdQuery } from '../../queries/Test-queries/GetTestsByDealerIdQuery';

export class GetTestsByDealerIdQueryHandler {
  async execute(query: GetTestsByDealerIdQuery) {
    try {
      await connectDB();
      
      const clients = await ClientMongo.find({
        dealer_id: parseInt(query.dealerId)
      }).lean();
      
      if (!clients.length) {
        return []; 
      }
      
      const clientIds = clients.map(client => client.id);
      
      const tests = await TestMongo.aggregate([
        {
          $match: {
            client_id: { $in: clientIds }
          }
        },
        {
          $lookup: {
            from: 'motorcycles',
            let: { motorcycle_id: '$motorcycle_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$id', '$$motorcycle_id'] }
                }
              }
            ],
            as: 'motorcycle'
          }
        },
        {
          $lookup: {
            from: 'drivers',
            let: { driver_id: '$driver_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$id', '$$driver_id'] }
                }
              }
            ],
            as: 'driver'
          }
        },
        {
          $lookup: {
            from: 'clients',
            let: { client_id: '$client_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$id', '$$client_id'] }
                }
              }
            ],
            as: 'client'
          }
        },
        {
          $unwind: {
            path: '$motorcycle',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $unwind: {
            path: '$driver',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $unwind: {
            path: '$client',
            preserveNullAndEmptyArrays: true
          }
        }
      ]);

      return tests.map(test => ({
        ...test,
        motorcycle: test.motorcycle || null,
        driver: test.driver || null,
        client: test.client || null
      }));

    } catch (error) {
      console.error('Error in GetTestsByDealerIdQueryHandler:', error);
      throw error;
    }
  }
}