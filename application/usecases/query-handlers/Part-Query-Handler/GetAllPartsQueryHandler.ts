import { connectDB } from "../../../../infrastructure/database/mongodb/models";
import PartMongo from "../../../../infrastructure/database/mongodb/models/part";
import { GetAllPartsQuery } from "../../queries/Part-Query/GetAllPartsQuery";

export class GetAllPartsQueryHandler {
  async execute(query: GetAllPartsQuery) {
    try {
      await connectDB();
      const parts = await PartMongo.find();
      return parts;
    } catch (error) {
      console.error("Error in GetAllPartsQueryHandler:", error);
      throw error;
    }
  }
}
