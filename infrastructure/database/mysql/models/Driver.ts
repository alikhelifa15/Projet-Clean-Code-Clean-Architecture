import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import Company from './Company';

@Table({
  tableName: 'driver',
  timestamps: false,
})
export default class Driver extends Model<Driver> {
  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  company_id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  first_name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  license_number!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  license_date!: Date;

  @Column({
    type: DataType.STRING(255),
  })
  experience?: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  status!: string;
}
