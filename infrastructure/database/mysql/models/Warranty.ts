import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import Motorcycle from './Motorcycle'; 

@Table({
  tableName: 'warranty',
  timestamps: false,  
})
export default class Warranty extends Model<Warranty> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Motorcycle)
  @Column({
    type: DataType.INTEGER,
  })
  motorcycle_id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date!: Date;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.TEXT,
  })
  conditions?: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  status!: string;
}
