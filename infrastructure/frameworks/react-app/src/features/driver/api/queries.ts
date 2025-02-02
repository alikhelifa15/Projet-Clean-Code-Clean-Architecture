import { gql } from '../../../api/graphql';

export const GET_DRIVERS_BY_COMPANY = gql`
  query GetDriversByCompany($companyId: ID!) {
    driversByCompany(companyId: $companyId) {
      id
      companyId
      firstName
      lastName
      licenseNumber
      licenseDate
      experience
      status
    }
  }
`;