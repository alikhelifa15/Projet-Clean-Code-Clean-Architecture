import { Table, Column, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { PartnerCompany } from './PartnerCompany';
import { Test } from './Test';

@Table({ tableName: 'drivers' })
export class Driver extends Model {
  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column({ unique: true })
  licenseNumber!: string;

  @Column
  licenseDate!: Date;

  @Column
  experience!: number;

  @Column
  status!: string; // active, inactive, suspended

  @ForeignKey(() => PartnerCompany)
  @Column
  companyId!: number;

  @BelongsTo(() => PartnerCompany)
  company!: PartnerCompany;

  @HasMany(() => Test)
  tests!: Test[];
}

export default Driver;