import { Column, ForeignKey, Model, Table, DataType } from 'sequelize-typescript';
import  Motorcycle  from './Motorcycle'; 

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
    allowNull: false, // Assurez-vous que la clé étrangère est obligatoire si nécessaire
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
    allowNull: true, // Description est optionnelle
  })
  description!: string | null;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true, // Total cost est optionnel
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
}
