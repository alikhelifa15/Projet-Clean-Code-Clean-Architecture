import { GetAllClientsQueryHandler } from '../../../application/usecases/query-handlers/Client-query-handler/GetAllClientsQueryHandler';
import { GetClientQueryHandler } from '../../../application/usecases/query-handlers/Client-query-handler/GetClientQueryHandler';
import { GetClientsByDealerQueryHandler } from '../../../application/usecases/query-handlers/Client-query-handler/GetClientsByDealerQueryHandler';
import { GetAllClientsQuery } from '../../../application/usecases/queries/Client-queries/GetAllClientsQuery';
import { GetClientQuery } from '../../../application/usecases/queries/Client-queries/GetClientQuery';
import { GetClientsByDealerQuery } from '../../../application/usecases/queries/Client-queries/GetClientsByDealerQuery';

export const clientResolvers = {
  client: async (_: unknown, { id }: { id: string }) => {
    const handler = new GetClientQueryHandler();
    return await handler.execute(new GetClientQuery(id));
  },
  
  clients: async () => {
    const handler = new GetAllClientsQueryHandler();
    return await handler.execute(new GetAllClientsQuery());
  },
  
  clientsByDealer: async (_: unknown, { dealerId }: { dealerId: string }) => {
    const handler = new GetClientsByDealerQueryHandler();
    return await handler.execute(new GetClientsByDealerQuery(dealerId));
  },
  

};