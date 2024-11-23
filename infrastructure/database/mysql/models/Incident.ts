import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Test } from './Test';

@Table({ tableName: 'incidents' })
export class Incident extends Model {
  @ForeignKey(() => Test)
  @Column
  testId!: number;

  @BelongsTo(() => Test)
  test!: Test;

  @Column
  incidentDate!: Date;

  @Column
  type!: string; // accident, violation

  @Column
  description!: string;

  @Column
  severity!: string; // minor, moderate, major

  @Column
  actionsTaken!: string;
}
export default Incident;