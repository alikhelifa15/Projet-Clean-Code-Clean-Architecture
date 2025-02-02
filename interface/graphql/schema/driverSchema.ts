export const driverTypeDefs = `
  type Driver {
    id: ID!
    companyId: ID
    dealerId: ID
    firstName: String!
    lastName: String!
    licenseNumber: String!
    vehicleId: ID!
    status: String!
  }
`;