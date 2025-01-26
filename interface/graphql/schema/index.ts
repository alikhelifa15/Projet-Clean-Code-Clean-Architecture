import { userTypeDefs } from './userSchema';
import { motorcycleTypeDefs } from './motorcycleSchema';

export const schema = `
  ${userTypeDefs}
  ${motorcycleTypeDefs}

  type Query {
    # User queries
    user(id: ID, email: String): User
    users: [User!]!

    # Motorcycle queries
    motorcycle(id: ID): Motorcycle
    motorcycles: [Motorcycle!]!
    motorcycleBySerialNumber(serialNumber: String!): Motorcycle
    motorcyclesByDealer(dealerId: ID!): [Motorcycle!]!
    motorcyclesByCompany(companyId: ID!): [Motorcycle!]!
  }
`;