import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PartnerCompany } from './PartnerCompany';

@Table({ tableName: 'parts' })
export class Part extends Model {
  @Column({ unique: true })
  reference!: string;

  @Column
  name!: string;

  @Column
  currentStock!: number;

  @Column
  stockAlertLevel!: number;

  @Column
  unitPrice!: number;

  @ForeignKey(() => PartnerCompany)
  @Column
  companyId!: number;

  @BelongsTo(() => PartnerCompany)
  company!: PartnerCompany;
}
export default Part;