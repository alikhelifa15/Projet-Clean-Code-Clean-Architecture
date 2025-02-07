import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../../../api/graphql";
import { GET_PARTS } from "../api/queries";

export const useParts = () => {
    return useQuery({
        queryKey: ['parts'],
        queryFn: async () => {
            return graphqlClient.request(GET_PARTS);
        }
    });
};
