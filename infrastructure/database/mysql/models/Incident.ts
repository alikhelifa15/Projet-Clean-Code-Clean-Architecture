import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import Test from './Test';  

@Table({
  tableName: 'incident',
  timestamps: false,
})
export default class Incident extends Model<Incident> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Test)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  test_id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  incident_date!: Date;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.TEXT,
  })
  description?: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  severity!: string;

  @Column({
    type: DataType.TEXT,
  })
  actions_taken?: string;
}
