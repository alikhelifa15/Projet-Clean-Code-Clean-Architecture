import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import Company from './Company'; 

@Table({
  tableName: 'part_order',
  timestamps: false,
})
export default class PartOrder extends Model<PartOrder> {
  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  company_id!: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  order_date!: Date;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.DATE,
  })
  delivery_date?: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  total_cost?: number;
}
