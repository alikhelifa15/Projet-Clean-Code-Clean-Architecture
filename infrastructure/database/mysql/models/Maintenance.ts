import { Column, ForeignKey, Model, Table, DataType,HasMany,BelongsTo } from 'sequelize-typescript';
import Motorcycle from './Motorcycle'; 
import UsedPart from './UsedPart'; 
import Part from './Part'; 

@Table({
  tableName: 'maintenance',
  timestamps: false,
})
export default class Maintenance extends Model<Maintenance> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Motorcycle)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  motorcycle_id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  maintenance_date!: Date;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true, 
  })
  description!: string | null;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true, 
  })
  total_cost!: number | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true, 
  })
  recommendations!: string | null;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  status!: string;

  // ✅ Association avec Motorcycle
  @BelongsTo(() => Motorcycle, { foreignKey: 'motorcycle_id', as: 'motorcycle' })
  // ✅ Association avec UsedPart
  @HasMany(() => UsedPart, { as: 'maintenanceUsedParts', foreignKey: 'maintenance_id' })
  usedParts!: UsedPart[];
}
