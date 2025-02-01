import { Column, Model, Table, DataType, ForeignKey, AfterSave, AfterDestroy, AfterUpdate } from 'sequelize-typescript';
import Company from './Company';

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

  // Hooks after save, update, and destroy if you need MongoDB sync like in the User model
  @AfterSave
  static async saveToMongo(driver: Driver) {
    try {
      console.log('Driver saved to MongoDB or do your other operations');
    } catch (err) {
      console.error('Error saving driver to MongoDB:', err);
    }
  }

  @AfterDestroy
  static async deleteFromMongo(driver: Driver) {
    try {
      console.log('Driver deleted from MongoDB or do your other operations');
    } catch (err) {
      console.error('Error deleting driver from MongoDB:', err);
    }
  }

  @AfterUpdate
  static async updateMongo(driver: Driver) {
    try {
      console.log('Driver updated in MongoDB or do your other operations');
    } catch (err) {
      console.error('Error updating driver in MongoDB:', err);
    }
  }
}
