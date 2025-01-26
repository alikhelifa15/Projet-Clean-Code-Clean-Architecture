import { ClientRepository as IClientRepository } from '../../../application/repositories/ClientRepository';
import { Client } from '../../../domain/entities/Client';
import { PersonName } from '../../../domain/value-objects/PersonName';
import { PhoneNumber } from '../../../domain/value-objects/PhoneNumber';
import ClientModel from '../../database/mysql/models/Client';

export class ClientRepository implements IClientRepository {
  async save(client: Client): Promise<Client> {
    const clientModel = await ClientModel.create({
      id: client.id,
      user_id: client.userId,
      dealer_id: client.dealerId,
      first_name: client.getFirstName(),
      last_name: client.getLastName(),
      phone: client.getPhone(),
    } as any);

    return this.toDomainEntity(clientModel);
  }

  async findById(id: number): Promise<Client | null> {
    const clientModel = await ClientModel.findByPk(id);
    if (!clientModel) return null;
    return this.toDomainEntity(clientModel);
  }

  async findByUserId(userId: number): Promise<Client | null> {
    const clientModel = await ClientModel.findOne({
      where: { user_id: userId },
    });
    if (!clientModel) return null;
    return this.toDomainEntity(clientModel);
  }

  async update(client: Client): Promise<Client> {
    const clientModel = await ClientModel.findByPk(client.id);
    if (!clientModel) {
      throw new Error(`Client with id ${client.id} not found`);
    }

    await clientModel.update({
      user_id: client.userId,
      dealer_id: client.dealerId,
      first_name: client.getFirstName(),
      last_name: client.getLastName(),
      phone: client.getPhone(),
    });

    return this.toDomainEntity(clientModel);
  }

  async delete(id: number): Promise<void> {
    await ClientModel.destroy({ where: { id } });
  }

  private toDomainEntity(model: any): Client {
    const name = new PersonName(model.first_name, model.last_name);
    const phone = model.phone ? new PhoneNumber(model.phone) : null;

    return new Client(
      model.id,
      model.user_id,
      model.dealer_id,
      name.getFirstName(),
      name.getLastName(),
      phone?.toString() || null
    );
  }
}