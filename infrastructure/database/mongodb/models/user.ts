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

const newUser = new UserMongo({
  email: 'utilisateur@example.com',
  password: 'securePassword123',
  type: 'admin',
});

newUser
  .save()
  .then(() => {
    console.log('Utilisateur enregistré avec succès !');
  })
  .catch((error) => {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
  });

export default UserMongo;
