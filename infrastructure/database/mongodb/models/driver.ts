import mongoose, { Schema, Document } from "mongoose";

interface IDriver extends Document {
  id: number;
  companyId: number;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  licenseDate: Date;
  experience?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const DriverSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    companyId: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    licenseDate: { type: Date, required: true },
    experience: { type: String, default: null },
    status: { type: String, enum: ["active", "inactive"], required: true },
  },
  { timestamps: true } // Ajoute automatiquement createdAt et updatedAt
);

const DriverMongo = mongoose.model<IDriver>("Driver", DriverSchema);

export default DriverMongo;
