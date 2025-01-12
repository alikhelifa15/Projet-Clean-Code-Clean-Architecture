import { Dealer } from "../../domain/entities/Dealer";
export interface DealerRepository {
    save(dealer: Dealer): Promise<Dealer>;
    update(dealer: Dealer): Promise<Dealer>;
    findById(id: number): Promise<Dealer | null>;
    findByUserId(userId: number): Promise<Dealer | null>;
    delete(id: number): Promise<void>;
  }
