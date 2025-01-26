import { gql } from '../../../api/graphql';
 export const GET_USERS = gql(`
  query GetUsers {
    users {
      id
      email
      type
      company {
        id
        companyName
        siretNumber
        phone
        address
      }
      dealer {
        id
        name
        phone
        address
        services
      }
    }
  }
`);