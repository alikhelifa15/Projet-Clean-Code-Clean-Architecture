import { Column, ForeignKey, Model, Table, DataType } from 'sequelize-typescript';
import User from './User';
import Dealer from './Dealer';

@Table({
  tableName: 'client',
  timestamps: false,
})
export default class Client extends Model<Client> {
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

  @ForeignKey(() => Dealer)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  dealer_id!: number | null;

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
    type: DataType.STRING(20),
    allowNull: true,
  })
  phone!: string | null;
}