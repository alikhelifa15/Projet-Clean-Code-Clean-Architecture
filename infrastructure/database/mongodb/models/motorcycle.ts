import mongoose, { Schema, Document } from 'mongoose';

export interface IMotorcycle extends Document {
  id: number;
  company_id?: number; 
  dealer_id?: number; 
  brand: string;
  modele: string;
  serial_number: string;
  photo: string; 
  mileage: number;
  service_date: Date | null;
  status: 'active' | 'maintenance' | 'inactive'; 
  maintenance_interval: number;
}

const MotorcycleSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  company_id: {
    type: Number,
    required: false,
    ref: 'Company'
  },
  dealer_id: {
    type: Number,
    required: false,
    ref: 'Dealer'
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  serial_number: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String,
    required: false
  },
  mileage: {
    type: Number,
    default: 0
  },
  service_date: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'maintenance', 'inactive']
  },
  maintenance_interval: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});


MotorcycleSchema.index({ id: 1 }, { unique: true });
MotorcycleSchema.index({ serial_number: 1 }, { unique: true });
MotorcycleSchema.index({ company_id: 1 });
MotorcycleSchema.index({ dealer_id: 1 });
MotorcycleSchema.index({ status: 1 });


const MotorcycleMongo = mongoose.model<IMotorcycle>('Motorcycle', MotorcycleSchema);
export default MotorcycleMongo;