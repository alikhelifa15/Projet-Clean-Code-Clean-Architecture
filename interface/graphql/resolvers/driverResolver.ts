import { GetAllDriversQueryHandler } from '../../../application/usecases/query-handlers/Driver-Query-Handler/GetAllDriversQueryHandler';
import { GetDriversQueryHandler } from '../../../application/usecases/query-handlers/Driver-Query-Handler/GetDriverQueryHandler';
import { GetAllDriversQuery } from '../../../application/usecases/queries/Driver-Query/GetAllDriversQuery';
import { GetDriverQuery } from '../../../application/usecases/queries/Driver-Query/GetDriverQuery';
import { GetDriverByCompanyQueryHandler } from '../../../application/usecases/query-handlers/Driver-Query-Handler/GetDriverByCompanyQueryHndler';
import { GetDriverByCompanyQuery } from '../../../application/usecases/queries/Driver-Query/GetDriverByCompanyQuery';

export const driverResolvers = {
    driver: async (_: unknown, { id }: { id: string }) => {
      const handler = new GetDriversQueryHandler();
      const result = await handler.execute(new GetDriverQuery(id));
      if (!result) return null;
  
      return {
        id: result.id,
        companyId: result.companyId,
        firstName: result.firstName,
        lastName: result.lastName,
        licenseNumber: result.licenseNumber,
        experience: result.experience,
        status: result.status,
      };
    },
    drivers: async () => {
      const handler = new GetAllDriversQueryHandler();
      const results = await handler.execute(new GetAllDriversQuery());
      return results.map(result => ({
        id: result.id,
        companyId: result.companyId,
        firstName: result.firstName,
        lastName: result.lastName,
        licenseNumber: result.licenseNumber,
        experience: result.experience,
        status: result.status,
      }));
    },
    // driversByDealer: async (_: unknown, { dealerId }: { dealerId: string }) => {
    //   const handler = new GetDriversByDealerQueryHandler();
    //   const results = await handler.execute(new GetDriversByDealerQuery(dealerId));
    //   return results.map(result => ({
    //     id: result.id,
    //     companyId: result.companyId,
    //     firstName: result.firstName,
    //     lastName: result.lastName,
    //     licenseNumber: result.licenseNumber,
    //     experience: result.experience,
    //     status: result.status,
    //   }));
    // },
    driversByCompany: async (_: unknown, { companyId }: { companyId: string }) => {
      const handler = new GetDriverByCompanyQueryHandler();
      const results = await handler.execute(new GetDriverByCompanyQuery(companyId));
      return results.map(result => ({
        id: result.id,
        companyId: result.companyId,
        firstName: result.firstName,
        lastName: result.lastName,
        licenseNumber: result.licenseNumber,
        experience: result.experience,
        status: result.status,
      }));
    }
};