import { gql } from "../../../api/graphql";

export const GET_TEST_MOTOS_BY_DEALER = gql(`
  query GetTestByDealer($dealerId: ID!) {
    testsByDealer(dealerId: $dealerId) {
     id
    motorcycleId
    driverId
    clientId
    startDate
    endDate
    startDate
    startingMileage
    endingMileage
    status
    comments
    motorcycle{
      id
      model
      brand
      photo
    }
    client{
      id
      lastName
      firstName
      phone
    }
    
    
  
    }
  }
`);

export const GET_TEST_MOTOS_BY_COMPANY = gql(`
  query GetTestByCompany($companyId: ID!) {
    testsByCompany(companyId: $companyId) {
      id
      motorcycleId
      driverId
      clientId
      startDate
      endDate
      startingMileage
      endingMileage
      comments
      status
      motorcycle {
        id
        brand
        model
        photo
      }
      driver {
        id
        firstName
        lastName
        experience
        licenseNumber
      }
    }
  }
`);

export const GET_DRIVERS_BY_COMPANY = gql(`
  query GetDriversByCompany($companyId: ID!) {
    driversByCompany(companyId: $companyId) {
      id
      firstName
      lastName
      licenseNumber
      experience
    }
  }
`);

export const GET_CLIENTS_BY_DEALER = gql(`
  query GetClientsByDealer($dealerId: ID!) {
    clientsByDealer(dealerId: $dealerId) {
      id
      firstName
      lastName
      phone
    }
  }
`);
