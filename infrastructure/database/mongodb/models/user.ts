import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {
  id: number | null;
  email: string;
  password: string;
  type: string;
  creationDate: Date;
}

const UserSchema: Schema = new Schema({
  id: { type: Number },
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
