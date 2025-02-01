import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  id: number;
  dealer_id?: number;
  first_name: string;
  last_name: string;
  phone: string | null;
  created_at?: Date;
  updated_at?: Date;
}

const ClientSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  dealer_id: {
    type: Number,
    required: false,
    ref: 'Dealer'
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
    default: null,
    validate: {
      validator: function(v: string) {
        return !v || /^\+?[\d\s-]{10,}$/.test(v);
      },
      message: (props: { value: string }) => `${props.value} n'est pas un numéro de téléphone valide!`}
  }
}, {
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const ClientMongo = mongoose.model<IClient>('Client', ClientSchema);
export default ClientMongo;