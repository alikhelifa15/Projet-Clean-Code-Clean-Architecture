import mongoose, { Schema, Document } from 'mongoose';

export interface IMotorcycle extends Document {
  id: number;
  company_id: number;
  dealer_id: number;
  model_id: number;
  serial_number: string;
  mileage: number;
  service_date: Date | null;
  status: string;
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
    required: true,
    ref: 'Company'
  },
  dealer_id: {
    type: Number,
    required: true,
    ref: 'Dealer'
  },
  model_id: {
    type: Number,
    required: true,
    ref: 'Model'
  },
  serial_number: {
    type: String,
    required: true,
    unique: true
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
MotorcycleSchema.index({ model_id: 1 });
MotorcycleSchema.index({ status: 1 });

const MotorcycleMongo = mongoose.model<IMotorcycle>('Motorcycle', MotorcycleSchema);
export default MotorcycleMongo;