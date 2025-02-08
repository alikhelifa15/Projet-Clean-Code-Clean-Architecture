import { IncidentRepository as IIncidentRepository } from "../../../application/repositories/IncidentRepository";
import { Incident } from "../../../domain/entities/Incident";
import IncidentModel from "../../database/mysql/models/Incident";

export class IncidentRepository implements IIncidentRepository {
  async save(incident: Incident): Promise<Incident> {
    const incidentModel = await IncidentModel.create({
      test_id: incident.testId,
      incident_date: incident.incidentDate,
      type: incident.type,
      description: incident.description,
      severity: incident.severity,
      actions_taken: incident.actionsTaken
    } as any);

    return new Incident(
      incidentModel.id,
      incidentModel.test_id,
      incidentModel.incident_date,
      incidentModel.type,
      incidentModel.severity,
      incidentModel.description ?? '',
   
      incidentModel.actions_taken
    );
  }

  async findById(id: number): Promise<Incident | null> {
    const incidentModel = await IncidentModel.findByPk(id);
    if (!incidentModel) return null;

    return new Incident(
      incidentModel.id,
      incidentModel.test_id,
      incidentModel.incident_date,
      incidentModel.type,
      incidentModel.severity,
      incidentModel.description ?? '',
      incidentModel.actions_taken
    );
  }

  async findByTestId(testId: number): Promise<Incident[]> {
    const incidents = await IncidentModel.findAll({
      where: { test_id: testId }
    });
    return incidents.map((incident) => {
      return new Incident(
        incident.id,
        incident.test_id,
        incident.incident_date,
        incident.type,
        incident.description ?? '',
        incident.severity,
        incident.actions_taken
      );
    });
  }

  async update(incident: Incident): Promise<Incident> {
    if (!incident.id) {
      throw new Error("Incident ID is required for update");
    }
    const instance = await IncidentModel.findByPk(incident.id);
    if (!instance) {
      throw new Error(`Incident with id ${incident.id} not found`);
    }

    await instance.update({
      test_id: incident.testId,
      incident_date: incident.incidentDate,
      type: incident.type,
      description: incident.description,
      severity: incident.severity,
      actions_taken: incident.actionsTaken
    });

    return incident;
  }

  async delete(id: number): Promise<void> {
    const instance = await IncidentModel.findByPk(id);
    if (!instance) {
      throw new Error(`Incident with id ${id} not found`);
    }
    await instance.destroy();
  }
}