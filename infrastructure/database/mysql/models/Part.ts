import { Column, Model, Table, DataType } from 'sequelize-typescript';
import UsedPart from './UsedPart'; 
import Maintenance from './Maintenance';

@Table({
  tableName: 'part',
  timestamps: false,
})
export default class Part extends Model<Part> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  reference!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true, 
  })
  description!: string | null;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  current_stock!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 10,
  })
  alert_threshold!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true, 
  })
  unit_price!: number | null;

  
  static associate() {
    this.belongsToMany(Maintenance, {
      through: UsedPart, 
      foreignKey: 'part_id', 
      otherKey: 'maintenance_id', 
      as: 'maintenances', 
    });
  }
}
