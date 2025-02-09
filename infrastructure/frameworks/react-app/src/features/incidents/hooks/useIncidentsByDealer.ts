import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../../../api/graphql";
import { GET_INCIDENTS_BY_DEALER } from "../api/queries";
import { Incident } from "../types";
export const useIncidentsByDealer = (dealerId: string) => {
    return useQuery({
        queryKey: ['incidents', 'dealer', dealerId],
        queryFn: async () => {
            const response: { incidentsByDealer: Incident[] } = await graphqlClient.request(GET_INCIDENTS_BY_DEALER, { dealerId });      
                  return {
                incidentsByDealer: response?.incidentsByDealer|| []
            };
        },
        enabled: !!dealerId
    });
};