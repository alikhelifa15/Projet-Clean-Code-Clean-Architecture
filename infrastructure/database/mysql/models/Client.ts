import { Column, ForeignKey, Model, Table, DataType, AfterSave, AfterUpdate, AfterDestroy } from 'sequelize-typescript';
import Dealer from './Dealer';
import { connectDB } from '../../mongodb/models';
import ClientMongo from '../../mongodb/models/client';

@Table({
  tableName: 'client',
  timestamps: false,
  hooks: {
    afterCreate: async (instance: Client) => {
      await Client.saveToMongo(instance);
    },
    afterUpdate: async (instance: Client) => {
      await Client.updateMongo(instance);
    },
    afterDestroy: async (instance: Client) => {
      await Client.deleteFromMongo(instance);
    }
  }
})
export default class Client extends Model<Client> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Dealer)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  dealer_id!: number | null;

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
    type: DataType.STRING(20),
    allowNull: true,
  })
  phone!: string | null;

  @AfterSave
  static async saveToMongo(instance: Client) {
    try {
      await connectDB();
      console.log("Tentative de connexion à MongoDB...");
      console.log("Instance à sauvegarder:", JSON.stringify(instance, null, 2));
      
      const existingClient = await ClientMongo.findOne({ id: instance.id });

      if (existingClient) {
        console.log("Client already exists in MongoDB, skipping save");
        return;
      }

      const newClient = new ClientMongo({
        id: instance.id,
        dealer_id: instance.dealer_id,
        first_name: instance.first_name,
        last_name: instance.last_name,
        phone: instance.phone
      });

      const savedClient = await newClient.save();
      console.log("Client saved to MongoDB successfully!", savedClient);
    } catch (err) {
      console.error("Error saving client to MongoDB:", err);
      console.error("Instance that failed:", instance.toJSON());
    }
  }

  @AfterUpdate
  static async updateMongo(instance: Client) {
    try {
      await connectDB();
      console.log("Tentative de mise à jour MongoDB...");
      console.log("Instance à mettre à jour:", JSON.stringify(instance, null, 2));

      const result = await ClientMongo.findOneAndUpdate(
        { id: instance.id },
        {
          $set: {
            dealer_id: instance.dealer_id,
            first_name: instance.first_name,
            last_name: instance.last_name,
            phone: instance.phone
          }
        },
        { 
          upsert: true,
          new: true
        }
      );

      console.log("Client updated in MongoDB:", result);
    } catch (err) {
      console.error("Error updating MongoDB:", err);
      console.error("Instance that failed:", instance.toJSON());
    }
  }

  @AfterDestroy
  static async deleteFromMongo(instance: Client) {
    try {
      await connectDB();
      console.log("Tentative de suppression MongoDB pour ID:", instance.id);

      const result = await ClientMongo.deleteOne({ id: instance.id });

      if (result.deletedCount > 0) {
        console.log("Client successfully deleted from MongoDB");
      } else {
        console.log("No client found in MongoDB to delete");
      }
    } catch (err) {
      console.error("Error deleting from MongoDB:", err);
      console.error("Instance ID:", instance.id);
    }
  }
}