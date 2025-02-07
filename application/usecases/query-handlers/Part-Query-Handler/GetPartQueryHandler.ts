import { connectDB } from "../../../../infrastructure/database/mongodb/models";
import PartMongo from "../../../../infrastructure/database/mongodb/models/part";
import { GetPartQuery } from "../../queries/Part-Query/GetPartQuery";

export class GetPartQueryHandler {
  async execute(query: GetPartQuery) {
    try {
      await connectDB();
      const part = await PartMongo.findById(query.id);
      return part;
    } catch (error) {
      console.error("Error in GetPartQueryHandler:", error);
      throw error;
    }
  }
}
