import { GetAllMotorcyclesQueryHandler } from '../../../application/usecases/query-handlers/GetAllMotorcyclesQueryHandler';
import { GetMotorcycleQueryHandler } from '../../../application/usecases/query-handlers/GetMotorcycleQueryHandler';
import { GetAllMotorcyclesQuery } from '../../../application/usecases/queries/GetAllMotorcyclesQuery';
import { GetMotorcycleQuery } from '../../../application/usecases/queries/GetMotorcycleQuery';

export const motorcycleResolvers = {
    motorcycle: async (_: unknown, { id }: { id: string }) => {
      const handler = new GetMotorcycleQueryHandler();
      const result = await handler.execute(new GetMotorcycleQuery(id));
      if (!result) return null;
  
      return {
        id: result.id,
        companyId: result.company_id,
        dealerId: result.dealer_id,
        modelId: result.model_id,
        serialNumber: result.serial_number,
        mileage: result.mileage,
        serviceDate: result.service_date?.toISOString(),
        status: result.status,
        maintenanceInterval: result.maintenance_interval
      };
    },
    motorcycles: async () => {
      const handler = new GetAllMotorcyclesQueryHandler();
      const results = await handler.execute(new GetAllMotorcyclesQuery());
      return results.map(result => ({
        id: result.id,
        companyId: result.company_id,
        dealerId: result.dealer_id,
        modelId: result.model_id,
        serialNumber: result.serial_number,
        mileage: result.mileage,
        serviceDate: result.service_date?.toISOString(),
        status: result.status,
        maintenanceInterval: result.maintenance_interval
      }));
    },
    
  };