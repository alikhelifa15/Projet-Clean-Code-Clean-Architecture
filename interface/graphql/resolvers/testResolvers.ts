import { GetTestByIdQueryHandler } from '../../../application/usecases/query-handlers/Test-query-handler/GetTestByIdQueryHandler';
import { GetTestQuery } from '../../../application/usecases/queries/Test-queries/GetTestQuery';
import { GetAllTestsQueryHandler } from '../../../application/usecases/query-handlers/Test-query-handler/GetAllTestsQueryHandler';
import { GetAllTestsQuery } from '../../../application/usecases/queries/Test-queries/GetAllTestsQuery';
import { GetTestsByDriverIdQueryHandler } from '../../../application/usecases/query-handlers/Test-query-handler/GetTestsByDriverIdQueryHandler';
import { GetTestsByClientIdQueryHandler } from '../../../application/usecases/query-handlers/Test-query-handler/GetTestsByClientIdQueryHandler';
import { GetTestsByClientIdQuery } from '../../../application/usecases/queries/Test-queries/GetTestsByClientIdQuery';
import { GetTestsByDriverQuery } from '../../../application/usecases/queries/Test-queries/GetTestsByDriverQuery';
import { GetTestsByDealerIdQueryHandler } from '../../../application/usecases/query-handlers/Test-query-handler/GetTestsByDealerIdQueryHandler';
import { GetTestsByDealerIdQuery } from '../../../application/usecases/queries/Test-queries/GetTestsByDealerIdQuery';
import { GetTestsByCompanyIdQueryHandler } from '../../../application/usecases/query-handlers/Test-query-handler/GetTestsByCompanyIdQueryHandler';
import { GetTestsByCompanyIdQuery } from '../../../application/usecases/queries/Test-queries/GetTestsByCompanyIdQuery';
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
,
testsByDealer: async (_: unknown, { dealerId }: { dealerId: string }) => {
  try {
    const handler = new GetTestsByDealerIdQueryHandler();
    const results = await handler.execute(new GetTestsByDealerIdQuery(dealerId));
    
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
      status: result.status,
      motorcycle: result.motorcycle ? {
        id: result.motorcycle.id,
        brand: result.motorcycle.brand,
        model: result.motorcycle.model,
        mileage: result.motorcycle.mileage || 0
        
      } : null,
      client: result.client ? {
        id: result.client.id,
        firstName: result.client.first_name,  
        lastName: result.client.last_name,    
        dealerId: result.client.dealer_id,
        phone: result.client.phone
      } : undefined,  
      driver: result.driver ? {
        id: result.driver.id,
        firstName: result.driver.first_name,
        lastName: result.driver.last_name,
        licenseNumber: result.driver.license_number
      } : null
    }));
  } catch (error) {
    console.error('Error in testsByDealer resolver:', error);
    throw error;
  }
},

testsByCompany: async (_: unknown, { companyId }: { companyId: string }) => {
  const handler = new GetTestsByCompanyIdQueryHandler();
  const results = await handler.execute(new GetTestsByCompanyIdQuery(companyId));
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
    status: result.status,
    motorcycle: result.motorcycle,
    driver: result.driver,
    client: result.client
  }));
}
   };