import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../../../api/graphql";
import { GET_TEST_MOTOS_BY_DEALER } from "../api/queries";
export const useTestMotosByDealer = (dealerId: string) => {
    return useQuery({
        queryKey: ['testMotos', 'dealer', dealerId],
        queryFn: async () => {
            const response = await graphqlClient.request(GET_TEST_MOTOS_BY_DEALER, { dealerId });
            console.log('Dealer API Response:', response);
            // S'assurer que nous retournons un tableau vide si pas de données
            return {
                testsByDealer: response?.testsByDealer || []
            };
        },
        enabled: !!dealerId
    });
};