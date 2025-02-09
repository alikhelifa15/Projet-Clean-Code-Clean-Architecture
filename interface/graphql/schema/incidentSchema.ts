export const incidentTypeDefs = `
 type Incident {
   id: ID!
   test_Id: ID!  
   incident_Date: String!
   type: String!
   severity: String!
   description: String
   actions_Taken: String
   test: TestInfo
 }

 type TestInfo {
   id: ID!
   start_date: String!
   end_date: String
   status: String!
   client: ClientInfo     
   driver: DriverInfo    
   motorcycle: MotoInfo   
 }

 type ClientInfo {
   first_name: String!
   last_name: String!
 }

 type DriverInfo {
   firstName: String!
   lastName: String!
 }

 type MotoInfo {
   brand: String!
   model: String!
 }
`;