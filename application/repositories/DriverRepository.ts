//Driver repository interface
import { Driver } from "../../domain/entities/Driver";

export interface DriverRepository {
  save(driver: Driver): Promise<Driver>;
  findById(id: number): Promise<Driver | null>;
  findAll(): Promise<Driver[]>;
  update(id: number, driver: Partial<Driver>): Promise<Driver | null>;
  delete(id: number): Promise<boolean>;
}