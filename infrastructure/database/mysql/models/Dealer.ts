import { Column, Model, Table, ForeignKey, DataType, AfterCreate, AfterUpdate, AfterDestroy, AfterSave } from 'sequelize-typescript';
import User from './User';
import DealerMongo from '../../mongodb/models/dealer';
import { connectDB } from '../../mongodb/models/index';


@Table({
  tableName: 'dealer',
  timestamps: false,
})
export default class Dealer extends Model<Dealer> {
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
  name!: string;

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

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  services!: string | null;

  @AfterSave
  static async saveToMongo(instance: Dealer, options: any) {
    try {
      await connectDB();
      
      const existingDealer = await DealerMongo.findOne({ id: instance.user_id });
      if (existingDealer) {
        console.log('Dealer already exists in MongoDB, skipping save');
        return;
      }

      const newDealer = new DealerMongo({
        user_id: instance.user_id,
        name: instance.name,
        phone: instance.phone,
        address: instance.address,
        postal_code: instance.postal_code,
        city: instance.city,
        services: instance.services,
      });

      await newDealer.save();
      console.log('Dealer saved to MongoDB successfully!');
    } catch (err) {
      console.error("Error saving dealer to MongoDB:", err);
    }
  }

  @AfterUpdate
  static async updateMongo(instance: Dealer, options: any) {
    try {
      await connectDB();
      const result = await DealerMongo.updateOne(
        { user_id: instance.user_id },
        {
          name: instance.name,
          phone: instance.phone,
          address: instance.address,
          postal_code: instance.postal_code,
          city: instance.city,
          services: instance.services,
        }
      );

      if (result.matchedCount === 0) {
        await Dealer.saveToMongo(instance, options);
      } else {
        console.log('Dealer updated in MongoDB successfully!');
      }
    } catch (err) {
      console.error("Error updating dealer in MongoDB:", err);
    }
  }

  @AfterDestroy
  static async deleteFromMongo(instance: Dealer, options: any) {
    try {
      await connectDB();
      await DealerMongo.deleteOne({ user_id: instance.user_id });
      console.log('Dealer deleted from MongoDB successfully!');
    } catch (err) {
      console.error("Error deleting dealer from MongoDB:", err);
    }
  }
}