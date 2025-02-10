import { Column, Model, Table, DataType, ForeignKey, AfterSave, AfterDestroy, AfterUpdate } from 'sequelize-typescript';
import Company from './Company';
import DriverMongo from "../../mongodb/models/driver";
import { connectDB } from "../../mongodb/models";
@Table({
  tableName: 'driver',
  timestamps: false,
})
export default class Driver extends Model<Driver> {
  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  company_id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  first_name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  license_number!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  license_date!: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  experience!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  status!: string;

  @AfterSave
  static async saveToMongo(driver: Driver) {
    try {
      await connectDB();

      const newDriver = new DriverMongo({
        id: driver.id,
        companyId: driver.company_id,
        firstName: driver.first_name,
        lastName: driver.last_name,
        licenseNumber: driver.license_number,
        licenseDate: driver.license_date,
        experience: driver.experience,
        status: driver.status,
      });

      await newDriver.save();
      console.log("🚀 Driver enregistré dans MongoDB avec succès !");
    } catch (err) {
      console.error("❌ Erreur lors de l'enregistrement dans MongoDB :", err);
    }
  }

  @AfterDestroy
  static async deleteFromMongo(driver: Driver) {
    console.log("🚨 Suppression du driver avec ID:", driver.id);
    try {
      await connectDB();
      await DriverMongo.deleteOne({ id: driver.id });
      console.log("🗑️ Driver supprimé de MongoDB !");
    } catch (err) {
      console.error("❌ Erreur lors de la suppression dans MongoDB :", err);
    }
  }

  @AfterUpdate
  static async updateMongo(driver: Driver) {
    try {
      await connectDB();
      await DriverMongo.updateOne(
        { id: driver.id },
        {
          id: driver.id,
          companyId: driver.company_id,
          firstName: driver.first_name,
          lastName: driver.last_name,
          licenseNumber: driver.license_number,
          licenseDate: driver.license_date,
          experience: driver.experience,
          status: driver.status,
        }
      );
      console.log("🔄 Driver mis à jour dans MongoDB !");
    } catch (err) {
      console.error("❌ Erreur lors de la mise à jour dans MongoDB :", err);
    }
  }
}
