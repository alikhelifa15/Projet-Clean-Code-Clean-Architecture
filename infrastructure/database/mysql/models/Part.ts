import { Column, Model, Table, DataType,AfterSave,AfterDestroy,AfterUpdate, } from 'sequelize-typescript';
import UsedPart from './UsedPart'; 
import Maintenance from './Maintenance';
import { connectDB } from "../../mongodb/models";
import PartMongo from "../../mongodb/models/part"; 

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

  @AfterSave
  static async saveToMongo(part: Part) {
    try {
      await connectDB();

      const newPart = new PartMongo({
        id: part.id,
        reference: part.reference,
        name: part.name,
        description: part.description,
        currentStock: part.current_stock,
        alertThreshold: part.alert_threshold,
        unitPrice: part.unit_price,
      });

      await newPart.save();
      console.log("Pièce enregistrée dans MongoDB avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'enregistrement dans MongoDB :", err);
    }
  }

  @AfterDestroy
  static async deleteFromMongo(part: Part) {
    console.log("AfterDestroy hook triggered for ID:", part.id);
    try {
      await connectDB();
      console.log("Tentative de suppression piéce MongoDB pour ID:", part.id);
      await PartMongo.deleteOne({ id: part.id });
      console.log("Pièce supprimée de MongoDB avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression dans MongoDB :", err);
    }
  }

  @AfterUpdate
  static async updateMongo(part: Part) {
    try {
      await connectDB();
      await PartMongo.updateOne(
        { id: part.id },
        {
          reference: part.reference,
          name: part.name,
          description: part.description,
          currentStock: part.current_stock,
          alertThreshold: part.alert_threshold,
          unitPrice: part.unit_price,
        }
      );
      console.log("Pièce mise à jour dans MongoDB avec succès !");
    } catch (err) {
      console.error("Erreur lors de la mise à jour dans MongoDB :", err);
    }
  }

}
