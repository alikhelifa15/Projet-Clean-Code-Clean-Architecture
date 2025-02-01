import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../../../api/graphql";
import { GetClientsByDealerData } from "../types";
import { GET_CLIENTS_BY_DEALER } from "../api/queries";

export const useClientsByDealer = (dealerId: string) => {
    return useQuery<GetClientsByDealerData>({
        queryKey: ['clients', 'dealer', dealerId],
        queryFn: async () => {
            return graphqlClient.request(GET_CLIENTS_BY_DEALER, { dealerId });
        },
        enabled: !!dealerId
    });
};