import { GetTestByIdQueryHandler } from '../../../application/usecases/query-handlers/Test-query-handler/GetTestByIdQueryHandler';
import { GetTestQuery } from '../../../application/usecases/queries/Test-queries/GetTestQuery';
import { GetAllTestsQueryHandler } from '../../../application/usecases/query-handlers/Test-query-handler/GetAllTestsQueryHandler';
import { GetAllTestsQuery } from '../../../application/usecases/queries/Test-queries/GetAllTestsQuery';
import { GetTestsByDriverIdQueryHandler } from '../../../application/usecases/query-handlers/Test-query-handler/GetTestsByDriverIdQueryHandler';
import { GetTestsByClientIdQueryHandler } from '../../../application/usecases/query-handlers/Test-query-handler/GetTestsByClientIdQueryHandler';
import { GetTestsByClientIdQuery } from '../../../application/usecases/queries/Test-queries/GetTestsByClientIdQuery';
import { GetTestsByDriverQuery } from '../../../application/usecases/queries/Test-queries/GetTestsByDriverQuery';
export const testResolvers = {
    test: async (_: unknown, { id }: { id: string }) => {
      const handler = new GetTestByIdQueryHandler();
      const result = await handler.execute(new GetTestQuery(id));
      if (!result) return null;
   
      return {
        id: result.id,
        motorcycleId: result.motorcycle_id,
        driverId: result.driver_id, 
        clientId: result.client_id,
        startDate: result.start_date?.toISOString(),
        endDate: result.end_date?.toISOString(),
        startingMileage: result.starting_mileage,
        endingMileage: result.ending_mileage,
        comments: result.comments,
        status: result.status
      };
    },
   
    tests: async () => {
      const handler = new GetAllTestsQueryHandler();
      const results = await handler.execute(new GetAllTestsQuery());
      return results.map(result => ({
        id: result.id,
        motorcycleId: result.motorcycle_id,
        driverId: result.driver_id,
        clientId: result.client_id, 
        startDate: result.start_date?.toISOString(),
        endDate: result.end_date?.toISOString(),
        startingMileage: result.starting_mileage,
        endingMileage: result.ending_mileage,
        comments: result.comments,
        status: result.status
      }));
    },
   
    testsByDriver: async (_: unknown, { driverId }: { driverId: string }) => {
      const handler = new GetTestsByDriverIdQueryHandler();
      const results = await handler.execute(new GetTestsByDriverQuery(driverId));
      return results.map(result => ({
        id: result.id,
        motorcycleId: result.motorcycle_id,
        driverId: result.driver_id,
        clientId: result.client_id, 
        startDate: result.start_date?.toISOString(),
        endDate: result.end_date?.toISOString(),
        startingMileage: result.starting_mileage,
        endingMileage: result.ending_mileage,
        comments: result.comments,
        status: result.status
     
      }));
    },
   
    testsByClient: async (_: unknown, { clientId }: { clientId: string }) => {
      const handler = new GetTestsByClientIdQueryHandler();
      const results = await handler.execute(new GetTestsByClientIdQuery(clientId));
      return results.map(result => ({
        id: result.id,
        motorcycleId: result.motorcycle_id,
        driverId: result.driver_id,
        clientId: result.client_id, 
        startDate: result.start_date?.toISOString(),
        endDate: result.end_date?.toISOString(),
        startingMileage: result.starting_mileage,
        endingMileage: result.ending_mileage,
        comments: result.comments,
        status: result.status
    
      }));
    }
   };