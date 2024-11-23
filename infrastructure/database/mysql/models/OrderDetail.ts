import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PartOrder } from './PartOrder';
import { Part } from './Part';

@Table({ tableName: 'order_details' })
export class OrderDetail extends Model {
  @ForeignKey(() => PartOrder)
  @Column
  orderId!: number;

  @BelongsTo(() => PartOrder)
  order!: PartOrder;

  @ForeignKey(() => Part)
  @Column
  partId!: number;

  @BelongsTo(() => Part)
  part!: Part;

  @Column
  quantity!: number;

  @Column
  unitPrice!: number;
}
export default OrderDetail;