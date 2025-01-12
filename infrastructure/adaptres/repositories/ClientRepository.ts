import { ClientRepository as IClientRepository } from '../../../application/repositories/ClientRepository';
import { Client } from '../../../domain/entities/Client';
import ClientModel from '../../database/mysql/models/Client';  

export class ClientRepository implements IClientRepository {
  async save(client: Client): Promise<Client> {

    const clientModel = await ClientModel.create({
      id: client.id,  
      user_id: client.userId,
      dealer_id: client.dealerId,
      first_name: client.firstName,
      last_name: client.lastName,
      phone: client.phone,
    }as any);
    return new Client(
      clientModel.id,
      clientModel.user_id,
      clientModel.dealer_id,
      clientModel.first_name,
      clientModel.last_name,
      clientModel.phone
    );
   
  }

  async findById(id: number): Promise<Client | null> {
    const clientModel = await ClientModel.findByPk(id);
    if (!clientModel) {
      return null;
    }
    return new Client(
      clientModel.id,
      clientModel.user_id,
      clientModel.dealer_id,
      clientModel.first_name,
      clientModel.last_name,
      clientModel.phone
    );
  }

  async findByUserId(userId: number): Promise<Client | null> {
    const clientModel = await ClientModel.findOne({
      where: { user_id: userId },
    });
    if (!clientModel) {
      return null;
    }
    return new Client(
      clientModel.id,
      clientModel.user_id,
      clientModel.dealer_id,
      clientModel.first_name,
      clientModel.last_name,
      clientModel.phone
    );
  }
  async delete(id: number): Promise<void> {
    await ClientModel.destroy({ where: { id } });
  }
  async update(client: Client): Promise<Client> {
    const clientModel = await ClientModel.findByPk(client.id);
    if (!clientModel) {
      throw new Error(`Client with id ${client.id} not found`);
    }
    const updateData = {
      user_id: client.userId,
      company_id: client.dealerId,
      first_name: client.firstName,
      last_name: client.lastName,
      phone: client.phone,
    };
    await clientModel.update(updateData);
    return client;
  }
}
