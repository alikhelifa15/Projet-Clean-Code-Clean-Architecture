import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import User from './User';

@Table({
  tableName: 'dealer',
  timestamps: false,
})
export default class Dealer extends Model<Dealer> {
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
  name!: string;

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

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  services!: string | null;
}