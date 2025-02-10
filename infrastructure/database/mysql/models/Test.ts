import { Column, Model, Table, ForeignKey, DataType, BelongsTo, HasMany, AfterSave, AfterUpdate, AfterDestroy } from 'sequelize-typescript';
import Motorcycle from './Motorcycle';
import Driver from './Driver';
import Client from './Client';
import { connectDB } from '../../mongodb/models';
import TestMongo from '../../mongodb/models/test';
import Incident from './Incident';

@Table({
  tableName: 'test',
  timestamps: false,
})
export default class Test extends Model<Test> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Motorcycle)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  motorcycle_id!: number;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  driver_id!: number;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  client_id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date!: Date;

  @Column({
    type: DataType.DATE,
  })
  end_date?: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  starting_mileage!: number;

  @Column({
    type: DataType.INTEGER,
  })
  ending_mileage?: number;

  @Column({
    type: DataType.TEXT,
  })
  comments?: string;

  @Column({
    type: DataType.STRING(20),
    validate: {
      isIn: [['scheduled', 'in_progress', 'completed', 'cancelled']]
    }
  })
  status!: string;

  @BelongsTo(() => Motorcycle)
  motorcycle!: Motorcycle;

  @BelongsTo(() => Driver)
  driver!: Driver;

  @BelongsTo(() => Client)
  client!: Client;

  @HasMany(() => Incident)
  incidents!: Incident[];

  @AfterSave
  static async saveToMongo(instance: Test) {
    try {
      await connectDB();
      console.log("Tentative de connexion à MongoDB...");
      
      const existingTest = await TestMongo.findOne({ id: instance.id });
      if (existingTest) {
        console.log("Test already exists in MongoDB");
        return;
      }

      const newTest = new TestMongo({
        id: instance.id,
        motorcycle_id: instance.motorcycle_id,
        driver_id: instance.driver_id,
        client_id: instance.client_id,
        start_date: instance.start_date,
        end_date: instance.end_date,
        starting_mileage: instance.starting_mileage,
        ending_mileage: instance.ending_mileage,
        comments: instance.comments,
        status: instance.status
      });

      await newTest.save();
      console.log("Test saved to MongoDB successfully!");
    } catch (err) {
      console.error("Error saving test to MongoDB:", err);
    }
  }

  @AfterUpdate
  static async updateMongo(instance: Test) {
    try {
      await connectDB();
      const result = await TestMongo.findOneAndUpdate(
        { id: instance.id },
        {
          $set: {
            motorcycle_id: instance.motorcycle_id,
            driver_id: instance.driver_id,
            client_id: instance.client_id,
            start_date: instance.start_date,
            end_date: instance.end_date,
            starting_mileage: instance.starting_mileage,
            ending_mileage: instance.ending_mileage,
            comments: instance.comments,
            status: instance.status
          }
        },
        { upsert: true, new: true }
      );
      console.log("Test updated in MongoDB:", result);
    } catch (err) {
      console.error("Error updating test in MongoDB:", err);
    }
  }

  @AfterDestroy
  static async deleteFromMongo(instance: Test) {
    try {
      await connectDB();
      await TestMongo.deleteOne({ id: instance.id });
      console.log("Test deleted from MongoDB successfully!");
    } catch (err) {
      console.error("Error deleting test from MongoDB:", err);
    }
  }
}