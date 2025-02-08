import { Incident } from '../../domain/entities/Incident';

export interface IncidentRepository {
  save(incident: Incident): Promise<Incident>;
  update(incident: Incident): Promise<Incident>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Incident | null>;
  findByTestId(testId: number): Promise<Incident[]>;
  
}