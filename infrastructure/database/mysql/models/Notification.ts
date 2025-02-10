import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import Company from './Company'; 
import Client from './Client';    
import Dealer from './Dealer';

@Table({
  tableName: 'notification',
  timestamps: false, 
})
export default class Notification extends Model<Notification> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  message!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  creation_date!: Date;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.INTEGER,
    comment: 'ID of the associated entity (maintenance, order, etc.)',
  })
  reference_id?: number;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
  })
  company_id!: number;
  @ForeignKey(() => Dealer)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  dealer_id!: number | null;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
  })
  client_id!: number;
}
