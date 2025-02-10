import { GetAllMotorcyclesQueryHandler } from '../../../application/usecases/query-handlers/Motorcycle-query-handler/GetAllMotorcyclesQueryHandler';
import { GetMotorcycleQueryHandler } from '../../../application/usecases/query-handlers/Motorcycle-query-handler/GetMotorcycleQueryHandler';
import { GetAllMotorcyclesQuery } from '../../../application/usecases/queries/Motorocycle-queries/GetAllMotorcyclesQuery';
import { GetMotorcycleQuery } from '../../../application/usecases/queries/Motorocycle-queries/GetMotorcycleQuery';
import { GetMotorcyclesByDealerQueryHandler } from '../../../application/usecases/query-handlers/Motorcycle-query-handler/GetMotorcyclesByDealerQueryHandler';
import { GetMotorcyclesByDealerQuery } from '../../../application/usecases/queries/Motorocycle-queries/GetMotorcyclesByDealerQuery';
import { GetMotorcyclesByCompanyQueryHandler } from '../../../application/usecases/query-handlers/Motorcycle-query-handler/GetMotorcyclesByCompanyQueryHandler';
import { GetMotorcyclesByCompanyQuery } from '../../../application/usecases/queries/Motorocycle-queries/GetMotorcyclesByCompanyQuery';

export const motorcycleResolvers = {
    motorcycle: async (_: unknown, { id }: { id: string }) => {
      const handler = new GetMotorcycleQueryHandler();
      const result = await handler.execute(new GetMotorcycleQuery(id));
      if (!result) return null;
  
      return {
        id: result.id,
        companyId: result.company_id,
        dealerId: result.dealer_id,
        model: result.model,
        brand: result.brand,
        serialNumber: result.serial_number,
        photo: result.photo,
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
        brand: result.brand,
        model: result.model,
        serialNumber: result.serial_number,
        photo: result.photo,
        mileage: result.mileage,
        serviceDate: result.service_date?.toISOString(),
        status: result.status,
        maintenanceInterval: result.maintenance_interval
      }));
    },
    motorcyclesByDealer: async (_: unknown, { dealerId }: { dealerId: string }) => {
      const handler = new GetMotorcyclesByDealerQueryHandler();
      const results = await handler.execute(new GetMotorcyclesByDealerQuery(dealerId));
      
      return results.map(result => ({
        id: result.id,
        companyId: result.company_id || null,
        dealerId: result.dealer_id || null,
        model: result.model,
        brand: result.brand,
        serialNumber: result.serial_number,
        photo: result.photo,
        mileage: result.mileage,
        serviceDate: result.service_date?.toISOString(),
        status: result.status,
        maintenanceInterval: result.maintenance_interval
      }));
    },
    motorcyclesByCompany: async (_: unknown, { companyId }: { companyId: string }) => {
      const handler = new GetMotorcyclesByCompanyQueryHandler();
      const results = await handler.execute(new GetMotorcyclesByCompanyQuery(companyId));
      
      return results.map(result => ({
        id: result.id,
        companyId: result.company_id || null,
        dealerId: result.dealer_id || null,
        model: result.model,
        brand: result.brand,
        serialNumber: result.serial_number,
        photo: result.photo,
        mileage: result.mileage,
        serviceDate: result.service_date?.toISOString(),
        status: result.status,
        maintenanceInterval: result.maintenance_interval
      }));
    }
  };