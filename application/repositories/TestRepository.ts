import { Test } from '../../domain/entities/Test';

export interface TestRepository {
  save(test: Test): Promise<Test>;
  update(test: Test): Promise<Test>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Test | null>;
  findByMotorcycleId(motorcycleId: number): Promise<Test[]>;
  findByDriverId(driverId: number): Promise<Test[]>;
  findByClientId(clientId: number): Promise<Test[]>;
}