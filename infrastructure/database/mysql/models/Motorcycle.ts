import { Column, ForeignKey, Model, Table, DataType } from 'sequelize-typescript';
import  Company  from './Company'; 
import  MotorcycleModel  from './MotorcycleModel'; 

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
    allowNull: true, 
  })
  company_id!: number | null;

  @ForeignKey(() => MotorcycleModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true, 
  })
  model_id!: number | null;

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
  })
  status!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maintenance_interval!: number;
}
