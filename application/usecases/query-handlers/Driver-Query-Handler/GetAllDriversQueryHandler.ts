import { connectDB } from "../../../../infrastructure/database/mongodb/models";
import DriverMongo from "../../../../infrastructure/database/mongodb/models/driver";
import { GetAllDriversQuery } from "../../queries/Driver-Query/GetAllDriversQuery";

export class GetAllDriversQueryHandler {
  async execute(query: GetAllDriversQuery) {
    try {
      await connectDB();
      const criteria: any = {};

      if (query.companyId) {
        criteria.company_id = parseInt(query.companyId);
      }
      
      const drivers = await DriverMongo.find(criteria);
      return drivers;
    } catch (error) {
      console.error("Error in GetAllDriversQueryHandler:", error);
      throw error;
    }
  }
}
