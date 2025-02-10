import { gql } from '../../../api/graphql';

export const GET_PARTS = gql`
  query GetParts {
    parts {
      id
      name
      reference
      description
      currentStock
      alertThreshold
      unitPrice
    }
  }
`;