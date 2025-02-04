import mongoose, { Schema, Document } from 'mongoose';

export interface IIncident extends Document {
  id: number;
  test_id: number;
  incident_date: Date;
  type: string;
  severity: string;
  description?: string;
  actions_taken?: string;
  created_at?: Date;
  updated_at?: Date;
}

const IncidentSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  test_id: {
    type: Number,
    required: true,
    ref: 'Test'
  },
  incident_date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['accident', 'infraction', 'technical', 'other']
  },
  severity: {
    type: String,
    required: true,
    enum: ['Faible', 'Moyen', 'Élevé']
  },
  description: {
    type: String,
    required: false
  },
  actions_taken: {
    type: String,
    required: false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Index
IncidentSchema.index({ id: 1 }, { unique: true });
IncidentSchema.index({ test_id: 1 });
IncidentSchema.index({ type: 1 });
IncidentSchema.index({ severity: 1 });
IncidentSchema.index({ incident_date: 1 });

const IncidentMongo = mongoose.model<IIncident>('Incident', IncidentSchema);
export default IncidentMongo;