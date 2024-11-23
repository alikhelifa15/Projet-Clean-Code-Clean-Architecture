import { Table, Column, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { PartnerCompany } from './PartnerCompany';
import { Maintenance } from './Maintenance';
import { Test } from './Test';


@Table({ tableName: 'motorcycles' })
export class Motorcycle extends Model {
  @Column({ unique: true })
  serialNumber!: string;

  @Column
  model!: string;

  @Column
  licensePlate!: string;

  @Column
  mileage!: number;

  @Column
  serviceStartDate!: Date;

  @Column
  status!: string; // active, maintenance, out of service

  @ForeignKey(() => PartnerCompany)
  @Column
  companyId!: number;

  @BelongsTo(() => PartnerCompany)
  company!: PartnerCompany;

  @HasMany(() => Maintenance)
  maintenances!: Maintenance[];

  @HasMany(() => Test)
  tests!: Test[];
}
export default Motorcycle;