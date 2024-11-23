import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PartnerCompany } from './PartnerCompany';

@Table({ tableName: 'user' })
export class User extends Model {
  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column
  password!: string;

  @Column
  role!: string; // admin, employee, manager, etc.

  @Column
  status!: string; // active, inactive, suspended

  @ForeignKey(() => PartnerCompany)
  @Column
  companyId!: number;

  @BelongsTo(() => PartnerCompany)
  company!: PartnerCompany;

  validatePassword(password: string): boolean {
    return this.password === password;
  }
}
export default User;