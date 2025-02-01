import { Column, Model, Table, DataType,AfterSave,AfterDestroy,AfterUpdate, } from 'sequelize-typescript';
import PartMongo from "../../mongodb/models/part"; // Modèle MongoDB

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
    unique: true,
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


  @AfterSave
  static async saveToMongo(part: Part) {
    try {
      const newPart = new PartMongo({
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
    try {
      await PartMongo.deleteOne({ reference: part.reference });
      console.log("Pièce supprimée de MongoDB avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression dans MongoDB :", err);
    }
  }

  @AfterUpdate
  static async updateMongo(part: Part) {
    try {
      await PartMongo.updateOne(
        { reference: part.reference },
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
