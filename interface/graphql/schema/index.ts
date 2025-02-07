import { userTypeDefs } from './userSchema';
import { motorcycleTypeDefs } from './motorcycleSchema';
import { clientTypeDefs } from './clientSchema';
import { driverTypeDefs } from './driverSchema';
import { partTypeDefs } from './partSchema';

export const schema = `
  ${userTypeDefs}
  ${motorcycleTypeDefs}
  ${clientTypeDefs}
  ${driverTypeDefs}
  ${partTypeDefs}

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

    # Client queries
    client(id: ID!): Client
    clients: [Client!]!
    clientsByDealer(dealerId: ID!): [Client!]!
  }
`;