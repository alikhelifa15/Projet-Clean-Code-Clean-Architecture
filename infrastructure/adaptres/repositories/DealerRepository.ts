import {DealerRepository as IDealerRepository} from '../../../application/repositories/DealerRepository';
import {Dealer} from '../../../domain/entities/Dealer';
import DealerModel from '../../database/mysql/models/Dealer';

export class DealerRepository implements IDealerRepository {
    async save(dealer: Dealer): Promise<Dealer> {
        const savedDealer = await DealerModel.create(
            {   id: dealer.id,     
                user_id: dealer.userId,
                name: dealer.name,
                phone: dealer.phone,
                address: dealer.address,
                postal_code: dealer.postalCode,
                city: dealer.city,
                services: dealer.services,
            } as any
        );
        return new Dealer(
            savedDealer.id,
            savedDealer.user_id,
            savedDealer.name,
            savedDealer.phone,
            savedDealer.address,
            savedDealer.postal_code,
            savedDealer.city,
            savedDealer.services
        );
    }
    async findById(id: number): Promise<Dealer | null> {
        const dealer = await DealerModel.findByPk(id);
        if (!dealer) return null;
        return new Dealer(
            dealer.id,
            dealer.user_id,
            dealer.name,
            dealer.phone,
            dealer.address,
            dealer.postal_code,
            dealer.city,
            dealer.services
          );
    }
    async findByUserId(userId: number): Promise<Dealer | null> {
        const dealer = await DealerModel.findOne({
            where: { user_id: userId },
        });
        if (!dealer) return null;
        return new Dealer(
            dealer.id,
            dealer.user_id, 
            dealer.name,
            dealer.phone,
            dealer.address,
            dealer.postal_code,            
            dealer.city,
            dealer.services
        );
    }
    async delete(id: number): Promise<void> {
        await DealerModel.destroy({ where: { id } });
    }
    async update(dealer: Dealer): Promise<Dealer> {
        await DealerModel.update(
            {   id: dealer.id,     
                user_id: dealer.userId,
                name: dealer.name,
                phone: dealer.phone,
                address: dealer.address,
                postal_code: dealer.postalCode,
                city: dealer.city,
                services: dealer.services,
            } as any,
            { where: { id: dealer.id! } }
        );
        const updatedDealer = await DealerModel.findByPk(dealer.id!);
        if (!updatedDealer) {
            throw new Error(`Dealer with id ${dealer.id} not found`);
        }
        const updateData = {
            id: updatedDealer.id,   
            userId: updatedDealer.user_id,
            name: updatedDealer.name,
            phone: updatedDealer.phone,
            address: updatedDealer.address,
            postalCode: updatedDealer.postal_code,
            city: updatedDealer.city,
            services: updatedDealer.services,
        };
        return new Dealer(
            updateData.id,
            updateData.userId,
            updateData.name,
            updateData.phone,
            updateData.address,
            updateData.postalCode,
            updateData.city,
            updateData.services
        );

    }
}