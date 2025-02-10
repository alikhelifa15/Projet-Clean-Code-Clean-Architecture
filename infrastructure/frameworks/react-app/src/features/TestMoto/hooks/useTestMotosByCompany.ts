import { useQuery } from "@tanstack/react-query";
import { GetTestMotosByCompanyData } from "../types";
import { graphqlClient } from "../../../api/graphql";
import { GET_TEST_MOTOS_BY_COMPANY } from "../api/queries";

export const useTestMotosByCompany = (companyId: string) => {
    return useQuery<GetTestMotosByCompanyData>({
        queryKey: ['testMotos', 'company', companyId],
        queryFn: async () => {
            return graphqlClient.request(GET_TEST_MOTOS_BY_COMPANY, { companyId });
        },
        enabled: !!companyId
    });
};