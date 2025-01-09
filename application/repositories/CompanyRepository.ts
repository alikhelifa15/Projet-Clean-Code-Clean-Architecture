import { Company } from "../../domain/entities/Company";

export interface CompanyRepository {
    save(company: Company): Promise<Company>;
    update(company: Company): Promise<Company>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Company[]>;
    findById(id: string): Promise<Company|null>;
    findByUserId(userId: number): Promise<Company | null>;

  }
  