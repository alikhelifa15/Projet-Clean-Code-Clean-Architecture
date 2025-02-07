import { GetAllPartsQueryHandler } from '../../../application/usecases/query-handlers/Part-Query-Handler/GetAllPartsQueryHandler';
import { GetPartQueryHandler } from '../../../application/usecases/query-handlers/Part-Query-Handler/GetPartQueryHandler';
import { GetAllPartsQuery } from '../../../application/usecases/queries/Part-Query/GetAllPartsQuery';
import { GetPartQuery } from '../../../application/usecases/queries/Part-Query/GetPartQuery';

export const partResolvers = {
  part: async (_: unknown, { id }: { id: string }) => {
    const handler = new GetPartQueryHandler();
    const result = await handler.execute(new GetPartQuery(id));
    if (!result) return null;

    return {
      id: result.id,
      reference: result.reference,
      name: result.name,
      description: result.description,
      currentStock: result.currentStock,
      alertThreshold: result.alertThreshold,
      unitPrice: result.unitPrice,
    };
  },

  parts: async () => {
    const handler = new GetAllPartsQueryHandler();
    const results = await handler.execute(new GetAllPartsQuery());

    return results.map(result => ({
      id: result.id,
      reference: result.reference,
      name: result.name,
      description: result.description,
      currentStock: result.currentStock,
      alertThreshold: result.alertThreshold,
      unitPrice: result.unitPrice,
    }));
  },
};
