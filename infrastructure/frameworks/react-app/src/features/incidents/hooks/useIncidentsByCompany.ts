import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../../../api/graphql";
import { GET_INCIDENTS_BY_COMPANY } from "../api/queries";
import { Incident } from "../types";
export const useIncidentsByCompany = (companyId: string) => {
    return useQuery({
        queryKey: ['incidents', 'company', companyId],
        queryFn: async () => {
            const response = await graphqlClient.request(GET_INCIDENTS_BY_COMPANY, { companyId }) as { incidentsByCompany: Incident[] };                   return {
                incidentsByCompany: response?.incidentsByCompany || []
            };
        },
        enabled: !!companyId
    });
};