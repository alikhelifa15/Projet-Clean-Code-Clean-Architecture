import { TestRepository as ITestRepository } from "../../../application/repositories/TestRepository";
import { Test } from "../../../domain/entities/Test";
import TestModel from "../../database/mysql/models/Test";

export class TestRepository implements ITestRepository {
  async save(test: Test): Promise<Test> {
    const testModel = await TestModel.create({
      id: test.id,
      motorcycle_id: test.motorcycleId,
      driver_id: test.driverId,
      client_id: test.clientId,
      start_date: test.startDate,
      starting_mileage: test.startingMileage,
      end_date: test.endDate,
      ending_mileage: test.endingMileage,
      comments: test.comments,
      status: test.status
    } as any);

    return new Test(
      testModel.id,
      testModel.motorcycle_id,
      testModel.driver_id,
      testModel.client_id,
      testModel.start_date,
      testModel.starting_mileage,
      testModel.end_date,
      testModel.ending_mileage,
      testModel.comments,
      testModel.status
    );
  }

  async findById(id: number): Promise<Test | null> {
    const testModel = await TestModel.findByPk(id);
    if (!testModel) return null;

    return new Test(
      testModel.id,
      testModel.motorcycle_id,
      testModel.driver_id,
      testModel.client_id,
      testModel.start_date,
      testModel.starting_mileage,
      testModel.end_date,
      testModel.ending_mileage,
      testModel.comments,
      testModel.status
    );
  }

  async findByMotorcycleId(motorcycleId: number): Promise<Test[]> {
    const tests = await TestModel.findAll({
      where: { motorcycle_id: motorcycleId }
    });
    return tests.map((test) => {
      return new Test(
        test.id,
        test.motorcycle_id,
        test.driver_id,
        test.client_id,
        test.start_date,
        test.starting_mileage,
        test.end_date,
        test.ending_mileage,
        test.comments,
        test.status
      );
    });
  }

  async findByDriverId(driverId: number): Promise<Test[]> {
    const tests = await TestModel.findAll({
      where: { driver_id: driverId }
    });
    return tests.map((test) => {
      return new Test(
        test.id,
        test.motorcycle_id,
        test.driver_id,
        test.client_id,
        test.start_date,
        test.starting_mileage,
        test.end_date,
        test.ending_mileage,
        test.comments,
        test.status
      );
    });
  }

  async findByClientId(clientId: number): Promise<Test[]> {
    const tests = await TestModel.findAll({
      where: { client_id: clientId }
    });
    return tests.map((test) => {
      return new Test(
        test.id,
        test.motorcycle_id,
        test.driver_id,
        test.client_id,
        test.start_date,
        test.starting_mileage,
        test.end_date,
        test.ending_mileage,
        test.comments,
        test.status
      );
    });
  }

  async update(test: Test): Promise<Test> {
    if (!test.id) {
      throw new Error("Test ID is required for update");
    }
    const instance = await TestModel.findByPk(test.id);
    if (!instance) {
      throw new Error(`Test with id ${test.id} not found`);
    }

    await instance.update({
      start_date: test.startDate,
      starting_mileage: test.startingMileage,
      end_date: test.endDate,
      ending_mileage: test.endingMileage ?? 0,
      comments: test.comments,
      status: test.status
    });

    return test;
  }

  async delete(id: number): Promise<void> {
    const instance = await TestModel.findByPk(id);
    if (!instance) {
      throw new Error(`Test with id ${id} not found`);
    }
    await instance.destroy();
  }
 
}