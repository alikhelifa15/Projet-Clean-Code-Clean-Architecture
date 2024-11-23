import { Table, Column, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { PartnerCompany } from './PartnerCompany';
import { OrderDetail } from './OrderDetail';

@Table({ tableName: 'part_orders' })
export class PartOrder extends Model {
  @ForeignKey(() => PartnerCompany)
  @Column
  companyId!: number;

  @BelongsTo(() => PartnerCompany)
  company!: PartnerCompany;

  @Column
  orderDate!: Date;

  @Column
  status!: string; // pending, approved, delivered

  @Column
  deliveryDate!: Date;

  @Column
  totalCost!: number;

  @HasMany(() => OrderDetail)
  orderDetails!: OrderDetail[];
}
export default PartOrder;