import mongoose, { Schema, Document } from 'mongoose';
interface IUser extends Document {
  email: string;
  password: string;
  type: string;
  creationDate: Date;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const UserMongo = mongoose.model<IUser>('User', UserSchema);


export default UserMongo;
