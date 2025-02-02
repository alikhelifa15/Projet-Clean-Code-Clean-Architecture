import { connectDB } from "../../../../infrastructure/database/mongodb/models";
import DriverMongo from "../../../../infrastructure/database/mongodb/models/driver";
import { GetDriverQuery } from "../../queries/Driver-Query/GetDriverQuery";

export class GetDriversQueryHandler {
  async execute(query: GetDriverQuery) {
    try {
      await connectDB();
      const drivers = await DriverMongo.findOne({ id: parseInt(query.id) });
      return drivers;
    } catch (error) {
      console.error("Error in GetAllDriversQueryHandler:", error);
      throw error;
    }
  }
}
