import mongoose, { Schema, Document } from "mongoose";

interface IPart extends Document {
  reference: string;
  name: string;
  description?: string;
  currentStock: number;
  alertThreshold: number;
  unitPrice?: number;
}

const PartSchema: Schema = new Schema({
  reference: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  currentStock: {
    type: Number,
    required: true,
  },
  alertThreshold: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    default: null,
  },
});

const PartMongo = mongoose.model<IPart>("Part", PartSchema);

export default PartMongo;
