export const driverTypeDefs = `
  extend type Query {
    driver(id: ID!): Driver
    drivers: [Driver!]!
    driversByCompany(companyId: ID!): [Driver!]!
  }

  type Driver {
    id: ID!
    companyId: ID
    firstName: String!
    lastName: String!
    licenseNumber: String!
    licenseDate: String! 
    experience: String
    status: String!
  }
`;
