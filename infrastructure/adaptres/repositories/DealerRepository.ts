import { DealerRepository as IDealerRepository } from '../../../application/repositories/DealerRepository';
import { Dealer } from '../../../domain/entities/Dealer';
import { PhoneNumber } from '../../../domain/value-objects/PhoneNumber';
import { PostalAddress } from '../../../domain/value-objects/PostalAddress';
import DealerModel from '../../database/mysql/models/Dealer';

export class DealerRepository implements IDealerRepository {
  async save(dealer: Dealer): Promise<Dealer> {
    const savedDealer = await DealerModel.create({
      id: dealer.id,
      user_id: dealer.userId,
      name: dealer.name,
      phone: dealer.getPhone(),
      address: dealer.getAddress(),
      postal_code: dealer.getPostalCode(),
      city: dealer.getCity(),
      services: dealer.services,
    } as any);

    return this.toDomainEntity(savedDealer);
  }

  async findById(id: number): Promise<Dealer | null> {
    const dealer = await DealerModel.findByPk(id);
    if (!dealer) return null;
    return this.toDomainEntity(dealer);
  }

  async findByUserId(userId: number): Promise<Dealer | null> {
    const dealer = await DealerModel.findOne({
      where: { user_id: userId },
    });
    if (!dealer) return null;
    return this.toDomainEntity(dealer);
  }

  async update(dealer: Dealer): Promise<Dealer> {
    if (!dealer.userId) {
      throw new Error('Dealer ID is required to update a dealer.');
    }
    const instance = await DealerModel.findOne({ where: { user_id: dealer.userId } });
    if (!instance) {
      throw new Error('Dealer not found.');
    }
    await instance.update(
      {
        name: dealer.name,
        phone: dealer.getPhone(),
        address: dealer.getAddress(),
        postal_code: dealer.getPostalCode(),
        city: dealer.getCity(),
        services: dealer.services,
      } as any,
      { where: { user_id: dealer.userId } }
    );


    return this.toDomainEntity(instance);
  }

  async delete(id: number): Promise<void> {
    const instance = await DealerModel.findOne({ where: { user_id: id } });
    if (!instance) {
      throw new Error('Dealer not found.');
      }
    await instance.destroy();
  }
  private toDomainEntity(model: any): Dealer {
    const phone = model.phone ? new PhoneNumber(model.phone) : null;
    const address = model.address && model.postal_code && model.city
      ? new PostalAddress(model.address, model.postal_code, model.city)
      : null;

    return new Dealer(
      model.id,
      model.user_id,
      model.name,
      phone?.toString() || null,
      address?.getAddress() || null,
      address?.getPostalCode() || null,
      address?.getCity() || null,
      model.services
    );
  }
}