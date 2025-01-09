import { Client } from "../../domain/entities/Client";
export interface ClientRepository {
    save(client: Client): Promise<Client>;
    update(client: Client): Promise<Client>;
    findById(id: number): Promise<Client | null>;
    findByUserId(userId: number): Promise<Client | null>;
    delete(id: number): Promise<void>;
  }