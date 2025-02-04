import mongoose, { Schema, Document } from 'mongoose';

export interface ITest extends Document {
  id: number;
  motorcycle_id: number;
  driver_id?: number;
  client_id?: number;
  start_date: Date;
  end_date?: Date;
  starting_mileage: number;
  ending_mileage?: number;
  comments?: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}

const TestSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  motorcycle_id: {
    type: Number,
    required: true,
    ref: 'Motorcycle'
  },
  driver_id: {
    type: Number,
    required: false,
    ref: 'Driver'
  },
  client_id: {
    type: Number,
    required: false,
    ref: 'Client'
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: false
  },
  starting_mileage: {
    type: Number,
    required: true
  },
  ending_mileage: {
    type: Number,
    required: false
  },
  comments: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true,
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled']
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

TestSchema.index({ id: 1 }, { unique: true });
TestSchema.index({ motorcycle_id: 1 });
TestSchema.index({ driver_id: 1 });
TestSchema.index({ client_id: 1 });

const TestMongo = mongoose.model<ITest>('Test', TestSchema);
export default TestMongo;
