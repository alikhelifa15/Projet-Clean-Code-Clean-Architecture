import { Column, ForeignKey, Model, Table, DataType } from 'sequelize-typescript';
import  Brand  from './Brand'; 

@Table({
  tableName: 'model',
  timestamps: false,
})
export default class MotorcycleModel extends Model<MotorcycleModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Brand)
  @Column({
    type: DataType.INTEGER,
    allowNull: true, 
  })
  brand_id!: number | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  color!: string;
}
