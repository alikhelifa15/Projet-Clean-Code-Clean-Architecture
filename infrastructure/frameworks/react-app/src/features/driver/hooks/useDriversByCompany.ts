import { useQuery } from "@tanstack/react-query";
import { GetDriversByCompanyData } from "../types";
import { graphqlClient } from "../../../api/graphql";
import { GET_DRIVERS_BY_COMPANY } from "../api/queries";

export const useDriversByCompany = (companyId: string) => {
    return useQuery<GetDriversByCompanyData>({
        queryKey: ['drivers', 'company', companyId],
        queryFn: async () => {
            return graphqlClient.request(GET_DRIVERS_BY_COMPANY, { companyId });
        },
        enabled: !!companyId
    });
};