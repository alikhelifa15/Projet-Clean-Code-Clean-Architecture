import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';
const graphqlEndpoint = 'http://localhost:4000/graphql';
if (!graphqlEndpoint) {
  throw new Error('GRAPHQL_ENDPOINT is not defined');
}

export const graphqlClient = new GraphQLClient(graphqlEndpoint, {
  headers: {
    'Content-Type': 'application/json',
    "x-api-key": 'tm_lclel4r_XxYy-qQ_P3k8mNpL-dW7vB9_Aa2Bb3Cc'
  },
});

export { gql };