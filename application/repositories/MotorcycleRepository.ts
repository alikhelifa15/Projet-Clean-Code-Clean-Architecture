import { Motorcycle } from '../../domain/entities/Motorcycle';

export interface MotorcycleRepository {
    save(motorcycle: Motorcycle): Promise<Motorcycle>;
    findById(id: number): Promise<Motorcycle | null>;
    findByDealerId(dealerId: string): Promise<Motorcycle[]>;
    findByCompanyId(companyId: string): Promise<Motorcycle[]>;
    update(motorcycle: Motorcycle): Promise<Motorcycle>;
    delete(id: number): Promise<void>;
  }
  