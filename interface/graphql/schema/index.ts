
import { userTypeDefs } from './userSchema';
import { motorcycleTypeDefs } from './motorcycleSchema';
import { clientTypeDefs } from './clientSchema';
import { driverTypeDefs } from './driverSchema';
import { testTypeDefs } from './testSchema';
import { incidentTypeDefs } from './incidentSchema';
import { partTypeDefs } from './partSchema';
export const schema = `
  ${userTypeDefs}
  ${motorcycleTypeDefs}
  ${clientTypeDefs}
  ${driverTypeDefs}
  ${testTypeDefs}
  ${partTypeDefs}
  ${incidentTypeDefs}



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


    # Test queries
   test(id: ID!): Test
   tests: [Test!]!
   testsByDriver(driverId: ID!): [Test!]!
   testsByClient(clientId: ID!): [Test!]!
   testsByDealer(dealerId: ID!): [Test!]!
   testsByCompany(companyId: ID!): [Test!]!

   # Incident queries  
   incidents: [Incident!]!
   incidentsByCompany(companyId: ID!): [Incident!]!
   incidentsByDealer(dealerId: ID!): [Incident!]!
  }
`;
