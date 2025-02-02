import { connectDB } from "../../../../infrastructure/database/mongodb/models";
import DriverMongo from "../../../../infrastructure/database/mongodb/models/driver";
import { GetDriverByCompanyQuery } from "../../queries/Driver-Query/GetDriverByCompanyQuery";

export class GetDriverByCompanyQueryHandler {
  async execute(query: GetDriverByCompanyQuery) {
    try {
      await connectDB();
      const drivers = await DriverMongo.find({ company_id: parseInt(query.companyId) });
      return drivers;
    } catch (error) {
      console.error("Error in GetAllDriversQueryHandler:", error);
      throw error;
    }
  }
}
