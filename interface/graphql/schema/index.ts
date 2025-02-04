import { userTypeDefs } from './userSchema';
import { motorcycleTypeDefs } from './motorcycleSchema';
import { clientTypeDefs } from './clientSchema';
import { driverTypeDefs } from './driverSchema';
import { testTypeDefs } from './testSchema';
import { incidentTypeDefs } from './incidentSchema';

export const schema = `
  ${userTypeDefs}
  ${motorcycleTypeDefs}
  ${clientTypeDefs}
  ${driverTypeDefs}
   ${testTypeDefs}
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
   testsByMotorcycle(motorcycleId: ID!): [Test!]!
   activeTests: [Test!]!

   # Incident queries  
   incident(id: ID!): Incident
   incidents: [Incident!]!
   incidentsByTest(testId: ID!): [Incident!]!
   incidentsByType(type: String!): [Incident!]!
   incidentsByCompany(companyId: ID!): [Incident!]!
   incidentsByDealer(dealerId: ID!): [Incident!]!
  }
`;