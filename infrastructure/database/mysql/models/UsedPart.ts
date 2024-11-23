import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Maintenance } from './Maintenance';
import { Part } from './Part';

@Table({ tableName: 'used_parts' })
export class UsedPart extends Model {
  @ForeignKey(() => Maintenance)
  @Column
  maintenanceId!: number;

  @BelongsTo(() => Maintenance)
  maintenance!: Maintenance;

  @ForeignKey(() => Part)
  @Column
  partId!: number;

  @BelongsTo(() => Part)
  part!: Part;

  @Column
  quantity!: number;

  @Column
  unitPrice!: number;
}
export default UsedPart;