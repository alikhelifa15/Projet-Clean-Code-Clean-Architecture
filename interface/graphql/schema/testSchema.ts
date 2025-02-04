export const testTypeDefs = `
 type Test {
   id: ID!
   motorcycleId: ID!
   driverId: ID
   clientId: ID
   startDate: String!
   endDate: String
   startingMileage: Int!
   endingMileage: Int
   comments: String
   status: String!
   incidents: [Incident!]
   motorcycle: Motorcycle
   driver: Driver
   client: Client
 }
`;