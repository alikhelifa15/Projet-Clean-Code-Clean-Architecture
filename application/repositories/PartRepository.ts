import { Part } from "../../domain/entities/Part";

export interface PartRepository {
  save(parts: Part): Promise<Part>;
  findById(id: number): Promise<Part | null>;
  findAll(): Promise<Part[]>;
  update(id: number, parts: Partial<Part>): Promise<Part | null>;
  delete(id: number): Promise<boolean>;
}