import { GetAllIncidentsQueryHandler } from "../../../application/usecases/query-handlers/Incident-query-handler/GetAllIncidentsQueryHandler";
import { GetIncidentsByCompanyQueryHandler } from "../../../application/usecases/query-handlers/Incident-query-handler/GetIncidentsByCompanyQueryHandler";
import { GetIncidentsByDealerQueryHandler } from "../../../application/usecases/query-handlers/Incident-query-handler/GetIncidentsByDealerQueryHandler";
import { GetAllIncidentsQuery } from "../../../application/usecases/queries/Incident-queries/GetAllIncidentsQuery";
import { GetIncidentsByCompanyQuery } from "../../../application/usecases/queries/Incident-queries/GetIncidentsByCompanyQuery";
import { GetIncidentsByDealerQuery } from "../../../application/usecases/queries/Incident-queries/GetIncidentsByDealerQuery";

export const incidentResolvers = {
  incidents: async () => {
    const handler = new GetAllIncidentsQueryHandler();
    const results = await handler.execute(new GetAllIncidentsQuery());
    return results.map((result) => ({
      id: result.id,
      testId: result.test_id,
      incidentDate: result.incident_date?.toISOString(),
      type: result.type,
      severity: result.severity,
      description: result.description,
      actionsTaken: result.actions_taken,
    }));
  },

  incidentsByCompany: async (
    _: unknown,
    { companyId }: { companyId: string }
  ) => {
    const handler = new GetIncidentsByCompanyQueryHandler();
    const results = await handler.execute(
      new GetIncidentsByCompanyQuery(companyId)
    );
    return results.map((result) => ({
      id: result.id,
      testId: result.test_id,
      incidentDate: result.incident_date?.toISOString(),
      type: result.type,
      severity: result.severity,
      description: result.description,
      actionsTaken: result.actions_taken,
    }));
  },

  incidentsByDealer: async (_: unknown, { dealerId }: { dealerId: string }) => {
    const handler = new GetIncidentsByDealerQueryHandler();
    const results = await handler.execute(
      new GetIncidentsByDealerQuery(dealerId)
    );
    return results.map((result) => ({
      id: result.id,
      testId: result.test_id,
      incidentDate: result.incident_date?.toISOString(),
      type: result.type,
      severity: result.severity,
      description: result.description,
      actionsTaken: result.actions_taken,
    }));
  },
};
