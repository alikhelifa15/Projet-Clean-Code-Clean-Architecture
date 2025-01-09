import {
  Column,
  Model,
  Table,
  DataType,
  AfterSave,
  AfterDestroy,
  AfterUpdate,
} from "sequelize-typescript";
import UserMongo from "../../mongodb/models/user";
import mongoose from "mongoose";

const MONGO_URI = 'mongodb://root:example@mongodb:27017/triumphMotorcyclesDb?authSource=admin';
const MONGO_OPTIONS = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  retryWrites: true,
};

async function ensureMongoConnection() {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
    } catch (error) {
      console.error('Erreur de connexion MongoDB:', error);
      throw new Error('Impossible de se connecter à MongoDB');
    }
  }
  return mongoose.connection;
}

@Table({
  tableName: "user",
  timestamps: false,
})
export default class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  creationDate!: Date;

  @AfterSave
  static async saveToMongo(user: User) {
    try {
      await ensureMongoConnection();
      
      const newUser = new UserMongo({
        email: user.email,
        password: user.password,
        type: user.type,
        creationDate: user.creationDate,
      });

      await newUser.save();
      console.log('Utilisateur enregistré dans MongoDB avec succès !');
    } catch (err) {
      console.error("Erreur lors de l'enregistrement dans MongoDB :", err);
     
    }
  }
  
  @AfterDestroy
  static async deleteFromMongo(user: User) {
    try {
      await ensureMongoConnection();
      await UserMongo.deleteOne({ email: user.email });
      console.log('Utilisateur supprimé de MongoDB avec succès !');
    } catch (err) {
      console.error("Erreur lors de la suppression dans MongoDB :", err);
    }
  }

  @AfterUpdate
  static async updateMongo(user: User) {
    try {
      await ensureMongoConnection();
      await UserMongo.updateOne(
        { email: user.email },
        {
          email: user.email,
          password: user.password,
          type: user.type,
          creationDate: user.creationDate,
        }
      );
      console.log('Utilisateur mis à jour dans MongoDB avec succès !');
    } catch (err) {
      console.error("Erreur lors de la mise à jour dans MongoDB :", err);
    }
  }
}