export const motorcycleTypeDefs = `
  type Motorcycle {
    id: ID!
    companyId: ID
    dealerId: ID
    brand:String!
    model:String!
    serialNumber: String!
    photo: String
    mileage: Int!
    serviceDate: String
    status: String!
    maintenanceInterval: Int!
  }

`;