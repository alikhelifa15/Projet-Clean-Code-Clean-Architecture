import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'brand',
  timestamps: false,
})
export default class Brand extends Model<Brand> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  country!: string | null;
}
