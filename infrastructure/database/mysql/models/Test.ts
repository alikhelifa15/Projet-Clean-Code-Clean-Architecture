import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import Motorcycle from './Motorcycle';  
import Driver from './Driver'; 

@Table({
  tableName: 'test',
  timestamps: false,
})
export default class Test extends Model<Test> {
  @ForeignKey(() => Motorcycle)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  motorcycle_id!: number;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  driver_id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date!: Date;

  @Column({
    type: DataType.DATE,
  })
  end_date?: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  starting_mileage!: number;

  @Column({
    type: DataType.INTEGER,
  })
  ending_mileage?: number;

  @Column({
    type: DataType.TEXT,
  })
  comments?: string;
}
