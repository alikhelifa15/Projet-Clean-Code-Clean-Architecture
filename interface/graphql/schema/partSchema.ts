export const partTypeDefs = `
  extend type Query {
    part(id: ID!): Part
    parts: [Part!]!
    partsByReference(reference: String!): [Part!]!
  }

  type Part {
    id: ID!
    reference: String!
    name: String!
    description: String
    currentStock: String!
    alertThreshold: String!
    unitPrice: String
  }
`;
