import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../../../api/graphql";
import { GetMotorcyclesByDealerData } from "../types";
import { GET_MOTORCYCLES_BY_DEALER } from "../api/queries";

export const useMotorcyclesByDealer = (dealerId: string) => {
    return useQuery<GetMotorcyclesByDealerData>({
        queryKey: ['motorcycles', 'dealer', dealerId],
        queryFn: async () => {
            return graphqlClient.request(GET_MOTORCYCLES_BY_DEALER, { dealerId });
        },
        enabled: !!dealerId
    });
};