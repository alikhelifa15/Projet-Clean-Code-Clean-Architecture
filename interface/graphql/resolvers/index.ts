import { userResolvers } from './userResolvers';
import { motorcycleResolvers } from './motorcycleResolvers';
import { clientResolvers } from './clientResolvers';

export const resolvers = {
  Query: {
    ...userResolvers,
    ...motorcycleResolvers,
    ...clientResolvers
  }
};