import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  user_id: number;
  company_name: string;
  siret_number: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  postal_code: string | null;
  city: string | null;
}

const CompanySchema: Schema = new Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true
  },
  company_name: {
    type: String,
    required: true,
    trim: true
  },
  siret_number: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v: string) {
        return /^\d{14}$/.test(v);
      },
      message: 'SIRET number must be 14 digits'
    }
  },
  email: {
    type: String,
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
  }
});
const CompanyMongo = mongoose.model<ICompany>('Company', CompanySchema);
export default CompanyMongo;