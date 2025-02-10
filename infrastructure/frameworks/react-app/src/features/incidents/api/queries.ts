import { gql } from "../../../api/graphql";

export const GET_INCIDENTS_BY_DEALER = gql(`
  query GetIncidentsByDealer($dealerId: ID!) {
    incidentsByDealer(dealerId: $dealerId) {
      id
      incident_Date
      type
      severity
      description
      actions_Taken
      test {
        id
        start_date
        end_date
        status
        client {
          first_name
          last_name
        }
        motorcycle {
          brand
          model
        }
      }
    }
  }
`);

export const GET_INCIDENTS_BY_COMPANY = gql(`
  query GetIncidentsByCompany($companyId: ID!) {
    incidentsByCompany(companyId: $companyId) {
      id
      incident_Date
      type
      severity
      description
      actions_Taken
      test {
        id
        start_date
        end_date
        status
        driver {
          firstName
          lastName
        }
        motorcycle {
          brand
          model
        }
      }
    }
  }
`);