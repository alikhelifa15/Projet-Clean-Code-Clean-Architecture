import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '../../../api/graphql';
import { GET_USERS } from '../api/queries';
import type { GetUsersQuery } from '../../auth/types';


/**
 * Fetches the list of users with React Query.
 *
 * @returns The list of users and related data.
 * @example
 * const { data: users, isLoading, isError } = useUsers();
 */
export const useUsers = () => {
  return useQuery<GetUsersQuery>({
    queryKey: ['users'],
    queryFn: async () => {
      return graphqlClient.request(GET_USERS);
    },
  });
};