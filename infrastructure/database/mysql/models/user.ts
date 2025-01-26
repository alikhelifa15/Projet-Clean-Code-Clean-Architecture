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
import {connectDB} from "../../mongodb/models/index";

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
      await connectDB();
      
      const existingUser = await UserMongo.findOne({ email: user.email });
      if (existingUser) {
        console.log('User already exists in MongoDB, skipping save');
        return;
      }

      const newUser = new UserMongo({
        id: user.id,
        email: user.email,
        password: user.password,
        type: user.type,
        creationDate: user.creationDate,
      });

      await newUser.save();
      console.log('User saved to MongoDB successfully!');
    } catch (err) {
      console.error("Error saving to MongoDB:", err);
    
    }
  }
  
  @AfterDestroy
  static async deleteFromMongo(user: User) {
    try {
      await connectDB();
      await UserMongo.deleteOne({ email: user.id });
      console.log('User deleted from MongoDB successfully!');
    } catch (err) {
      console.error("Error deleting from MongoDB:", err);
    }
  }

  @AfterUpdate
  static async updateMongo(user: User) {
    try {
      await connectDB();
      const result = await UserMongo.updateOne(
        { email: user.id },
        {
          email: user.email,
          password: user.password,
          type: user.type,
          creationDate: user.creationDate,
        }
      );

      if (result.matchedCount === 0) {
        // If no document was found to update, create a new one
        await User.saveToMongo(user);
      } else {
        console.log('User updated in MongoDB successfully!');
      }
    } catch (err) {
      console.error("Error updating MongoDB:", err);
    }
  }
}