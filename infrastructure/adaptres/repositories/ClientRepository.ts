import { ClientRepository as IClientRepository } from '../../../application/repositories/ClientRepository';
import { Client } from '../../../domain/entities/Client';
import ClientModel from '../../database/mysql/models/Client';

export class ClientRepository implements IClientRepository {
  async save(client: Client): Promise<Client> {
    const clientModel = new ClientModel();
    clientModel.id = client.id;
    clientModel.dealer_id = client.dealerId;
    clientModel.first_name = client.getFirstName();
    clientModel.last_name = client.getLastName();
    clientModel.phone = client.getPhone();
    await clientModel.save();
    return this.toDomainEntity(clientModel);
  }   
  

  async findById(id: number): Promise<Client | null> {
    const clientModel = await ClientModel.findByPk(id);
    if (!clientModel) return null;
    return this.toDomainEntity(clientModel);
  }



  async update(client: Client): Promise<Client> {
    const clientModel = await ClientModel.findByPk(client.id);
    if (!clientModel) {
      throw new Error(`Client with id ${client.id} not found`);
    }

    await clientModel.update({
      dealer_id: client.dealerId,
      first_name: client.getFirstName(),
      last_name: client.getLastName(),
      phone: client.getPhone()
    });

    await clientModel.reload();
    return this.toDomainEntity(clientModel);
  }

  async delete(id: number): Promise<void> {
    const clientModel = await ClientModel.findByPk(id);
    if (!clientModel) {
      throw new Error(`Client with id ${id} not found`);
    }
    await clientModel.destroy();
  }

  private toDomainEntity(model: any): Client {
    return new Client(
      model.id,
      model.dealer_id,
      model.first_name,
      model.last_name,
      model.phone
    );
  }
}