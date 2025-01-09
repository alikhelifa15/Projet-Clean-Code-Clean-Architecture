import { Column, ForeignKey, Model, Table, DataType } from 'sequelize-typescript';
import User from './User'; 
@Table({
  tableName: 'company',
  timestamps: false,
})
export default class Company extends Model<Company> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  company_name!: string;

  @Column({
    type: DataType.STRING(14),
    allowNull: false,
    unique: true,
  })
  siret_number!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  phone!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  address!: string | null;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  postal_code!: string | null;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  city!: string | null;
}
