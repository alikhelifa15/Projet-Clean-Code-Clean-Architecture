export const userTypeDefs = `
  type Address {
    address: String
    postalCode: String
    city: String
  }

  type Dealer {
    id: ID!
    userId: ID!
    name: String!
    phone: String
    address: String
    postalCode: String
    city: String
    services: String
  }

  type Company {
    id: ID!
    userId: ID!
    companyName: String!
    siretNumber: String!
    phone: String
    address: String
    postalCode: String
    city: String
  }

  type User {
    id: ID!
    email: String!
    type: String!
    creationDate: String!
    company: Company
    dealer: Dealer
  }
`;