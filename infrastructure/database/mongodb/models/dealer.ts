import mongoose, { Schema, Document } from 'mongoose';

export interface IDealer extends Document {
  mysql_id: number; 
  user_id: string;
  name: string;
  phone: string | null;
  address: string | null;
  postal_code: string | null;
  city: string | null;
  services: string | null;
}

const DealerSchema: Schema = new Schema({
  mysql_id: { type: Number },
  user_id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    validate: {
      validator: function(v: string | null) {
        if (!v) return true;
        return /^(\+33|0)[1-9](\d{2}){4}$/.test(v);
      },
      message: 'Invalid phone number format'
    }
  },
  address: {
    type: String,
    trim: true
  },
  postal_code: {
    type: String,
    validate: {
      validator: function(v: string | null) {
        if (!v) return true;
        return /^\d{5}$/.test(v);
      },
      message: 'Invalid postal code format'
    }
  },
  city: {
    type: String,
    trim: true
  },
  services: {
    type: String,
    trim: true
  }
});

const DealerMongo = mongoose.model<IDealer>('Dealer', DealerSchema);
export default DealerMongo;