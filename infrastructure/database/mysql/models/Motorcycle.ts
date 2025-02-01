import {
  Column,
  ForeignKey,
  Model,
  Table,
  DataType,
  AfterSave,
  AfterUpdate,
  AfterDestroy,
} from "sequelize-typescript";
import Company from "./Company";
import Dealer from "./Dealer";
import { connectDB } from "../../mongodb/models";
import MotorcycleMongo from "../../mongodb/models/motorcycle";
@Table({
  tableName: "motorcycle",
  timestamps: false,
})
export default class Motorcycle extends Model<Motorcycle> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  company_id!: number | null;

  @ForeignKey(() => Dealer)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  dealer_id!: number | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  serial_number!: string;
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  brand!: string;
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  model!: string;
  @Column({
    type: DataType.TEXT("long"),
    allowNull: true,
  })
  photo!: string | null;
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  mileage!: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  service_date!: Date | null;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    validate: {
      isIn: [["active", "maintenance", "inactive"]],
    },
  })
  status!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maintenance_interval!: number;

  @AfterSave
  static async saveToMongo(instance: Motorcycle) {
    try {
      await connectDB();

      console.log("Tentative de connexion à MongoDB...");
      const existingMotorcycle = await MotorcycleMongo.findOne({
        id: instance.id,
      });

      if (existingMotorcycle) {
        console.log("Motorcycle already exists in MongoDB, skipping save");
        return;
      }

      const newMotorcycle = new MotorcycleMongo({
        id: instance.id,
        company_id: instance.company_id,
        dealer_id: instance.dealer_id,
        model: instance.model,
        brand: instance.brand,
        serial_number: instance.serial_number,
        photo: instance.photo,
        mileage: instance.mileage,
        service_date: instance.service_date,
        status: instance.status,
        maintenance_interval: instance.maintenance_interval,
      });

      await newMotorcycle.save();
      console.log("Motorcycle saved to MongoDB successfully!");
    } catch (err) {
      console.error("Error saving motorcycle to MongoDB:", err);
    }
  }

  @AfterUpdate
  static async updateMongo(instance: Motorcycle) {
    try {
      await connectDB();
      console.log("Tentative de mise à jour MongoDB...");

      const result = await MotorcycleMongo.updateOne(
        { id: instance.id },
        {
          $set: {
            company_id: instance.company_id,
            dealer_id: instance.dealer_id,
            model: instance.model,
            brand: instance.brand,
            serial_number: instance.serial_number,
            photo: instance.photo,
            mileage: instance.mileage,
            service_date: instance.service_date,
            status: instance.status,
            maintenance_interval: instance.maintenance_interval,
          },
        },
        { upsert: true }
      );

      if (result.modifiedCount > 0 || result.upsertedCount > 0) {
        console.log("Motorcycle updated/created in MongoDB successfully!");
      } else {
        console.log("No changes were necessary in MongoDB");
      }
    } catch (err) {
      console.error("Error updating MongoDB:", err);
      console.error("Instance:", JSON.stringify(instance, null, 2));
    }
  }

  @AfterDestroy
  static async deleteFromMongo(instance: Motorcycle) {
    try {
      await connectDB();
      console.log("Tentative de suppression MongoDB pour ID:", instance.id);

      const result = await MotorcycleMongo.deleteOne({ id: instance.id });

      if (result.deletedCount > 0) {
        console.log("Motorcycle successfully deleted from MongoDB");
      } else {
        console.log("No motorcycle found in MongoDB to delete");
      }
    } catch (err) {
      console.error("Error deleting from MongoDB:", err);
      console.error("Instance ID:", instance.id);
    }
  }
}
