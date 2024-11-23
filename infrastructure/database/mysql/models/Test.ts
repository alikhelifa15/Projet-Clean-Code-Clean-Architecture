import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Motorcycle } from './Motorcycle';
import { Driver } from './Driver';

@Table({ tableName: 'tests' })
export class Test extends Model {
  @ForeignKey(() => Motorcycle)
  @Column
  motorcycleId!: number;

  @BelongsTo(() => Motorcycle)
  motorcycle!: Motorcycle;

  @ForeignKey(() => Driver)
  @Column
  driverId!: number;

  @BelongsTo(() => Driver)
  driver!: Driver;

  @Column
  startDate!: Date;

  @Column
  endDate!: Date;

  @Column
  initialMileage!: number;

  @Column
  finalMileage!: number;

  @Column
  comments!: string;
}
export default Test;