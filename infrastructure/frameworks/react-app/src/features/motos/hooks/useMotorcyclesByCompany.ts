import { useQuery } from "@tanstack/react-query";
import { GetMotorcyclesByCompanyData } from "../types";
import { graphqlClient } from "../../../api/graphql";
import { GET_MOTORCYCLES_BY_COMPANY } from "../api/queries";

export const useMotorcyclesByCompany = (companyId: string) => {
    return useQuery<GetMotorcyclesByCompanyData>({
        queryKey: ['motorcycles', 'company', companyId],
        queryFn: async () => {
            return graphqlClient.request(GET_MOTORCYCLES_BY_COMPANY, { companyId });
        },
        enabled: !!companyId
    });
};