export const incidentTypeDefs = `
 type Incident {
   id: ID!
   testId: ID!  
   incidentDate: String!
   type: String!
   severity: String!
   description: String
   actionsTaken: String
   test: Test
 }
`;