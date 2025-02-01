import { gql } from '../../../api/graphql';

export const GET_CLIENTS_BY_DEALER = gql(`
    query GetClientsByDealer($dealerId: ID!) {
      clientsByDealer(dealerId: $dealerId) {
        id
        dealerId
        firstName
        lastName
        phone
      }
    }
`);