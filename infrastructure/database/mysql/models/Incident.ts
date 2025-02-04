import { Column, Model, Table, ForeignKey, DataType, BelongsTo, AfterSave, AfterUpdate, AfterDestroy } from 'sequelize-typescript';
import Test from './Test';
import { connectDB } from '../../mongodb/models';
import IncidentMongo from '../../mongodb/models/incident';

@Table({
  tableName: 'incident',
  timestamps: false,
})
export default class Incident extends Model<Incident> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Test)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  test_id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  incident_date!: Date;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    validate: {
      isIn: {
        args: [['accident', 'infraction', 'technical', 'other']],
        msg: 'Le type doit être: accident, infraction, technical, ou other'
      }
    }
  })
  type!: string;

  @Column({
    type: DataType.TEXT,
  })
  description!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    validate: {
      isIn: {
        args: [['Faible', 'Moyen', 'Élevé']],
        msg: 'La sévérité doit être: Faible, Moyen, ou Élevé'
      }
    }
  })
  severity!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  actions_taken!: string;

  @BelongsTo(() => Test)
  test!: Test;

  @AfterSave
  static async saveToMongo(instance: Incident) {
    try {
      await connectDB();
      const existingIncident = await IncidentMongo.findOne({ id: instance.id });
      if (existingIncident) {
        console.log("Incident already exists in MongoDB");
        return;
      }

      const newIncident = new IncidentMongo({
        id: instance.id,
        test_id: instance.test_id,
        incident_date: instance.incident_date,
        type: instance.type,
        severity: instance.severity,
        description: instance.description,
        actions_taken: instance.actions_taken
      });

      await newIncident.save();
      console.log("Incident saved to MongoDB successfully!");
    } catch (err) {
      console.error("Error saving incident to MongoDB:", err);
    }
  }

  @AfterUpdate
  static async updateMongo(instance: Incident) {
    try {
      await connectDB();
      const result = await IncidentMongo.findOneAndUpdate(
        { id: instance.id },
        {
          $set: {
            test_id: instance.test_id,
            incident_date: instance.incident_date,
            type: instance.type,
            severity: instance.severity,
            description: instance.description,
            actions_taken: instance.actions_taken
          }
        },
        { upsert: true, new: true }
      );
      console.log("Incident updated in MongoDB:", result);
    } catch (err) {
      console.error("Error updating incident in MongoDB:", err);
    }
  }

  @AfterDestroy
  static async deleteFromMongo(instance: Incident) {
    try {
      await connectDB();
      await IncidentMongo.deleteOne({ id: instance.id });
      console.log("Incident deleted from MongoDB successfully!");
    } catch (err) {
      console.error("Error deleting incident from MongoDB:", err);
    }
  }
}