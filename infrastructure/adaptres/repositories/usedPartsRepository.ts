import {  IUsedPartRepository } from '../../../application/repositories/UsedPartRepository';
import { UsedPart } from '../../../domain/entities/UsedPart';
import UsedPartModel from '../../database/mysql/models/UsedPart';

export class UsedPartRepository implements IUsedPartRepository {
  async save(usedPart: UsedPart): Promise<UsedPart> {
    const usedPartModel = await UsedPartModel.create({
      maintenance_id: usedPart.maintenanceId,
      part_id: usedPart.partId,
      quantity: usedPart.quantity,
      unit_price: usedPart.unitPrice
    }as any);

    return new UsedPart(
      usedPartModel.maintenance_id,
      usedPartModel.part_id,
      usedPartModel.quantity,
      usedPartModel.unit_price
    );
  }

  async findByMaintenanceId(maintenanceId: number): Promise<UsedPart[]> {
    const usedPartsModels = await UsedPartModel.findAll({
      where: { maintenance_id: maintenanceId }
    });

    return usedPartsModels.map(model => new UsedPart(
      model.id,
      model.maintenance_id,
      model.part_id,
      model.quantity,
    ));
  }


}
