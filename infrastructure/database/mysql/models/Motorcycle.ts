import { Column, ForeignKey, Model, Table, DataType } from 'sequelize-typescript';
import Company from './Company';
import Dealer from './Dealer';
import MotorcycleModel from './MotorcycleModel';

@Table({
  tableName: 'motorcycle',
  timestamps: false,
})
export default class Motorcycle extends Model<Motorcycle> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  company_id!: number;

  @ForeignKey(() => Dealer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  dealer_id!: number;

  @ForeignKey(() => MotorcycleModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  model_id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  serial_number!: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  mileage!: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  service_date!: Date | null;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['active', 'maintenance', 'inactive']],
    },
  })
  status!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maintenance_interval!: number;
}