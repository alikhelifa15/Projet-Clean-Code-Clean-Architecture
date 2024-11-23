import { Table, Column, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Motorcycle } from './Motorcycle';
import { UsedPart } from './UsedPart';

@Table({ tableName: 'maintenances' })
export class Maintenance extends Model {
  @ForeignKey(() => Motorcycle)
  @Column
  motorcycleId!: number;

  @BelongsTo(() => Motorcycle)
  motorcycle!: Motorcycle;

  @Column
  maintenanceDate!: Date;

  @Column
  type!: string; // preventive, corrective

  @Column
  description!: string;

  @Column
  totalCost!: number;

  @Column
  recommendations!: string;

  @Column
  status!: string; // scheduled, in progress, completed

  @HasMany(() => UsedPart)
  usedParts!: UsedPart[];
}
export default Maintenance;