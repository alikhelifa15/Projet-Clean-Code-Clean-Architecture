import { GetAllIncidentsQueryHandler } from "../../../application/usecases/query-handlers/Incident-query-handler/GetAllIncidentsQueryHandler";
import { GetIncidentsByCompanyQueryHandler } from "../../../application/usecases/query-handlers/Incident-query-handler/GetIncidentsByCompanyQueryHandler";
import { GetIncidentsByDealerQueryHandler } from "../../../application/usecases/query-handlers/Incident-query-handler/GetIncidentsByDealerQueryHandler";
import { GetAllIncidentsQuery } from "../../../application/usecases/queries/Incident-queries/GetAllIncidentsQuery";
import { GetIncidentsByCompanyQuery } from "../../../application/usecases/queries/Incident-queries/GetIncidentsByCompanyQuery";
import { GetIncidentsByDealerQuery } from "../../../application/usecases/queries/Incident-queries/GetIncidentsByDealerQuery";

export const incidentResolvers = {
  incidents: async () => {
    try {
      const handler = new GetAllIncidentsQueryHandler();
      return await handler.execute(new GetAllIncidentsQuery());
    } catch (error) {
      console.error("Error in incidents resolver:", error);
      return [];
    }
  },

  incidentsByCompany: async (
    _: unknown,
    { companyId }: { companyId: string }
  ) => {
    try {
      const handler = new GetIncidentsByCompanyQueryHandler();
      return await handler.execute(new GetIncidentsByCompanyQuery(companyId));
    } catch (error) {
      console.error("Error in incidentsByCompany resolver:", error);
      return [];
    }
  },

  incidentsByDealer: async (_: unknown, { dealerId }: { dealerId: string }) => {
    try {
      const handler = new GetIncidentsByDealerQueryHandler();
      return await handler.execute(new GetIncidentsByDealerQuery(dealerId));
    } catch (error) {
      console.error("Error in incidentsByDealer resolver:", error);
      return [];
    }
  },
};
