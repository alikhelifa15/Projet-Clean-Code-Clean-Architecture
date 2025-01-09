import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import Maintenance from './Maintenance';  
import Part from './Part'; 

@Table({
  tableName: 'used_part',
  timestamps: false,
})
export default class UsedPart extends Model<UsedPart> {
  @ForeignKey(() => Maintenance)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maintenance_id!: number;

  @ForeignKey(() => Part)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  part_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  unit_price!: number;
}
