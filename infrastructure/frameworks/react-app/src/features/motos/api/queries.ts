
import { gql } from '../../../api/graphql';

export const GET_MOTORCYCLES_BY_DEALER = gql(`
    query GetMotorcyclesByDealer($dealerId: ID!) {
      motorcyclesByDealer(dealerId: $dealerId) {
        id
        companyId
        dealerId
        model
        brand
        serialNumber
        photo
        mileage
        serviceDate
        status
        maintenanceInterval
      }
    }
`);

export const GET_MOTORCYCLES_BY_COMPANY = gql(`
    query GetMotorcyclesByCompany($companyId: ID!) {
      motorcyclesByCompany(companyId: $companyId) {
        id
        companyId
        dealerId
        model
        brand
        serialNumber
        photo
        mileage
        serviceDate
        status
        maintenanceInterval
      }
    }
`);