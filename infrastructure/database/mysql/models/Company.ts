import { Column, ForeignKey, Model, Table, DataType, AfterCreate, AfterUpdate, AfterDestroy, AfterSave } from 'sequelize-typescript';
import User from './User';
import CompanyMongo from '../../mongodb/models/company';
import { connectDB } from '../../mongodb/models/index';

@Table({
  tableName: 'company',
  timestamps: false,
})
export default class Company extends Model<Company> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  company_name!: string;

  @Column({
    type: DataType.STRING(14),
    allowNull: false,
    unique: true,
  })
  siret_number!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  phone!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  address!: string | null;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  postal_code!: string | null;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  city!: string | null;

  @AfterSave
  static async saveToMongo(instance: Company, options: any) {
    try {
      await connectDB();
      
      const existingCompany = await CompanyMongo.findOne({ user_id: instance.user_id });
      if (existingCompany) {
        console.log('Company already exists in MongoDB, skipping save');
        return;
      }

      const newCompany = new CompanyMongo({
        user_id: instance.user_id,
        company_name: instance.company_name,
        siret_number: instance.siret_number,
        phone: instance.phone,
        address: instance.address,
        postal_code: instance.postal_code,
        city: instance.city,
      });

      await newCompany.save();
      console.log('Company saved to MongoDB successfully!');
    } catch (err) {
      console.error("Error saving company to MongoDB:", err);
    }
  }

  @AfterUpdate
  static async updateMongo(instance: Company, options: any) {
    try {
      await connectDB();
      const result = await CompanyMongo.updateOne(
        { user_id: instance.user_id },
        {
          company_name: instance.company_name,
          siret_number: instance.siret_number,
          phone: instance.phone,
          address: instance.address,
          postal_code: instance.postal_code,
          city: instance.city,
        }
      );

      if (result.matchedCount === 0) {
        await Company.saveToMongo(instance, options);
      } else {
        console.log('Company updated in MongoDB successfully!');
      }
    } catch (err) {
      console.error("Error updating company in MongoDB:", err);
    }
  }

  @AfterDestroy
  static async deleteFromMongo(instance: Company, options: any) {
    try {
      await connectDB();
      await CompanyMongo.deleteOne({ user_id: instance.user_id });
      console.log('Company deleted from MongoDB successfully!');
    } catch (err) {
      console.error("Error deleting company from MongoDB:", err);
    }
  }
}