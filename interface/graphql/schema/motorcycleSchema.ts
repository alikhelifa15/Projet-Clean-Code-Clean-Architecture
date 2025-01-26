export const motorcycleTypeDefs = `
  type Motorcycle {
    id: ID!
    companyId: ID!
    dealerId: ID!
    modelId: ID!
    serialNumber: String!
    mileage: Int!
    serviceDate: String
    status: String!
    maintenanceInterval: Int!
  }

`;