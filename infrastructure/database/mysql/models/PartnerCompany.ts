import { Table, Column, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Motorcycle } from './Motorcycle';
import { PartOrder } from './PartOrder';
import { Part } from './Part';
import { User } from './User';

@Table({ tableName: 'partner_companies' })
export class PartnerCompany extends Model {
  @Column
  name!: string;

  @Column
  address!: string;

  @Column
  phone!: string;

  @Column
  email!: string;

  @Column
  type!: string; // ex.: delivery, courier, etc.

  @Column
  status!: string; // active, inactive, suspended

  @Column
  siret!: string; // Numéro SIRET (Spécifique à la France)

  @HasMany(() => User)
  user!: User[];

  @HasMany(() => Motorcycle)
  motorcycles!: Motorcycle[];

  @HasMany(() => PartOrder)
  partOrders!: PartOrder[];

  @HasMany(() => Part)
  parts!: Part[];

  static async seedData() {
    await PartnerCompany.bulkCreate([
      {
        name: 'Company A',
        address: '123 Main Street',
        phone: '1234567890',
        email: 'contact@companya.com',
        type: 'delivery',
        status: 'active',
        siret: '12345678901234',
      },
      {
        name: 'Company B',
        address: '456 Elm Street',
        phone: '0987654321',
        email: 'info@companyb.com',
        type: 'courier',
        status: 'inactive',
        siret: '98765432109876',
      },
    ]);
    console.log('PartnerCompany data seeded!');
  }



}
export default PartnerCompany;